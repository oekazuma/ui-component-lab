<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			open: 'Discard changes…',
			title: 'Discard unsaved changes?',
			body: 'Your edits to this note will be lost.',
			cancel: 'Keep editing',
			confirm: 'Discard',
			result: { cancel: 'Kept editing', confirm: 'Discarded' }
		},
		ja: {
			open: '変更を破棄…',
			title: '保存していない変更を破棄しますか？',
			body: 'このメモへの編集内容は失われます。',
			cancel: '編集を続ける',
			confirm: '破棄',
			result: { cancel: '編集を続けます', confirm: '破棄しました' }
		}
	};

	const uid = $props.id();
	let dialog: HTMLDialogElement;
	let result = $state<'cancel' | 'confirm'>();

	// ネイティブの <dialog> の showModal() が、背景の操作無効化・Esc で閉じる・フォーカス復帰を担う。
	// showModal() は最初のフォーカス可能な要素にフォーカスを移すため、最も安全な「編集を続ける」を先に置いている
	// （autofocus 属性は Svelte の a11y 警告になるので使わない）
	function open() {
		// Esc で閉じたときは returnValue が更新されないため、前回の値を消しておく
		dialog.returnValue = '';
		dialog.showModal();
	}
</script>

<div class="demo">
	<button type="button" class="btn" onclick={open}>{text[lang].open}</button>
	<p role="status">{result ? text[lang].result[result] : ''}</p>

	<!-- role="alertdialog" で、開いたときにタイトルと本文が警告として読み上げられる -->
	<dialog
		bind:this={dialog}
		role="alertdialog"
		aria-labelledby="{uid}-title"
		aria-describedby="{uid}-body"
		onclose={() => (result = dialog.returnValue === 'confirm' ? 'confirm' : 'cancel')}
	>
		<h2 id="{uid}-title">{text[lang].title}</h2>
		<p id="{uid}-body">{text[lang].body}</p>
		<form method="dialog" class="actions">
			<button class="btn" value="cancel">{text[lang].cancel}</button>
			<button class="btn danger" value="confirm">{text[lang].confirm}</button>
		</form>
	</dialog>
</div>

<style>
	.demo {
		text-align: center;
	}

	p[role='status'] {
		min-height: 1.6em;
		margin: 0.75rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	dialog {
		width: min(calc(100% - 2rem), 24rem);
		padding: 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		text-align: left;
	}

	dialog::backdrop {
		background: rgb(0 0 0 / 0.4);
	}

	h2 {
		margin: 0 0 0.5rem;
		font-size: 1.125rem;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.danger {
		border-color: var(--color-danger);
		background: var(--color-danger);
		color: var(--color-danger-text);
	}
</style>
