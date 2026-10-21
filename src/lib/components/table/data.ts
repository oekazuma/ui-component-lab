import type { ComponentData } from '#lib/types.js';

export default {
	id: 'table',
	category: 'data',
	names: { en: 'Table', ja: 'テーブル' },
	aliases: [
		{ name: 'Data table', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/data-table/usage/' },
		{ name: 'テーブル／データテーブル', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/table/' }
	],
	summary: {
		en: 'Data arranged in rows and columns, with headings that explain each column.',
		ja: 'データを行と列に並べ、列ごとに見出しを付けた表。'
	},
	appearance: {
		en: 'A grid of cells with a bold header row at the top, separated by lines. Numbers are usually right-aligned.',
		ja: '太字の見出し行が上にあり、線で区切られたセルが並ぶ。数値は右揃えにすることが多い。'
	},
	behavior: [
		{
			en: 'The cells themselves are not interactive; screen readers announce the matching column and row headings while moving through cells.',
			ja: 'セル自体は操作できない。スクリーンリーダーはセルを移動するとき、対応する列と行の見出しを読み上げる。'
		},
		{
			en: 'A sortable column has a button in its heading, and aria-sort tells which way it is sorted.',
			ja: '並べ替えできる列は見出しにボタンを置き、aria-sort で並び順を伝える。'
		},
		{
			en: 'Native <table>, <caption>, and <th scope> give the structure without extra ARIA.',
			ja: 'ネイティブの <table>・<caption>・<th scope> を使えば、ARIA を足さずに構造が伝わる。'
		}
	],
	keyboard: [
		{
			key: 'Tab',
			action: {
				en: 'Moves only between controls inside the table, such as the sort button.',
				ja: '表の中の操作できる要素（並べ替えボタンなど）の間だけを移動する。'
			}
		},
		{
			key: 'Enter / Space',
			action: {
				en: 'On the sort button, switches between ascending and descending order.',
				ja: '並べ替えボタンで、昇順と降順を切り替える。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Data grid', ja: 'データグリッド' },
			description: {
				en: 'An interactive table where arrow keys move between cells, used when cells can be edited or selected.',
				ja: 'セルを編集・選択できる表で、矢印キーでセル間を移動するもの。'
			}
		}
	],
	usage: [
		{
			en: 'For pairs of names and values, use a description list.',
			ja: '項目名と値の組には、説明リストを使う。'
		}
	],
	misuse: [
		{
			pattern: { en: 'Using a table to lay out the page', ja: 'ページのレイアウトにテーブルを使う' },
			harm: {
				en: 'Screen readers read a table in source order, which can differ from the visual order, so people using a screen reader or a keyboard may meet the content in a confusing order. Markup such as <th> or <caption> can make a screen reader present it as a data table. When people with low vision enlarge text in fixed-size cells, it can overflow and need horizontal scrolling.',
				ja: 'スクリーンリーダーはソースの順に読むため、見た目の順とずれることがあり、スクリーンリーダーやキーボードを使う人には分かりにくい順で伝わる。<th> や <caption> があると、データの表として読み上げられることがある。弱視の人が文字を拡大すると、大きさを固定したセルから内容がはみ出し、横スクロールが必要になることがある。'
			},
			instead: {
				en: 'Lay out the page with CSS (grid or flexbox) and keep <table> for data compared across rows and columns.',
				ja: 'レイアウトは CSS（grid や flexbox）で組み、<table> は行と列で比べるデータにだけ使う。'
			}
		}
	],
	related: [
		{
			id: 'list',
			diff: {
				en: 'A table compares several values per row in columns; a list shows one item per row without columns.',
				ja: 'テーブルは1行の複数の値を列で比べ、リストは列を持たずに1行に1項目を並べる。'
			}
		},
		{
			id: 'description-list',
			diff: {
				en: 'A table compares values across rows and columns; a description list shows name–value pairs for one subject.',
				ja: 'テーブルは行と列で値を比べ、説明リストは1つの対象について項目名と値の組を並べる。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Table Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/table/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Grid Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Carbon Design System: Data table',
			url: 'https://carbondesignsystem.com/components/data-table/usage/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「テーブル／データテーブル」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/table/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WebAIM: Creating Accessible Tables',
			url: 'https://webaim.org/techniques/tables/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
