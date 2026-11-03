import type { ComponentData } from '#lib/types.js';

export default {
	id: 'floating-action-button',
	category: 'action',
	names: { en: 'Floating action button', ja: 'フローティングアクションボタン' },
	aliases: [
		{ name: 'FAB', source: 'Material Design 3', url: 'https://m3.material.io/components/floating-action-button/overview' },
		{ name: 'FloatButton', source: 'Ant Design', url: 'https://ant.design/components/float-button' }
	],
	summary: {
		en: 'A button that floats in front of a screen’s content and stays in place while it scrolls, for the screen’s main action.',
		ja: '画面の内容の手前に浮かび、スクロールしても同じ位置にとどまる、その画面の主な操作のためのボタンです。'
	},
	appearance: {
		en: 'A button with a single clear icon, such as a plus, over the content, usually in the lower right corner of the screen. Material Design 3 describes a square container and MUI typically a circle; either way it needs enough contrast against the surface under it. In this demo, a plus button floats over a small notes screen, and the list of notes scrolls beneath it.',
		ja: '「＋」のような分かりやすいアイコン1つを付けたボタンで、内容の上、多くは画面の右下の隅に重なっています。Material Design 3 は四角い容器、MUI は多くの場合円形で説明していますが、どちらでも下の面とのコントラストが十分に要ります。このデモでは、小さなメモの画面の上に「＋」のボタンが浮かび、その下でメモの一覧がスクロールします。'
	},
	behavior: [
		{
			en: 'Pressing it runs the screen’s main action once, or opens a new screen to carry it out, such as creating something.',
			ja: '押すと、その画面の主な操作を1回実行するか、操作のための新しい画面を開きます。たとえば何かを作る操作です。'
		},
		{
			en: 'It stays in place while the content behind it scrolls. Material Design 3 also says it should disappear and reappear when the screen changes, such as when switching between tabs, to show that it does not belong to any one tab.',
			ja: '後ろの内容がスクロールしても、同じ位置にとどまります。Material Design 3 は、タブの切り替えのように画面が変わるときには、いったん消えて現れ直すものとも書いています。特定のタブに属さないことを示すためです。'
		},
		{
			en: 'Because it floats over the content, it can cover part of whatever has keyboard focus. Material Design 3 allows it to cover a focusable element partly as long as the focus indicator stays clearly visible, and WCAG 2.4.11 is not met only when the focused element is entirely hidden.',
			ja: '内容の上に浮かぶので、キーボードのフォーカスがある部分を覆ってしまうことがあります。Material Design 3 は、フォーカスの表示がはっきり見えていれば、操作できる要素を一部覆うことを認めています。WCAG 2.4.11 を満たさないのは、フォーカスのある要素が完全に隠れたときです。'
		},
		{
			en: 'In this demo, the button is placed with `position: absolute` inside the screen, not fixed to the page, so it stays within the demo frame. It comes before the list in the page order, so Tab reaches it first even though it sits at the lower right. Material Design 3 asks for the button to be prioritized in the focus order; the cost is that the Tab order and the visual order differ.',
			ja: 'このデモでは、ボタンをページに固定せず、画面の中で `position: absolute` を使って重ねているので、デモの枠から出ません。ページ内の順序ではリストより前にあるため、見た目は右下でも、Tab キーはまずボタンに届きます。Material Design 3 はボタンをフォーカスの順序の中で優先するよう求めていますが、引き換えに、Tab の順序と見た目の順序が違います。'
		},
		{
			en: 'In this demo, the list has empty space and scroll padding below its last row. In Chrome, moving focus to a row scrolls it clear of the button, so no row sits under the button while it has focus. Firefox scrolls only when a row would leave the list, so a focused row can sit slightly under the button, and it also stops Tab on the scrolling list itself. Without them, a focused row near the bottom ends up partly under the button, though never entirely hidden. The button covers the end of some unfocused rows’ text, which is more noticeable at a narrow width with large text. In this demo, there is no tooltip. Pressing the button shows the result in the line under the screen.',
			ja: 'このデモでは、リストの最後の行の下に空きと scroll padding を取っています。Chrome では、行にフォーカスを移すと、その行がボタンの下から出る位置までスクロールし、フォーカスのある行がボタンの下に入りません。Firefox は行がリストの外へ出るときだけスクロールするので、フォーカスのある行が少しボタンの下に入ることがあり、Tab はスクロールするリスト自体にも止まります。これがないと、下のほうでフォーカスの移った行は一部がボタンの下に入りますが、完全には隠れません。フォーカスのない行は、幅が狭く文字が大きいと、行の末尾の文字がボタンに隠れることがあります。このデモではツールチップを付けていません。ボタンを押すと、画面の下の行に結果が出ます。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves focus to the button. Material Design 3 asks for the button to be prioritized in the focus order.',
				ja: 'ボタンにフォーカスを移します。Material Design 3 は、ボタンをフォーカスの順序の中で優先するよう求めています。'
			}
		},
		{ key: 'Enter / Space', action: { en: 'Presses the button.', ja: 'ボタンを押します。' } }
	],
	variations: [
		{
			name: { en: 'FAB (icon only)', ja: 'FAB（アイコンのみ）' },
			description: {
				en: 'Only an icon, so its name comes from an accessible name such as “Compose a new message”. Material Design 3 recommends showing a tooltip with the label when it is hovered or focused on the web.',
				ja: 'アイコンだけのものです。名前は「新しいメッセージを作成」のようなアクセシブルな名前で伝えます。Material Design 3 は、ウェブではホバーやフォーカスで、ラベルを書いたツールチップを出すよう勧めています。'
			}
		},
		{
			name: { en: 'Extended FAB (icon and label)', ja: '拡張 FAB（アイコンとラベル）' },
			description: {
				en: 'An icon with a text label. Material Design 3 uses it when the label text is necessary, and lets it collapse into an icon-only FAB on scroll and expand again at the bottom of the view; MUI makes it a variant, and Ant Design allows its text only on a square button.',
				ja: 'アイコンに文字のラベルを添えたものです。Material Design 3 はラベルの文字が必要なときに使い、スクロールでアイコンだけの FAB に縮み、末尾まで来ると広がることもあるとしています。MUI は variant の1つとして用意し、Ant Design は文字を付けられるのを四角いボタンのときだけにしています。'
			}
		}
	],
	usage: [
		{
			en: 'Both Material Design 3 and MUI reserve it for the one main action of a screen, and MUI says to use it only when it is the most suitable way to show that action. Material Design 3 says not every screen needs one, for example when images already stand for the main actions, and lists multiple FABs on one screen as a “don’t”; MUI recommends one per screen. When many kinds of actions relate to it, a FAB menu is the alternative.',
			ja: 'Material Design 3 も MUI も、1つの画面の主な操作1つのために使うとしています。MUI は、その操作を見せるのに最もふさわしい方法であるときだけ使うよう書いています。Material Design 3 は、画像がすでに主な操作を表している場合のように、すべての画面に要るわけではないとしています。また、1つの画面に複数の FAB を置くことを「してはいけない」例に挙げ、MUI も1画面に1つを勧めています。関わる操作が何種類もあるときは FAB メニューにします。'
		},
		{
			en: 'Material Design 3 suggests actions such as create, favorite, share and start a process, and says cards and similar components should not each have their own FAB. Because a FAB promotes an important, constructive action, it also lists actions a FAB should not carry: archive or trash, alerts or errors, limited tasks such as cutting text, and controls better suited to a toolbar. Ant Design’s FloatButton is broader: it is for site-wide functions and buttons visible wherever people browse.',
			ja: 'Material Design 3 は、作る、お気に入りに入れる、共有する、処理を始める、といった操作を挙げ、カードなどの部品ごとに FAB を置かないとしています。FAB は重要で前向きな操作を押し出すものなので、アーカイブや削除、アラートやエラー、文字を切り取るような限られた作業、ツールバーのほうが合う操作は、載せないものとして挙げています。Ant Design の FloatButton はもっと広く、サイト全体の機能や、どこを見ていても見えるボタンのためのものとされています。'
		},
		{
			en: 'Material Design 3 and MUI are guidance for apps and component libraries, not rules for the web. Of the sources here, only WCAG 2.4.11 is a web requirement, at Level AA: a focused component must not be entirely hidden by author-created content such as sticky content. Its Understanding document names scroll padding as one way to keep a sticky banner from overlapping what has focus.',
			ja: 'Material Design 3 と MUI はアプリや部品ライブラリの指針で、ウェブの決まりではありません。ここに挙げた資料のうちウェブの要件なのは WCAG 2.4.11（レベル AA）だけで、フォーカスのある部品が、固定された内容のような制作者の作った内容に完全には隠れないことを求めます。その解説の文書は、固定されたバナーがフォーカスのある部分と重ならないようにする方法の1つとして、scroll padding を挙げています。'
		},
		{
			en: 'Material Design 3 says to name the button for the action it performs, such as “Compose a new message”; to keep the icon at least 3:1 against its container; and not to disable it, but to leave it out when the action is unavailable. For compact and medium windows it suggests the lower right corner, and for wide windows the upper left, such as in a navigation rail, though it says to test that placement with people.',
			ja: 'Material Design 3 は、ボタンの名前を「新しいメッセージを作成」のように、行う操作を表すものにし、アイコンと背景の色の比を3:1以上にし、無効にはせず、操作が使えないときは出さないよう書いています。置く場所は、狭い画面と中くらいの画面では右下の隅、広い画面ではナビゲーションレールのように左上を勧めていますが、その位置は人に試してもらって確かめるよう添えています。'
		},
		{
			en: 'Material Design 3 has three sizes: FAB, medium FAB (the most recommended) and large FAB; the small FAB is no longer recommended. When many kinds of actions relate to the button, it can open into a FAB menu.',
			ja: 'Material Design 3 の大きさは、FAB、中サイズの FAB（最も推奨）、大サイズの FAB の3つで、小さな FAB はもう推奨されていません。ボタンに関わる操作が何種類もあるときは、FAB メニューへ開くこともできます。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Letting the floating button cover what has keyboard focus',
				ja: '浮かぶボタンで、キーボードのフォーカスがある部分を覆う'
			},
			harm: {
				en: 'A button fixed over the content always hides part of what is under it, which the Digital Agency Design System says, of its scroll top button, gets in the way of reading for people who zoom in. If it entirely hides the focused element, people on a keyboard may not know how to proceed or may think the system has stopped responding, and WCAG 2.4.11 is not met.',
				ja: '内容の上に固定したボタンは、下の内容の一部を常に隠します。デジタル庁デザインシステムは、スクロールトップボタンについて、それが拡大して見ている人の閲覧を妨げると書いています。フォーカスのある要素を完全に隠すと、キーボードを使う人はどう進めばよいか分からなくなったり、システムが反応しなくなったと思ったりすることがあり、WCAG 2.4.11 を満たしません。'
			},
			instead: {
				en: 'Leave empty space under the scrolling content, or use scroll padding, so a focused item scrolls clear of the button. Material Design 3 allows a partial overlap only while the focus indicator stays clearly visible.',
				ja: 'スクロールする内容の下に空きを取るか scroll padding を使い、フォーカスの移った項目がボタンの下から出るようにします。Material Design 3 は、フォーカスの表示がはっきり見えているあいだに限り、一部が重なるのを認めています。'
			}
		}
	],
	related: [
		{
			id: 'button',
			diff: {
				en: 'A floating action button is a button for a screen’s main action that floats in front of the content and stays put as it scrolls; a button runs any action in its place in the layout.',
				ja: 'フローティングアクションボタンは画面の主な操作のためのボタンで、内容の手前に浮かんでスクロールしても動きません。ボタンはレイアウトの中の決まった場所で、さまざまな操作を実行します。'
			}
		},
		{
			id: 'back-to-top',
			diff: {
				en: 'A floating action button stands for the main action of a screen, such as creating something; a back to top button has one job, returning to the top.',
				ja: 'フローティングアクションボタンは何かを作るなど、画面の主な操作を受け持ちます。スクロールトップボタンは先頭へ戻ることだけを受け持ちます。'
			}
		},
		{
			id: 'bottom-navigation',
			diff: {
				en: 'A floating action button runs one main action and floats over the content; bottom navigation moves between a few top-level destinations in a bar along the bottom of the screen.',
				ja: 'フローティングアクションボタンは主な操作を1つ実行して内容の上に浮かびます。ボトムナビゲーションは画面の下のバーで、いくつかの最上位の行き先の間を移ります。'
			}
		}
	],
	sources: [
		{
			label: 'Material Design 3: FAB (Overview)',
			url: 'https://m3.material.io/components/floating-action-button/overview',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Material Design 3: FAB (Guidelines)',
			url: 'https://m3.material.io/components/floating-action-button/guidelines',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Material Design 3: FAB (Accessibility)',
			url: 'https://m3.material.io/components/floating-action-button/accessibility',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MUI: Floating Action Button',
			url: 'https://mui.com/material-ui/react-floating-action-button/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Ant Design: FloatButton',
			url: 'https://ant.design/components/float-button',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Understanding Success Criterion 2.4.11: Focus Not Obscured (Minimum) (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html',
			checkedAt: '2026-11-03'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「スクロールトップボタン」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/scroll-top-button/',
			checkedAt: '2026-11-03'
		}
	]
} satisfies ComponentData;
