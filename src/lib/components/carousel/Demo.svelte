<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			heading: 'Upcoming events',
			choose: 'Choose a slide',
			slide: 'Slide ',
			prev: 'Previous slide',
			next: 'Next slide',
			of: (n: number, total: number) => `Slide ${n} of ${total}`,
			more: 'Learn more',
			all: 'All slides',
			slides: [
				['Recycling workshop', 'Third Saturday of every other month'],
				['Local food fair', 'Weekends, April to July'],
				['Historic sites stamp rally', 'Until November 30'],
				['Group health checkups', 'Applications open June 1']
			]
		},
		ja: {
			heading: '開催中のイベント',
			choose: 'スライド選択',
			slide: 'スライド',
			prev: '前のスライド',
			next: '次のスライド',
			of: (n: number, total: number) => `${total}枚中${n}枚目`,
			more: '詳しく見る',
			all: 'すべてのスライド',
			slides: [
				['リサイクル工作教室', '偶数月の第3土曜日'],
				['地産地消フェア', '4月から7月の毎週末'],
				['歴史名所スタンプラリー', '11月30日まで'],
				['合同健康診断', '6月1日から受付']
			]
		}
	};

	const uid = $props.id();
	let current = $state(0);
	let tabEls: HTMLButtonElement[] = $state([]);
	let slides = $derived(text[lang].slides);
	let total = $derived(slides.length);
	// DADS の「すべてのスライド」と同じく、表示中の次から一周する順に並べ、表示中のものは除く
	let others = $derived([...slides.keys()].slice(current + 1).concat([...slides.keys()].slice(0, current)));

	// WAI-ARIA APG Carousel（タブ付き）: 番号のボタンは Tabs の自動アクティベーションに従い、矢印キーで移動と同時に選ぶ
	function onkeydown(e: KeyboardEvent) {
		const next = {
			ArrowRight: (current + 1) % total,
			ArrowLeft: (current - 1 + total) % total,
			Home: 0,
			End: total - 1
		}[e.key];
		if (next === undefined) return;
		e.preventDefault();
		current = next;
		tabEls[next].focus();
	}
</script>

{#snippet body(i: number, headingId?: string)}
	<h4 id={headingId}>{slides[i][0]}</h4>
	<p class="period">{slides[i][1]}</p>
	<a href="#{uid}-heading" onclick={(e) => e.preventDefault()}>
		{text[lang].more}<span class="visually-hidden">: {slides[i][0]}</span>
	</a>
{/snippet}

<!-- 名前の付いた <section> が region になる。aria-roledescription は APG に従い「carousel」と読ませる -->
<section class="carousel" aria-labelledby="{uid}-heading" aria-roledescription="carousel">
	<h3 id="{uid}-heading">{text[lang].heading}</h3>
	<!-- 自動再生しないので polite。前後のボタンを押してもフォーカスは動かないため、新しいスライドはここで伝える -->
	<div class="slides" id="{uid}-slides" aria-live="polite" aria-atomic="false">
		{#each slides as [title], i (title)}
			<div
				class="slide"
				role="tabpanel"
				id="{uid}-slide-{i}"
				aria-labelledby="{uid}-title-{i}"
				hidden={i !== current}
			>
				{@render body(i, `${uid}-title-${i}`)}
			</div>
		{/each}
	</div>
	<div class="controls">
		<div role="tablist" aria-label={text[lang].choose}>
			{#each slides as [title], i (title)}
				<button
					bind:this={tabEls[i]}
					type="button"
					class="btn"
					role="tab"
					aria-selected={i === current}
					aria-controls="{uid}-slide-{i}"
					tabindex={i === current ? 0 : -1}
					onclick={() => (current = i)}
					{onkeydown}
				>
					<span class="visually-hidden">{text[lang].slide}</span>{i + 1}
				</button>
			{/each}
		</div>
		<div class="pager">
			<button
				type="button"
				class="btn"
				aria-label={text[lang].prev}
				aria-controls="{uid}-slides"
				onclick={() => (current = (current - 1 + total) % total)}
			>
				<span aria-hidden="true">‹</span>
			</button>
			<span aria-hidden="true">{current + 1} / {total}</span>
			<span class="visually-hidden">{text[lang].of(current + 1, total)}</span>
			<button
				type="button"
				class="btn"
				aria-label={text[lang].next}
				aria-controls="{uid}-slides"
				onclick={() => (current = (current + 1) % total)}
			>
				<span aria-hidden="true">›</span>
			</button>
		</div>
	</div>
	<details>
		<summary>{text[lang].all}</summary>
		<ul>
			{#each others as i (i)}
				<li class="slide">
					<span class="number" aria-hidden="true">{i + 1}</span>
					{@render body(i)}
				</li>
			{/each}
		</ul>
	</details>
</section>

<style>
	.carousel {
		width: min(100%, 32rem);
	}

	h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
	}

	h4 {
		margin: 0;
		font-size: 1.125rem;
		line-height: 1.4;
	}

	/* 画像の代わりに、上辺の帯と余白で横長のお知らせに見せる */
	.slide {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 0.25rem;
		aspect-ratio: 2 / 1;
		padding: 1rem 1.25rem;
		border: 1px solid var(--color-border);
		border-top: 6px solid var(--color-accent);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.slide[hidden] {
		display: none;
	}

	.period {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	/* 押せる範囲を縦にも広げて 24 × 24 CSS px 以上にする（WCAG 2.5.8） */
	a {
		display: inline-block;
		padding-block: 0.25rem;
		font-size: 0.9375rem;
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	[role='tablist'],
	.pager {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.pager {
		gap: 0.5rem;
		font-variant-numeric: tabular-nums;
	}

	[role='tab'] {
		padding: 0;
	}

	[role='tab'][aria-selected='true'] {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: var(--color-accent-text);
		font-weight: 700;
	}

	details {
		margin-top: 0.5rem;
	}

	summary {
		color: var(--color-accent);
		cursor: pointer;
	}

	ul {
		display: grid;
		gap: 0.5rem;
		margin: 0.5rem 0 0;
		padding: 0;
		list-style: none;
	}

	ul .slide {
		aspect-ratio: auto;
		padding-left: 3rem;
	}

	.number {
		position: absolute;
		top: 0.75rem;
		left: 1rem;
		color: var(--color-muted);
		font-weight: 700;
	}
</style>
