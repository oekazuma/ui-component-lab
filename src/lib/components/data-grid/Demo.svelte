<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			caption: 'Tasks',
			headers: ['Task', 'Due', 'Done'],
			rows: [
				['Book the venue', 'Oct 24'],
				['Send invitations', 'Oct 27'],
				['Order lunch', 'Nov 4'],
				['Print name tags', 'Nov 6'],
				['Prepare slides', 'Nov 7']
			]
		},
		ja: {
			caption: 'タスク',
			headers: ['タスク', '期限', '完了'],
			rows: [
				['会場を予約する', '10月24日'],
				['案内状を送る', '10月27日'],
				['昼食を注文する', '11月4日'],
				['名札を印刷する', '11月6日'],
				['スライドを作る', '11月7日']
			]
		}
	};

	const uid = $props.id();
	const cols = 3;
	// Tab で止まるのはグリッドの中で 1 か所だけ（ロービングタブインデックス）
	let pos = $state({ r: 0, c: 0 });
	let grid: HTMLTableElement;

	function focusCell(r: number, c: number) {
		pos = { r, c };
		grid.querySelector<HTMLElement>(`[data-cell="${r}-${c}"]`)?.focus();
	}

	// WAI-ARIA APG Grid（データグリッド）: 矢印キーは端で止まり、折り返さない。
	// 行が少ないので、APG の最初の例と同じく Page Up / Page Down は付けない
	function onkeydown(e: KeyboardEvent) {
		const last = text[lang].rows.length - 1;
		const { r, c } = pos;
		const to: Record<string, [number, number]> = e.ctrlKey
			? { Home: [0, 0], End: [last, cols - 1] }
			: {
					ArrowRight: [r, Math.min(c + 1, cols - 1)],
					ArrowLeft: [r, Math.max(c - 1, 0)],
					ArrowDown: [Math.min(r + 1, last), c],
					ArrowUp: [Math.max(r - 1, 0), c],
					Home: [r, 0],
					End: [r, cols - 1]
				};
		if (!(e.key in to)) return;
		e.preventDefault();
		focusCell(...to[e.key]);
	}
</script>

<!-- 行と列の構造はネイティブの <table> に任せ、role="grid" を付けて矢印キーで動けることを伝える（APG のデータグリッドの例も <table> を使う）。
	完了の列はチェックボックスにフォーカスを置き、Space での切り替えはネイティブの <input type="checkbox"> に任せる -->
<table
	bind:this={grid}
	role="grid"
	aria-labelledby="{uid}-caption"
	{onkeydown}
	onfocusin={(e) => {
		// マウスで押したセルも、次に Tab で戻ってくる場所にする
		const cell = (e.target as HTMLElement).dataset.cell;
		if (cell) {
			const [r, c] = cell.split('-').map(Number);
			pos = { r, c };
		}
	}}
>
	<caption id="{uid}-caption">{text[lang].caption}</caption>
	<thead>
		<tr>
			{#each text[lang].headers as header (header)}
				<th scope="col">{header}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each text[lang].rows as [task, due], r (task)}
			<tr>
				{#each [task, due] as value, c (c)}
					<td
						id={c === 0 ? `${uid}-task-${r}` : undefined}
						role="gridcell"
						data-cell="{r}-{c}"
						tabindex={pos.r === r && pos.c === c ? 0 : -1}
					>
						{value}
					</td>
				{/each}
				<td role="gridcell" class="done">
					<input
						type="checkbox"
						data-cell="{r}-2"
						tabindex={pos.r === r && pos.c === 2 ? 0 : -1}
						aria-labelledby="{uid}-task-{r}"
					/>
				</td>
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
		padding: 0.4rem 0.6rem;
		border: 1px solid var(--color-border);
		background: var(--color-bg);
		text-align: left;
	}

	th {
		background: var(--color-surface);
	}

	/* フォーカスの枠が隣のセルの背景に隠れないよう、内側に描く */
	td:focus-visible {
		outline-offset: -2px;
	}

	.done {
		text-align: center;
	}

	input {
		width: 1.25rem;
		height: 1.25rem;
		margin: 0;
		accent-color: var(--color-accent);
		vertical-align: middle;
	}
</style>
