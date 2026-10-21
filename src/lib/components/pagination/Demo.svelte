<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// nav のラベルは「ナビゲーション」と重ねて読まれるので、部品名ではなく何のページかを書く（DADS 実装）
	const text = {
		en: {
			label: 'Search results',
			prev: 'Previous',
			next: 'Next',
			page: (n: number) => `Page ${n}`,
			showing: (from: number, to: number) => `Showing results ${from}–${to} of 100`
		},
		ja: {
			label: '検索結果',
			prev: '前へ',
			next: '次へ',
			page: (n: number) => `${n}ページ`,
			showing: (from: number, to: number) => `全100件中 ${from}〜${to}件を表示`
		}
	};
	const total = 10;

	let current = $state(1);
	// 最初と最後、今のページの前後だけを出し、間は「…」にする（GOV.UK Pagination）
	const shown = $derived(
		Array.from({ length: total }, (_, i) => i + 1).filter(
			(n) => n === 1 || n === total || Math.abs(n - current) <= 1
		)
	);
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
		<ul>
			{#each shown as n, i (n)}
				{#if i > 0 && n - shown[i - 1] > 1}
					<li class="gap">…</li>
				{/if}
				<li>
					<button
						type="button"
						class="btn"
						aria-label={text[lang].page(n)}
						aria-current={n === current ? 'page' : undefined}
						onclick={() => (current = n)}
					>
						{n}
					</button>
				</li>
			{/each}
		</ul>
		<button
			type="button"
			class="btn"
			aria-disabled={current === total}
			onclick={() => current < total && current++}
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

	nav,
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.gap {
		color: var(--color-muted);
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
