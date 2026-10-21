<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Storage used',
			add: 'Add 10 GB',
			remove: 'Delete 10 GB',
			amount: (n: number) => `${n} GB of 100 GB`,
			almostFull: 'Almost full',
			full: 'Full'
		},
		ja: {
			label: 'ストレージ使用量',
			add: '10GB 追加',
			remove: '10GB 削除',
			amount: (n: number) => `${n}GB / 100GB`,
			almostFull: 'もうすぐいっぱいです',
			full: 'いっぱいです'
		}
	};

	const uid = $props.id();
	let used = $state(40);
	// low を超えてブラウザが色を変えるのと同じ所で、状態を言葉でも示す
	let level = $derived(used >= 100 ? text[lang].full : used > 70 ? text[lang].almostFull : '');
</script>

<!-- <meter> は範囲の中の現在値を示す。low / high を超えるとブラウザが色を黄や赤に変える。
	読み上げは割合になるため、見えている容量と状態の文を aria-describedby で結ぶ。ボタンで変えたときに伝わるよう、文は role="status" に置く -->
<div class="demo">
	<label for="{uid}-meter">{text[lang].label}</label>
	<meter
		id="{uid}-meter"
		min="0"
		max="100"
		low="70"
		high="90"
		optimum="0"
		value={used}
		aria-describedby="{uid}-desc">{used}%</meter
	>
	<p id="{uid}-desc" role="status">
		{text[lang].amount(used)}
		{#if level}<strong>{level}</strong>{/if}
	</p>
	<div class="buttons">
		<button type="button" class="btn" onclick={() => (used = Math.max(0, used - 10))}>
			{text[lang].remove}
		</button>
		<button type="button" class="btn" onclick={() => (used = Math.min(100, used + 10))}>
			{text[lang].add}
		</button>
	</div>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 18rem);
	}

	label {
		font-size: 0.875rem;
	}

	meter {
		width: 100%;
		height: 1.25rem;
	}

	p {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	strong {
		margin-left: 0.25em;
		color: var(--color-text);
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
</style>
