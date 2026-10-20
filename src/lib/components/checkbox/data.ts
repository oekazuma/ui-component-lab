import type { ComponentData } from '#lib/types.js';

export default {
	id: 'checkbox',
	category: 'input',
	names: { en: 'Checkbox', ja: 'チェックボックス' },
	aliases: [],
	summary: {
		en: 'A small box the user checks or unchecks; any number of options in a group can be checked.',
		ja: 'チェックを付けたり外したりする小さな四角。グループ内でいくつでも選べる。'
	},
	appearance: {
		en: 'A small square next to a label. A checked box shows a check mark; a partly checked parent shows a dash.',
		ja: 'ラベルの横に小さな四角がある。選ぶとチェックマークが付き、一部だけ選ばれた親には横線が出る。'
	},
	behavior: [
		{
			en: 'Clicking the box or its label toggles the check.',
			ja: '四角かラベルをクリックすると、チェックが付いたり外れたりする。'
		},
		{
			en: 'A parent checkbox can show a mixed state when only some of its children are checked; checking it checks them all.',
			ja: '子の一部だけが選ばれているとき、親のチェックボックスは中間状態になる。親を押すと子をすべて選ぶ。'
		},
		{
			en: 'Related checkboxes are grouped with a fieldset and legend so the group has a name.',
			ja: '関連するチェックボックスは fieldset と legend でまとめ、グループに名前を付ける。'
		}
	],
	keyboard: [
		{ key: 'Tab', action: { en: 'Moves between checkboxes.', ja: 'チェックボックス間を移動する。' } },
		{ key: 'Space', action: { en: 'Checks or unchecks the focused box.', ja: 'フォーカス中のチェックを付ける・外す。' } }
	],
	related: [
		{
			id: 'radio',
			diff: {
				en: 'Checkboxes allow any number of choices; radio buttons allow exactly one.',
				ja: 'チェックボックスはいくつでも選べるが、ラジオボタンは1つだけ選ぶ。'
			}
		},
		{
			id: 'switch',
			diff: {
				en: 'A checkbox is often confirmed later with a submit button; a switch takes effect right away.',
				ja: 'チェックボックスは送信ボタンで後から確定することが多く、スイッチは切り替えるとすぐに反映される。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Checkbox Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
