import type { ComponentData } from '#lib/types.js';

export default {
	id: 'radio',
	category: 'input',
	names: { en: 'Radio', ja: 'ラジオボタン' },
	aliases: [
		{ name: 'Radio button', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/radio-button/usage/' }
	],
	summary: {
		en: 'A group of round buttons where exactly one option can be chosen.',
		ja: '丸いボタンのグループから、選択肢を1つだけ選ぶ部品です。'
	},
	appearance: {
		en: 'Small circles next to labels, stacked or in a row. The chosen one has a filled dot in the middle.',
		ja: 'ラベルの横に小さな丸が縦や横に並びます。選んだものだけ、丸の中に点が入ります。'
	},
	behavior: [
		{
			en: 'Choosing an option clears the previous choice in the same group.',
			ja: '選択肢を選ぶと、同じグループで前に選んでいたものは外れます。'
		},
		{
			en: 'Once one is chosen, the group cannot go back to having none chosen.',
			ja: '一度選ぶと、どれも選ばれていない状態には戻せません。'
		},
		{
			en: 'In this demo, nothing is chosen at first. Tab then moves to the first option, and Space chooses it.',
			ja: 'このデモでは、最初はどれも選ばれていません。このとき Tab では最初の選択肢へ移り、Space で選びます。'
		},
		{
			en: 'Tab moves into the group as one stop; arrow keys move between the options and choose them at the same time.',
			ja: 'Tab ではグループ全体が1か所として扱われ、グループの中では矢印キーで選択肢を移ると同時に選びます。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves into the group (to the chosen option, or to the first one if none is chosen) and out of it.',
				ja: 'グループ（選ばれている選択肢、どれも選ばれていなければ最初の選択肢）へ入ったり、グループから出たりします。'
			}
		},
		{
			key: '↓ / →',
			action: { en: 'Chooses the next option, wrapping to the first.', ja: '次の選択肢を選びます。最後からは最初に戻ります。' }
		},
		{
			key: '↑ / ←',
			action: { en: 'Chooses the previous option, wrapping to the last.', ja: '前の選択肢を選びます。最初からは最後に戻ります。' }
		},
		{ key: 'Space', action: { en: 'Chooses the focused option.', ja: 'フォーカス中の選択肢を選びます。' } }
	],
	usage: [
		{
			en: 'A selected radio button cannot be cleared, so add a choice such as "None of these" to optional questions.',
			ja: '一度選ぶと選択を外せないため、任意の質問には「あてはまるものはない」などの選択肢を加えます。'
		},
		{
			en: 'Put the circle to the left of its label.',
			ja: '丸はラベルの左に置きます。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Selecting an option in advance',
				ja: '選択肢をあらかじめ選んでおく'
			},
			harm: {
				en: 'People become more likely to miss that they still had a question to answer, and to submit the wrong answer.',
				ja: '答えていない質問があることに気づきにくくなり、誤った回答のまま送信しやすくなります。'
			},
			instead: {
				en: 'Show the group with nothing selected. For an optional question, add a choice such as “None of these” instead of preselecting one.',
				ja: '最初はどれも選ばれていない状態で表示します。任意の質問なら、初期選択の代わりに「あてはまるものはない」などの選択肢を加えます。'
			}
		}
	],
	related: [
		{
			id: 'checkbox',
			diff: {
				en: 'Radio buttons allow exactly one choice; checkboxes allow any number.',
				ja: 'ラジオボタンは1つだけ選び、チェックボックスはいくつでも選べます。'
			}
		},
		{
			id: 'select',
			diff: {
				en: 'Radio buttons show every option at once; a select hides them in a list to save space.',
				ja: 'ラジオボタンはすべての選択肢を常に見せ、セレクトはリストにしまって場所を取りません。'
			}
		},
		{
			id: 'listbox',
			diff: {
				en: 'Radio buttons show every option with its own label; a listbox scrolls and is one tab stop.',
				ja: 'ラジオボタンは選択肢ごとのラベルを付けてすべてを見せ、リストボックスはスクロールでき、Tab では1か所として扱われます。'
			}
		},
		{
			id: 'segmented-control',
			diff: {
				en: 'Radio buttons list choices with round markers and can hold longer labels; a segmented control shows a few short choices as joined buttons in one row.',
				ja: 'ラジオボタンは丸い印を付けて選択肢を並べ、長いラベルも置けます。セグメンテッドコントロールは数個の短い選択肢をつながったボタンとして1列に並べます。'
			}
		},
		{
			id: 'rating',
			diff: {
				en: 'Radio buttons list choices with their own labels; a rating is a radio group drawn as a row of stars for an ordered score.',
				ja: 'ラジオボタンは選択肢をそれぞれのラベル付きで並べます。評価は、順に並んだ点数を選ぶラジオボタンのグループを、星の列として見せたものです。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Radio Group Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Carbon Design System: Radio button',
			url: 'https://carbondesignsystem.com/components/radio-button/usage/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ラジオボタン」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/radio/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'GOV.UK Design System: Radios',
			url: 'https://design-system.service.gov.uk/components/radios/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
