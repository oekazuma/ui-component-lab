<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// 容量は並べ替えのために GB の数で持ち、表示のときに単位を付ける
	const text = {
		en: {
			caption: 'Plan prices',
			sortable: ' (column headers with buttons are sortable)',
			headers: ['Plan', 'Price / month', 'Storage'],
			rows: [
				['Free', 0, 5],
				['Team', 12, 1000],
				['Personal', 4, 200],
				['Photo', 6, 2000]
			] as const,
			price: (n: number) => `$${n}`
		},
		ja: {
			caption: 'プランの料金',
			sortable: '（ボタンのある列見出しで並べ替えられます）',
			headers: ['プラン', '月額', '容量'],
			rows: [
				['無料', 0, 5],
				['チーム', 1800, 1000],
				['個人', 600, 200],
				['フォト', 900, 2000]
			] as const,
			price: (n: number) => `${n.toLocaleString('ja-JP')}円`
		}
	};
	const storage = (gb: number) => (gb >= 1000 ? `${gb / 1000} TB` : `${gb} GB`);

	// 並べ替えるのは一度に 1 列だけ。aria-sort もその列の見出しにだけ付ける（APG Sortable Table）
	let sort = $state<{ column: 1 | 2; dir: 'ascending' | 'descending' } | null>(null);
	let rows = $derived(
		sort
			? text[lang].rows.toSorted((a, b) => (a[sort!.column] - b[sort!.column]) * (sort!.dir === 'ascending' ? 1 : -1))
			: text[lang].rows
	);

	function toggle(column: 1 | 2) {
		sort = { column, dir: sort?.column === column && sort.dir === 'ascending' ? 'descending' : 'ascending' };
	}
</script>

{#snippet header(column: 1 | 2)}
	{@const dir = sort?.column === column ? sort.dir : undefined}
	<th scope="col" class="num" aria-sort={dir}>
		<button type="button" onclick={() => toggle(column)}>
			{text[lang].headers[column]}
			<!-- 上下の三角を並べ、今の向きだけを塗る（DADS テーブル）。並べ替えていない列は両方とも線だけなので、色だけでなく形でも見分けられる -->
			<svg width="10" height="14" viewBox="0 0 10 14" aria-hidden="true">
				<path d="M5 1 9 6H1Z" fill={dir === 'ascending' ? 'currentcolor' : 'none'} stroke="currentcolor" />
				<path d="M5 13 1 8h8Z" fill={dir === 'descending' ? 'currentcolor' : 'none'} stroke="currentcolor" />
			</svg>
		</button>
	</th>
{/snippet}

<!-- ネイティブの <table>。並べ替えできる列は見出しの中のボタンで切り替える。
	ボタンで並べ替えられることは、ボタンごとに言うと繰り返しになるので caption に 1 回だけ添える -->
<table>
	<caption>{text[lang].caption}<span class="visually-hidden">{text[lang].sortable}</span></caption>
	<thead>
		<tr>
			<th scope="col">{text[lang].headers[0]}</th>
			{@render header(1)}
			{@render header(2)}
		</tr>
	</thead>
	<tbody>
		{#each rows as [plan, price, gb] (plan)}
			<tr>
				<th scope="row">{plan}</th>
				<td class="num">{text[lang].price(price)}</td>
				<td class="num">{storage(gb)}</td>
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

	/* 並べ替えできる見出しは下線で示し、文字と三角の両方を押せる範囲にする（DADS テーブル） */
	th button {
		display: inline-flex;
		align-items: center;
		gap: 0.3em;
		padding: 0;
		border: 0;
		background: none;
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 0.2em;
		cursor: pointer;
	}

	svg {
		flex: none;
	}
</style>
