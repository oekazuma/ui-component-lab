import type { ComponentData } from '#lib/types.js';

export default {
	id: 'menubar',
	category: 'navigation',
	names: { en: 'Menubar', ja: 'メニューバー' },
	aliases: [],
	summary: {
		en: 'A row of menus that always stays visible, where each item opens a list of commands.',
		ja: '常に表示されている横並びのメニューの列です。項目ごとに操作の一覧を開きます。'
	},
	appearance: {
		en: 'A row of short words such as File, Edit, and View along the top of an app or window. Choosing one drops down a list of commands under it.',
		ja: 'アプリやウィンドウの上部に、「ファイル」「編集」「表示」のような短い語が横に並びます。1つを選ぶと、その下に操作の一覧が出ます。'
	},
	behavior: [
		{
			en: 'Unlike a menu button, the bar itself never closes. It has `role="menubar"`, and each item is a `menuitem` with `aria-haspopup` and `aria-expanded`.',
			ja: 'メニューボタンと違い、バーそのものは閉じません。バーには `role="menubar"` を付け、各項目は `aria-haspopup` と `aria-expanded` を持つ `menuitem` にします。'
		},
		{
			en: 'The whole menubar is a single Tab stop, and the arrow keys move between its items (roving `tabindex`).',
			ja: 'メニューバー全体で Tab キーが止まるのは1か所だけで、項目の間は矢印キーで移ります（ロービングタブインデックス）。'
		},
		{
			en: 'While a submenu is open, ← and → close it and open the submenu of the item next to it.',
			ja: 'サブメニューを開いている間は、← と → でそれを閉じ、隣の項目のサブメニューを開きます。'
		},
		{
			en: 'Choosing a command runs it and closes the submenu. In this demo, focus then returns to the menubar item.',
			ja: '操作を選ぶとそれを実行し、サブメニューを閉じます。このデモでは、そのあとメニューバーの項目にフォーカスを戻します。'
		},
		{
			en: 'In this demo, the commands only show which one was chosen. Moving to an item by typing its first letter, which the APG lists as optional, is left out.',
			ja: 'このデモでは、操作を選ぶと選んだ操作を表示するだけです。APG で任意とされている、頭文字のキーで項目へ移る機能は省いています。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'On a menubar item, opens its submenu at the first command. On a command, runs it and closes the submenu.',
				ja: 'メニューバーの項目では、サブメニューを開いて最初の操作へ移ります。操作ではそれを実行し、サブメニューを閉じます。'
			}
		},
		{
			key: '↑',
			action: {
				en: 'On a menubar item, opens its submenu at the last command. In a submenu, moves to the previous command; from the first it goes to the last.',
				ja: 'メニューバーの項目では、サブメニューを開いて最後の操作へ移ります。サブメニューでは前の操作へ移り、最初からは最後へ回ります。'
			}
		},
		{
			key: '↓',
			action: {
				en: 'On a menubar item, opens its submenu at the first command. In a submenu, moves to the next command; from the last it goes to the first.',
				ja: 'メニューバーの項目では、サブメニューを開いて最初の操作へ移ります。サブメニューでは次の操作へ移り、最後からは最初へ回ります。'
			}
		},
		{
			key: '← / →',
			action: {
				en: 'On the menubar, moves to the previous / next item, wrapping at either end. In a submenu, closes it and opens the submenu of the previous / next item.',
				ja: 'メニューバーでは前・次の項目へ移り、端では反対の端へ回ります。サブメニューではそれを閉じ、前・次の項目のサブメニューを開きます。'
			}
		},
		{
			key: 'Home / End',
			action: {
				en: 'Moves to the first / last item of the menubar or the submenu.',
				ja: 'メニューバーやサブメニューの最初・最後の項目へ移ります。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the submenu and returns focus to its menubar item.',
				ja: 'サブメニューを閉じ、そのメニューバーの項目にフォーカスを戻します。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves into the menubar at the item last used. From a submenu, closes it and moves out of the menubar.',
				ja: 'メニューバーに入るときは、最後に使った項目へ移ります。サブメニューからは、それを閉じてメニューバーの外へ出ます。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Checkbox and radio items', ja: 'チェックとラジオの項目' },
			description: {
				en: 'Submenus can hold on/off items (`menuitemcheckbox`) and pick-one items (`menuitemradio`), whose state is given by `aria-checked`.',
				ja: 'サブメニューには、オンとオフを切り替える項目（`menuitemcheckbox`）や、1つを選ぶ項目（`menuitemradio`）も置けます。状態は `aria-checked` で示します。'
			}
		},
		{
			name: { en: 'Vertical menubar', ja: '縦のメニューバー' },
			description: {
				en: 'The items are stacked vertically, and the menubar gets `aria-orientation="vertical"`.',
				ja: '項目を縦に並べるものです。メニューバーに `aria-orientation="vertical"` を付けます。'
			}
		}
	],
	usage: [
		{
			en: 'For a site’s navigation, use links and disclosure buttons instead of `role="menubar"`. The menubar pattern needs complex keyboard behavior that typical site navigation does not, and few sites need it. The Digital Agency Design System’s horizontal menu is this kind of site navigation, not a menubar: items that go to a page are links, and items that open a submenu are buttons with `aria-expanded`. See the mega menu.',
			ja: 'サイトのナビゲーションには `role="menubar"` を使わず、リンクと開閉ボタン（ディスクロージャー）で作ります。メニューバーのパターンは、一般的なサイトのナビゲーションには要らない複雑なキー操作を必要とし、それが要るサイトは少ないです。デジタル庁デザインシステムの水平メニューはメニューバーではなくこの種のサイトのナビゲーションで、ページへ移る項目はリンク、サブメニューを開く項目は `aria-expanded` を持つボタンにします。メガメニューも参照してください。'
		},
		{
			en: 'Add “…” to the label of a command that needs more input before it runs, such as one that opens a dialog, as in “Open…”.',
			ja: 'ダイアログを開く操作のように、実行する前に入力や選択が要る操作には、「開く…」のようにラベルの最後に「…」を付けます。'
		}
	],
	related: [
		{
			id: 'menu',
			diff: {
				en: 'A menubar stays visible and holds several menus side by side; a menu opens from a single button and closes after use.',
				ja: 'メニューバーは常に表示されて複数のメニューを横に並べて持ち、メニューは1つのボタンから開いて使い終わると閉じます。'
			}
		},
		{
			id: 'tabs',
			diff: {
				en: 'A menubar item opens a list of commands; a tab shows its own panel of content in place.',
				ja: 'メニューバーの項目は操作の一覧を開き、タブはその場で自分のパネルの内容を見せます。'
			}
		},
		{
			id: 'mega-menu',
			diff: {
				en: 'A menubar holds an app’s commands and is moved through with the arrow keys; a mega menu shows a site’s pages in a wide panel and is used with buttons and the Tab key.',
				ja: 'メニューバーはアプリの操作をまとめ、矢印キーで移り、メガメニューはサイトのページを幅の広いパネルで見せてボタンと Tab キーで操作します。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Menu and Menubar Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'WAI-ARIA APG: Navigation Menubar Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'WAI-ARIA APG: Example Disclosure Navigation Menu',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「水平メニュー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/horizontal-menu/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: horizontal-menu',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/horizontal-menu',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Apple Human Interface Guidelines: Menus',
			url: 'https://developer.apple.com/design/human-interface-guidelines/menus',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
