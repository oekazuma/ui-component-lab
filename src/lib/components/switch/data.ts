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
			en: 'This demo is a native checkbox with `role="switch"`, styled to look like a switch.',
			ja: 'このデモはネイティブのチェックボックスに `role="switch"` を付け、スイッチの見た目にしている。'
		}
	],
	keyboard: [
		{
			key: 'Space',
			action: { en: 'Turns the switch on or off.', ja: 'オン・オフを切り替える。' }
		}
	],
	usage: [
		{
			en: 'Use it only for settings that take effect immediately. If a save or submit step is needed, use a checkbox.',
			ja: 'すぐに反映される設定にだけ使う。保存や送信が必要なら、チェックボックスを使う。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Turning marketing or sharing settings on in advance',
				ja: 'メール配信や情報の共有などの設定を最初からオンにしておく'
			},
			harm: {
				en: 'People tend to go with an option that has already been chosen for them. Anyone who scrolls past without noticing the setting goes on unaware of what it means, and leaves it on without ever having chosen it.',
				ja: '人は、あらかじめ選ばれている選択肢をそのまま受け入れやすい。気づかずに先へ進んだ人は、その意味を知らないまま、自分で選んでいない設定をオンのまま使い続けることになる。'
			},
			instead: {
				en: 'Start these settings off and let people turn them on themselves. Say in the label what turning it on does.',
				ja: 'こうした設定は最初はオフにし、利用者が自分でオンにできるようにする。オンにすると何が起きるかはラベルに書く。'
			},
			deceptive: true
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
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「スイッチ」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/switch/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Deceptive Patterns: Preselection',
			url: 'https://www.deceptive.design/types/preselection',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
