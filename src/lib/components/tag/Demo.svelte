<script lang="ts">
	import { tick } from 'svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			notices: 'Notices',
			items: [
				['Childcare subsidy', 'Open'],
				['Bicycle parking permit', 'Closed']
			],
			topics: 'Topics',
			topicNames: ['Childcare', 'Health', 'Taxes'],
			label: 'Active filters',
			tags: ['Red', 'Size M', 'Under $50'],
			remove: (t: string) => `Remove ${t}`,
			none: 'No filters'
		},
		ja: {
			notices: 'お知らせ',
			items: [
				['子育て支援金', '受付中'],
				['駐輪場の利用許可', '受付終了']
			],
			topics: '分野',
			topicNames: ['子育て', '健康', '税金'],
			label: '適用中の絞り込み',
			tags: ['赤', 'Mサイズ', '5,000円以下'],
			remove: (t: string) => `${t}を外す`,
			none: '絞り込みなし'
		}
	};

	const uid = $props.id();
	let selected = $state(text.en.topicNames.map(() => false));
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

<div class="demo">
	<!-- 表示だけのチップラベル。状態はすでに決まっているものを示すだけなので、操作できる要素にしない -->
	<p id="{uid}-notices" class="heading">{text[lang].notices}</p>
	<ul class="notices" aria-labelledby="{uid}-notices">
		{#each text[lang].items as [title, status], i (title)}
			<li>
				{title}
				<span class="chip-label" class:open={i === 0}>{status}</span>
			</li>
		{/each}
	</ul>

	<!-- 選べるタグは aria-pressed のトグルボタン。押されているかどうかはブラウザが読み上げる -->
	<p id="{uid}-topics" class="heading">{text[lang].topics}</p>
	<div class="tags" role="group" aria-labelledby="{uid}-topics">
		{#each text[lang].topicNames as name, i (name)}
			<button type="button" class="toggle" aria-pressed={selected[i]} onclick={() => (selected[i] = !selected[i])}>
				<!-- 色だけで選択を示さないよう、チェックの印も添える -->
				{#if selected[i]}<span aria-hidden="true">✓</span>{/if}{name}
			</button>
		{/each}
	</div>

	<p id="{uid}-filters" class="heading">{text[lang].label}</p>
	<ul class="tags" bind:this={list} aria-labelledby="{uid}-filters" tabindex="-1">
		{#each kept as k, i (k)}
			<li class="tag">
				{text[lang].tags[k]}
				<button type="button" aria-label={text[lang].remove(text[lang].tags[k])} onclick={() => remove(i)}>
					<span aria-hidden="true">×</span>
				</button>
			</li>
		{:else}
			<li class="tag none">{text[lang].none}</li>
		{/each}
	</ul>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.4rem;
		width: min(100%, 20rem);
	}

	.heading {
		margin: 0.4rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.notices li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		font-size: 0.875rem;
	}

	.chip-label {
		flex: none;
		padding: 0 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: var(--color-bg);
		color: var(--color-muted);
		font-size: 0.8125rem;
		font-weight: 700;
	}

	.chip-label.open {
		border-color: currentcolor;
		background: var(--color-success-surface);
		color: var(--color-success-on-surface);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		min-height: 2rem;
		padding: 0 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-bg);
		font-size: 0.875rem;
		cursor: pointer;
	}

	.toggle:hover {
		background: var(--color-surface);
	}

	.toggle[aria-pressed='true'] {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	.toggle[aria-pressed='true']:hover {
		background: var(--color-accent-hover);
	}

	.tag {
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

	.tag button {
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

	.tag button:hover {
		background: var(--color-surface);
	}
</style>
