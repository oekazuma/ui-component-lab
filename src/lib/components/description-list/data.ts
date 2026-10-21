import type { ComponentData } from '#lib/types.js';

export default {
	id: 'description-list',
	category: 'data',
	names: { en: 'Description list', ja: '説明リスト' },
	aliases: [
		{ name: 'Descriptions', source: 'Ant Design', url: 'https://ant.design/components/descriptions' },
		{ name: 'Summary list', source: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk/components/summary-list/' },
		{ name: '説明リスト', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/description-list/' }
	],
	summary: {
		en: 'Pairs of a name and its value or explanation, such as the answers on a confirmation page.',
		ja: '確認画面の回答のように、項目名と値や説明を組にして並べたもの。'
	},
	appearance: {
		en: 'Rows with a short name on the left (or above) in gray and its value next to it, often separated by thin lines.',
		ja: '左（または上）に灰色の短い項目名、その横に値がある行が並び、細い線で区切られることが多い。'
	},
	behavior: [
		{
			en: 'The list itself is not interactive; it is used for reading. On a confirmation page, each row can have a link such as “Change” that goes back to the question.',
			ja: 'リスト自体は操作する部品ではなく、読むためのもの。確認画面では、行ごとに設問へ戻る「変更」などのリンクを置くことがある。'
		},
		{
			en: 'This demo uses `<dl>` with a `<dt>` (name) and `<dd>` (value) in each row, so screen readers can treat them as pairs. The link goes in another `<dd>` in the same row.',
			ja: 'このデモは `<dl>` を使い、各行を `<dt>`（項目名）と `<dd>`（値）で書いている。スクリーンリーダーが組として扱える。リンクは同じ行の別の `<dd>` に置く。'
		},
		{
			en: 'Each link shows only “Change”, and visually hidden text adds the row name, so it is read as “Change name” even out of context, such as in a list of links.',
			ja: 'リンクの見た目は「変更」だけにし、見えない文字で項目名を補って、リンクの一覧などで単独で読まれても「氏名を変更」と伝わるようにする。'
		},
		{
			en: 'In this demo, the Change links do not go anywhere. On narrow screens, the name moves above the value.',
			ja: 'このデモでは、「変更」のリンクを押しても移動しない。狭い画面では、項目名を値の上に出す。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves between the Change links.', ja: '「変更」のリンクの間を移動する。' } },
		{ key: 'Enter', action: { en: 'Follows the focused link.', ja: 'フォーカス中のリンクを開く。' } }
	],
	variations: [
		{
			name: { en: 'With row actions', ja: '行ごとの操作付き' },
			description: {
				en: 'Adds a link such as “Change” at the end of each row. Rows with missing answers get a link to the question in the value instead.',
				ja: '各行の末尾に「変更」などのリンクを添えたもの。回答のない行には、値の場所に設問へのリンクを置く。'
			}
		}
	],
	usage: [
		{
			en: 'Use it for repeated name–value pairs: glossaries, FAQs, specifications or a summary of answers.',
			ja: '用語集・よくある質問・仕様・入力内容の確認など、項目名と値の組が続く情報に使う。'
		},
		{
			en: 'Use a table when values need to be compared across rows and columns. Use a plain list when there are no names.',
			ja: '行と列で値を比べるならテーブルを、項目名がなく並べるだけならリストを使う。'
		}
	],
	related: [
		{
			id: 'list',
			diff: {
				en: 'A description list pairs each name with its value; a list shows single items.',
				ja: '説明リストは項目名と値を組にして並べ、リストは項目を1つずつ並べる。'
			}
		},
		{
			id: 'table',
			diff: {
				en: 'A description list shows name–value pairs for one subject; a table compares values across rows and columns.',
				ja: '説明リストは1つの対象について項目名と値の組を並べ、テーブルは行と列で値を比べる。'
			}
		}
	],
	sources: [
		{
			label: 'MDN: <dl>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dl',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「説明リスト」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/description-list/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'GOV.UK Design System: Summary list',
			url: 'https://design-system.service.gov.uk/components/summary-list/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
