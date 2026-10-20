import type { ComponentData } from '#lib/types.js';

export default {
	id: 'search-field',
	category: 'input',
	names: { en: 'Search field', ja: '検索ボックス' },
	aliases: [
		{ name: 'Search', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/building-blocks/core/components/search' },
		{ name: 'SearchField', source: 'React Aria', url: 'https://react-aria.adobe.com/SearchField' },
		{ name: '検索ボックス', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/search-box/' }
	],
	summary: {
		en: 'A text box with a search button for finding content across a site.',
		ja: 'サイト内の情報を探すための、検索ボタン付きの入力欄。'
	},
	appearance: {
		en: 'A text box, often with a magnifying glass icon, next to a “Search” button. Some browsers show a × button to clear the text.',
		ja: '虫眼鏡のアイコンが付くことの多い入力欄の横に「検索」ボタンがある。ブラウザによっては入力を消す × ボタンが出る。'
	},
	behavior: [
		{
			en: 'Pressing Enter or the button runs the search.',
			ja: 'Enter またはボタンで検索を実行する。'
		},
		{
			en: 'This demo wraps the form in a <search> element, which marks it as a search landmark so screen reader users can jump to it.',
			ja: 'このデモはフォームを <search> 要素で囲んでいる。検索のランドマークになり、スクリーンリーダーの利用者が直接移動できる。'
		},
		{
			en: 'It uses <input type="search">, so in Chrome, Esc clears the text.',
			ja: '<input type="search"> を使っているので、Chrome では Esc で入力を消せる。'
		}
	],
	keyboard: [
		{ key: 'Enter', action: { en: 'Runs the search.', ja: '検索を実行する。' } },
		{
			key: 'Esc',
			action: { en: 'Clears the text (depends on the browser).', ja: '入力を消す（ブラウザによる）。' }
		},
		{ key: 'Tab', action: { en: 'Moves to the search button.', ja: '検索ボタンへ移動する。' } }
	],
	variations: [
		{
			name: { en: 'With scope', ja: '検索範囲の指定付き' },
			description: {
				en: 'A menu next to the box narrows what to search, such as news or documents only.',
				ja: '入力欄の横のメニューで、お知らせだけ・資料だけのように検索する範囲を絞る。'
			}
		}
	],
	usage: [
		{
			en: 'Use it for searching across a whole site. To filter rows of a table, use table controls instead.',
			ja: 'サイト全体を横断する検索に使う。表の行を絞り込むのには使わず、表の操作部品を使う。'
		},
		{
			en: 'Give it a label. Placeholder text such as “Search” does not count as one.',
			ja: 'ラベルを付ける。「検索」などのプレースホルダーはラベルの代わりにならない。'
		}
	],
	related: [
		{
			id: 'text-field',
			diff: {
				en: 'A search field is a text field for search terms, usually with a search button and a search landmark.',
				ja: '検索ボックスは検索語を入れるためのテキストフィールドで、検索ボタンや検索のランドマークが付くことが多い。'
			}
		},
		{
			id: 'combobox',
			diff: {
				en: 'A search field sends the typed words as they are; a combobox suggests values to pick from while typing.',
				ja: '検索ボックスは入力した語をそのまま送り、コンボボックスは入力中に選べる候補を出す。'
			}
		}
	],
	sources: [
		{
			label: 'MDN: <search>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/search',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MDN: <input type="search">',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/search',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「検索ボックス」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/search-box/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
