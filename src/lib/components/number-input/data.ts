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
		ja: '数値を入力する欄で、1刻みずつ増減もできるものです。'
	},
	appearance: {
		en: 'A narrow text box with small up and down arrows (or − and + buttons) at the side.',
		ja: '幅の狭い入力欄の横に、小さな上下の矢印（または − と + のボタン）があります。'
	},
	behavior: [
		{
			en: 'The user can type a number or change it with the arrows.',
			ja: '数値を直接入力するか、矢印で増減させます。'
		},
		{
			en: 'This demo uses the native `<input type="number">` with `min`, `max` and `step`.',
			ja: 'このデモはネイティブの `<input type="number">` に `min`・`max`・`step` を付けています。'
		},
		{
			en: 'In this demo, a value outside the range, a decimal or anything that is not a number turns the border red and shows an error message below the field. The message is tied to the field with `aria-describedby`, and the field gets `aria-invalid="true"`.',
			ja: 'このデモでは、範囲外の値や小数、数として読めない入力になると、枠が赤くなり、入力欄の下にエラー文が出ます。エラー文は `aria-describedby` で入力欄と結び、入力欄には `aria-invalid="true"` を付けます。'
		},
		{
			en: 'APG also defines Home / End for the minimum and maximum, but the native element uses them to move the text cursor.',
			ja: 'APG では Home / End で最小値・最大値にするとしていますが、ネイティブの要素では文字のカーソル移動になります。'
		}
	],
	keyboard: [
		{ key: '↑', action: { en: 'Increases the value by one step.', ja: '値を1刻み増やします。' } },
		{ key: '↓', action: { en: 'Decreases the value by one step.', ja: '値を1刻み減らします。' } },
		{ key: '0–9', action: { en: 'Types the value directly.', ja: '値を直接入力します。' } }
	],
	usage: [
		{
			en: 'Use it for counts that go up and down in small steps, such as a quantity.',
			ja: '数量のように小刻みに増減する値に使います。'
		},
		{
			en: 'Some design systems avoid `type="number"`: scrolling can change the value by accident, and some browsers accept letters like “e”. A text input with `inputmode="numeric"` is an alternative.',
			ja: '`type="number"` を避けるデザインシステムもあります。スクロールで値が変わってしまうことがあり、ブラウザによっては「e」などの文字も入るためです。代わりに `inputmode="numeric"` を付けたテキスト入力を使う方法があります。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Using a number input for codes such as postal codes or card numbers',
				ja: '郵便番号やカード番号のような番号に数値入力を使う'
			},
			harm: {
				en: 'A number input treats the code as a quantity to step up or down. Someone entering a postal or card number can change it by accident while doing something else, such as scrolling the page, and if they type a character that is not a digit, they get no clear message about what is wrong.',
				ja: '数値入力は番号を増減できる数量として扱います。郵便番号やカード番号を入れている人が、ページのスクロールなど別の操作のつもりで番号を誤って変えてしまうことがあります。数字以外の文字を入れても、何が誤りかがはっきり示されません。'
			},
			instead: {
				en: 'Use a text input with `inputmode="numeric"` and a matching autocomplete value, such as `autocomplete="postal-code"`.',
				ja: '`inputmode="numeric"` を付けたテキスト入力を使い、`autocomplete="postal-code"` のように内容に合う autocomplete を付けます。'
			}
		}
	],
	related: [
		{
			id: 'slider',
			diff: {
				en: 'A number input is for exact numbers; a slider picks a rough position by dragging.',
				ja: '数値入力は正確な数値を入れるのに向き、スライダーはつまみで大まかな位置を選びます。'
			}
		},
		{
			id: 'stepper',
			diff: {
				en: 'Some systems (such as Apple) call the − / + buttons of a number input a “stepper”. Here, stepper means the step indicator of a multi-page procedure.',
				ja: 'Apple などは数値入力の − / + ボタンを「Stepper」と呼びます。このサイトの Stepper は、複数画面の手続きの段階を示すステップナビゲーションのことです。'
			}
		},
		{
			id: 'one-time-code',
			diff: {
				en: 'A number input is for a quantity that goes up and down; a one-time code is a string of digits, so it uses a text field with `inputmode="numeric"`.',
				ja: '数値入力は増減させる量に使います。確認コードは数字の並びなので、`inputmode="numeric"` を付けたテキスト入力にします。'
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
			checkedAt: '2026-10-21'
		},
		{
			label: 'Open UI: Number (Input)',
			url: 'https://open-ui.org/components/inputnumber.research/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'GOV.UK Design System: Text input (Numbers)',
			url: 'https://design-system.service.gov.uk/components/text-input/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
