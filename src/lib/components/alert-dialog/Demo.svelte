<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			note: 'Note',
			draft: 'Call the city office about the moving notice.',
			open: 'Discard note…',
			title: 'Discard this note?',
			body: 'The text in the note will be deleted. This cannot be undone.',
			cancel: 'Keep editing',
			confirm: 'Discard',
			result: { cancel: 'Kept editing', confirm: 'Discarded' }
		},
		ja: {
			note: 'メモ',
			draft: '転居届のことを市役所に電話で聞く。',
			open: 'メモを破棄…',
			title: 'このメモを破棄しますか？',
			body: 'メモに書いた内容は消え、元に戻せません。',
			cancel: '編集を続ける',
			confirm: '破棄',
			result: { cancel: '編集を続けます', confirm: '破棄しました' }
		}
	};

	const uid = $props.id();
	let dialog: HTMLDialogElement;
	// 言語を切り替えると DemoFrame がデモを作り直すので、初期値だけ読めば足りる
	// svelte-ignore state_referenced_locally
	let note = $state(text[lang].draft);
	let result = $state<'cancel' | 'confirm'>();

	// ネイティブの <dialog> の showModal() が、背景の操作無効化・Esc で閉じる・フォーカス復帰を担う。
	// showModal() は最初のフォーカス可能な要素にフォーカスを移すため、最も安全な「編集を続ける」を先に置いている
	// （autofocus 属性は Svelte の a11y 警告になるので使わない）
	function open() {
		// Esc で閉じたときは returnValue が更新されないため、前回の値を消しておく
		dialog.returnValue = '';
		dialog.showModal();
	}

	function onclose() {
		result = dialog.returnValue === 'confirm' ? 'confirm' : 'cancel';
		if (result === 'confirm') note = '';
	}
</script>

<!-- APG Alert Dialog の例にならい、メモ欄はダイアログの外のページに置き、ダイアログは確認だけにする -->
<div class="demo">
	<label for="{uid}-note">{text[lang].note}</label>
	<textarea id="{uid}-note" rows="2" bind:value={note}></textarea>
	<div class="row">
		<button type="button" class="btn" onclick={open}>{text[lang].open}</button>
		<p role="status">{result ? text[lang].result[result] : ''}</p>
	</div>

	<!-- role="alertdialog" で、開いたときにタイトルと本文が警告として読み上げられる -->
	<dialog bind:this={dialog} role="alertdialog" aria-labelledby="{uid}-title" aria-describedby="{uid}-body" {onclose}>
		<h2 id="{uid}-title">{text[lang].title}</h2>
		<p id="{uid}-body">{text[lang].body}</p>
		<form method="dialog" class="actions">
			<button class="btn" value="cancel">{text[lang].cancel}</button>
			<button class="btn btn-primary" value="confirm">{text[lang].confirm}</button>
		</form>
	</dialog>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 20rem);
	}

	label {
		font-weight: 700;
	}

	textarea {
		padding: 0.4em 0.6em;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		resize: vertical;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem 0.75rem;
		margin-top: 0.25rem;
	}

	p[role='status'] {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	dialog {
		width: min(calc(100% - 2rem), 24rem);
		padding: 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
	}

	dialog::backdrop {
		background: rgb(0 0 0 / 0.4);
	}

	h2 {
		margin: 0 0 0.5rem;
		font-size: 1.125rem;
	}

	dialog p {
		margin: 0;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-top: 1rem;
	}
</style>
