<script lang="ts">
	import { normalize } from '#lib/search.js';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// 「…」はダイアログを開く操作に付ける慣習（APG Menu and Menubar）
	const text = {
		en: {
			open: 'Commands…',
			title: 'Commands',
			placeholder: 'Type a command',
			none: 'No matching commands',
			ran: 'Ran:',
			commands: ['New file', 'Save', 'Save as…', 'Go to line…', 'Toggle word wrap', 'Change color theme', 'Close editor']
		},
		ja: {
			open: 'コマンド…',
			title: 'コマンド',
			placeholder: '操作の名前を入力',
			none: '該当する操作はありません',
			ran: '実行した操作:',
			commands: ['新しいファイル', '保存', '名前を付けて保存…', '指定行へ移動…', '折り返しの切り替え', '配色テーマを変える', 'エディターを閉じる']
		}
	};

	const uid = $props.id();
	let dialog: HTMLDialogElement;
	let query = $state('');
	let active = $state(0);
	let ran = $state('');

	let results = $derived(text[lang].commands.filter((c) => normalize(c).includes(normalize(query))));

	function open() {
		query = '';
		active = 0;
		dialog.showModal();
	}

	function run(command: string) {
		ran = command;
		dialog.close();
	}

	// WAI-ARIA APG Combobox（リストボックスのポップアップ）: ↑↓ で候補を移り、Enter で決める。端では反対の端へ回る
	function onkeydown(e: KeyboardEvent) {
		// 日本語入力の変換中の ↓ や Enter は IME の操作なので横取りしない。
		// Safari は変換を確定する Enter で isComposing が false になるため、keyCode 229 も見る
		if (e.isComposing || e.keyCode === 229 || !results.length) return;
		const n = results.length;
		if (e.key === 'ArrowDown') active = (active + 1) % n;
		else if (e.key === 'ArrowUp') active = (active - 1 + n) % n;
		else if (e.key === 'Enter') run(results[active]);
		else return;
		e.preventDefault();
	}
</script>

<div class="demo">
	<!-- サイトの検索窓の ⌘K / Ctrl+K とぶつからないよう、このデモはボタンでだけ開く -->
	<button type="button" class="btn" aria-haspopup="dialog" onclick={open}>{text[lang].open}</button>
	<p role="status">{ran ? `${text[lang].ran} ${ran}` : ''}</p>
</div>

<!-- ネイティブの <dialog>（showModal）が、背後を操作できなくすること、最初の入力欄へフォーカスを移すこと、Esc で閉じること、閉じたあと開いたボタンへフォーカスを戻すことを受け持つ。
	フォーカスは入力欄に置いたまま、aria-activedescendant で選んでいる候補を伝える（APG Combobox） -->
<dialog bind:this={dialog} aria-labelledby="{uid}-title">
	<h2 id="{uid}-title" class="visually-hidden">{text[lang].title}</h2>
	<input
		type="text"
		role="combobox"
		aria-labelledby="{uid}-title"
		aria-expanded="true"
		aria-controls="{uid}-list"
		aria-autocomplete="list"
		aria-activedescendant={results.length ? `${uid}-option-${active}` : undefined}
		autocomplete="off"
		placeholder={text[lang].placeholder}
		bind:value={query}
		oninput={() => (active = 0)}
		{onkeydown}
	/>
	<ul id="{uid}-list" role="listbox" aria-labelledby="{uid}-title">
		{#each results as command, i (command)}
			<!-- キー操作もフォーカスも入力欄が受け持つので、候補はマウスとタッチの操作だけを持つ -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<li
				id="{uid}-option-{i}"
				role="option"
				aria-selected={i === active}
				onclick={() => run(command)}
				onmousemove={() => (active = i)}
			>
				{command}
			</li>
		{/each}
	</ul>
	<p class="none" class:visually-hidden={results.length} aria-live="polite">{results.length ? '' : text[lang].none}</p>
</dialog>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 0.5rem;
	}

	[role='status'] {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	dialog {
		width: min(28rem, calc(100% - 2rem));
		margin: 15vh auto auto;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		color: var(--color-text);
		box-shadow: 0 12px 32px rgb(0 0 0 / 0.25);
	}

	dialog::backdrop {
		background: rgb(0 0 0 / 0.4);
	}

	input {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 0;
		border-bottom: 1px solid var(--color-border);
		background: none;
		font-size: 1.0625rem;
	}

	/* フォーカスは常にこの欄にあるので、枠は欄の下の線で示す */
	input:focus-visible {
		outline: none;
		box-shadow: inset 0 -2px 0 var(--color-accent);
	}

	ul {
		margin: 0;
		padding: 0.25rem;
		list-style: none;
	}

	li {
		padding: 0.5rem 0.75rem;
		border-radius: calc(var(--radius) - 2px);
		cursor: pointer;
	}

	[aria-selected='true'] {
		background: var(--color-surface);
		box-shadow: inset 3px 0 0 var(--color-accent);
	}

	.none {
		margin: 0;
		padding: 0.75rem 1rem;
		color: var(--color-muted);
	}
</style>
