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
			en: 'The WAI-ARIA APG mixed-state example goes further: the parent cycles through unchecked, mixed and checked, and the mixed step brings back the last partial selection. This demo, like the DADS example, only checks or unchecks all.',
			ja: 'WAI-ARIA APG の中間状態の例では、親を押すたびにオフ・中間・オンを順に切り替え、中間に戻ったときは直前の一部だけの選択を復元する。このデモは DADS の例と同じく、すべて選ぶか、すべて外すだけにしている。'
		},
		{
			en: 'In this demo, Cheese starts checked so the mixed state is visible right away. In a real form, leave answers unchecked (see Misuses to avoid).',
			ja: 'このデモでは、中間状態をすぐ見せるために「チーズ」を選んだ状態から始める。実際のフォームでは回答をあらかじめ選んでおかない（避けたい使い方を参照）。'
		},
		{
			en: 'Related checkboxes are grouped with a `<fieldset>` and `<legend>` so the group has a name.',
			ja: '関連するチェックボックスは `<fieldset>` と `<legend>` でまとめ、グループに名前を付ける。'
		},
		{
			en: 'In this demo, the single “I agree to the terms of use” checkbox starts unchecked. Pressing Apply without checking it shows an error below it, links the error with `aria-describedby`, sets `aria-invalid`, and moves focus to the checkbox. Checking it removes the error.',
			ja: 'このデモでは、単独の「利用規約に同意する」はチェックなしで始まる。チェックを付けずに「申し込む」を押すと、下にエラーの文を出して `aria-describedby` でつなぎ、`aria-invalid` を付けて、フォーカスをチェックボックスへ移す。チェックを付けるとエラーは消える。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves between checkboxes.', ja: 'チェックボックス間を移動する。' } },
		{ key: 'Space', action: { en: 'Checks or unchecks the focused box.', ja: 'フォーカス中のボックスのチェックを付ける・外す。' } }
	],
	usage: [
		{
			en: 'Use it for choosing several options, or for a single on/off choice.',
			ja: '複数の選択や、単独のオン・オフの選択に使う。'
		},
		{
			en: 'Put the box to the left of its label.',
			ja: 'ボックスはラベルの左に置く。'
		},
		{
			en: 'When a single checkbox has to be checked to go on, such as agreeing to terms, say in the error what to do, such as “Select if you agree to the terms of use”.',
			ja: '利用規約への同意のように、単独のチェックボックスにチェックがないと先へ進めないときは、「利用規約に同意する場合は、チェックを付けてください」のように、どうすればよいかをエラーに書く。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Checking consent or marketing boxes in advance',
				ja: '同意やメール配信のチェックを最初からオンにしておく'
			},
			harm: {
				en: 'People tend to go with an option that has already been chosen for them. Anyone who scrolls past without noticing the setting goes on unaware of what it means, and can end up agreeing to things they never intended, such as recurring payments.',
				ja: '人はあらかじめ選ばれている選択肢をそのまま受け入れやすい。気づかずに先へ進んだ人は、その意味を知らないまま、定期的な支払いのような意図しない内容に同意してしまうことがある。'
			},
			instead: {
				en: 'Show these boxes unchecked, so that agreement only comes from people checking them themselves, and say in the label exactly what they agree to.',
				ja: 'チェックは外した状態で表示し、利用者が自分でオンにしたときだけ同意とする。何に同意するのかはラベルに具体的に書く。'
			},
			deceptive: true
		},
		{
			pattern: {
				en: 'Wording an opt-out checkbox with double negatives',
				ja: 'オプトアウトのチェックボックスを二重否定の文言にする'
			},
			harm: {
				en: 'People scan labels instead of reading every word. When the wording is confusing, the label seems to say one thing while it means another, and people take an action they did not intend.',
				ja: '人はラベルを一語ずつ読まずに流し読みする。文言が紛らわしいと、書いてあることと違う意味に受け取り、意図しない操作をしてしまう。'
			},
			instead: {
				en: 'Write the label as a plain statement of what checking the box does, such as “Email me about new features”.',
				ja: '「新機能のお知らせをメールで受け取る」のように、オンにすると何が起きるかをそのまま書く。'
			},
			deceptive: true
		},
		{
			pattern: {
				en: 'Checking answers to a question in advance',
				ja: '質問の回答をあらかじめチェックしておく'
			},
			harm: {
				en: 'People become more likely to miss that they still had a question to answer, and to submit the wrong answer.',
				ja: '答えていない質問があることに気づきにくくなり、誤った回答のまま送信しやすくなる。'
			},
			instead: {
				en: 'Show every option unchecked and let people choose.',
				ja: 'すべての選択肢をチェックなしで表示し、利用者に選んでもらう。'
			}
		}
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
		},
		{
			label: 'WAI-ARIA APG: Checkbox (Mixed-State) Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「チェックボックス」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/checkbox/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「チェックボックス（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/checkbox/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: checkbox',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/checkbox',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Deceptive Patterns: Preselection',
			url: 'https://www.deceptive.design/types/preselection',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Deceptive Patterns: Trick wording',
			url: 'https://www.deceptive.design/types/trick-wording',
			checkedAt: '2026-10-21'
		},
		{
			label: 'GOV.UK Design System: Checkboxes',
			url: 'https://design-system.service.gov.uk/components/checkboxes/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
