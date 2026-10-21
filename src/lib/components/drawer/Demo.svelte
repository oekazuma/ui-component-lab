<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			open: (n: number) => (n ? `Filters (${n})` : 'Filters'),
			title: 'Filters',
			options: ['In stock', 'Free shipping', 'On sale'],
			close: 'Close',
			apply: 'Apply'
		},
		ja: {
			open: (n: number) => (n ? `絞り込み（${n}件）` : '絞り込み'),
			title: '絞り込み',
			options: ['在庫あり', '送料無料', 'セール中'],
			close: '閉じる',
			apply: '適用'
		}
	};

	const uid = $props.id();
	let dialog: HTMLDialogElement;
	let applied = $state([false, false, false]);
	let draft = $state([false, false, false]);

	// 開くたびに適用済みの状態から始める。「適用」以外で閉じたときは、途中の選択を捨てる
	function open() {
		draft = [...applied];
		dialog.returnValue = '';
		dialog.showModal();
	}
</script>

<!-- モーダルの <dialog> を画面の端に寄せて表示する。背景の操作無効化・Esc・フォーカス復帰はブラウザが受け持つ。
	closedby="any" で背景のクリックでも閉じる（対応していないブラウザでは閉じるボタンと Esc だけ） -->
<button type="button" class="btn" onclick={open}>{text[lang].open(applied.filter(Boolean).length)}</button>
<dialog
	bind:this={dialog}
	closedby="any"
	aria-labelledby="{uid}-title"
	onclose={() => {
		if (dialog.returnValue === 'apply') applied = [...draft];
	}}
>
	<form method="dialog">
		<div class="head">
			<h2 id="{uid}-title">{text[lang].title}</h2>
			<button class="btn" value="close">{text[lang].close}</button>
		</div>
		{#each text[lang].options as option, i (option)}
			<label><input type="checkbox" bind:checked={draft[i]} />{option}</label>
		{/each}
		<div class="foot">
			<button class="btn btn-primary" value="apply">{text[lang].apply}</button>
		</div>
	</form>
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

	.foot {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;
	}
</style>
