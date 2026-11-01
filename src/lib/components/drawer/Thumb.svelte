<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			open: 'Filters',
			title: 'Filters',
			options: ['In stock', 'Free shipping', 'On sale'],
			close: 'Close',
			apply: 'Apply'
		},
		ja: {
			open: '絞り込み',
			title: '絞り込み',
			options: ['在庫あり', '送料無料', 'セール中'],
			close: '閉じる',
			apply: '適用'
		}
	};
</script>

<!-- 一覧のサムネイル専用の、ドロワーが開いている状態の絵。本物の <dialog> は最上層に出て枠に収まらないので、
	小さなページの枠の中に、暗くした背景と右端のパネルを重ねて描く -->
<div class="page" data-preview>
	<div class="behind"><span class="btn">{text[lang].open}</span></div>
	<!-- 暗くする色はデモの dialog.in-frame の背景（src/app.css）と同じにする。トークンはどれもダークモードで明るい色に変わり、背景が暗くならないため -->
	<div class="backdrop">
		<div class="panel">
			<div class="head">
				<strong>{text[lang].title}</strong>
				<span class="btn">{text[lang].close}</span>
			</div>
			{#each text[lang].options as option (option)}
				<span class="option"><span class="box"></span>{option}</span>
			{/each}
			<div class="foot"><span class="btn btn-primary">{text[lang].apply}</span></div>
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
		display: flex;
		justify-content: flex-end;
		background: rgb(0 0 0 / 0.4);
	}

	.panel {
		display: grid;
		width: 15rem;
		padding: 1rem;
		border-left: 1px solid var(--color-border);
		background: var(--color-bg);
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	strong {
		font-size: 1.125rem;
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.4em;
		padding: 0.25rem 0;
	}

	.box {
		width: 1em;
		height: 1em;
		border: 1px solid var(--color-muted);
		border-radius: 2px;
	}

	.foot {
		display: flex;
		justify-content: flex-end;
		margin-top: 0.75rem;
	}
</style>
