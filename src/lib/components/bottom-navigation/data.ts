import type { ComponentData } from '#lib/types.js';

export default {
	id: 'bottom-navigation',
	category: 'navigation',
	names: { en: 'Bottom navigation', ja: 'ボトムナビゲーション' },
	aliases: [
		{ name: 'Navigation bar', source: 'Material Design 3', url: 'https://m3.material.io/components/navigation-bar/overview' },
		{ name: 'Tab bar', source: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/tab-bars' }
	],
	searchTerms: ['下部ナビゲーション'],
	summary: {
		en: 'A bar along the bottom of a phone-sized screen with three to five top-level destinations, each an icon with a label and one marked as the current one. The Digital Agency Design System no longer recommends it.',
		ja: 'スマートフォンほどの大きさの画面の下端に置く、3〜5個の最上位の行き先を並べたバーです。行き先はアイコンとラベルで示し、1つを今いる場所として示します。デジタル庁デザインシステムは、使うことを勧めていません。'
	},
	appearance: {
		en: 'A full-width bar fixed to the bottom edge of the screen, divided into equal-width items. Each item has an icon with a short text label below it, and the current item is set apart with something besides color, such as a filled icon or a pill-shaped indicator.',
		ja: '画面の下端に固定した、幅いっぱいのバーです。同じ幅の項目に分かれ、各項目はアイコンとその下の短い文字のラベルでできています。今の項目は、塗りつぶしたアイコンや丸みのある帯など、色のほかの手がかりでも区別します。'
	},
	behavior: [
		{
			en: 'Each item takes people to one top-level destination of the product. The bar stays in the same place while the content above it changes, so people can move on to another destination.',
			ja: '項目はそれぞれ、サービスの最上位の行き先の1つへ移ります。バーは同じ場所に残ったまま上の内容が切り替わるので、続けて別の行き先へ移れます。'
		},
		{
			en: 'One destination is always current. Material Design 3 marks it with a filled icon and an active indicator, and uses the indicator for one destination at a time.',
			ja: '今の行き先は、常に1つあります。Material Design 3 では塗りつぶしたアイコンとアクティブインジケーターで示し、インジケーターを付けるのは同時に1つの行き先だけです。'
		},
		{
			en: 'When the destinations are links to pages, the current one has `aria-current="page"` as well as the visible mark. Only one element in a set is marked with `aria-current`. A tab that is selected rather than current uses `aria-selected` instead, which is how this differs from tabs.',
			ja: '行き先がページへのリンクのときは、今の項目に、見た目の印に加えて `aria-current="page"` を付けます。`aria-current` を付けるのは、1つの集まりの中で1つの要素だけです。現在のものではなく選択されたタブには `aria-selected` を使います。ここがタブとの違いです。'
		},
		{
			en: 'It is a `<nav>` with a list of links. A page can have several `<nav>` elements, and MDN suggests naming each (for example with `aria-labelledby`) so they can be told apart.',
			ja: '`<nav>` の中にリンクの一覧を置いて作ります。1つのページに `<nav>` が複数あってよく、MDN は、区別できるよう、それぞれに名前を付けることを勧めています（たとえば `aria-labelledby`）。'
		},
		{
			en: 'Choosing the destination that is already current scrolls its content back to the top. When moving to another destination, the product either returns to where the person left off there (scroll position, tab, in-line search) or resets it, depending on what suits the product.',
			ja: 'すでに今の行き先を選び直すと、その内容の先頭へ戻ります。別の行き先へ移るときは、前に離れた状態（スクロール位置、タブ、ページ内の検索）に戻すか、初期の状態にするか、サービスに合うほうを選びます。'
		},
		{
			en: 'Swiping across the screen does not move between destinations. Material Design 3 reserves swiping for related items such as carousel cards, or for actions such as archiving.',
			ja: '画面を横になぞっても、行き先は切り替わりません。Material Design 3 は、なぞる操作をカルーセルのカードのような関連する項目や、アーカイブのような操作のために空けておくとしています。'
		},
		{
			en: 'In this demo, the `<nav>` comes before the content in the source, and CSS only draws it below the content. Tab reaches the bar first, which avoids the problem the Digital Agency Design System describes for a bar placed last in the DOM. The cost is that the focus order no longer matches what is drawn: Tab goes through the bar at the bottom and then jumps back up to the Reset button at the top of the frame.',
			ja: 'このデモでは、`<nav>` を内容より前に置き、CSS で内容の下に描いています。Tab キーはバーにいちばん先に届くので、デジタル庁デザインシステムが挙げる、バーを DOM の最後に置いたときの問題を避けられます。代わりに、フォーカスの順序と描いてある位置が合わなくなります。Tab キーは下のバーを通ったあと、枠の上端にあるリセットのボタンへ戻るように移ります。'
		},
		{
			en: 'In this demo, the bar sits at the bottom of the phone-shaped frame, not of the browser window, and choosing an item does not leave the page. It marks the item as current and changes the heading of the content. The current item has a bar above it and bold text, not only a different color.',
			ja: 'このデモでは、バーはブラウザーの画面ではなく、スマートフォン形の枠の下端に置きます。項目を選んでもページは移らず、その項目を今の項目として示し、内容の見出しを切り替えます。今の項目には、色を変えるだけでなく、上の線と太字も付けます。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves through the items in order. In this demo the bar is reached first, even though it is drawn at the bottom, because it is first in the source.',
				ja: '項目を順に移動します。このデモでは、バーは内容より前に置いてあるので、下に描いていても最初に届きます。'
			}
		},
		{
			key: 'Enter',
			action: {
				en: 'On a link, goes to that destination.',
				ja: 'リンクでは、その行き先へ移ります。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Vertical and horizontal items', ja: '縦並びの項目と横並びの項目' },
			description: {
				en: 'Material Design 3 puts the label below the icon in compact windows such as phones, and beside it in medium windows such as tablets. For expanded windows it advises a navigation rail instead, not a navigation bar.',
				ja: 'Material Design 3 では、スマートフォンのような小さな画面ではアイコンの下に、タブレットのような中くらいの画面ではアイコンの横にラベルを置きます。大きな画面には、ナビゲーションバーではなくナビゲーションレールを使うよう案内しています。'
			}
		},
		{
			name: { en: 'Floating tab bar', ja: '浮かせたタブバー' },
			description: {
				en: 'On iOS, Apple’s tab bar floats above the content at the bottom of the screen, on a translucent background. On iPadOS the system shows it near the top of the screen instead, and it can be changed into a sidebar.',
				ja: 'Apple の iOS のタブバーは、画面の下で内容の上に浮かび、背景が透けます。iPadOS では、システムが画面の上のほうに出し、サイドバーに変えることもできます。'
			}
		},
		{
			name: { en: 'Icons only for inactive items', ja: '現在でない項目はアイコンだけ' },
			description: {
				en: 'MUI shows the labels all the time when there are three destinations, and only the icon on inactive items when there are four or five. Material Design 3 and Apple both ask for a label on every item, so check which guidance fits before dropping them.',
				ja: 'MUI は、行き先が3つのときはラベルを常に見せ、4つか5つのときは今でない項目をアイコンだけにする例を示しています。Material Design 3 と Apple はどちらもすべての項目にラベルを付けるよう求めているので、外す前にどの指針に沿うか確かめます。'
			}
		},
		{
			name: { en: 'Badges', ja: 'バッジ' },
			description: {
				en: 'A small badge on an icon shows that something has been updated, and a larger badge shows how many updates there are. Apple reserves badges for critical information so they keep their meaning.',
				ja: 'アイコンに付ける小さなバッジは更新があることを、大きなバッジは更新の件数を示します。Apple は、バッジの意味が薄れないよう、重要な情報のためだけに使うよう勧めています。'
			}
		}
	],
	usage: [
		{
			en: 'The Digital Agency Design System marks the bottom navigation as deprecated: it says the component is no longer recommended for accessibility or usability reasons. If it cannot be avoided, it asks people to use it carefully, bearing in mind the users who are put at a disadvantage.',
			ja: 'デジタル庁デザインシステムは、ボトムナビゲーションを非推奨（deprecated）としています。アクセシビリティやユーザビリティの観点などから、使うことを勧めないコンポーネントだとしています。やむを得ず使うときは、不利益を受ける利用者がいることを踏まえて、注意深く使うよう求めています。'
		},
		{
			en: 'Its reasons: fixing the navigation to the bottom of the screen can conflict with the mobile browser’s own UI and gesture areas when people try to use it. And when the navigation is last in the DOM, keyboard users have to move focus all the way down to it even though it is visible, and screen reader users have a hard time finding it.',
			ja: '理由は次の2つです。画面の下にナビゲーションを固定すると、操作しようとしたときに、モバイルブラウザーの UI やジェスチャーの領域と競合するおそれがあります。また、ナビゲーションを DOM の最後に置くと、目には見えていても、キーボード操作では最後までフォーカスを移さないと届かず、スクリーンリーダーでも見つけにくくなります。'
		},
		{
			en: 'Instead, the Digital Agency Design System says to put a horizontal menu at the top of the page, and on phones to combine a hamburger menu button with a mobile menu.',
			ja: '代わりにデジタル庁デザインシステムは、ページの上部に水平メニューを置き、スマートフォンではハンバーガーメニューボタンとモバイルメニューを組み合わせて使うよう案内しています。'
		},
		{
			en: 'Material Design 3 and Apple describe it for native apps. Material Design 3 lists its navigation bar as available for Android, Compose and Flutter and as unavailable for the Web, and says that bottom navigation was renamed navigation bar and that the baseline bar is no longer recommended. Apple’s tab bar is guidance for apps on Apple platforms such as iOS and iPadOS. The Digital Agency Design System’s deprecation is about websites, so these are not rival advice for one context. What they do say about the bar in an app: three to five main destinations of equal importance on phones and tablets only (Material Design 3), and the top-level sections of an app (Apple). MUI, a React library for the web, also offers a bottom navigation component for three to five primary destinations.',
			ja: 'Material Design 3 と Apple は、ネイティブアプリの部品として説明しています。Material Design 3 はナビゲーションバーを、Android、Compose、Flutter 向けには提供し、Web 向けには提供していないとしています。また、ボトムナビゲーションがナビゲーションバーに名前を変えたこと、従来のバーは勧められなくなったことも書いています。Apple のタブバーは、iOS や iPadOS など Apple のプラットフォームのアプリ向けの指針です。デジタル庁デザインシステムが非推奨としているのはウェブサイトの場合なので、同じ場面についての食い違う助言ではありません。アプリでのバーについては、スマートフォンとタブレットだけで同じ重みの3〜5個の主要な行き先（Material Design 3）、アプリの最上位の区分（Apple）としています。ウェブ向けの React ライブラリの MUI にも、3〜5個の主要な行き先のためのボトムナビゲーションの部品があります。'
		},
		{
			en: 'Keep it to three to five destinations. Material Design 3 says that with more than five the items may collide and leave too little room for translated text, and to use tabs for related content within a page or a menu icon that opens a modal navigation rail instead. With fewer than three destinations, it advises tabs. Apple advises avoiding the More tab that appears when there are too many tabs, because it makes the hidden ones harder to reach and notice.',
			ja: '行き先は3〜5個にします。Material Design 3 は、5個より多いと項目がぶつかり、翻訳した文字の場所も足りなくなるおそれがあるとし、ページ内の関連する内容にはタブ、または、メニューのアイコンから開くモーダルのナビゲーションレールを使うよう案内しています。3個に満たないときはタブを勧めています。Apple は、タブが多すぎると現れる「その他」のタブを避けるよう勧めています。隠れた項目に気づきにくく、届きにくくなるためです。'
		},
		{
			en: 'Use it to move between sections, not to act. Apple says a tab bar is for navigation and that controls acting on the current view belong in a toolbar, and Material Design 3 says not to use it for a single task such as viewing one email. Use tabs for related content within a page, and the bar for distinct pages.',
			ja: '操作ではなく、区分の移動に使います。Apple は、タブバーはナビゲーションのためのもので、今の画面に働きかける操作はツールバーに置くとし、Material Design 3 は、メールを1通開くような1つの作業には使わないとしています。関連する内容を1ページの中で切り替えるときはタブ、別々のページにはこのバーを使います。'
		},
		{
			en: 'Give every item a label as well as an icon, of one or two words. Material Design 3 says the label is another way to understand the icon and should not be wrapped, truncated or shrunk, and Apple suggests single words whenever possible.',
			ja: 'すべての項目にアイコンとラベルを付け、ラベルは1〜2語にします。Material Design 3 は、ラベルはアイコンの意味を知るもう1つの手がかりであり、折り返したり、切り詰めたり、縮めたりしないとしています。Apple も、できるだけ1語にするよう勧めています。'
		},
		{
			en: 'Keep the bar visible when people move between sections. Apple says that hiding it can make people forget which area they are in. Material Design 3 allows hiding it on scroll, but not while a screen reader is active, and says it should not be permanently covered on any screen.',
			ja: '区分を移るあいだも、バーは見える状態にしておきます。Apple は、隠すと今どこにいるのか忘れてしまうことがあるとしています。Material Design 3 は、スクロールで隠してもよいが、スクリーンリーダーが動いているときは隠さないとし、どの画面でも、いつまでもバーが覆われたままにしないよう求めています。'
		},
		{
			en: 'Show the current destination with more than color. Material Design 3 asks for a filled icon and an active indicator on one destination only, with active and inactive icons at a contrast ratio of at least 3:1 against the bar, and warns against using several or low-contrast colors, which make the active item harder to tell apart.',
			ja: '今の行き先は、色だけでなく別の手がかりでも示します。Material Design 3 は、塗りつぶしたアイコンとアクティブインジケーターを1つの行き先だけに付け、今の項目も今でない項目も、アイコンとバーとのコントラスト比を3:1以上にするよう求めています。色をいくつも使ったり、コントラストの低い色を使ったりすると、今の項目が分かりにくくなると注意しています。'
		},
		{
			en: 'Keep the source order in mind. WCAG 2.4.3 Focus Order says that without scripting or `tabindex` the focus order is the order of the components in the content stream, and the order must preserve meaning and operability. Moving a bar to the bottom with CSS only changes where it is drawn, so Tab still follows the source. Putting the `<nav>` first avoids the problem the Digital Agency Design System describes, but trades it for a mismatch between the focus order and the visual order that needs care. The same page says that a sighted keyboard user follows the visual presentation while a screen reader user follows the reading order, that care is needed so that focus does not seem to jump around randomly to either of them, and that as a best practice the focus order should reinforce the reading order the visual layout implies. WCAG does not endorse this remedy.',
			ja: '内容の並び順に気を付けます。WCAG の達成基準 2.4.3 フォーカスの順序は、スクリプトや `tabindex` を使わなければ、フォーカスの順序はコンテンツの中での部品の並び順になり、その順序は意味と操作を損なわないものでなければならないとしています。CSS でバーを下に動かしても、変わるのは描く位置だけなので、Tab キーは今までどおり内容の並び順に従います。`<nav>` を先に置くと、デジタル庁デザインシステムが挙げる問題は避けられますが、代わりに、フォーカスの順序と見た目の順序が合わなくなり、注意が必要になります。同じページは、目で見るキーボード利用者は見た目の並びに、スクリーンリーダーの利用者は読み上げの順序に従うこと、どちらの利用者にも、フォーカスがでたらめに飛ぶように見えないよう気を付けること、フォーカスの順序は見た目のレイアウトが示す読み順を補強するのが望ましいことを述べています。WCAG は、この方法を勧めているわけではありません。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Fixing the site’s main navigation to the bottom of the screen on a phone',
				ja: 'スマートフォンで、サイトの主なナビゲーションを画面の下に固定する'
			},
			harm: {
				en: 'The bar can conflict with the mobile browser’s UI and gesture areas when people try to operate it.',
				ja: '操作しようとしたときに、モバイルブラウザーの UI やジェスチャーの領域と競合するおそれがあります。'
			},
			instead: {
				en: 'Put a horizontal menu at the top of the page, and on phones combine a hamburger menu button with a mobile menu, as the Digital Agency Design System recommends.',
				ja: 'デジタル庁デザインシステムが勧めるとおり、ページの上部に水平メニューを置き、スマートフォンではハンバーガーメニューボタンとモバイルメニューを組み合わせます。'
			}
		},
		{
			pattern: {
				en: 'Putting the navigation last in the DOM because it is drawn at the bottom',
				ja: '画面の下に見えるからと、ナビゲーションを DOM の最後に置く'
			},
			harm: {
				en: 'Although it is visible, keyboard users have to move focus all the way to the bottom to reach it, and screen reader users have a hard time finding it.',
				ja: '目には見えていても、キーボード操作では最後までフォーカスを移さないと届かず、スクリーンリーダーでも見つけにくくなります。'
			},
			instead: {
				en: 'Avoid the bar. If it cannot be avoided, one option is to put the `<nav>` early in the source and draw it at the bottom with CSS, as the demo does, but then the focus order differs from the visual order and needs care.',
				ja: 'バーを避けます。やむを得ず使うときの1つの方法は、このデモのように `<nav>` を内容より前に置いて CSS で下に描くことですが、その場合はフォーカスの順序と見た目の順序が合わなくなるので、注意が必要です。'
			}
		},
		{
			pattern: {
				en: 'Putting more than five destinations in the bar',
				ja: 'バーに5個より多い行き先を入れる'
			},
			harm: {
				en: 'The items may collide and there likely will not be enough room for translated text. With a More tab for the rest, the hidden ones are harder to reach and notice.',
				ja: '項目がぶつかり、翻訳した文字の場所も足りなくなるおそれがあります。残りを「その他」のタブにまとめると、隠れた項目に気づきにくく、届きにくくなります。'
			},
			instead: {
				en: 'Keep to three to five top-level destinations. For more, use tabs for related content within a page, or put the navigation behind a menu button, as Material Design 3 suggests.',
				ja: '最上位の行き先は3〜5個にします。それより多いときは、ページ内の関連する内容にはタブを使うか、Material Design 3 が案内するように、ナビゲーションをメニューのボタンの後ろに置きます。'
			}
		},
		{
			pattern: {
				en: 'Showing only icons, with no labels',
				ja: 'ラベルを付けず、アイコンだけにする'
			},
			harm: {
				en: 'The label is another way for people to understand what an icon means.',
				ja: 'ラベルは、アイコンの意味を知るもう1つの手がかりです。'
			},
			instead: {
				en: 'Give each item a short label of one or two words next to its icon.',
				ja: '各項目に、アイコンと並べて1〜2語の短いラベルを付けます。'
			}
		}
	],
	related: [
		{
			id: 'tabs',
			diff: {
				en: 'Bottom navigation moves between three to five top-level destinations along the bottom of a phone screen, with the current one marked; tabs switch between panels of related content inside one page.',
				ja: 'ボトムナビゲーションはスマートフォンの画面の下で、3〜5個の最上位の行き先の間を移り、今の行き先を示します。タブは1つのページの中の関連する内容のパネルを切り替えます。'
			}
		},
		{
			id: 'side-navigation',
			diff: {
				en: 'Bottom navigation puts three to five top-level destinations in a bar along the bottom of a phone screen; side navigation lists the pages of a site or a section in a column beside the content.',
				ja: 'ボトムナビゲーションはスマートフォンの画面の下のバーに3〜5個の最上位の行き先を並べ、サイドナビゲーションはサイトやそのあるまとまりのページを内容の横の列に並べます。'
			}
		},
		{
			id: 'mobile-menu',
			diff: {
				en: 'Bottom navigation keeps three to five destinations in a bar along the bottom of the screen; a mobile menu stacks the site’s navigation in a list that is opened from a button, which the Digital Agency Design System recommends for phones.',
				ja: 'ボトムナビゲーションは画面の下のバーに3〜5個の行き先を残し、モバイルメニューはサイトのナビゲーションを縦に積んでボタンから開きます。デジタル庁デザインシステムは、スマートフォンにはこちらを勧めています。'
			}
		},
		{
			id: 'hamburger-menu',
			diff: {
				en: 'Bottom navigation shows its destinations in a bar at the bottom of the screen; a hamburger menu button keeps them behind one button that opens the menu, which the Digital Agency Design System recommends for phones.',
				ja: 'ボトムナビゲーションは行き先を画面の下のバーに見せ、ハンバーガーメニューボタンは行き先を1つのボタンの後ろに置いてメニューを開きます。デジタル庁デザインシステムは、スマートフォンにはこちらを勧めています。'
			}
		},
		{
			id: 'mega-menu',
			diff: {
				en: 'Bottom navigation is a bar of three to five destinations along the bottom of a phone screen; a mega menu is a wide panel of a section’s pages that opens from a horizontal menu on a wide screen.',
				ja: 'ボトムナビゲーションはスマートフォンの画面の下にある3〜5個の行き先のバーで、メガメニューは広い画面で水平メニューから開く、カテゴリのページをまとめて見せる幅の広いパネルです。'
			}
		}
	],
	sources: [
		{
			label: 'デジタル庁デザインシステムウェブサイト「ボトムナビゲーション」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/bottom-navigation/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Material Design 3: Navigation bar',
			url: 'https://m3.material.io/components/navigation-bar/overview',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Material Design 3: Navigation bar (guidelines)',
			url: 'https://m3.material.io/components/navigation-bar/guidelines',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Apple Human Interface Guidelines: Tab bars',
			url: 'https://developer.apple.com/design/human-interface-guidelines/tab-bars',
			checkedAt: '2026-11-02'
		},
		{
			label: 'MUI: Bottom Navigation',
			url: 'https://mui.com/material-ui/react-bottom-navigation/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'MDN: aria-current',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current',
			checkedAt: '2026-11-02'
		},
		{
			label: 'MDN: <nav>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Understanding Success Criterion 2.4.3: Focus Order (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html',
			checkedAt: '2026-11-02'
		}
	]
} satisfies ComponentData;
