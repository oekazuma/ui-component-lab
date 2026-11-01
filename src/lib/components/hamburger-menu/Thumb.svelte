<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			site: 'Sample City',
			open: 'Menu',
			close: 'Close',
			links: ['Home', 'News', 'Services', 'Contact']
		},
		ja: {
			site: 'サンプル市',
			open: 'メニュー',
			close: '閉じる',
			links: ['ホーム', 'お知らせ', '手続き', 'お問い合わせ']
		}
	};
</script>

<!-- 一覧のサムネイル専用の、メニューが開いている状態の絵。本物の <dialog> は最上層に出て枠に収まらないので、
	小さなページの枠の中に、ヘッダーと暗くした背景とメニューのパネルを重ねて描く。
	メニューボタンが見えるよう、パネルはヘッダーの下から始める -->
<div class="page" data-preview>
	<div class="header">
		<span class="site">{text[lang].site}</span>
		<span class="btn hamburger">
			<svg viewBox="0 0 24 24"><path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" /></svg>
			{text[lang].open}
		</span>
	</div>
	<!-- 暗くする色はデモの dialog.in-frame の背景（src/app.css）と同じにする。トークンはどれもダークモードで明るい色に変わり、背景が暗くならないため -->
	<div class="backdrop"></div>
	<div class="panel">
		<span class="head">
			<span class="btn hamburger">
				<svg viewBox="0 0 24 24"><path d="M6.4 19 5 17.6 10.6 12 5 6.4 6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4Z" /></svg>
				{text[lang].close}
			</span>
		</span>
		<ul>
			{#each text[lang].links as link (link)}
				<li>{link}</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.page {
		display: grid;
		grid-template-rows: auto 1fr;
		width: min(100%, 26rem);
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.header {
		display: flex;
		grid-area: 1 / 1;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.25rem 0.25rem 0.25rem 0.75rem;
		border-bottom: 1px solid var(--color-border);
	}

	.backdrop {
		grid-area: 1 / 1 / 3 / 2;
		background: rgb(0 0 0 / 0.4);
	}

	.panel {
		grid-area: 2 / 1;
		justify-self: end;
		width: 15rem;
		padding: 0.25rem 1rem 0.5rem;
		border-left: 1px solid var(--color-border);
		background: var(--color-bg);
	}

	.site {
		font-weight: 700;
	}

	.hamburger {
		border-color: transparent;
		background: transparent;
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;
		fill: currentcolor;
	}

	.head {
		display: flex;
		justify-content: flex-end;
	}

	ul {
		margin: 0.25rem 0 0;
		padding: 0;
		list-style: none;
	}

	li + li {
		border-top: 1px solid var(--color-border);
	}

	li {
		padding: 0.5rem 0.25rem;
		color: var(--color-accent);
	}
</style>
