<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			caption: 'Plan prices',
			headers: ['Plan', 'Price / month', 'Storage'],
			rows: [
				['Free', 0, '5 GB'],
				['Team', 12, '1 TB'],
				['Personal', 4, '100 GB']
			] as const,
			price: (n: number) => `$${n}`
		},
		ja: {
			caption: 'プランの料金',
			headers: ['プラン', '月額', '容量'],
			rows: [
				['無料', 0, '5 GB'],
				['チーム', 1800, '1 TB'],
				['個人', 600, '100 GB']
			] as const,
			price: (n: number) => `${n.toLocaleString('ja-JP')}円`
		}
	};

	let sort = $state<'none' | 'ascending' | 'descending'>('none');
	let rows = $derived(
		sort === 'none'
			? text[lang].rows
			: text[lang].rows.toSorted((a, b) => (sort === 'ascending' ? a[1] - b[1] : b[1] - a[1]))
	);
</script>

<!-- ネイティブの <table>。並べ替えできる列は見出しの中のボタンで切り替え、状態を aria-sort で伝える -->
<table>
	<caption>{text[lang].caption}</caption>
	<thead>
		<tr>
			<th scope="col">{text[lang].headers[0]}</th>
			<th scope="col" aria-sort={sort}>
				<button
					type="button"
					onclick={() => (sort = sort === 'ascending' ? 'descending' : 'ascending')}
				>
					{text[lang].headers[1]}
					<span aria-hidden="true">{sort === 'ascending' ? '▲' : sort === 'descending' ? '▼' : '↕'}</span>
				</button>
			</th>
			<th scope="col">{text[lang].headers[2]}</th>
		</tr>
	</thead>
	<tbody>
		{#each rows as [plan, price, storage] (plan)}
			<tr>
				<th scope="row">{plan}</th>
				<td class="num">{text[lang].price(price)}</td>
				<td class="num">{storage}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	caption {
		margin-bottom: 0.25rem;
		font-weight: 700;
		text-align: left;
	}

	th,
	td {
		padding: 0.3rem 0.6rem;
		border-bottom: 1px solid var(--color-border);
		text-align: left;
	}

	thead th {
		border-bottom-width: 2px;
	}

	tbody th {
		font-weight: 400;
	}

	.num {
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	th button {
		display: inline-flex;
		gap: 0.25em;
		padding: 0;
		border: 0;
		background: none;
		font-weight: 700;
		cursor: pointer;
	}
</style>
