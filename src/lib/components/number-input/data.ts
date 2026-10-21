import type { ComponentData } from '#lib/types.js';

export default {
	id: 'number-input',
	category: 'input',
	names: { en: 'Number input', ja: '数値入力（スピンボタン）' },
	aliases: [
		{ name: 'Spinbutton', source: 'WAI-ARIA APG', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/' },
		{ name: 'Number input', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/building-blocks/core/components/number-input' },
		{ name: 'InputNumber', source: 'Ant Design', url: 'https://ant.design/components/input-number' },
		{ name: 'Stepper (the − / + buttons)', source: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/steppers' }
	],
	summary: {
		en: 'A box for a number that can also be raised or lowered one step at a time.',
		ja: '数値を入力する欄で、1刻みずつ増減もできるもの。'
	},
	appearance: {
		en: 'A narrow text box with small up and down arrows (or − and + buttons) at the side.',
		ja: '幅の狭い入力欄の横に、小さな上下の矢印（または − と + のボタン）がある。'
	},
	behavior: [
		{
			en: 'The user can type a number or change it with the arrows.',
			ja: '数値を直接入力するか、矢印で増減させる。'
		},
		{
			en: 'This demo uses the native <input type="number"> with min, max and step. Values outside the range get a red border.',
			ja: 'このデモはネイティブの <input type="number"> に min・max・step を付けている。範囲外の値になると枠が赤くなる。'
		},
		{
			en: 'APG also defines Home / End for the minimum and maximum, but the native element uses them to move the text cursor.',
			ja: 'APG では Home / End で最小値・最大値にするとしているが、ネイティブの要素では文字のカーソル移動になる。'
		}
	],
	keyboard: [
		{ key: '↑', action: { en: 'Increases the value by one step.', ja: '値を1刻み増やす。' } },
		{ key: '↓', action: { en: 'Decreases the value by one step.', ja: '値を1刻み減らす。' } },
		{ key: '0–9', action: { en: 'Types the value directly.', ja: '値を直接入力する。' } }
	],
	usage: [
		{
			en: 'Use it for counts that go up and down in small steps, such as a quantity. Do not use it for numbers that are really codes, such as postal codes or card numbers.',
			ja: '数量のように小刻みに増減する値に使う。郵便番号やカード番号のように、数字でできた符号には使わない。'
		},
		{
			en: 'Some design systems avoid type="number": scrolling can change the value by accident, and some browsers accept letters like “e”. A text input with inputmode="numeric" is an alternative.',
			ja: 'type="number" を避けるデザインシステムもある。スクロールで値が変わってしまうことがあり、ブラウザによっては「e」などの文字も入るためである。代わりに inputmode="numeric" を付けたテキスト入力を使う方法がある。'
		}
	],
	related: [
		{
			id: 'slider',
			diff: {
				en: 'A number input is for exact numbers; a slider picks a rough position by dragging.',
				ja: '数値入力は正確な数値を入れるのに向き、スライダーはつまみで大まかな位置を選ぶ。'
			}
		},
		{
			id: 'stepper',
			diff: {
				en: 'Some systems (such as Apple) call the − / + buttons of a number input a “stepper”. Here, stepper means the step indicator of a multi-page procedure.',
				ja: 'Apple などは数値入力の − / + ボタンを「Stepper」と呼ぶ。このサイトの Stepper は、複数画面の手続きの段階を示すステップナビゲーションのこと。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Spinbutton Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MDN: <input type="number">',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Open UI: Number (Input)',
			url: 'https://open-ui.org/components/inputnumber.research/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'GOV.UK Design System: Text input (Numbers)',
			url: 'https://design-system.service.gov.uk/components/text-input/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
