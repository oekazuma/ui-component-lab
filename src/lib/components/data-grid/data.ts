import type { ComponentData } from '#lib/types.js';

export default {
	id: 'data-grid',
	category: 'data',
	names: { en: 'Data grid', ja: 'グリッド' },
	aliases: [
		{ name: 'Data Grid', source: 'MUI', url: 'https://mui.com/x/react-data-grid/' },
		{ name: 'Table', source: 'React Aria', url: 'https://react-aria.adobe.com/Table' }
	],
	summary: {
		en: 'A table whose cells can be operated, where the arrow keys move from cell to cell.',
		ja: 'セルを操作できる表です。矢印キーでセルからセルへ移ります。'
	},
	appearance: {
		en: 'Looks like a table with a header row and lines between the cells. Some cells hold controls such as checkboxes or editable text, and the focused cell is outlined.',
		ja: '見出しの行があり、セルが線で区切られた表の見た目です。チェックボックスや編集できる文字を持つセルがあり、フォーカスしたセルに枠が付きます。'
	},
	behavior: [
		{
			en: 'The whole grid is a single Tab stop, and the arrow keys move between cells (roving `tabindex`). Tab leaves the grid instead of visiting every cell.',
			ja: 'グリッド全体で Tab キーが止まるのは1か所だけで、セルの間は矢印キーで移ります（ロービングタブインデックス）。Tab キーではすべてのセルを回らずに、グリッドの外へ出ます。'
		},
		{
			en: 'Every data cell can take focus. A cell that holds a single control that does not use the arrow keys, such as a checkbox, passes focus to that control; a cell that holds only text takes focus itself.',
			ja: 'データのセルはすべてフォーカスを受け取ります。チェックボックスのように矢印キーを使わない部品を1つだけ持つセルでは、その部品にフォーカスを渡します。文字だけのセルは、セル自体がフォーカスを受け取ります。'
		},
		{
			en: 'The arrow keys stop at the edges. Unlike a layout grid, a data grid does not wrap from the end of one row to the start of the next, which the APG says would be disorienting.',
			ja: '矢印キーは端で止まります。レイアウトグリッドと違い、データグリッドは行の終わりから次の行の初めへ回りません。APG は、回ると位置が分からなくなるとしています。'
		},
		{
			en: 'A native `<table>` with `role="grid"` keeps the rows, cells and headers of the table, so screen readers still announce the column heading while moving through cells. The APG data grid examples are built the same way.',
			ja: 'ネイティブの `<table>` に `role="grid"` を付けると、表の行・セル・見出しの構造がそのまま伝わり、スクリーンリーダーはセルを移るときに列の見出しを読み上げます。APG のデータグリッドの例も同じ作り方をしています。'
		},
		{
			en: 'In this demo, the checkboxes in the Done column are named after the task in the same row. As in the first APG data grid example, there are only a few rows, so Page Up and Page Down are left out.',
			ja: 'このデモでは、「完了」の列のチェックボックスに、同じ行のタスク名を名前として付けています。APG の最初のデータグリッドの例と同じく、行が少ないので Page Up と Page Down は省いています。'
		}
	],
	keyboard: [
		{
			key: 'Space',
			action: {
				en: 'On a checkbox in the Done column, checks or unchecks it.',
				ja: '「完了」の列のチェックボックスで、チェックを付けたり外したりします。'
			}
		},
		{
			key: '↑ / ↓',
			action: {
				en: 'Moves to the cell above / below. Stops at the first / last row.',
				ja: '上・下のセルへ移ります。最初・最後の行では止まります。'
			}
		},
		{
			key: '← / →',
			action: {
				en: 'Moves to the cell on the left / right. Stops at the first / last cell of the row.',
				ja: '左・右のセルへ移ります。行の最初・最後のセルでは止まります。'
			}
		},
		{
			key: 'Home / End',
			action: {
				en: 'Moves to the first / last cell of the row.',
				ja: 'その行の最初・最後のセルへ移ります。'
			}
		},
		{
			key: 'Ctrl + Home / Ctrl + End',
			action: {
				en: 'Moves to the first cell of the first row / the last cell of the last row.',
				ja: '最初の行の最初のセル・最後の行の最後のセルへ移ります。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves into the grid at the cell last used, or out of the grid.',
				ja: 'グリッドに入るときは最後に使ったセルへ移ります。グリッドの中からは外へ出ます。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Editable cells', ja: '編集できるセル' },
			description: {
				en: 'Enter or F2 starts editing the focused cell, and Esc returns to moving between cells. While editing, the arrow keys move the text cursor instead of the focus.',
				ja: 'Enter か F2でフォーカスしたセルの編集を始め、Esc でセル間の移動に戻ります。編集している間、矢印キーはセルを移らずに文字のカーソルを動かします。'
			}
		},
		{
			name: { en: 'Layout grid', ja: 'レイアウトグリッド' },
			description: {
				en: 'Uses the same keys to group controls such as links or buttons that are not tabular data, cutting down the Tab stops. It may have no headers, and the arrow keys may wrap to the next row.',
				ja: '表のデータではないリンクやボタンなどを同じキー操作でまとめ、Tab キーで止まる場所を減らすものです。見出しがないこともあり、矢印キーで次の行へ回ってもかまいません。'
			}
		}
	],
	usage: [
		{
			en: 'For data that is only read, with nothing to operate in the cells, use a table. Use a data grid when cells can be edited or operated, or when a table would have too many Tab stops.',
			ja: '読むだけで、セルの中に操作するものがないデータには、テーブルを使います。セルを編集・操作できるときや、テーブルでは Tab キーで止まる場所が多すぎるときに、グリッドを使います。'
		},
		{
			en: 'Arrow keys inside a cell belong to the grid, so a cell should not hold a control that needs them, such as a text field or a combobox, unless it is entered with Enter or F2 first.',
			ja: 'セルの中の矢印キーはグリッドの移動に使われます。テキスト入力欄やコンボボックスのように矢印キーを使う部品は、Enter や F2で入ってから操作する作りでない限り、セルに置きません。'
		}
	],
	related: [
		{
			id: 'table',
			diff: {
				en: 'A data grid lets people move between cells with the arrow keys and operate them; a table is for reading, and only the controls inside it are in the Tab order.',
				ja: 'グリッドは矢印キーでセルを移って操作でき、テーブルは読むための表で、中の操作できる要素だけが Tab キーの順に入ります。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Grid (Interactive Tabular Data and Layout Containers) Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'WAI-ARIA APG: Data Grid Examples',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MUI X: Data Grid',
			url: 'https://mui.com/x/react-data-grid/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MUI X: Data Grid - Accessibility',
			url: 'https://mui.com/x/react-data-grid/accessibility/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'React Aria: Table',
			url: 'https://react-aria.adobe.com/Table',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
