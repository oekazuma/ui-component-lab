<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			open: 'Delete file…',
			title: 'Delete this file?',
			body: 'This action cannot be undone.',
			cancel: 'Cancel',
			confirm: 'Delete',
			result: { cancel: 'Canceled', confirm: 'Deleted' }
		},
		ja: {
			open: 'ファイルを削除…',
			title: 'このファイルを削除しますか？',
			body: 'この操作は取り消せません。',
			cancel: 'キャンセル',
			confirm: '削除',
			result: { cancel: 'キャンセルしました', confirm: '削除しました' }
		}
	};

	const uid = $props.id();
	let dialog: HTMLDialogElement;
	let result = $state<'cancel' | 'confirm'>();

	// ネイティブの <dialog> の showModal() が、背景の操作無効化・Esc で閉じる・フォーカス復帰を担う
	function open() {
		// Esc で閉じたときは returnValue が更新されないため、前回の値を消しておく
		dialog.returnValue = '';
		dialog.showModal();
	}
</script>

<div class="demo">
	<button type="button" class="btn" onclick={open}>{text[lang].open}</button>
	<p role="status">{result ? text[lang].result[result] : ''}</p>

	<dialog
		bind:this={dialog}
		aria-labelledby="{uid}-title"
		aria-describedby="{uid}-body"
		onclose={() => (result = dialog.returnValue === 'confirm' ? 'confirm' : 'cancel')}
	>
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
</style>
