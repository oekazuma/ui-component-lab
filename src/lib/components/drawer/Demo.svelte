<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { open: 'Open filters', title: 'Filters', options: ['In stock', 'Free shipping', 'On sale'], close: 'Close' },
		ja: { open: '絞り込みを開く', title: '絞り込み', options: ['在庫あり', '送料無料', 'セール中'], close: '閉じる' }
	};

	const uid = $props.id();
	let dialog: HTMLDialogElement;
</script>

<!-- モーダルの <dialog> を画面の端に寄せて表示する。背景の操作無効化・Esc・フォーカス復帰はブラウザが受け持つ -->
<button type="button" class="btn" onclick={() => dialog.showModal()}>{text[lang].open}</button>
<dialog bind:this={dialog} aria-labelledby="{uid}-title">
	<div class="head">
		<h2 id="{uid}-title">{text[lang].title}</h2>
		<form method="dialog">
			<button class="btn">{text[lang].close}</button>
		</form>
	</div>
	{#each text[lang].options as option (option)}
		<label><input type="checkbox" />{option}</label>
	{/each}
</dialog>

<style>
	dialog {
		width: min(calc(100% - 3rem), 18rem);
		max-width: none;
		height: 100%;
		max-height: none;
		margin: 0 0 0 auto;
		padding: 1rem;
		border: 0;
		border-left: 1px solid var(--color-border);
	}

	dialog[open] {
		animation: slide-in 0.2s ease-out;
	}

	@keyframes slide-in {
		from {
			translate: 100% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		dialog[open] {
			animation: none;
		}
	}

	dialog::backdrop {
		background: rgb(0 0 0 / 0.4);
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	h2 {
		margin: 0;
		font-size: 1.125rem;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.4em;
		padding: 0.25rem 0;
	}

	input {
		accent-color: var(--color-accent);
	}
</style>
