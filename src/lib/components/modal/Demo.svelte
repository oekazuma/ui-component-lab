<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			open: 'Show receipt number',
			title: 'Your receipt number',
			number: '2026-1021-0042',
			body: 'Keep this number. You will need it to check the status of your application.',
			close: 'Close'
		},
		ja: {
			open: '受付番号を表示',
			title: 'あなたの受付番号',
			number: '2026-1021-0042',
			body: '申請の状況を確かめるときに必要です。控えておいてください。',
			close: '閉じる'
		}
	};

	const uid = $props.id();
	let dialog: HTMLDialogElement;
</script>

<!-- ネイティブの <dialog> の showModal() が、背景の操作無効化・Esc で閉じる・フォーカス復帰を担う -->
<div class="demo">
	<button type="button" class="btn" onclick={() => dialog.showModal()}>{text[lang].open}</button>
</div>

<dialog bind:this={dialog} class="in-frame" aria-labelledby="{uid}-title" aria-describedby="{uid}-number {uid}-body">
	<div class="box">
		<h2 id="{uid}-title">{text[lang].title}</h2>
		<p id="{uid}-number" class="number">{text[lang].number}</p>
		<p id="{uid}-body">{text[lang].body}</p>
		<!-- 操作ボタンがないので閉じるボタンだけを置く。ボタンが1つのときは中央に置く（DADS ボタンの使い方） -->
		<form method="dialog" class="actions">
			<button class="btn">{text[lang].close}</button>
		</form>
	</div>
</dialog>

<style>
	/* 開いたダイアログが収まるだけの高さを枠に確保する */
	.demo {
		display: grid;
		place-items: center;
		min-height: 14rem;
	}

	/* 枠の中央に出す箱（枠に重ねる仕組みは app.css の .in-frame） */
	.box {
		place-self: center;
		width: min(calc(100% - 2rem), 24rem);
		padding: 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	h2 {
		margin: 0 0 0.5rem;
		font-size: 1.125rem;
	}

	p {
		margin: 0;
	}

	.number {
		margin-bottom: 0.5rem;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 1.25rem;
		font-weight: 700;
	}

	.actions {
		display: flex;
		justify-content: center;
		margin-top: 1rem;
	}
</style>
