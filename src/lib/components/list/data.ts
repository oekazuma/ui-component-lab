import type { ComponentData } from '#lib/types.js';

export default {
	id: 'list',
	category: 'data',
	names: { en: 'List', ja: 'リスト（箇条書きリスト）' },
	aliases: [
		{ name: '箇条書きリスト', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/list/' }
	],
	summary: {
		en: 'Items stacked vertically, one per row, often with an icon and a second line of detail.',
		ja: '項目を1行に1つずつ縦に並べたもの。アイコンや補足の2行目が付くことが多い。'
	},
	appearance: {
		en: 'Rows separated by thin lines, each with an icon or avatar on the left, a main text, and a smaller gray line below it.',
		ja: '細い線で区切られた行が並び、各行の左にアイコンやアバター、主な文、その下に小さな灰色の文がある。'
	},
	behavior: [
		{
			en: 'Items can also hold controls such as checkboxes or switches, or link to a detail page.',
			ja: '項目にチェックボックスやスイッチを置いたり、詳細ページへのリンクにしたりすることもある。'
		},
		{
			en: 'A native `<ul>` or `<ol>` lets screen readers announce how many items there are.',
			ja: 'ネイティブの `<ul>` や `<ol>` にすると、スクリーンリーダーが項目数を読み上げる。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None for a plain list. Controls inside items use their own keys.',
				ja: '文字だけのリストにはない。項目の中の操作部品は、それぞれのキー操作に従う。'
			}
		}
	],
	usage: [
		{
			en: 'For pairs of names and values, use a description list.',
			ja: '項目名と値の組には、説明リストを使う。'
		}
	],
	related: [
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
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
