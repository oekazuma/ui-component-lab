import type { ComponentData } from '#lib/types.js';

export default {
	id: 'pagination',
	category: 'navigation',
	names: { en: 'Pagination', ja: 'ページネーション' },
	aliases: [
		{ name: 'ページナビゲーション', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/page-navigation/' }
	],
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
			en: 'The current page is marked with `aria-current="page"`, and the whole control sits in a `<nav>` landmark.',
			ja: '今のページは `aria-current="page"` で示し、全体を `<nav>` ランドマークで囲む。'
		},
		{
			en: 'The `<nav>` is labelled with what it pages through, such as “Search results”. Screen readers already announce it as navigation, so a label like “Pagination” would only repeat the role.',
			ja: '`<nav>` のラベルには「検索結果」のように何のページかを書く。スクリーンリーダーはナビゲーションであることを読み上げるので、「ページネーション」のようなラベルは役割の繰り返しになる。'
		},
		{
			en: 'Only the first and last pages and the pages next to the current one are shown; the pages in between become “…”. The “…” is plain text, not a button.',
			ja: '最初と最後のページ、今のページとその前後だけを出し、間のページは「…」にする。「…」はボタンではなく、ただの文字。'
		},
		{
			en: 'Websites often use links to separate URLs; this demo uses buttons because it swaps content on the same screen.',
			ja: 'Web サイトではページごとの URL へのリンクにすることが多い。このデモは同じ画面の中身を入れ替えるため、ボタンにしている。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: { en: 'Moves between the page controls.', ja: 'ページ番号や「前へ」「次へ」の間を移動する。' }
		},
		{
			key: 'Enter / Space',
			action: {
				en: 'Goes to the focused page. Space works because this demo uses buttons; page links respond to Enter only.',
				ja: 'フォーカス中のページへ移動する。このデモはボタンなので Space でも動く。ページへのリンクの場合は Enter だけで動く。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Previous and next with a counter', ja: '前後とカウンターだけの型' },
			description: {
				en: 'Only “Previous page” and “Next page” with the position, such as “5 / 24”, between them and no page numbers. The Digital Agency Design System uses this form, as text, outlined or arrow-only buttons.',
				ja: 'ページ番号を並べず、「前のページ」「次のページ」と、その間の「5 / 24」のような現在位置だけを置くもの。デジタル庁デザインシステムはこの形で、テキスト型・アウトライン型・矢印型がある。'
			}
		},
		{
			name: { en: 'Table pagination', ja: '表のページ送り' },
			description: {
				en: 'Attached below a data table, with the number of rows per page and the range being shown.',
				ja: 'データの表の下に付け、1ページの行数や表示中の範囲も表示するもの。'
			}
		}
	],
	usage: [
		{
			en: 'The Digital Agency Design System hides "Previous" and "Next" on the first and last pages instead of disabling them. This demo keeps them focusable with `aria-disabled`.',
			ja: 'デジタル庁デザインシステムでは、最初と最後のページで「前へ」「次へ」を無効にせず非表示にする。このデモは `aria-disabled` にして、フォーカスできるまま残している。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Loading more items automatically as the user nears the bottom, instead of splitting them into pages',
				ja: 'ページに分けず、下端に近づくと続きを自動で読み込む'
			},
			harm: {
				en: 'Keyboard users run into problems. It is hard to find an item seen earlier, and the scroll bar no longer shows how much is left.',
				ja: 'キーボードで操作する人が使いにくくなる。前に見た項目を探し直しにくく、スクロールバーからは残りの量が分からなくなる。'
			},
			instead: {
				en: 'For lists where people look for a particular item, split the results into pages and show the current page among the others.',
				ja: '目的の項目を探す一覧では、結果をページに分け、今どのページにいるかを示す。'
			}
		}
	],
	related: [
		{
			id: 'feed',
			diff: {
				en: 'Pagination splits the items into pages that people choose to move between; a feed adds the next articles in place as people read.',
				ja: 'ページネーションは項目をページに分けて利用者が選んで移り、フィードは読み進めるとその場に次の記事を足す。'
			}
		},
		{
			id: 'carousel',
			diff: {
				en: 'Pagination moves through pages of a long list; a carousel shows one slide of a small set in place.',
				ja: 'ページネーションは長い一覧のページを移動し、カルーセルは少数のスライドをその場で1枚ずつ見せる。'
			}
		},
		{
			id: 'stepper',
			diff: {
				en: 'Pagination moves through pages of results; a stepper shows the user’s place in a procedure with distinct steps.',
				ja: 'ページネーションは検索結果などのページを行き来し、ステップナビゲーションは内容の異なる手順の中での現在地を示す。'
			}
		}
	],
	sources: [
		{
			label: 'GOV.UK Design System: Pagination',
			url: 'https://design-system.service.gov.uk/components/pagination/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Carbon Design System: Pagination',
			url: 'https://carbondesignsystem.com/components/pagination/usage/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ページナビゲーション」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/page-navigation/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: page-navigation',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/page-navigation',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Nielsen Norman Group: Infinite Scrolling Is Not for Every Website',
			url: 'https://www.nngroup.com/articles/infinite-scrolling/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
