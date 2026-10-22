import type { ComponentData } from '#lib/types.js';

export default {
	id: 'menu',
	category: 'action',
	names: { en: 'Menu', ja: 'メニュー' },
	aliases: [
		{ name: 'Menu button', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/menu-buttons/usage/' },
		{ name: 'Dropdown', source: 'Ant Design', url: 'https://ant.design/components/dropdown' },
		{ name: 'メニューリストボックス', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/menu-list-box/' }
	],
	summary: {
		en: 'A list of actions that pops up from a button.',
		ja: 'ボタンから開く、操作の一覧です。'
	},
	appearance: {
		en: 'A button, often with a downward arrow or a “⋯” icon. Pressing it shows a small panel of action names stacked vertically.',
		ja: '下向き矢印や「⋯」アイコンの付いたボタンです。押すと、操作名を縦に並べた小さなパネルが出ます。'
	},
	behavior: [
		{
			en: 'Opening the menu moves focus to its first item.',
			ja: 'メニューを開くと、最初の項目にフォーカスが移ります。'
		},
		{
			en: 'Choosing an item runs that action and closes the menu.',
			ja: '項目を選ぶとその操作が実行され、メニューが閉じます。'
		},
		{
			en: 'Pressing Esc, pressing Tab, or clicking outside closes the menu without running anything.',
			ja: 'Esc や Tab を押すか、外側をクリックすると、何も実行せずに閉じます。'
		},
		{
			en: 'The `role="menu"` element takes its name from the button with `aria-labelledby`, so screen readers say which menu opened.',
			ja: '`role="menu"` の要素は `aria-labelledby` で開くボタンを指して名前を得るので、スクリーンリーダーはどのメニューが開いたかを読み上げます。'
		},
		{
			en: 'In this demo, a `role="separator"` line sets the destructive item apart at the end of each menu. Arrow keys skip over the line.',
			ja: 'このデモでは、`role="separator"` の区切り線で、取り消しにくい操作をメニューの最後に離して置いています。矢印キーは区切り線を飛ばして移ります。'
		},
		{
			en: 'In this demo, the file row has an icon-only “⋯” overflow button whose name comes from `aria-label`. Its menu lines up with the button’s right edge so it stays inside the row.',
			ja: 'このデモのファイルの行には、`aria-label` で名前を付けた「⋯」アイコンだけのオーバーフローボタンがあります。そのメニューは、行からはみ出さないようボタンの右端にそろえます。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'On the button, opens the menu. On an item, runs it and closes the menu.',
				ja: 'ボタンではメニューを開きます。項目ではその操作を実行してメニューを閉じます。'
			}
		},
		{
			key: '↓',
			action: {
				en: 'On the button, opens the menu at the first item. In the menu, moves to the next item; from the last item it goes back to the first.',
				ja: 'ボタンではメニューを開いて最初の項目へ移ります。メニュー内では次の項目へ進み、最後の項目からは最初の項目へ回ります。'
			}
		},
		{
			key: '↑',
			action: {
				en: 'On the button, opens the menu at the last item. In the menu, moves to the previous item; from the first item it goes to the last.',
				ja: 'ボタンではメニューを開いて最後の項目へ移ります。メニュー内では前の項目へ進み、最初の項目からは最後の項目へ回ります。'
			}
		},
		{
			key: 'Home / End',
			action: { en: 'Moves to the first or last item.', ja: '最初または最後の項目へ移ります。' }
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the menu and returns focus to the button.',
				ja: 'メニューを閉じ、ボタンにフォーカスを戻します。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Closes the menu and moves on to the next element. Shift + Tab goes back to the menu button.',
				ja: 'メニューを閉じ、次の要素へ移ります。Shift + Tab ではメニューボタンへ戻ります。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Overflow menu', ja: 'オーバーフローメニュー' },
			description: {
				en: 'Opened from an icon-only “⋯” button, often in table rows or cards to hold extra actions. The button needs a name such as “More options for report.pdf”.',
				ja: '「⋯」アイコンだけのボタンから開くものです。表の行やカードで、追加の操作をしまうのによく使います。ボタンには「report.pdf のその他の操作」のような名前を付けます。'
			}
		}
	],
	usage: [
		{
			en: 'Align the panel with the left or right edge of its button.',
			ja: 'パネルはボタンの左端か右端にそろえます。'
		},
		{
			en: 'Group related actions with dividers, and set high-impact actions such as deleting apart from the rest with a divider.',
			ja: '関係する操作を区切り線でまとめ、削除のように影響の大きい操作は区切り線でほかの操作から離します。'
		}
	],
	misuse: [
		{
			pattern: { en: 'Opening the menu as soon as the pointer passes over it', ja: 'マウスが上を通っただけでメニューを開く' },
			harm: {
				en: 'Moving the pointer past the button on the way to something else opens a menu nobody asked for. The open menu can cover the page, so people have to close it before they can reach what they came for.',
				ja: 'ほかの場所へマウスを動かす途中で、望んでいないメニューが開きます。開いたメニューがページの内容を覆い、目的の場所へ進む前に閉じる手間がかかります。'
			},
			instead: {
				en: 'Open the menu on click or tap. If it must open on hover, wait about 0.3 to 0.5 seconds after the pointer stops before showing it.',
				ja: 'メニューはクリックやタップで開きます。どうしてもホバーで開くなら、マウスが止まってから0.3〜0.5秒ほど待って表示します。'
			}
		}
	],
	related: [
		{
			id: 'select',
			diff: {
				en: 'A menu runs an action when an item is chosen; a select keeps the chosen option as a form value.',
				ja: 'メニューは項目を選ぶと操作を実行しますが、セレクトは選んだ選択肢をフォームの値として保持します。'
			}
		},
		{
			id: 'split-button',
			diff: {
				en: 'A menu button only opens the menu; a split button also runs a main action directly.',
				ja: 'メニューボタンは押してもメニューを開くだけですが、スプリットボタンは主な操作を直接実行できます。'
			}
		},
		{
			id: 'toolbar',
			diff: {
				en: 'A menu hides actions in a list that opens on demand; a toolbar keeps a group of controls visible in a row.',
				ja: 'メニューは操作を必要なときに開くリストにしまい、ツールバーは操作部品を1列に並べて常に見せます。'
			}
		},
		{
			id: 'hamburger-menu',
			diff: {
				en: 'A menu button opens a short list of actions right under itself; a hamburger menu button opens the site’s navigation links.',
				ja: 'メニューボタンは自分のすぐ下に操作の短い一覧を開き、ハンバーガーメニューボタンはサイトのナビゲーションのリンクを開きます。'
			}
		},
		{
			id: 'menubar',
			diff: {
				en: 'A menu opens from a single button and closes after use; a menubar stays visible and holds several menus side by side.',
				ja: 'メニューは1つのボタンから開いて使い終わると閉じ、メニューバーは常に表示されて複数のメニューを横に並べて持ちます。'
			}
		},
		{
			id: 'mega-menu',
			diff: {
				en: 'A menu lists a few actions in a narrow column; a mega menu shows many navigation links in a wide panel.',
				ja: 'メニューはいくつかの操作を細い列に並べ、メガメニューは多くのナビゲーションのリンクを幅の広いパネルで見せます。'
			}
		},
		{
			id: 'language-selector',
			diff: {
				en: 'A menu lists actions to run on the current page; a language selector lists links to the same page in other languages.',
				ja: 'メニューは今のページで実行する操作を並べ、ランゲージセレクターは同じページの別の言語版へのリンクを並べます。'
			}
		},
		{
			id: 'context-menu',
			diff: {
				en: 'A menu opens from a visible button; a context menu opens where an item is right-clicked and has no visible trigger.',
				ja: 'メニューは見えるボタンから開き、コンテキストメニューは項目を右クリックした場所に開いて、開くための見えるボタンがありません。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Menu Button Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Menu and Menubar Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Carbon Design System: Menu buttons',
			url: 'https://carbondesignsystem.com/components/menu-buttons/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Carbon Design System: Menu',
			url: 'https://carbondesignsystem.com/components/menu/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Ant Design: Dropdown',
			url: 'https://ant.design/components/dropdown',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「メニューリストボックス」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/menu-list-box/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Nielsen Norman Group: Timing Guidelines for Exposing Hidden Content',
			url: 'https://www.nngroup.com/articles/timing-exposing-content/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
