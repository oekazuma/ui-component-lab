import type { ComponentData } from '#lib/types.js';

export default {
	id: 'timeline',
	category: 'data',
	names: { en: 'Timeline', ja: 'タイムライン' },
	aliases: [
		{ name: 'Timeline', source: 'Ant Design', url: 'https://ant.design/components/timeline' },
		{ name: 'Timeline', source: 'MUI', url: 'https://mui.com/material-ui/react-timeline/' },
		{ name: 'Timeline', source: 'Primer', url: 'https://primer.style/product/components/timeline/' }
	],
	searchTerms: ['年表', '時系列', '履歴'],
	summary: {
		en: 'Lays out events in time order along a line, each with its date, so people can see what happened, or is planned, and when.',
		ja: '出来事を時間順に線に沿って並べ、それぞれに日時を添えて、いつ何があったか、何が予定されているかを見せる部品です。'
	},
	appearance: {
		en: 'A line runs down the page, and each event hangs off it as a marker with its date, a short title and a line of detail. The markers may differ in color or shape by kind of event, and the state is also written out in words.',
		ja: '縦の線に沿って出来事が並び、それぞれが丸などの印と、日時、短いタイトル、1行ほどの説明を持ちます。印は出来事の種類で色や形を変えることがあり、状態は文字でも書きます。'
	},
	behavior: [
		{
			en: 'The events are set in time order, oldest first or newest first, and each says when it happened or is planned. Ant Design describes the use as a series of information ordered by time, ascending or descending, and MUI as a list of events in chronological order.',
			ja: '出来事を古い順か新しい順の時間順に並べ、それぞれがいつ起きたか、またはいつ起きる予定かを示します。Ant Design は時間の順（昇順か降順）に並べる一連の情報に使うと説明し、MUI は出来事を時系列で並べたリストと説明しています。'
		},
		{
			en: 'Marking the events up as an ordered list, an `<ol>` with an `<li>` for each event, fits, since MDN says an `<ol>` is for a list whose order is meaningful. Primer’s own Timeline is built from non-semantic `<div>` elements, and its accessibility notes say a semantic list would let screen readers announce how many items there are and where each one begins and ends.',
			ja: '出来事は、順番に意味がある並びを表す `<ol>` に、出来事ごとの `<li>` を入れて書くのが合っています。Primer の Timeline 自身は意味を持たない `<div>` で作られていて、アクセシビリティの注意書きには、意味のあるリストに替えれば、項目の数とそれぞれの始まりと終わりをスクリーンリーダーが伝えられるとあります。'
		},
		{
			en: 'Each date goes in a `<time>` element whose `datetime` attribute holds a machine-readable value such as `2026-11-01`. The text people read can be written in any style, such as “Nov 1, 2026”.',
			ja: '日付は `<time>` 要素に入れ、`datetime` 属性に `2026-11-01` のような機械が読める値を書きます。人が読む文字は「2026年11月1日」のように、ふつうの書き方でかまいません。'
		},
		{
			en: 'The line joining the events is decoration. Primer says the lines joining its items are decorative and not needed to understand the structure, and its decorative Timeline.Break is not conveyed to assistive technologies. A marker that carries no information of its own can be hidden from them with `aria-hidden="true"`.',
			ja: '出来事をつなぐ線は飾りです。Primer は項目をつなぐ線を、構造を理解するのに要らない飾りとしていて、飾りの Timeline.Break は支援技術に伝わりません。それ自体に情報のない印は、`aria-hidden="true"` で読み上げから外せます。'
		},
		{
			en: 'In this demo, the heading says “Order history” and a line under it says “Oldest first”, so the order does not have to be worked out from the dates. The list is a native `<ol>` named by the heading, with an `<li>` for each event.',
			ja: 'このデモでは、見出しが「注文の履歴」で、その下に「古い順」と書いてあるので、順番を日付から読み取る必要はありません。リストはネイティブの `<ol>` で、見出しを名前にし、出来事ごとに `<li>` を置いています。'
		},
		{
			en: 'In this demo, each event also names its state in words (“Done”, “Needs attention” or “Scheduled”), and all the markers look the same, so nothing depends on color. The markers are hidden from assistive technologies and the line is drawn with CSS, so a screen reader reads only the list, the date, the title, the state and the detail.',
			ja: 'このデモでは、出来事ごとに状態を「完了」「要対応」「予定」と文字でも書くので、印はどれも同じ見た目で、色に頼る情報はありません。印は支援技術から外し、線は CSS で描くので、スクリーンリーダーが読むのはリスト、日付、タイトル、状態、説明だけです。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. A timeline takes no focus and has no keys of its own. Links or buttons inside an item are reached with Tab / Shift + Tab like anywhere else, and Primer says items must not trap focus.',
				ja: 'なし。タイムライン自体はフォーカスを受けず、専用のキーもありません。項目の中のリンクやボタンは、ほかの場所と同じく Tab / Shift + Tab で移ります。Primer は、項目がフォーカスを閉じ込めてはいけないとしています。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Alternating', ja: '左右に交互に並べるもの' },
			description: {
				en: 'Events switch between the two sides of the line. Ant Design (`mode="alternate"`) and MUI (an alternating timeline) both offer it.',
				ja: '出来事を線の左右に交互に置いたものです。Ant Design（`mode="alternate"`）と MUI（alternating timeline）のどちらにもあります。'
			}
		},
		{
			name: { en: 'Date on the opposite side', ja: '日時を反対側に置くもの' },
			description: {
				en: 'The date or time sits on the other side of the line from the description. Ant Design sets it with an item’s `title`, and MUI calls it opposite content.',
				ja: '日時を、線をはさんで説明の反対側に置いたものです。Ant Design では項目の `title` で、MUI では opposite content で指定します。'
			}
		},
		{
			name: { en: 'Horizontal', ja: '横並び' },
			description: {
				en: 'Events run from left to right. Ant Design offers it with `orientation="horizontal"`. Primer asks that the text stay readable when resized or zoomed without horizontal scrolling, so check a horizontal timeline at narrow widths and high zoom.',
				ja: '出来事を左から右へ並べたものです。Ant Design では `orientation="horizontal"` で指定します。Primer は、文字を拡大しても横スクロールなしで読めることを求めているので、横並びは狭い幅や大きな拡大でも確かめます。'
			}
		}
	],
	usage: [
		{
			en: 'Use a timeline when a series of information is ordered by time and a line should connect it visually, as Ant Design puts it.',
			ja: '時間の順に並ぶ一連の情報を、線でつないで見せたいときに使います。Ant Design もこの使い方を挙げています。'
		},
		{
			en: 'Primer asks for a chronological or logical order so people can picture the sequence of events. Stating the order in words near the list, as this demo does, saves them working it out from the dates.',
			ja: 'Primer は、出来事の並びを思い描けるよう、時間順か筋の通った順に並べることを求めています。このデモのように、順番をリストの近くで文字にして書くと、日付から読み取らずに済みます。'
		},
		{
			en: 'Keep each item short. Primer advises against packing too much into one item and says to break long descriptions into smaller pieces.',
			ja: '1つの項目は短くします。Primer は、1つの項目に詰め込みすぎず、長い説明は読みやすい大きさに分けることを勧めています。'
		},
		{
			en: 'When markers differ by color or icon to show the kind or state of an event, describe it in text too (Primer). Primer also says an icon used as a badge should have a text alternative when it conveys essential information about the type, and that the alternative helps screen reader users spot relevant items without listening to every item in full, even when the type is described in the surrounding text. A plain dot that carries no information can be hidden.',
			ja: '出来事の種類や状態を印の色やアイコンで分けるときは、文字でも説明します（Primer）。Primer はさらに、バッジに使うアイコンが種類についての大事な情報を伝えるなら代替テキストを付けるよう求めています。種類が周りの文字にも書いてあっても、代替テキストがあれば、スクリーンリーダーの利用者は項目を全部聞かずに目当ての項目を見つけられるとしています。情報を持たない丸だけの印は、読み上げから外してかまいません。'
		},
		{
			en: 'MDN says `<time>` should not be used for dates before the Gregorian calendar was introduced, because those dates are hard to calculate.',
			ja: 'MDN は、グレゴリオ暦ができる前の日付は計算が難しいので、`<time>` に使わないよう書いています。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Showing an event’s state only by the color of its marker',
				ja: '出来事の状態を、印の色だけで示す'
			},
			harm: {
				en: 'People with color deficiencies or limited color vision, and people on monochrome displays, cannot tell the states apart, because information given only by color is lost to them.',
				ja: '色の見分けにくい人や、色をあまり見分けられない人、白黒の画面で見る人は、色だけで示された状態を区別できません。'
			},
			instead: {
				en: 'Write the state in each item, such as “Done” or “Needs attention”, and keep color as an extra (Primer).',
				ja: '項目ごとに「完了」「要対応」のように状態を文字で書き、色は補いにとどめます（Primer）。'
			}
		},
		{
			pattern: {
				en: 'Building the timeline from plain divs instead of a list',
				ja: 'タイムラインをリストではなく、ただの div で作る'
			},
			harm: {
				en: 'Screen readers cannot announce how many items there are or where each one begins and ends.',
				ja: 'スクリーンリーダーが、項目の数やそれぞれの始まりと終わりを伝えられません。'
			},
			instead: {
				en: 'Use an `<ol>` with an `<li>` for each event.',
				ja: '`<ol>` に、出来事ごとの `<li>` を入れます。'
			}
		}
	],
	related: [
		{
			id: 'feed',
			diff: {
				en: 'A timeline lays out events in time order along a line; a feed is a section of articles that loads more as people scroll and is marked with `role="feed"`.',
				ja: 'タイムラインは出来事を時間順に線に沿って並べ、フィードはスクロールに合わせて記事を読み込み続ける部分で、`role="feed"` を付けます。'
			}
		},
		{
			id: 'stepper',
			diff: {
				en: 'A timeline lays out events by when they happen; a stepper shows the steps of a procedure and which one the user is on.',
				ja: 'タイムラインは出来事をいつ起きたかで並べ、ステップナビゲーションは手続きの段階と、今いる段階を示します。'
			}
		},
		{
			id: 'list',
			diff: {
				en: 'A timeline is a list of events in time order, drawn along a line with their dates; a list holds items of any kind in a plain column.',
				ja: 'タイムラインは出来事を時間順に、日時とともに線に沿って描くリストで、リストはどんな項目もふつうに縦に並べます。'
			}
		}
	],
	sources: [
		{
			label: 'Ant Design: Timeline',
			url: 'https://ant.design/components/timeline',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MUI: Timeline',
			url: 'https://mui.com/material-ui/react-timeline/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Primer: Timeline',
			url: 'https://primer.style/product/components/timeline/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Primer: Timeline accessibility',
			url: 'https://primer.style/product/components/timeline/accessibility/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MDN: <ol>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ol',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MDN: <time>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time',
			checkedAt: '2026-11-03'
		},
		{
			label: 'WAI-ARIA APG: Feed Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/feed/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Understanding Success Criterion 1.4.1: Use of Color (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
			checkedAt: '2026-11-03'
		}
	]
} satisfies ComponentData;
