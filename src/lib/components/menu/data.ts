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
		ja: 'ボタンから開く、操作の一覧。'
	},
	appearance: {
		en: 'A button, often with a downward arrow or a “⋯” icon. Pressing it shows a small panel of action names stacked vertically.',
		ja: '下向き矢印や「⋯」アイコンの付いたボタン。押すと、操作名を縦に並べた小さなパネルが出る。'
	},
	behavior: [
		{
			en: 'Opening the menu moves focus to its first item.',
			ja: 'メニューを開くと、最初の項目にフォーカスが移る。'
		},
		{
			en: 'Choosing an item runs that action and closes the menu.',
			ja: '項目を選ぶとその操作が実行され、メニューが閉じる。'
		},
		{
			en: 'Pressing Esc, pressing Tab, or clicking outside closes the menu without running anything.',
			ja: 'Esc や Tab を押すか、外側をクリックすると、何も実行せずに閉じる。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'On the button, opens the menu. On an item, runs it and closes the menu.',
				ja: 'ボタンではメニューを開く。項目ではその操作を実行してメニューを閉じる。'
			}
		},
		{
			key: '↓',
			action: {
				en: 'On the button, opens the menu at the first item. In the menu, moves to the next item.',
				ja: 'ボタンではメニューを開いて最初の項目へ。メニュー内では次の項目へ移る。'
			}
		},
		{
			key: '↑',
			action: {
				en: 'On the button, opens the menu at the last item. In the menu, moves to the previous item.',
				ja: 'ボタンではメニューを開いて最後の項目へ。メニュー内では前の項目へ移る。'
			}
		},
		{
			key: 'Home / End',
			action: { en: 'Moves to the first or last item.', ja: '最初または最後の項目へ移る。' }
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the menu and returns focus to the button.',
				ja: 'メニューを閉じ、ボタンにフォーカスを戻す。'
			}
		},
		{
			key: 'Tab',
			action: {
				en: 'Closes the menu and moves on to the next element.',
				ja: 'メニューを閉じ、次の要素へ移る。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Overflow menu', ja: 'オーバーフローメニュー' },
			description: {
				en: 'Opened from an icon-only “⋯” button, often in table rows or cards to hold extra actions.',
				ja: '「⋯」アイコンだけのボタンから開くもの。表の行やカードで、追加の操作をしまうのに使う。'
			}
		}
	],
	usage: [
		{
			en: 'Open it on click, not on hover.',
			ja: 'ホバーではなくクリックで開く。'
		},
		{
			en: 'Align the panel with the left or right edge of its button.',
			ja: 'パネルはボタンの左端か右端にそろえる。'
		}
	],
	related: [
		{
			id: 'select',
			diff: {
				en: 'A menu runs an action when an item is chosen; a select keeps the chosen option as a form value.',
				ja: 'メニューは項目を選ぶと操作を実行するが、セレクトは選んだ選択肢をフォームの値として保持する。'
			}
		},
		{
			id: 'split-button',
			diff: {
				en: 'A menu button only opens the menu; a split button also runs a main action directly.',
				ja: 'メニューボタンは押してもメニューを開くだけだが、スプリットボタンは主な操作を直接実行できる。'
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
			checkedAt: '2026-10-20'
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
		}
	]
} satisfies ComponentData;
