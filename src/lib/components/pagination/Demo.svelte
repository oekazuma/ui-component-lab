<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Pagination',
			prev: 'Previous',
			next: 'Next',
			page: (n: number) => `Page ${n}`,
			showing: (from: number, to: number) => `Showing results ${from}–${to} of 40`
		},
		ja: {
			label: 'ページ送り',
			prev: '前へ',
			next: '次へ',
			page: (n: number) => `${n}ページ`,
			showing: (from: number, to: number) => `全40件中 ${from}〜${to}件を表示`
		}
	};
	const pages = [1, 2, 3, 4];

	let current = $state(1);
</script>

<!-- 同じ画面の中身を入れ替えるデモなので、リンクではなくボタンで現在のページを切り替える。
	端で「前へ」「次へ」を disabled にするとフォーカスが失われるため、aria-disabled にとどめる -->
<div class="demo">
	<p aria-live="polite">{text[lang].showing(current * 10 - 9, current * 10)}</p>
	<nav aria-label={text[lang].label}>
		<button
			type="button"
			class="btn"
			aria-disabled={current === 1}
			onclick={() => current > 1 && current--}
		>
			<span aria-hidden="true">‹</span>
			{text[lang].prev}
		</button>
		{#each pages as n (n)}
			<button
				type="button"
				class="btn"
				aria-label={text[lang].page(n)}
				aria-current={n === current ? 'page' : undefined}
				onclick={() => (current = n)}
			>
				{n}
			</button>
		{/each}
		<button
			type="button"
			class="btn"
			aria-disabled={current === pages.length}
			onclick={() => current < pages.length && current++}
		>
			{text[lang].next}
			<span aria-hidden="true">›</span>
		</button>
	</nav>
</div>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 0.5rem;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.25rem;
	}

	.btn {
		padding-inline: 0.6em;
	}

	[aria-current='page'] {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	.btn[aria-disabled='true'] {
		color: var(--color-muted);
		cursor: not-allowed;
		opacity: 0.6;
	}

	p {
		margin: 0;
		font-size: 0.875rem;
	}
</style>
