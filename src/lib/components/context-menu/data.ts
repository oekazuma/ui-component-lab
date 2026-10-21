import type { ComponentData } from '#lib/types.js';

export default {
	id: 'context-menu',
	category: 'action',
	names: { en: 'Context menu', ja: 'コンテキストメニュー' },
	aliases: [
		{ name: 'Context menu', source: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/context-menus' },
		{ name: 'Contextual menu', source: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/context-menus' }
	],
	summary: {
		en: 'A menu of actions for an item that opens where you right-click it.',
		ja: '項目を右クリックした場所に開く、その項目に対する操作のメニュー。'
	},
	appearance: {
		en: 'Nothing shows until it is opened. Then a small panel of action names, stacked vertically, appears at the pointer, over the page.',
		ja: '開くまでは何も見えない。開くと、操作名を縦に並べた小さなパネルが、マウスポインターの位置にページの上に重なって出る。'
	},
	behavior: [
		{
			en: 'Right-clicking, Control-clicking on a Mac, or pressing the Menu key on the keyboard fires a `contextmenu` event. Calling `preventDefault()` on it stops the browser’s own menu so the page can open its own.',
			ja: '右クリック、Mac での Control + クリック、キーボードのメニューキーで `contextmenu` イベントが起きる。そこで `preventDefault()` を呼ぶと、ブラウザ既定のメニューが出なくなり、ページ独自のメニューを開ける。'
		},
		{
			en: 'From the keyboard, Shift + F10 opens it on the focused item, as in Windows. It then opens at the bottom left of the item, where the browser’s own menu would appear.',
			ja: 'キーボードでは、Windows と同じく Shift + F10 で、フォーカスしている項目のメニューを開く。そのときは、ブラウザ既定のメニューと同じく項目の左下に出る。'
		},
		{
			en: 'Inside, it works like any APG menu: focus moves to the first item, the arrow keys move between items, and Esc closes it and returns focus to the item it was opened on.',
			ja: '開いたあとは APG のメニューと同じく、最初の項目にフォーカスが移り、矢印キーで項目を移り、Esc で閉じて開いた元の項目へフォーカスを戻す。'
		},
		{
			en: 'In this demo, each file also has a visible “⋯” button that opens the same menu, so people who cannot right-click, or do not know they can, still reach every action.',
			ja: 'このデモでは、各ファイルに同じメニューを開く「⋯」ボタンも見える形で置き、右クリックできない人や、できると知らない人も、すべての操作に届くようにしている。'
		},
		{
			en: 'In this demo, choosing an item only shows what was chosen, and the menu keeps within the screen when opened near its right edge.',
			ja: 'このデモでは、項目を選んでも選んだ操作を表示するだけ。画面の右端の近くで開いたときは、画面からはみ出さないよう左へ寄せる。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'On an item in the menu, runs it and closes the menu. On a file, opens it.',
				ja: 'メニューの項目では、その操作を実行してメニューを閉じる。ファイルでは、そのファイルを開く。'
			}
		},
		{
			key: '↑ / ↓',
			action: {
				en: 'Moves to the previous or next item; from the first item it goes to the last, and from the last to the first.',
				ja: '前または次の項目へ移る。最初の項目からは最後へ、最後の項目からは最初へ回る。'
			}
		},
		{
			key: 'Home / End',
			action: { en: 'Moves to the first or last item.', ja: '最初または最後の項目へ移る。' }
		},
		{
			key: 'Shift + F10',
			action: {
				en: 'On a file, opens its context menu with focus on the first item.',
				ja: 'ファイルで、そのコンテキストメニューを開き、最初の項目にフォーカスを移す。'
			}
		},
		{
			key: 'Menu key',
			action: {
				en: 'Same as Shift + F10, on keyboards that have it.',
				ja: 'メニューキーのあるキーボードでは、Shift + F10 と同じ。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the menu and returns focus to the file.',
				ja: 'メニューを閉じ、ファイルにフォーカスを戻す。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Closes the menu and moves on to the next or previous element.',
				ja: 'メニューを閉じ、次または前の要素へ移る。'
			}
		}
	],
	usage: [
		{
			en: 'Include only the actions people are most likely to need for that item, and keep the list short. Group items with dividers, and put destructive ones such as Delete at the end.',
			ja: 'その項目でよく使う操作だけを入れ、短くする。区切り線でまとめ、削除のように取り消しにくい操作は最後に置く。'
		},
		{
			en: 'Offer context menus consistently. If some items have one and others do not, people do not know where to look and may think something is broken.',
			ja: 'コンテキストメニューはどこでも同じように用意する。ある項目にはあって別の項目にはないと、どこで使えるのか分からず、不具合だと思われることもある。'
		},
		{
			en: 'Leave out actions that do not apply to the item instead of showing them dimmed.',
			ja: 'その項目に使えない操作は、薄く表示せずに外す。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Putting actions only in the context menu',
				ja: '操作をコンテキストメニューの中にしか置かない'
			},
			harm: {
				en: 'Nothing on screen shows that a right-click does anything, so some people never find the actions.',
				ja: '右クリックで何かできることが画面のどこにも示されないので、操作を見つけられない人がいる。'
			},
			instead: {
				en: 'Make every action in the context menu available in the main interface too, such as a visible “⋯” button, a toolbar or the menu bar.',
				ja: 'コンテキストメニューの操作は、見える「⋯」ボタンやツールバー、メニューバーなど、画面のほかの場所でも使えるようにする。'
			}
		},
		{
			pattern: {
				en: 'Filling the context menu with many items',
				ja: 'コンテキストメニューに項目をたくさん入れる'
			},
			harm: {
				en: 'People have to read down a long list to find an action, and may have to scroll through it.',
				ja: '操作を探すのに長い一覧を上から読むことになり、スクロールが要ることもある。'
			},
			instead: {
				en: 'Keep it to a few items that fit the item, and move rarely used actions elsewhere. Carbon suggests no more than 12.',
				ja: 'その項目に合う少しの操作に絞り、あまり使わない操作は別の場所に移す。Carbon は 12 項目までを目安にしている。'
			}
		}
	],
	related: [
		{
			id: 'menu',
			diff: {
				en: 'A context menu opens where an item is right-clicked and has no visible trigger; a menu opens from a visible button.',
				ja: 'コンテキストメニューは項目を右クリックした場所に開き、開くための見えるボタンがない。メニューは見えるボタンから開く。'
			}
		},
		{
			id: 'popover',
			diff: {
				en: 'A context menu lists actions to run on an item; a popover is a panel of any content next to its button.',
				ja: 'コンテキストメニューは項目に対する操作を並べる。ポップオーバーは、ボタンの隣に好きな内容を出すパネル。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Menu and Menubar Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: Element: contextmenu event',
			url: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Apple Human Interface Guidelines: Context menus',
			url: 'https://developer.apple.com/design/human-interface-guidelines/context-menus',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Carbon Design System: Menu',
			url: 'https://carbondesignsystem.com/components/menu/usage/',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
