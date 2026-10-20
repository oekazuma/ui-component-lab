import type { ComponentData } from '#lib/types.js';

export default {
	id: 'button',
	category: 'action',
	names: { en: 'Button', ja: 'ボタン' },
	aliases: [],
	summary: {
		en: 'Triggers an action, such as submitting a form or opening a dialog.',
		ja: 'フォームの送信やダイアログを開くなど、操作を実行する部品。'
	},
	appearance: {
		en: 'A short label (sometimes with an icon) inside a clickable area, usually with a background or border. The most important action is often filled with the accent color.',
		ja: '短いラベル（アイコン付きのこともある）を、背景色や枠線のある押せる領域で囲んだ形。最も重要な操作はアクセントカラーで塗りつぶされることが多い。'
	},
	behavior: [
		{
			en: 'Click or tap runs the action once.',
			ja: 'クリック・タップで操作を1回実行する。'
		},
		{
			en: 'Shows a hover style under a mouse pointer and a visible focus ring when reached by keyboard.',
			ja: 'マウスを乗せると見た目が変わり、キーボードでフォーカスするとフォーカスリングが出る。'
		},
		{
			en: 'Navigating to another page is the job of a link, not a button.',
			ja: '別のページへの移動はボタンではなくリンクの役割。'
		}
	],
	keyboard: [
		{ key: 'Tab', action: { en: 'Moves focus to the button.', ja: 'ボタンにフォーカスを移す。' } },
		{ key: 'Enter', action: { en: 'Activates the button.', ja: 'ボタンを実行する。' } },
		{ key: 'Space', action: { en: 'Activates the button.', ja: 'ボタンを実行する。' } }
	],
	variations: [
		{
			name: { en: 'Primary', ja: 'プライマリ' },
			description: {
				en: 'Filled with the accent color. Used for the main action of a screen.',
				ja: 'アクセントカラーで塗りつぶしたもの。画面の主な操作に使う。'
			}
		},
		{
			name: { en: 'Secondary', ja: 'セカンダリ' },
			description: {
				en: 'Outlined or lightly filled. Used next to a primary button for alternative actions.',
				ja: '枠線だけ、または薄い背景のもの。プライマリの隣で代わりの操作に使う。'
			}
		},
		{
			name: { en: 'Ghost', ja: 'ゴースト' },
			description: {
				en: 'Text only, with no border or background. Used for low-emphasis actions.',
				ja: '枠線も背景もない文字だけのもの。目立たせなくてよい操作に使う。'
			}
		}
	],
	sources: [
		{
			label: 'Open UI: Button',
			url: 'https://open-ui.org/components/button',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Button Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
