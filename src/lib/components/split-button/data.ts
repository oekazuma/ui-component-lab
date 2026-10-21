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
		ja: 'よく使う操作のボタンと、関連する操作のメニューを開く小さな矢印ボタンをつなげた部品。'
	},
	appearance: {
		en: 'One button divided in two: a labeled main part and a narrow part with a downward arrow, separated by a thin line.',
		ja: '1つのボタンが細い線で2つに分かれ、ラベルのある本体と、下向き矢印だけの細い部分からなる。'
	},
	behavior: [
		{
			en: 'Pressing the main part runs the default action right away.',
			ja: '本体を押すと、既定の操作がすぐに実行される。'
		},
		{
			en: 'Pressing the arrow opens a menu of other actions; choosing one runs it and closes the menu.',
			ja: '矢印を押すと他の操作のメニューが開き、選ぶとその操作を実行してメニューが閉じる。'
		},
		{
			en: 'The two parts are separate buttons, each reached with Tab.',
			ja: '2つの部分は別々のボタンで、それぞれ Tab でフォーカスできる。'
		}
	],
	keyboard: [
		{
			key: 'Tab',
			action: {
				en: 'Moves between the main button and the arrow button.',
				ja: '本体のボタンと矢印のボタンの間を移動する。'
			}
		},
		{
			key: 'Enter / Space',
			action: {
				en: 'On the main button, runs the default action. On the arrow, opens the menu and focuses the first item.',
				ja: '本体では既定の操作を実行する。矢印ではメニューを開き、最初の項目にフォーカスする。'
			}
		},
		{
			key: '↑ / ↓',
			action: {
				en: 'On the arrow, opens the menu: ↓ focuses the first item, ↑ the last. In the menu, moves between items.',
				ja: '矢印では、↓ で最初の項目、↑ で最後の項目にフォーカスしてメニューを開く。メニュー内では項目を移動する。'
			}
		},
		{
			key: 'Home / End',
			action: { en: 'In the menu, moves to the first / last item.', ja: 'メニュー内で最初・最後の項目へ移る。' }
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the menu and returns focus to the arrow button.',
				ja: 'メニューを閉じ、矢印のボタンにフォーカスを戻す。'
			}
		}
	],
	related: [
		{
			id: 'menu',
			diff: {
				en: 'A split button runs its main action with one press and keeps the rest in a menu; a menu button only opens the menu.',
				ja: 'スプリットボタンは主な操作を1回で実行でき、残りをメニューにしまう。メニューボタンは押してもメニューを開くだけ。'
			}
		},
		{
			id: 'button',
			diff: {
				en: 'A button offers one action; a split button adds a menu of related actions beside it.',
				ja: 'ボタンは操作が1つだけで、スプリットボタンはその横に関連する操作のメニューが付く。'
			}
		}
	],
	sources: [
		{
			label: 'Carbon Design System: Menu buttons (Combo button)',
			url: 'https://carbondesignsystem.com/components/menu-buttons/usage/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MUI: Button Group (Split button)',
			url: 'https://mui.com/material-ui/react-button-group/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Menu Button Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
