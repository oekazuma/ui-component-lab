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
</script>

<!-- 一覧のサムネイル専用の、ダイアログが開いている状態の絵。本物の <dialog> は最上層に出て枠に収まらないので、
	小さなページの枠の中に、暗くした背景と箱を重ねて描く -->
<div class="page" data-preview>
	<div class="behind"><span class="btn">{text[lang].open}</span></div>
	<!-- 暗くする色はデモの `dialog.in-frame` の背景（`src/app.css`）と同じにする。トークンはどれもダークモードで明るい色に変わり、背景が暗くならないため -->
	<div class="backdrop">
		<div class="dialog">
			<strong>{text[lang].title}</strong>
			<span class="number">{text[lang].number}</span>
			<span>{text[lang].body}</span>
			<span class="actions"><span class="btn">{text[lang].close}</span></span>
		</div>
	</div>
</div>

<style>
	.page {
		display: grid;
		width: min(100%, 26rem);
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.page > * {
		grid-area: 1 / 1;
	}

	.behind {
		padding: 1rem;
	}

	.backdrop {
		display: grid;
		place-items: center;
		padding: 1.5rem 1rem;
		background: rgb(0 0 0 / 0.4);
	}

	.dialog {
		display: grid;
		width: min(100%, 20rem);
		padding: 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	strong {
		margin-bottom: 0.5rem;
		font-size: 1.125rem;
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
