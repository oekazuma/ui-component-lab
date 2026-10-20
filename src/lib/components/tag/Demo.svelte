<script lang="ts">
	import { tick } from 'svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Active filters', tags: ['Red', 'Size M', 'Under $50'], remove: (t: string) => `Remove ${t}`, none: 'No filters' },
		ja: { label: '適用中の絞り込み', tags: ['赤', 'Mサイズ', '5,000円以下'], remove: (t: string) => `${t}を外す`, none: '絞り込みなし' }
	};

	// 言語を切り替えても残っているタグが変わらないよう、文字列ではなく番号で持つ
	let kept = $state(text.en.tags.map((_, i) => i));
	let list: HTMLUListElement;

	// 消したボタンにあったフォーカスを、隣のタグの削除ボタンへ移す（なければ一覧へ）
	async function remove(i: number) {
		kept.splice(i, 1);
		await tick();
		const buttons = list.querySelectorAll('button');
		(buttons[Math.min(i, buttons.length - 1)] ?? list).focus();
	}
</script>

<ul bind:this={list} aria-label={text[lang].label} tabindex="-1">
	{#each kept as k, i (k)}
		<li>
			{text[lang].tags[k]}
			<button type="button" aria-label={text[lang].remove(text[lang].tags[k])} onclick={() => remove(i)}>
				<span aria-hidden="true">×</span>
			</button>
		</li>
	{:else}
		<li class="none">{text[lang].none}</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
		padding: 0.1rem 0.2rem 0.1rem 0.6rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-bg);
		font-size: 0.875rem;
	}

	.none {
		padding-right: 0.6rem;
		color: var(--color-muted);
	}

	button {
		display: grid;
		place-items: center;
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: none;
		cursor: pointer;
	}

	button:hover {
		background: var(--color-surface);
	}
</style>
