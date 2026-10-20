import type { ComponentData } from '#lib/types.js';

export default {
	id: 'pagination',
	category: 'navigation',
	names: { en: 'Pagination', ja: 'ページネーション' },
	aliases: [],
	summary: {
		en: 'Controls for moving between pages of a long list, such as search results.',
		ja: '検索結果など長い一覧を複数のページに分け、ページ間を移動するための部品。'
	},
	appearance: {
		en: 'A row of page numbers with “Previous” and “Next” at the ends. The current page number is highlighted, and long ranges are shortened with “…”.',
		ja: 'ページ番号が横に並び、両端に「前へ」「次へ」がある。今のページ番号は強調され、ページ数が多いときは「…」で省略される。'
	},
	behavior: [
		{
			en: 'Choosing a number shows that page; “Previous” and “Next” move one page at a time.',
			ja: '番号を選ぶとそのページを表示し、「前へ」「次へ」で1ページずつ移動する。'
		},
		{
			en: 'The current page is marked with aria-current="page", and the whole control sits in a nav landmark.',
			ja: '今のページは aria-current="page" で示し、全体を nav ランドマークで囲む。'
		},
		{
			en: 'Websites often use links to separate URLs; this demo uses buttons because it swaps content on the same screen.',
			ja: 'Web サイトではページごとの URL へのリンクにすることが多い。このデモは同じ画面の中身を入れ替えるため、ボタンにしている。'
		}
	],
	keyboard: [
		{
			key: 'Tab',
			action: { en: 'Moves between the page controls.', ja: 'ページ番号や「前へ」「次へ」の間を移動する。' }
		},
		{
			key: 'Enter',
			action: { en: 'Goes to the focused page.', ja: 'フォーカス中のページへ移動する。' }
		}
	],
	variations: [
		{
			name: { en: 'Table pagination', ja: '表のページ送り' },
			description: {
				en: 'Attached below a data table, with the number of rows per page and the range being shown.',
				ja: 'データの表の下に付け、1ページの行数や表示中の範囲も表示するもの。'
			}
		}
	],
	related: [
		{
			id: 'carousel',
			diff: {
				en: 'Pagination moves through pages of a long list; a carousel shows one slide of a small set in place.',
				ja: 'ページネーションは長い一覧のページを移動し、カルーセルは少数のスライドをその場で1枚ずつ見せる。'
			}
		}
	],
	sources: [
		{
			label: 'GOV.UK Design System: Pagination',
			url: 'https://design-system.service.gov.uk/components/pagination/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Carbon Design System: Pagination',
			url: 'https://carbondesignsystem.com/components/pagination/usage/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
