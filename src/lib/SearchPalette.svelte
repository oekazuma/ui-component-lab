<script lang="ts">
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';
	import { categoryNames, t } from './i18n';
	import { componentPath } from './paths';
	import { entries } from './registry';
	import { matchedAlias, matches } from './search';
	import { categories, type ComponentData, type Lang } from './types';

	let { lang }: { lang: Lang } = $props();
	let ui = $derived(t(lang));

	const uid = $props.id();
	let dialog: HTMLDialogElement;
	let input: HTMLInputElement;
	let query = $state('');
	let active = $state(0);
	// prerender の時点では OS が分からないので、描画後に Mac かどうかを見て表示を変える
	let mac = $state(false);
	$effect(() => {
		mac = /Mac|iPhone|iPad/.test(navigator.userAgent);
	});

	// 何も打っていないときはカテゴリごとに全件、打ったら一致したものを名前順に並べる
	let groups = $derived.by(() => {
		let i = 0;
		const item = (data: ComponentData) => ({ data, alias: matchedAlias(data, query), i: i++ });
		if (!query.trim())
			return categories.map((c) => ({
				category: c,
				items: entries.filter((e) => e.data.category === c).map((e) => item(e.data))
			}));
		return [{ category: undefined, items: entries.filter((e) => matches(e.data, query)).map((e) => item(e.data)) }];
	});
	let results = $derived(groups.flatMap((g) => g.items));
	const optionId = (i: number) => `${uid}-option-${i}`;

	function open() {
		query = '';
		active = 0;
		dialog.showModal();
		input.focus();
	}

	function choose(data: ComponentData) {
		dialog.close();
		goto(componentPath(lang, data.id));
	}

	async function move(to: number) {
		if (!results.length) return;
		active = (to + results.length) % results.length;
		await tick();
		document.getElementById(optionId(active))?.scrollIntoView({ block: 'nearest' });
	}

	function onkeydown(e: KeyboardEvent) {
		// 日本語入力の変換中の ↑↓ や Enter は IME の操作なので横取りしない。
		// Safari は変換を確定する Enter で isComposing が false になるため、keyCode 229 も見る
		if (e.isComposing || e.keyCode === 229) return;
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			move(active + (e.key === 'ArrowDown' ? 1 : -1));
		} else if (e.key === 'Enter' && results[active]) {
			e.preventDefault();
			choose(results[active].data);
		}
	}

	// どのページからでも開けるよう、ショートカットだけは window で常に受け付ける。
	// 修飾キー付きにするのは、1 文字のショートカットだと WCAG 2.1.4（文字キーのショートカット）に当たるため
	function onWindowKeydown(e: KeyboardEvent) {
		if (e.key?.toLowerCase() !== 'k' || !(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return;
		e.preventDefault();
		if (dialog.open) dialog.close();
		else open();
	}
</script>

<svelte:window onkeydown={onWindowKeydown} />

<button type="button" class="trigger" aria-haspopup="dialog" aria-keyshortcuts="Meta+K Control+K" onclick={open}>
	<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
		<circle cx="11" cy="11" r="7" />
		<path d="m20 20-4-4" />
	</svg>
	<span class="label">{ui.search}</span>
	<kbd aria-hidden="true">{mac ? '⌘K' : 'Ctrl K'}</kbd>
</button>

<!-- ネイティブの <dialog>（showModal）が、背後を操作できなくすること、Esc で閉じること、閉じたあと元の場所へフォーカスを戻すことを受け持つ。
	候補は WAI-ARIA APG の Combobox（リストボックスのポップアップ）。フォーカスは入力欄に置いたまま、aria-activedescendant で選択中の候補を伝える -->
<dialog bind:this={dialog} aria-labelledby="{uid}-title" onclose={() => (query = '')}>
	<h2 id="{uid}-title" class="visually-hidden">{ui.search}</h2>
	<div class="field">
		<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
			<circle cx="11" cy="11" r="7" />
			<path d="m20 20-4-4" />
		</svg>
		<input
			bind:this={input}
			bind:value={query}
			type="text"
			role="combobox"
			aria-expanded="true"
			aria-controls="{uid}-list"
			aria-autocomplete="list"
			aria-labelledby="{uid}-title"
			aria-activedescendant={results.length ? optionId(active) : undefined}
			autocomplete="off"
			placeholder={ui.search}
			oninput={() => (active = 0)}
			{onkeydown}
		/>
		<kbd aria-hidden="true">Esc</kbd>
	</div>
	<div id="{uid}-list" role="listbox" aria-labelledby="{uid}-title" class="list">
		{#each groups as g (g.category ?? 'results')}
			<div role="group" aria-labelledby={g.category ? `${uid}-${g.category}` : undefined}>
				{#if g.category}
					<div role="presentation" id="{uid}-{g.category}" class="group-label">{categoryNames[g.category][lang]}</div>
				{/if}
				{#each g.items as { data, alias, i } (data.id)}
					<!-- キー操作もフォーカスも入力欄が受け持つ（APG の Combobox）ので、候補はフォーカスを受け取らず、マウスとタッチの操作だけを付ける -->
					<!-- svelte-ignore a11y_click_events_have_key_events, a11y_interactive_supports_focus -->
					<div
						role="option"
						id={optionId(i)}
						aria-selected={i === active}
						onclick={() => choose(data)}
						onmousemove={() => (active = i)}
					>
						<span class="name">
							{data.names.en}
							{#if lang === 'ja'}<span class="sub">{data.names.ja}</span>{/if}
						</span>
						<span class="meta">
							{#if alias}{ui.aliases}: {alias}{:else if !g.category}{categoryNames[data.category][lang]}{/if}
						</span>
					</div>
				{/each}
			</div>
		{/each}
	</div>
	<p class="status" class:visually-hidden={results.length} aria-live="polite">
		{results.length ? ui.count(results.length) : ui.noResults}
	</p>
	<p class="hint" aria-hidden="true">{ui.searchHint}</p>
</dialog>

<style>
	.trigger {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.4em 0.5em 0.4em 0.75rem;
		border: 1px solid var(--color-muted);
		border-radius: 999px;
		background: var(--color-surface);
		color: var(--color-muted);
		cursor: pointer;
	}

	.trigger:hover {
		border-color: var(--color-text);
	}

	.label {
		flex: 1;
		text-align: left;
	}

	svg {
		flex-shrink: 0;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
	}

	kbd {
		padding: 0 0.4em;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: var(--color-bg);
		color: var(--color-muted);
		font-family: inherit;
		font-size: 0.8125rem;
	}

	/* 狭い画面はキーボードがないことが多いので、ショートカットの表示を出さない */
	@media (max-width: 40rem) {
		.trigger kbd {
			display: none;
		}
	}

	dialog {
		width: min(36rem, calc(100% - 2rem));
		max-height: min(32rem, 80vh);
		margin: 10vh auto auto;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		color: var(--color-text);
		box-shadow: 0 12px 32px rgb(0 0 0 / 0.25);
	}

	dialog[open] {
		display: flex;
		flex-direction: column;
	}

	dialog::backdrop {
		background: rgb(0 0 0 / 0.4);
	}

	.field {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--color-border);
		color: var(--color-muted);
	}

	input {
		flex: 1;
		min-width: 0;
		padding: 0.25rem 0;
		border: 0;
		background: none;
		color: var(--color-text);
		font-size: 1.0625rem;
	}

	/* フォーカスは常にこの欄にあるので、枠はダイアログ全体の境目で示す */
	input:focus-visible {
		outline: none;
		box-shadow: none;
	}

	.field:has(input:focus-visible) {
		box-shadow: inset 0 -2px 0 var(--color-accent);
	}

	.list {
		overflow-y: auto;
		padding: 0.25rem;
	}

	.group-label {
		padding: 0.5rem 0.75rem 0.25rem;
		color: var(--color-muted);
		font-size: 0.8125rem;
		font-weight: 700;
	}

	[role='option'] {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.5rem 0.75rem;
		border-radius: calc(var(--radius) - 2px);
		cursor: pointer;
	}

	[aria-selected='true'] {
		background: var(--color-surface);
		box-shadow: inset 3px 0 0 var(--color-accent);
	}

	.name {
		font-weight: 700;
	}

	.sub {
		margin-left: 0.4em;
		color: var(--color-muted);
		font-size: 0.875rem;
		font-weight: 400;
	}

	/* 幅が足りないときは部品名の側を折り返し、カテゴリ名や別名は 1 文字ずつ縦に割れないようにする */
	.meta {
		flex-shrink: 0;
		max-width: 50%;
		color: var(--color-muted);
		font-size: 0.8125rem;
		text-align: right;
	}

	.status {
		margin: 0;
		padding: 0.75rem 1rem;
		color: var(--color-muted);
	}

	.hint {
		margin: 0;
		padding: 0.5rem 1rem;
		border-top: 1px solid var(--color-border);
		color: var(--color-muted);
		font-size: 0.8125rem;
	}
</style>
