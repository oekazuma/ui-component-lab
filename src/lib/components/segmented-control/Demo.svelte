<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			legend: 'Period',
			options: ['Day', 'Week', 'Month', 'Year'],
			figures: [
				'Steps today: 6,240',
				'Average per day this week: 7,105 steps',
				'Average per day this month: 6,880 steps',
				'Average per day this year: 7,320 steps'
			]
		},
		ja: {
			legend: '期間',
			options: ['日', '週', '月', '年'],
			figures: ['今日の歩数: 6,240 歩', '今週の 1 日平均: 7,105 歩', '今月の 1 日平均: 6,880 歩', '今年の 1 日平均: 7,320 歩']
		}
	};

	const uid = $props.id();
	let selected = $state(0);
</script>

<!-- 見た目だけを区切られたボタンの列にした、ネイティブのラジオボタン。
	矢印キーでの移動と選択、選ぶのは常に 1 つ、Tab で選択中のものへ入ることは、ブラウザが受け持つ -->
<div class="demo">
	<fieldset>
		<legend class="visually-hidden">{text[lang].legend}</legend>
		{#each text[lang].options as option, i (option)}
			<label>
				<input type="radio" class="visually-hidden" name={uid} value={i} bind:group={selected} />
				{option}
			</label>
		{/each}
	</fieldset>
	<p>{text[lang].figures[selected]}</p>
</div>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
		width: min(100%, 20rem);
	}

	fieldset {
		display: grid;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
		gap: 2px;
		width: 100%;
		margin: 0;
		padding: 2px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	label {
		display: grid;
		place-items: center;
		min-height: 2.75rem;
		border-radius: calc(var(--radius) - 2px);
		cursor: pointer;
	}

	label:hover {
		background: var(--color-surface);
	}

	label:has(:checked) {
		background: var(--color-accent);
		color: var(--color-accent-text);
		font-weight: 700;
	}

	/* 入力欄そのものは隠すので、フォーカスの枠はラベルに出す */
	label:has(:focus-visible) {
		outline: 2px solid var(--color-focus-outer);
		outline-offset: 2px;
		box-shadow: 0 0 0 2px var(--color-focus-inner);
	}

	p {
		margin: 0;
	}
</style>
