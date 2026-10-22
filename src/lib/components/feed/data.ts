import type { ComponentData } from '#lib/types.js';

export default {
	id: 'feed',
	category: 'data',
	names: { en: 'Feed', ja: 'フィード' },
	aliases: [],
	summary: {
		en: 'A stream of articles that loads more as the reader scrolls, read one article at a time.',
		ja: '読み進めると続きが読み込まれる、記事の連なり。記事を1つずつ読んでいく。'
	},
	appearance: {
		en: 'A column of posts, each with a title and a few lines of text. New posts appear at the bottom as the reader nears the end, often after a short loading message.',
		ja: 'タイトルと数行の文を持つ投稿が縦に並ぶ。終わりに近づくと、短い「読み込み中」の表示のあとに、新しい投稿が下に足される。'
	},
	behavior: [
		{
			en: 'The container has `role="feed"` and each post is an `article` that can take focus. Each article is named by its title (`aria-labelledby`), described by its main text (`aria-describedby`), and has its position in `aria-posinset` and the number of articles in `aria-setsize`.',
			ja: '入れ物に `role="feed"` を付け、投稿をそれぞれフォーカスできる `article` にする。記事はタイトルを名前に（`aria-labelledby`）、本文を説明に（`aria-describedby`）し、位置を `aria-posinset`、記事の数を `aria-setsize` で伝える。'
		},
		{
			en: 'A feed is a structure, not a widget, so screen readers stay in their reading mode inside it.',
			ja: 'フィードは操作部品ではなく構造なので、スクリーンリーダーはその中でも読むためのモードのまま使える。'
		},
		{
			en: 'More articles are loaded when the reader scrolls near the end or moves focus to the last article. While they are being added, the feed has `aria-busy="true"`, so screen readers wait until the change is finished.',
			ja: '終わり近くまでスクロールするか、最後の記事にフォーカスを移すと、続きの記事を読み込む。記事を足している間はフィードに `aria-busy="true"` を付け、変更が終わるまでスクリーンリーダーに待ってもらう。'
		},
		{
			en: 'In this demo, loading waits a moment, in place of fetching from a server, and adds three posts at a time. It stops after nine posts and says “No more posts”. `aria-setsize` is the number of posts loaded so far.',
			ja: 'このデモでは、サーバーから取得する代わりに少し待ってから、3件ずつ投稿を足す。9件で読み込みを止め、「これ以上の投稿はありません」と表示する。`aria-setsize` は、その時点で読み込んだ投稿の数にしている。'
		},
		{
			en: 'In this demo, Ctrl + End and Ctrl + Home move to the nearest element that can take focus after or before the feed, even outside the demo.',
			ja: 'このデモでは、Ctrl + End と Ctrl + Home で、フィードの後ろ・前にある、いちばん近いフォーカスできる要素へ移る。デモの外の要素にも移る。'
		}
	],
	keyboard: [
		{
			key: 'Page Up / Page Down',
			action: {
				en: 'Moves focus to the previous / next article. Reaching the last article loads more.',
				ja: '前・次の記事へフォーカスを移す。最後の記事まで来ると、続きを読み込む。'
			}
		},
		{
			key: 'Ctrl + Home / Ctrl + End',
			action: {
				en: 'Moves focus out of the feed, to the nearest element that can take focus before / after it.',
				ja: 'フィードの外の、前・後ろにあるいちばん近いフォーカスできる要素へ移る。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves to the next / previous article, because every article is in the Tab order.',
				ja: '記事はすべて Tab キーの順に入っているので、次・前の記事へ移る。'
			}
		}
	],
	usage: [
		{
			en: 'Feeds have no established keyboard convention, so tell people which keys move between articles and out of the feed, for example next to the feed or in help.',
			ja: 'フィードのキー操作には決まった慣習がないので、記事の間やフィードの外へ移るキーを、フィードの近くやヘルプで伝える。'
		},
		{
			en: 'A feed suits content that keeps coming and is browsed without looking for anything in particular, such as news or social posts.',
			ja: 'フィードは、ニュースや SNS の投稿のように次々と届き、特定のものを探さずに眺める内容に向いている。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Loading articles without end above a footer that holds contact details or other information',
				ja: '連絡先などの情報を載せたフッターの上で、記事を際限なく読み込み続ける'
			},
			harm: {
				en: 'The stream of new articles keeps people from ever reaching the footer, so information such as contact details or return policies is out of reach. Keyboard-only users have to Tab through the articles one by one, which makes reaching the end a long task.',
				ja: '新しい記事が次々と足されるので、フッターにたどり着けず、連絡先や返品の条件などの情報を見られない。キーボードだけで操作する人は記事を1つずつ Tab キーで進むしかなく、終わりまで行くのに長くかかる。'
			},
			instead: {
				en: 'Stop loading automatically after a set number of articles and add a “Load more” button, so the footer can be reached. Also support Ctrl + End to move past the feed.',
				ja: '決まった数の記事を読み込んだら自動の読み込みを止め、「さらに読み込む」ボタンを置いて、フッターに届くようにする。Ctrl + End でフィードの後ろへ移れるようにもする。'
			}
		},
		{
			pattern: {
				en: 'Showing search results or products to compare as a feed',
				ja: '検索結果や、見比べる商品の一覧をフィードで見せる'
			},
			harm: {
				en: 'People looking for a particular item find it hard to get back to one they saw earlier, since “on page 3” is easier to remember than a spot on a very long page. The scroll bar also stops showing how much is left.',
				ja: '特定のものを探している人は、前に見た項目へ戻りにくい。「3ページ目にあった」は覚えやすいが、とても長いページの中の位置は覚えにくい。スクロールバーからも、残りがどれだけあるか分からなくなる。'
			},
			instead: {
				en: 'Split the results into pages, and offer sorting and filtering to narrow them down.',
				ja: '結果をページに分け、並べ替えと絞り込みで探せるようにする。'
			}
		},
		{
			pattern: {
				en: 'Starting the feed over from the top when people come back from an article with the Back button',
				ja: '記事を開いてから「戻る」で帰ってきた人に、フィードを最初から見せる'
			},
			harm: {
				en: 'People who opened an article and went back land at the top and have to scroll past everything they have already seen.',
				ja: '記事を開いて戻った人が先頭に戻され、もう見た記事をすべてスクロールし直すことになる。'
			},
			instead: {
				en: 'Keep the loaded articles and the reading position, and return people to the article they opened.',
				ja: '読み込んだ記事と読んでいた位置を残し、開いた記事のところへ戻す。'
			}
		}
	],
	related: [
		{
			id: 'list',
			diff: {
				en: 'A feed keeps loading more articles as people read and moves by article with Page Up and Page Down; a list shows a fixed set of items.',
				ja: 'フィードは読み進めると記事を読み込み続け、Page Up と Page Down で記事を移る。リストは決まった数の項目を並べる。'
			}
		},
		{
			id: 'pagination',
			diff: {
				en: 'A feed adds the next articles in place as people read; pagination splits the items into pages that people choose to move between.',
				ja: 'フィードは読み進めるとその場に次の記事を足し、ページネーションは項目をページに分けて、利用者が選んで移る。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Feed Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/feed/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'WAI-ARIA APG: Infinite Scrolling Feed Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/feed/examples/feed/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Nielsen Norman Group: Infinite Scrolling: When to Use It, When to Avoid It',
			url: 'https://www.nngroup.com/articles/infinite-scrolling-tips/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Nielsen Norman Group: Infinite Scrolling Is Not for Every Website',
			url: 'https://www.nngroup.com/articles/infinite-scrolling/',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
