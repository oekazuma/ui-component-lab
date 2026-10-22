<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { menus: ['File', 'Edit', 'View'], items: ['New', 'Open…', 'Save'] },
		ja: { menus: ['ファイル', '編集', '表示'], items: ['新規作成', '開く…', '保存'] }
	};
</script>

<!-- 一覧のサムネイル専用の、メニューバーの「ファイル」を開いた状態の絵。操作はしないので、状態もイベントも持たない。
	枠の高さで縮める倍率が決まるため、サブメニューは絶対配置にせず通常の流れに置く。左端の項目を開くので位置も合う -->
<div class="wrap" data-preview>
	<ul class="bar">
		{#each text[lang].menus as name, i (name)}
			<li class:open={i === 0}>{name}</li>
		{/each}
	</ul>
	<ul class="menu">
		{#each text[lang].items as item, i (item)}
			<li class:active={i === 0}>{item}</li>
		{/each}
	</ul>
</div>

<style>
	.wrap {
		display: grid;
		justify-items: start;
		gap: 0.25rem;
		width: min(100%, 22rem);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		min-height: 2.75rem;
		padding: 0.3em 0.9em;
		white-space: nowrap;
	}

	.bar {
		display: flex;
		justify-self: stretch;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.open,
	.active {
		background: var(--color-surface);
	}

	.menu {
		min-width: 8rem;
		padding: 0.25rem 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
	}
</style>
