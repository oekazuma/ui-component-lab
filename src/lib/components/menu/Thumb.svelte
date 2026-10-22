<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// null は区切り線。デモと同じ並びにする
	const text = {
		en: { trigger: 'Actions', items: ['Rename', 'Duplicate', null, 'Move to trash'] },
		ja: { trigger: '操作', items: ['名前を変更', '複製', null, 'ゴミ箱に移動'] }
	};
</script>

<!-- 一覧のサムネイル専用の、メニューを開いた状態の絵。操作はしないので、状態もイベントも持たない。
	枠の高さで縮める倍率が決まるため、パネルは絶対配置にせず通常の流れに置く -->
<div class="wrap" data-preview>
	<span class="btn">{text[lang].trigger} <span>▾</span></span>
	<ul>
		{#each text[lang].items as item, i (i)}
			{#if item === null}
				<li class="separator"></li>
			{:else}
				<li class:active={i === 0}>{item}</li>
			{/if}
		{/each}
	</ul>
</div>

<style>
	.wrap {
		display: grid;
		justify-items: start;
		gap: 0.25rem;
	}

	ul {
		min-width: 100%;
		margin: 0;
		padding: 0.25rem 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
		list-style: none;
	}

	li {
		padding: 0.3em 0.9em;
		white-space: nowrap;
	}

	.active {
		background: var(--color-surface);
	}

	.separator {
		margin: 0.25rem 0;
		padding: 0;
		border-top: 1px solid var(--color-border);
	}
</style>
