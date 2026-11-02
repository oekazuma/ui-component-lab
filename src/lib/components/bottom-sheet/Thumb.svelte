<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { open: 'Show store details', title: 'Riverside Store', hours: 'Open until 8:00 PM', address: '3-4 Riverside, Chuo-ku', close: 'Close' },
		ja: { open: '店舗の詳細を表示', title: 'リバーサイド店', hours: '20:00まで営業', address: '中央区リバーサイド3-4', close: '閉じる' }
	};
</script>

<!-- 一覧のサムネイル専用の、ボトムシートが開いている状態の絵。本物の <dialog> は最上層に出て枠に収まらないので、
	小さなページの枠の中に、暗くした背景と下端のシートを重ねて描く -->
<div class="page" data-preview>
	<div class="behind"><span class="btn">{text[lang].open}</span></div>
	<!-- 暗くする色はデモの dialog.in-frame の背景（src/app.css）と同じにする。トークンはどれもダークモードで明るい色に変わり、背景が暗くならないため -->
	<div class="backdrop">
		<div class="sheet">
			<span class="grip"></span>
			<div class="head">
				<strong>{text[lang].title}</strong>
				<span class="btn">{text[lang].close}</span>
			</div>
			<span>{text[lang].hours}</span>
			<span>{text[lang].address}</span>
		</div>
	</div>
</div>

<style>
	.page {
		display: grid;
		width: min(100%, 26rem);
		min-height: 11rem;
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
		align-items: flex-end;
		background: rgb(0 0 0 / 0.4);
	}

	.sheet {
		display: grid;
		width: 100%;
		padding: 0.5rem 1rem 0.75rem;
		border-top: 1px solid var(--color-border);
		border-radius: 1.25rem 1.25rem 0 0;
		background: var(--color-bg);
	}

	.grip {
		justify-self: center;
		width: 2rem;
		height: 0.25rem;
		margin-bottom: 0.25rem;
		border-radius: 0.125rem;
		background: var(--color-muted);
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	strong {
		font-size: 1.125rem;
	}
</style>
