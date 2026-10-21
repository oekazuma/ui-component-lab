<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const max = 5;
	const text = {
		en: {
			legend: 'Rate this recipe',
			none: 'No rating',
			star: (n: number) => `${n} ${n === 1 ? 'star' : 'stars'}`,
			value: (n: number) => `${n} out of ${max} stars`
		},
		ja: {
			legend: 'このレシピの評価',
			none: '評価なし',
			star: (n: number) => `星${n}つ`,
			value: (n: number) => `${max}段階中の${n}`
		}
	};

	const uid = $props.id();
	let value = $state(0);
	let hovered = $state<number | null>(null);
	let shown = $derived(hovered ?? value);
</script>

<!-- W3C WAI の Custom Controls の例と MUI Rating に倣い、見えないネイティブのラジオボタンで作る。
	矢印キーでの移動と選択、Tab で 1 か所として扱うことはブラウザが受け持つ。
	ラジオは一度選ぶと外せないので、0 の「評価なし」を最初に選んだ状態で置き、戻せるようにする -->
<fieldset>
	<legend>{text[lang].legend}</legend>
	<div class="stars">
		{#each { length: max + 1 }, n (n)}
			<label class:none={n === 0} onpointerenter={() => n && (hovered = n)} onpointerleave={() => (hovered = null)}>
				<input type="radio" class="visually-hidden" name="{uid}-rating" value={n} bind:group={value} />
				<span class="visually-hidden">{n ? text[lang].star(n) : text[lang].none}</span>
				{#if n}
					<!-- 色だけでなく形（★と☆）でも選んだ範囲が分かるようにする -->
					<span class="star" class:filled={n <= shown} aria-hidden="true">{n <= shown ? '★' : '☆'}</span>
				{/if}
			</label>
		{/each}
	</div>
	<p>{value ? text[lang].value(value) : text[lang].none}</p>
</fieldset>

<style>
	fieldset {
		display: grid;
		justify-items: start;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		border: 0;
	}

	legend {
		margin-bottom: 0.25rem;
		padding: 0;
		font-size: 0.875rem;
	}

	.stars {
		display: flex;
		border-radius: var(--radius);
	}

	/* 「評価なし」は見えないので、そこにフォーカスがあるときは星の並び全体に枠を出す */
	.stars:has(.none :focus-visible),
	label:not(.none):has(:focus-visible) {
		outline: 2px solid var(--color-focus-outer);
		outline-offset: 2px;
		box-shadow: 0 0 0 2px var(--color-focus-inner);
	}

	label {
		position: relative;
		border-radius: var(--radius);
		cursor: pointer;
	}

	.star {
		display: block;
		padding: 0 0.1em;
		color: var(--color-muted);
		font-size: 2rem;
		line-height: 1;
	}

	.filled {
		color: var(--color-accent);
	}

	p {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
