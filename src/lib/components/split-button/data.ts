import type { ComponentData } from '#lib/types.js';

export default {
	id: 'split-button',
	category: 'action',
	names: { en: 'Split button', ja: 'スプリットボタン' },
	aliases: [
		{ name: 'Combo button', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/menu-buttons/usage/' }
	],
	summary: {
		en: 'A button for the most common action, joined to a small arrow button that opens related actions.',
		ja: 'よく使う操作のボタンと、関連する操作のメニューを開く小さな矢印ボタンをつなげた部品です。'
	},
	appearance: {
		en: 'One button divided in two: a labeled main part and a narrow part with a downward arrow, separated by a thin line.',
		ja: '1つのボタンが細い線で2つに分かれ、ラベルのある本体と、下向き矢印だけの細い部分からなります。'
	},
	behavior: [
		{
			en: 'Pressing the main part runs the default action right away.',
			ja: '本体を押すと、既定の操作がすぐに実行されます。'
		},
		{
			en: 'Pressing the arrow opens a menu of other actions; choosing one runs it and closes the menu.',
			ja: '矢印を押すと他の操作のメニューが開き、1つを選ぶとその操作を実行してメニューが閉じます。'
		},
		{
			en: 'The menu points to the arrow button with `aria-labelledby`, so it is named after the button’s label (in this demo, “More save options”).',
			ja: 'メニューは `aria-labelledby` で矢印のボタンを指し、ボタンのラベル（このデモでは「その他の保存方法」）を名前にします。'
		},
		{
			en: 'The two parts are separate buttons, each reached with Tab.',
			ja: '2つの部分は別々のボタンで、それぞれ Tab でフォーカスできます。'
		},
		{
			en: 'In this demo, the menu lines up with the right edge of the arrow button, which is also the right edge of the whole split button.',
			ja: 'このデモでは、メニューを矢印のボタンの右端、つまりスプリットボタン全体の右端にそろえて出します。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between the main button and the arrow button.',
				ja: '本体のボタンと矢印のボタンの間を移動します。'
			}
		},
		{
			key: 'Enter / Space',
			action: {
				en: 'On the main button, runs the default action. On the arrow, opens the menu and focuses the first item.',
				ja: '本体では既定の操作を実行します。矢印ではメニューを開き、最初の項目にフォーカスします。'
			}
		},
		{
			key: '↑ / ↓',
			action: {
				en: 'On the arrow, opens the menu: ↓ focuses the first item, ↑ the last. In the menu, moves between items.',
				ja: '矢印ではメニューを開き、↓ なら最初の項目、↑ なら最後の項目にフォーカスします。メニュー内では項目の間を移動します。'
			}
		},
		{
			key: 'Home / End',
			action: { en: 'In the menu, moves to the first / last item.', ja: 'メニュー内で最初・最後の項目へ移ります。' }
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the menu and returns focus to the arrow button.',
				ja: 'メニューを閉じ、矢印のボタンにフォーカスを戻します。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Runs the chosen action', ja: '選んだ操作をすぐ実行する' },
			description: {
				en: 'Choosing a menu item runs that action at once, and the main button keeps its own action. This demo works this way.',
				ja: 'メニューの項目を選ぶとその操作をすぐ実行し、本体のボタンの操作は変わりません。このデモはこの型です。'
			}
		},
		{
			name: { en: 'Changes the main action', ja: '本体の操作を切り替える' },
			description: {
				en: 'Choosing a menu item only makes it the main button’s action and label; pressing the main button then runs it.',
				ja: 'メニューの項目を選ぶと、本体のボタンの操作とラベルがそれに替わるだけで、実行は本体を押したときに行います。'
			}
		}
	],
	usage: [
		{
			en: 'Material Design 3 keeps the main button’s label to one or two words, with an icon that matches the action. The button that opens the menu always shows the expand and collapse icon, which rotates when the menu is open, and the menu is aligned with that button where there is room.',
			ja: 'Material Design 3 は、メインのボタンのラベルを1〜2語にし、操作に合うアイコンを添えます。メニューを開くボタンには常に展開・折りたたみを表すアイコンを使い、メニューが開くとこのアイコンが回転します。メニューは、余裕があれば、メニューを開くボタンに揃えて開きます。'
		},
		{
			en: 'Carbon uses a combo button when screen space is limited and one of the actions has particular importance, usually in the page header. When all the actions are equally important, it uses a menu button.',
			ja: 'Carbon は、画面の余裕が少なく、操作の 1 つが特に重要なときにコンボボタンを使います。多くはページのヘッダーに置きます。すべての操作の重要度が同じなら、メニューボタンを使います。'
		}
	],
	related: [
		{
			id: 'menu',
			diff: {
				en: 'A split button runs its main action with one press and keeps the rest in a menu; a menu button only opens the menu.',
				ja: 'スプリットボタンは主な操作を1回で実行でき、残りをメニューにしまいます。メニューボタンは押してもメニューを開くだけです。'
			}
		},
		{
			id: 'button',
			diff: {
				en: 'A split button adds a menu of related actions beside the main button; a button offers one action.',
				ja: 'スプリットボタンは、主な操作のボタンの横に関連する操作のメニューが付き、ボタンは操作が1つだけです。'
			}
		},
		{
			id: 'button-group',
			diff: {
				en: 'A split button is one main action joined to an arrow button that opens a menu of related actions; a button group is a set of separate buttons, each running its own action.',
				ja: 'スプリットボタンは主な操作に、関連する操作のメニューを開く矢印のボタンをつなげたものです。ボタングループは別々のボタンを並べ、それぞれが自分の操作を実行します。'
			}
		}
	],
	sources: [
		{
			label: 'Carbon Design System: Menu buttons (Combo button)',
			url: 'https://carbondesignsystem.com/components/menu-buttons/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'MUI: Button Group (Split button)',
			url: 'https://mui.com/material-ui/react-button-group/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'WAI-ARIA APG: Menu Button Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Material Design 3: Split buttons',
			url: 'https://m3.material.io/components/split-button/guidelines',
			checkedAt: '2026-11-02'
		}
	]
} satisfies ComponentData;
