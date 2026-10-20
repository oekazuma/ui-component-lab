<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: [
			['Meeting notes', 'Edited 5 minutes ago'],
			['Travel plan', 'Edited yesterday'],
			['Recipes', 'Edited last week']
		],
		ja: [
			['会議メモ', '5分前に編集'],
			['旅行の計画', '昨日編集'],
			['レシピ集', '先週編集']
		]
	};
	const icons = ['📝', '✈️', '🍳'];
</script>

<!-- ネイティブの <ul> は項目数を支援技術に伝える。各項目は主な文と補足の文の2行 -->
<ul>
	{#each text[lang] as [title, meta], i (title)}
		<li>
			<span class="icon" aria-hidden="true">{icons[i]}</span>
			<span class="lines">
				<span>{title}</span>
				<span class="meta">{meta}</span>
			</span>
		</li>
	{/each}
</ul>

<style>
	ul {
		width: min(100%, 16rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.25rem;
		border-bottom: 1px solid var(--color-border);
	}

	li:last-child {
		border-bottom: 0;
	}

	.icon {
		display: grid;
		flex: none;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.lines {
		display: grid;
		line-height: 1.35;
	}

	.meta {
		color: var(--color-muted);
		font-size: 0.8125rem;
	}
</style>
