import type { ComponentData } from '#lib/types.js';

export default {
	id: 'hamburger-menu',
	category: 'action',
	names: { en: 'Hamburger menu button', ja: 'ハンバーガーメニューボタン' },
	aliases: [],
	summary: {
		en: 'A button with three stacked lines that opens the site’s menu, mainly on phones.',
		ja: '3本線のアイコンが付いた、サイトのメニューを開くボタン。主にスマートフォンで使う。'
	},
	appearance: {
		en: 'An icon of three horizontal lines with the word “Menu” beside it, at the left or right end of the page header. Once the menu is open, a button of the same shape shows an × and the word “Close”.',
		ja: '水平線3本のアイコンと「メニュー」の文字を並べたボタンで、ページのヘッダーの左端か右端に置く。メニューを開くと、同じ形のボタンがバツ印と「閉じる」の文字に変わって見える。'
	},
	behavior: [
		{
			en: 'Pressing it opens the mobile menu, which usually slides in from the edge of the screen in a drawer.',
			ja: '押すと、モバイルメニューが開く。モバイルメニューはふつう、ドロワーに入って画面の端から出てくる。'
		},
		{
			en: 'Pressing the Close button in the open menu closes it.',
			ja: '開いたメニューの中にある「閉じる」ボタンを押すと閉じる。'
		},
		{
			en: 'This demo follows the Digital Agency Design System drawer example: the Menu button opens a modal `<dialog>`, and the Close button is a separate button inside it. While the dialog is open the Menu button cannot be used, so it has no `aria-expanded`.',
			ja: 'このデモはデジタル庁デザインシステムのドロワーの実装例にならい、「メニュー」ボタンでモーダルの `<dialog>` を開き、「閉じる」ボタンはその中に別のボタンとして置く。開いている間は「メニュー」ボタンを操作できないので、`aria-expanded` は付けない。'
		},
		{
			en: 'In this demo, choosing a link closes the menu and shows where it would go instead of leaving the page. `closedby="any"` also closes the menu when the dimmed background is clicked; browsers that do not support it ignore it.',
			ja: 'このデモでは、リンクを選ぶとメニューを閉じ、ページを移らずに行き先を表示する。`closedby="any"` により暗くした背景をクリックしても閉じる（対応していないブラウザはこれを無視する）。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'On the Menu button, opens the menu. On the Close button, closes it and returns focus to the Menu button.',
				ja: '「メニュー」ボタンではメニューを開く。「閉じる」ボタンではメニューを閉じ、「メニュー」ボタンにフォーカスを戻す。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between the Close button and the links inside the open menu.',
				ja: '開いたメニューの中で、「閉じる」ボタンとリンクの間を移動する。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the menu and returns focus to the Menu button.',
				ja: 'メニューを閉じ、「メニュー」ボタンにフォーカスを戻す。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Icon and label side by side', ja: 'デスクトップ・モバイル共通' },
			description: {
				en: 'A wide button with the word “Menu” to the right of the icon, as in this demo. The Digital Agency Design System uses this type as a rule.',
				ja: 'このデモのように、アイコンの右に「メニュー」の文字を並べた横長のボタン。デジタル庁デザインシステムは原則としてこの型を使う。'
			}
		},
		{
			name: { en: 'Label under the icon', ja: 'モバイル条件付き' },
			description: {
				en: 'A nearly square button with the word “Menu” under the icon, for headers too short of space for the side-by-side type. The word follows the page language, such as “MENU” and “CLOSE” on English pages.',
				ja: 'アイコンの下に「メニュー」の文字を置いた、正方形に近いボタン。ヘッダーに横長の型を置く場所がないときだけ使う。文字はページの言語に合わせ、英語のページでは「MENU」「CLOSE」にする。'
			}
		}
	],
	usage: [
		{
			en: 'Place it at the left or right end of the header.',
			ja: 'ヘッダーの左端か右端に置く。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Showing only the three-line icon, without the word “Menu”',
				ja: '3本線のアイコンだけを置き、「メニュー」の文字を付けない'
			},
			harm: {
				en: 'Most people now recognize the icon, but not everyone does. People less used to digital services, or who meet the icon in an unfamiliar layout, may not understand that it opens a menu.',
				ja: '今では多くの人がアイコンの意味を知っているが、全員ではない。デジタル機器に慣れていない人や、見慣れない画面でこのアイコンに出会った人は、メニューが開くことに気づかないことがある。'
			},
			instead: {
				en: 'Put the word “Menu” beside the icon. If the header is too short of space, put the word under the icon instead of dropping it.',
				ja: 'アイコンの横に「メニュー」の文字を置く。ヘッダーに場所がなければ、文字を省かずにアイコンの下に置く。'
			}
		},
		{
			pattern: {
				en: 'Hiding the main navigation behind the button on desktop screens as well',
				ja: 'デスクトップの画面でも、主なナビゲーションをこのボタンの奥に隠す'
			},
			harm: {
				en: 'People find the site’s content far less often than when the navigation is visible, take longer, and find the tasks harder. The drop is largest on desktop, where many people did not even notice the button.',
				ja: 'ナビゲーションが見えている場合より、利用者がコンテンツを見つけにくくなり、時間がかかり、難しいと感じる。この差はデスクトップで特に大きく、ボタンに気づきもしない人が多かった。'
			},
			instead: {
				en: 'On wide screens, show the top-level links across the page header, and keep the button for narrow screens.',
				ja: '画面が広いときは最上位のリンクをヘッダーに横に並べて見せ、このボタンは画面が狭いときに使う。'
			}
		}
	],
	related: [
		{
			id: 'drawer',
			diff: {
				en: 'A hamburger menu button is only the trigger; the drawer is the panel it opens from the edge of the screen.',
				ja: 'ハンバーガーメニューボタンは開くきっかけになるボタンで、ドロワーはそれで画面の端から開くパネル。'
			}
		},
		{
			id: 'menu',
			diff: {
				en: 'A hamburger menu button opens the site’s navigation links; a menu button opens a short list of actions right under itself.',
				ja: 'ハンバーガーメニューボタンはサイトのナビゲーションのリンクを開き、メニューボタンは自分のすぐ下に操作の短い一覧を開く。'
			}
		},
		{
			id: 'mobile-menu',
			diff: {
				en: 'A hamburger menu button is the button that opens the menu; the mobile menu is the list of links shown once it opens.',
				ja: 'ハンバーガーメニューボタンはメニューを開くボタンで、モバイルメニューは開いたときに出るリンクの一覧。'
			}
		}
	],
	sources: [
		{
			label: 'デジタル庁デザインシステムウェブサイト「ハンバーガーメニューボタン」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/hamburger-menu-button/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ハンバーガーメニューボタン（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/hamburger-menu-button/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: hamburger-menu-button',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/hamburger-menu-button',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: drawer',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/drawer',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Nielsen Norman Group: The Hamburger-Menu Icon Today: Is it Recognizable?',
			url: 'https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Nielsen Norman Group: Hamburger Menus and Hidden Navigation Hurt UX Metrics',
			url: 'https://www.nngroup.com/articles/hamburger-menus/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
