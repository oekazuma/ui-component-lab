import type { ComponentData } from '#lib/types.js';

export default {
	id: 'toggle-button',
	category: 'action',
	names: { en: 'Toggle button', ja: 'トグルボタン' },
	aliases: [],
	summary: {
		en: 'A button that stays pressed or unpressed, showing whether an option is on.',
		ja: '押された状態と押されていない状態を保ち、機能がオンかどうかを示すボタン。'
	},
	appearance: {
		en: 'Looks like an ordinary button, but its background or border changes while it is pressed. Often an icon button in a toolbar, such as Bold or Mute.',
		ja: '普通のボタンと同じ形だが、押されている間は背景や枠線の色が変わる。太字やミュートのように、ツールバーのアイコンボタンとして使われることが多い。'
	},
	behavior: [
		{
			en: 'Each press flips between pressed and not pressed.',
			ja: '押すたびに、押された状態と押されていない状態が入れ替わる。'
		},
		{
			en: 'The label stays the same; the pressed state is shown by the style and announced through aria-pressed.',
			ja: 'ラベルは変えず、押されているかどうかは見た目と aria-pressed で伝える。'
		},
		{
			en: 'Several toggle buttons can be grouped, for example Bold, Italic, and Underline.',
			ja: '太字・斜体・下線のように、複数を並べてグループにすることもある。'
		}
	],
	keyboard: [
		{ key: 'Enter / Space', action: { en: 'Presses or releases the button.', ja: 'ボタンを押す・戻す。' } }
	],
	related: [
		{
			id: 'switch',
			diff: {
				en: 'A toggle button looks like a button and is often used in toolbars; a switch looks like a sliding knob and is used for settings.',
				ja: 'トグルボタンはボタンの形でツールバーなどに使い、スイッチはつまみが動く形で設定項目に使う。'
			}
		},
		{
			id: 'button',
			diff: {
				en: 'A button runs an action once; a toggle button keeps an on or off state.',
				ja: 'ボタンは押すたびに操作を1回実行し、トグルボタンはオン・オフの状態を保つ。'
			}
		},
		{
			id: 'toolbar',
			diff: {
				en: 'A toggle button is one on/off button; a toolbar groups several buttons and moves between them with arrow keys.',
				ja: 'トグルボタンはオンとオフを切り替える1つのボタンで、ツールバーは複数のボタンをまとめて矢印キーで行き来させる。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Button Pattern (Toggle button)',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MUI: Toggle Button',
			url: 'https://mui.com/material-ui/react-toggle-button/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
