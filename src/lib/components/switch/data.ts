import type { ComponentData } from '#lib/types.js';

export default {
	id: 'switch',
	category: 'input',
	names: { en: 'Switch', ja: 'スイッチ' },
	aliases: [
		{ name: 'Toggle', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/toggle/usage/' },
		{ name: 'Toggle switch', source: 'Open UI', url: 'https://open-ui.org/components/switch.explainer' }
	],
	summary: {
		en: 'Turns a single setting on or off, with the change taking effect right away.',
		ja: '1つの設定をオン・オフする部品。切り替えるとすぐに反映される。'
	},
	appearance: {
		en: 'A pill-shaped track with a round knob. The knob slides to one end and the track changes color when it is on.',
		ja: '角の丸い横長のつまみ溝に、丸いつまみが乗った形。オンにするとつまみが端へ移り、溝の色が変わる。'
	},
	behavior: [
		{
			en: 'Clicking anywhere on the switch or its label flips the state.',
			ja: 'スイッチ本体かラベルをクリックすると状態が反転する。'
		},
		{
			en: 'There are only two states, on and off; unlike a checkbox, there is no mixed state.',
			ja: '状態はオンとオフの2つだけで、チェックボックスのような中間状態はない。'
		},
		{
			en: 'The label names the setting and does not change when the state changes.',
			ja: 'ラベルは設定の名前を表し、状態が変わってもラベルの文言は変えない。'
		},
		{
			en: 'This demo is a native checkbox with role="switch", styled to look like a switch.',
			ja: 'このデモはネイティブのチェックボックスに role="switch" を付け、スイッチの見た目にしている。'
		}
	],
	keyboard: [
		{
			key: 'Space',
			action: { en: 'Turns the switch on or off.', ja: 'オン・オフを切り替える。' }
		}
	],
	related: [
		{
			id: 'checkbox',
			diff: {
				en: 'A switch takes effect right away; a checkbox is often confirmed later with a submit button.',
				ja: 'スイッチは切り替えるとすぐに反映され、チェックボックスは送信ボタンで後から確定することが多い。'
			}
		},
		{
			id: 'toggle-button',
			diff: {
				en: 'A switch looks like a sliding knob and is used for settings; a toggle button looks like a button and is often used in toolbars.',
				ja: 'スイッチはつまみが動く形で設定項目に使い、トグルボタンはボタンの形でツールバーなどに使う。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Switch Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Open UI: Switch Element (Explainer)',
			url: 'https://open-ui.org/components/switch.explainer',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Carbon Design System: Toggle',
			url: 'https://carbondesignsystem.com/components/toggle/usage/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
