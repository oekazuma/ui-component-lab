import type { ComponentData } from '#lib/types.js';

export default {
	id: 'empty-state',
	category: 'feedback',
	names: { en: 'Empty state', ja: '空の状態' },
	aliases: [
		{ name: 'Empty states', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/patterns/empty-states-pattern/' },
		{ name: 'Empty', source: 'Ant Design', url: 'https://ant.design/components/empty' },
		{ name: 'Empty state', source: 'Atlassian Design System', url: 'https://atlassian.design/components/empty-state/usage' }
	],
	summary: {
		en: 'A message shown in place of a list or table that has nothing to show, saying why and what to do next.',
		ja: '表示する内容がない一覧や表の代わりに出し、なぜ空なのかと次に何をすればよいかを伝える表示。'
	},
	appearance: {
		en: 'A short heading, a sentence or two, and often a button, in the space where the content would be. A simple picture often sits above them.',
		ja: '内容が入るはずの場所に、短い見出しと1〜2文の説明が並び、多くの場合はボタンもある。上に簡単な絵が付くことも多い。'
	},
	behavior: [
		{
			en: 'It replaces the empty list or table entirely, with no leftover headers, so screen readers do not read an empty table before the message.',
			ja: '空の一覧や表を、見出しの行なども残さず丸ごと置き換える。こうすると、スクリーンリーダーが案内より先に空の表を読み上げずに済む。'
		},
		{
			en: 'The picture is decoration, so it is hidden from screen readers (`alt=""` for an image). The heading and text carry the meaning.',
			ja: '絵は飾りなので、スクリーンリーダーからは隠す（画像なら `alt=""`）。意味は見出しと本文で伝える。'
		},
		{
			en: 'When a filter or search finds nothing without moving focus, the result is announced through a `role="status"` live region.',
			ja: '絞り込みや検索で何も見つからず、フォーカスも動かないときは、その結果を `role="status"` のライブリージョンで知らせる。'
		},
		{
			en: 'In this demo, there are no projects at first, so the empty state explains what will appear and offers a button to create some. After that, a filter that matches nothing shows a second empty state with a Clear search button. Either button then moves focus to the filter field, because the button itself disappears.',
			ja: 'このデモでは、最初はプロジェクトがないので、何が並ぶかを伝え、作成するボタンを出す。作成したあと、絞り込みで何も一致しなければ、「検索をクリア」ボタンの付いた別の空の状態を出す。どちらのボタンも押すと消えるので、フォーカスを絞り込みの欄へ移す。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. The demo’s buttons use Enter / Space.',
				ja: 'なし。デモのボタンは Enter / Space で押せる。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Nothing yet', ja: 'まだ何もない' },
			description: {
				en: 'On first use or after everything was deleted. Says what will appear here and how to add the first item.',
				ja: '初めて使うときや、すべて消したあと。ここに何が並ぶかと、最初の1件の追加のしかたを伝える。'
			}
		},
		{
			name: { en: 'No results', ja: '一致なし' },
			description: {
				en: 'After a search or filter that matched nothing. Says so and suggests changing the search terms or filters.',
				ja: '検索や絞り込みで何も一致しなかったとき。そのことを伝え、検索語や条件を変えるよう促す。'
			}
		},
		{
			name: { en: 'All done', ja: 'すべて完了' },
			description: {
				en: 'When there is nothing left to do, such as no alerts or a cleared inbox. Often needs no button.',
				ja: '通知がない、受信箱が空になった、のように、やることが残っていないとき。ボタンが要らないことも多い。'
			}
		},
		{
			name: { en: 'Cannot show', ja: '表示できない' },
			description: {
				en: 'When data exists but cannot be shown, such as without permission. Says why and how to get access.',
				ja: '権限がないなど、データはあるのに表示できないとき。理由と、見られるようにする方法を伝える。'
			}
		}
	],
	usage: [
		{
			en: 'Be specific about what would appear here, and keep it short. Avoid jargon that new users may not know yet.',
			ja: 'ここに何が並ぶのかを具体的に、短く書く。使い始めたばかりの人が知らない用語は避ける。'
		},
		{
			en: 'Offer one main next step. When many empty states can appear on one screen, use less prominent buttons so the screen is not full of primary buttons.',
			ja: '次にする操作は1つに絞る。1つの画面に空の状態がいくつも出るときは、目立ちにくいボタンにして、画面が主ボタンだらけにならないようにする。'
		},
		{
			en: 'Match the tone to the situation. Do not joke when something went wrong.',
			ja: '場面に合った口調にする。問題が起きたときは冗談を言わない。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Showing “No results” while the data is still loading',
				ja: 'まだ読み込み中なのに「データがありません」と出す'
			},
			harm: {
				en: 'People who see the message and then watch content appear stop trusting the app. Impatient people believe there is nothing, move on before it loads, and never finish what they came to do.',
				ja: '「ない」と出たあとに内容が現れるのを見た人は、アプリを信用しなくなる。待てない人は、本当に何もないと思い込んで内容が届く前に先へ進み、やろうとしていたことを終えられない。'
			},
			instead: {
				en: 'Show a loading indicator while loading, and show the empty state only after loading has finished with nothing to show.',
				ja: '読み込み中は読み込み中の表示を出し、読み込みが終わって内容がないと分かってから空の状態を出す。'
			}
		},
		{
			pattern: {
				en: 'Leaving the area completely blank',
				ja: '何も表示せず、空白のままにする'
			},
			harm: {
				en: 'People who filter or search cannot tell whether the system is still working, failed, or found nothing, and run the same search again and again. New users miss the chance to learn what the area is for and how to start.',
				ja: '絞り込みや検索をした人は、まだ処理中なのか、失敗したのか、何も見つからなかったのかが分からず、同じ検索を何度もやり直す。使い始めたばかりの人は、その場所が何のためのもので、どう始めればよいかを知る機会を逃す。'
			},
			instead: {
				en: 'Say clearly that there is nothing to show, explain what would appear here, and give a button or link for the next step.',
				ja: '表示するものがないことをはっきり伝え、ここに何が並ぶかを説明し、次の操作へのボタンやリンクを置く。'
			}
		}
	],
	related: [
		{
			id: 'skeleton',
			diff: {
				en: 'An empty state appears after loading has finished with nothing to show; a skeleton fills the space while content is still loading.',
				ja: '空の状態は、読み込みが終わって表示するものがないときに出す。スケルトンは、まだ読み込んでいる間に場所を埋める。'
			}
		},
		{
			id: 'alert',
			diff: {
				en: 'An empty state stands in for missing content and points to the next step; an alert is a message that interrupts to report something important.',
				ja: '空の状態は、ない内容の代わりに置き、次の操作を示す。アラートは、大事なことを知らせるために割り込んで出る通知。'
			}
		},
		{
			id: 'search-field',
			diff: {
				en: 'An empty state is what appears in place of the results when a search finds nothing; a search field is where the search terms are typed.',
				ja: '空の状態は、検索で何も見つからなかったときに結果の代わりに出る表示。検索ボックスは、検索語を入力する欄。'
			}
		}
	],
	sources: [
		{
			label: 'Carbon Design System: Empty states',
			url: 'https://carbondesignsystem.com/patterns/empty-states-pattern/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Atlassian Design System: Empty state',
			url: 'https://atlassian.design/components/empty-state/usage',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Ant Design: Empty',
			url: 'https://ant.design/components/empty',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Nielsen Norman Group: Designing Empty States in Complex Applications: 3 Guidelines',
			url: 'https://www.nngroup.com/articles/empty-state-interface-design/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Understanding Success Criterion 4.1.3: Status Messages (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
