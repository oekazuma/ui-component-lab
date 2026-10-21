<script lang="ts">
	import { normalize } from '#lib/search.js';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Fruit',
			none: 'No matching fruit',
			options: ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Lemon', 'Mango', 'Melon', 'Peach']
		},
		ja: {
			label: '果物',
			none: '該当する果物はありません',
			options: ['アボカド', 'イチゴ', 'オレンジ', 'キウイ', 'バナナ', 'ブドウ', 'メロン', 'モモ', 'リンゴ', 'レモン']
		}
	};

	const uid = $props.id();
	let value = $state('');
	let open = $state(false);
	/** 視覚的なフォーカスを当てている候補。DOM のフォーカスは入力欄に残し、aria-activedescendant で伝える */
	let active = $state(-1);

	let suggestions = $derived(
		text[lang].options.filter((o) => normalize(o).startsWith(normalize(value)))
	);
	let expanded = $derived(open && suggestions.length > 0);
	let noMatch = $derived(open && value !== '' && suggestions.length === 0);
	let input: HTMLInputElement;

	// 一致した部分の長さ。normalize は長音などを除くので、元の文字列の何文字目までが入力に当たるかを数え直す
	function matched(option: string) {
		const q = normalize(value).length;
		let k = 0;
		while (k < option.length && normalize(option.slice(0, k)).length < q) k++;
		return k;
	}

	function choose(option: string) {
		value = option;
		open = false;
		active = -1;
	}

	// APG「Editable Combobox With List Autocomplete」のキー操作に合わせる
	function onkeydown(e: KeyboardEvent) {
		// 日本語入力の変換中の ↓ や Enter は IME の操作なので横取りしない。
		// Safari は変換を確定する Enter で isComposing が false になるため、keyCode 229 も見る
		if (e.isComposing || e.keyCode === 229) return;
		const n = suggestions.length;
		if (!n && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) return;
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				open = true;
				if (!e.altKey) active = (active + 1) % n;
				break;
			case 'ArrowUp':
				e.preventDefault();
				open = true;
				active = active <= 0 ? n - 1 : active - 1;
				break;
			case 'Enter':
				if (!expanded) return;
				e.preventDefault();
				if (active >= 0) choose(suggestions[active]);
				else open = false;
				break;
			case 'Escape':
				// 閉じているときだけ入力欄を空にする。空にすると全候補が一致するため、open も必ず落とす
				if (!expanded) value = '';
				open = false;
				active = -1;
				break;
			case 'ArrowLeft':
			case 'ArrowRight':
			case 'Home':
			case 'End':
				active = -1;
		}
	}
</script>

<div class="demo">
	<label for="{uid}-input">{text[lang].label}</label>
	<div class="field">
		<input
			id="{uid}-input"
			type="text"
			role="combobox"
			autocomplete="off"
			aria-autocomplete="list"
			aria-controls="{uid}-list"
			aria-expanded={expanded}
			aria-activedescendant={expanded && active >= 0 ? `${uid}-option-${active}` : undefined}
			bind:value
			oninput={() => {
				open = value !== '';
				active = -1;
			}}
			{onkeydown}
			onblur={() => {
				open = false;
				active = -1;
			}}
			bind:this={input}
		/>
		<!-- APG の例と同じく、開閉ボタンは Tab で止まらない（キーボードでは ↓ や Alt + ↓ で開く）。
			タッチの支援技術ではこのボタンで一覧を開く。押してもフォーカスは入力欄に残す -->
		<button
			type="button"
			class="btn toggle"
			tabindex="-1"
			aria-label={text[lang].label}
			aria-controls="{uid}-list"
			aria-expanded={expanded}
			onpointerdown={(e) => e.preventDefault()}
			onclick={() => {
				input.focus();
				open = !expanded;
				active = -1;
			}}
		>
			<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
				<path d="M12 17L3 8L4 7L12 15L20 7L21 8L12 17Z" fill="currentcolor" />
			</svg>
		</button>
	</div>
	<ul id="{uid}-list" role="listbox" aria-label={text[lang].label} hidden={!expanded}>
		{#each suggestions as option, i (option)}
			<!-- キーボードでは入力欄側で操作するため、候補はマウス用のクリックだけを持つ -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<li
				id="{uid}-option-{i}"
				role="option"
				aria-selected={i === active}
				onpointerdown={(e) => e.preventDefault()}
				onclick={() => choose(option)}
			>
				<mark>{option.slice(0, matched(option))}</mark>{option.slice(matched(option))}
			</li>
		{/each}
	</ul>
	<!-- 候補がないことは一覧の代わりに文で伝える。一覧（listbox）は空のまま開かないので、aria-expanded は false のまま -->
	<p role="status" class:none={noMatch}>{noMatch ? text[lang].none : ''}</p>
</div>

<style>
	.demo {
		position: relative;
		display: grid;
		gap: 0.25rem;
		width: min(100%, 14rem);
	}

	label {
		font-size: 0.875rem;
	}

	.field {
		position: relative;
		display: grid;
	}

	input {
		min-height: 2.75rem;
		padding: 0.4em 2.75rem 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.toggle {
		position: absolute;
		top: 0;
		right: 0;
		border-color: transparent;
		background: none;
		color: var(--color-muted);
	}

	.toggle[aria-expanded='true'] svg {
		rotate: 180deg;
	}

	ul,
	.none {
		position: absolute;
		top: 100%;
		right: 0;
		left: 0;
		z-index: 1;
		margin: 0.25rem 0 0;
		padding: 0.25rem 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
		list-style: none;
	}

	p {
		margin: 0;
	}

	.none {
		padding: 0.25em 0.5em;
		color: var(--color-muted);
	}

	mark {
		background: none;
		color: inherit;
		font-weight: 700;
	}

	li {
		padding: 0.25em 0.5em;
		cursor: pointer;
	}

	li:hover {
		background: var(--color-surface);
	}

	[aria-selected='true'] {
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	[aria-selected='true']:hover {
		background: var(--color-accent);
	}
</style>
