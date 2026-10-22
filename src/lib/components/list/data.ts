import type { ComponentData } from '#lib/types.js';

export default {
	id: 'list',
	category: 'data',
	names: { en: 'List', ja: 'リスト' },
	aliases: [
		{ name: 'リソースリスト', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/resource-list/' }
	],
	summary: {
		en: 'Items stacked vertically, one per row, often with an icon and a second line of detail.',
		ja: '項目を1行に1つずつ縦に並べたもの。アイコンや補足の2行目が付くことが多い。'
	},
	appearance: {
		en: 'Rows separated by thin lines, each with an icon or avatar on the left, a main text, and a smaller gray line below it.',
		ja: '細い線で区切られた行が並び、各行には左のアイコンやアバター、主な文、その下の小さな灰色の文がある。'
	},
	behavior: [
		{
			en: 'Items can also hold controls such as checkboxes or switches, or link to a detail page.',
			ja: '項目にチェックボックスやスイッチを置いたり、詳細ページへのリンクにしたりすることもある。'
		},
		{
			en: 'In this demo, only the title of each item is a link, so other buttons can still be added to the item. If the whole row is a link, it must not contain other links or buttons.',
			ja: 'このデモでは、各項目のタイトルだけをリンクにし、項目にほかのボタンを足せるようにしている。行全体をリンクにするなら、中にほかのリンクやボタンを置かない。'
		},
		{
			en: 'In this demo, the links do not go anywhere.',
			ja: 'このデモでは、リンクを押しても移動しない。'
		},
		{
			en: 'A native `<ul>` or `<ol>` lets screen readers announce how many items there are.',
			ja: 'ネイティブの `<ul>` や `<ol>` にすると、スクリーンリーダーが項目数を読み上げる。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between the links and controls in the items. A list of plain text has no keys of its own.',
				ja: '項目の中のリンクや操作部品の間を移動する。文字だけのリストには、リスト自体のキー操作はない。'
			}
		},
		{ key: 'Enter', action: { en: 'Follows the focused link.', ja: 'フォーカス中のリンクを開く。' } }
	],
	usage: [
		{
			en: 'DADS calls a list of items that each have several parts, such as a title, supporting text, links or choices, a resource list. A list of titles only is a bulleted list (箇条書きリスト).',
			ja: 'タイトル・補足の文・リンク・選択肢など、いくつかの情報を持つ項目の一覧を、DADS ではリソースリストと呼ぶ。タイトルだけを並べるものは箇条書きリストにあたる。'
		},
		{
			en: 'DADS uses `<ul>` for every bulleted list, including numbered ones, and writes the numbers as text. Numbers made by `<ol>` cannot be copied and shift when items are added or removed. The GOV.UK Design System, by contrast, uses a numbered list made with `<ol>` when the order of the items matters.',
			ja: 'DADS は番号付きのものも含めて箇条書きリストをすべて `<ul>` で書き、項目番号は地の文字として書く。`<ol>` の番号はコピーできず、項目を足したり消したりするとずれるため。一方 GOV.UK Design System は、項目の順番に意味があるときは `<ol>` で番号付きリストにする。'
		},
		{
			en: 'For pairs of names and values, use a description list. To compare values across items, use a table.',
			ja: '項目名と値の組には、説明リストを使う。項目の間で値を比べるなら、テーブルを使う。'
		}
	],
	related: [
		{
			id: 'feed',
			diff: {
				en: 'A list shows a fixed set of items; a feed keeps loading more articles as people read and moves by article with Page Up and Page Down.',
				ja: 'リストは決まった数の項目を並べ、フィードは読み進めると記事を読み込み続け、Page Up と Page Down で記事を移る。'
			}
		},
		{
			id: 'table',
			diff: {
				en: 'A list shows one item per row without columns; a table compares several values per row in columns.',
				ja: 'リストは列を持たずに1行に1項目を並べ、テーブルは1行の複数の値を列で比べる。'
			}
		},
		{
			id: 'card',
			diff: {
				en: 'A list stacks items compactly in rows; cards give each item room for an image and actions.',
				ja: 'リストは項目を行で詰めて並べ、カードは1件ごとに画像や操作を置く余裕がある。'
			}
		},
		{
			id: 'description-list',
			diff: {
				en: 'A list shows single items; a description list pairs each name with its value or explanation.',
				ja: 'リストは項目を1つずつ並べ、説明リストは項目名と値や説明を組にして並べる。'
			}
		}
	],
	sources: [
		{
			label: 'MUI: Lists',
			url: 'https://mui.com/material-ui/react-list/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「箇条書きリスト」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/list/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「箇条書きリスト（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/list/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「リソースリスト」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/resource-list/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: resource-list',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/resource-list',
			checkedAt: '2026-10-21'
		},
		{
			label: 'GOV.UK Design System: Lists',
			url: 'https://design-system.service.gov.uk/styles/lists/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Carbon Design System: List',
			url: 'https://carbondesignsystem.com/components/list/usage/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'WCAG 2.2 Technique H48: Using ol, ul and dl for lists or groups of links',
			url: 'https://www.w3.org/WAI/WCAG22/Techniques/html/H48',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Deque University: <li> elements must be contained in a <ul> or <ol>',
			url: 'https://dequeuniversity.com/rules/axe/4.10/listitem',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: <a>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
