<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Featured trips',
			prev: 'Previous slide',
			next: 'Next slide',
			of: (n: number, total: number) => `${n} of ${total}`,
			slides: ['Mountain hiking', 'Island hopping', 'City food tour']
		},
		ja: {
			label: 'おすすめの旅',
			prev: '前のスライド',
			next: '次のスライド',
			of: (n: number, total: number) => `${total}枚中${n}枚目`,
			slides: ['山歩き', '島めぐり', '街の食べ歩き']
		}
	};
	const colors = ['#d8e8d4', '#d4e4f0', '#f3e2cf'];

	let current = $state(0);
	let total = $derived(text[lang].slides.length);
</script>

<!-- APG Carousel（自動再生なし）: 前後のボタンで1枚ずつ切り替え、切り替えを aria-live で伝える -->
<section class="carousel" aria-roledescription="carousel" aria-label={text[lang].label}>
	<div class="slides" aria-live="polite">
		{#each text[lang].slides as slide, i (slide)}
			<div
				role="group"
				aria-roledescription="slide"
				aria-label={text[lang].of(i + 1, total)}
				hidden={i !== current}
				style:background={colors[i]}
			>
				{slide}
			</div>
		{/each}
	</div>
	<div class="controls">
		<button type="button" class="btn" aria-label={text[lang].prev} onclick={() => (current = (current - 1 + total) % total)}>
			<span aria-hidden="true">‹</span>
		</button>
		<span class="dots" aria-hidden="true">
			{#each text[lang].slides as slide, i (slide)}
				<span class:active={i === current}></span>
			{/each}
		</span>
		<button type="button" class="btn" aria-label={text[lang].next} onclick={() => (current = (current + 1) % total)}>
			<span aria-hidden="true">›</span>
		</button>
	</div>
</section>

<style>
	.carousel {
		width: min(100%, 16rem);
	}

	[role='group'] {
		display: grid;
		place-items: center;
		height: 6rem;
		border-radius: var(--radius);
		color: #1b1d22;
		font-weight: 700;
	}

	[role='group'][hidden] {
		display: none;
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.5rem;
	}

	.dots {
		display: flex;
		gap: 0.4rem;
	}

	.dots span {
		width: 0.5rem;
		height: 0.5rem;
		border: 1px solid var(--color-muted);
		border-radius: 50%;
	}

	.dots .active {
		background: var(--color-muted);
	}
</style>
