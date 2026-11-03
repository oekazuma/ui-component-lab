import type { ComponentData } from '#lib/types.js';

export default {
	id: 'alert-dialog',
	category: 'overlay',
	names: { en: 'Alert dialog', ja: 'アラートダイアログ' },
	aliases: [
		{ name: 'Alert', source: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/alerts' }
	],
	summary: {
		en: 'A modal dialog that interrupts the user with an urgent message and waits for a response.',
		ja: '緊急のメッセージで作業を中断させ、応答を待つモーダルダイアログです。'
	},
	appearance: {
		en: 'Looks like a modal dialog: a box over a dimmed page with a short title, a message and two buttons, one of them for the risky action. In this demo, “Discard” is the same filled button as other main actions; the safer “Keep editing” is on the left and “Discard” on the right.',
		ja: 'モーダルダイアログと同じく、暗くした背景の上に箱が出ます。箱には短いタイトルと本文、2つのボタンがあり、片方は危険な操作のボタンです。このデモの「破棄」は、ほかの主な操作と同じ塗りのボタンで、安全な「編集を続ける」を左、「破棄」を右に置きます。'
	},
	behavior: [
		{
			en: 'It has `role="alertdialog"`, which lets browsers and screen readers tell it apart from other dialogs, so they can treat it specially, for example with an alert sound. Its title and message are tied to it with `aria-labelledby` and `aria-describedby`.',
			ja: '`role="alertdialog"` を持つので、ブラウザやスクリーンリーダーはほかのダイアログと区別でき、警告音を鳴らすなどの特別な扱いができます。タイトルと本文は `aria-labelledby` と `aria-describedby` で結びます。'
		},
		{
			en: 'When it opens, focus goes to the least destructive button; in this demo, “Keep editing”.',
			ja: '開くと、最も安全なボタンにフォーカスが移ります。このデモでは「編集を続ける」です。'
		},
		{
			en: 'Like any modal, the page behind cannot be used until it closes, and focus then returns to the button that opened it.',
			ja: '他のモーダルと同じく、閉じるまで背後のページは使えず、閉じると開いたボタンにフォーカスが戻ります。'
		},
		{
			en: 'In this demo, the note stays on the page and the dialog only asks for confirmation. “Discard” empties the note; “Keep editing” or Esc leaves it as it was.',
			ja: 'このデモでは、メモ欄はページに置いたままで、ダイアログは確認だけをします。「破棄」を選ぶとメモが空になり、「編集を続ける」か Esc ではそのまま残ります。'
		},
		{
			en: 'In this demo, the dialog opens inside the demo frame and dims only the frame, so it is easy to see which demo it belongs to. On a real page, it dims the whole page.',
			ja: 'このデモでは、どのデモの動きかが分かりやすいよう、ダイアログをデモの枠の中に出し、枠の中だけを暗くします。実際のページでは、ページ全体を暗くします。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves between the dialog’s buttons.', ja: 'ダイアログ内のボタンの間を移動します。' } },
		{ key: 'Enter / Space', action: { en: 'Activates the focused button.', ja: 'フォーカス中のボタンを押します。' } },
		{
			key: 'Esc',
			action: {
				en: 'Closes the dialog as if “Keep editing” was chosen.',
				ja: '「編集を続ける」を選んだのと同じ扱いで閉じます。'
			}
		}
	],
	usage: [
		{
			en: 'Use it only for urgent messages that need a decision, such as confirming an action that cannot be undone.',
			ja: '取り消せない操作の確認など、判断が必要な緊急のメッセージにだけ使います。'
		},
		{
			en: 'Apple Human Interface Guidelines call an alert critical information that people need right away, and say to use alerts sparingly. They advise against an alert that only informs, and against one for common actions that can be undone. Buttons are titled with verbs that say the result, such as “Delete”, and “OK” is not the default unless the alert is purely informational.',
			ja: 'Apple Human Interface Guidelines は、アラートを今すぐ必要な重要な情報を伝えるものとし、控えめに使うよう求めています。情報を伝えるだけのアラートや、元に戻せるよくある操作のためのアラートは避けます。ボタンの名前は「削除」のように結果を表す動詞にし、情報を伝えるだけのアラートでない限り、「OK」を既定のボタンにしません。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Relying on the confirmation dialog as the only safeguard, or asking for confirmation on routine actions',
				ja: '確認ダイアログだけを安全策にしたり、日常的な操作にも確認を出したりする'
			},
			harm: {
				en: 'When confirmations appear often, people stop reading them and press the confirm button out of habit, so the dialog no longer prevents mistakes; people can still delete things such as their account by accident even after several confirmations.',
				ja: '確認がたびたび出ると、利用者は読まずに反射的に確定のボタンを押すようになり、誤操作を防げなくなります。何度確認しても、アカウントなどを誤って削除してしまうことがあります。'
			},
			instead: {
				en: 'Keep confirmations for actions that destroy work or cost money, say exactly what will happen, and label the buttons with their outcome, such as “Delete file” and “Keep file”. Wherever possible, let people undo or restore instead.',
				ja: '確認は作業内容が消える操作やお金がかかる操作に絞り、何が起きるかを具体的に書き、「ファイルを削除」「ファイルを残す」のように結果がわかるボタン名にします。できる限り、取り消しや復元ができるようにします。'
			}
		},
		{
			pattern: {
				en: 'Wording the decline button to make people feel guilty or foolish',
				ja: '断るボタンに、罪悪感や恥ずかしさを覚えさせる文言を付ける'
			},
			harm: {
				en: 'Being made to feel guilty or foolish for saying no pressures people into the choice the provider wants, even one they would not otherwise make.',
				ja: '断ることに後ろめたさや恥ずかしさを感じさせられ、本来なら選ばない、提供する側の望む選択をしてしまいます。'
			},
			instead: {
				en: 'Label both buttons neutrally with what they do, such as “Cancel subscription” and “Keep subscription”.',
				ja: '「解約する」「契約を続ける」のように、両方のボタンに操作の結果だけを中立的な言葉で書きます。'
			},
			deceptive: true
		}
	],
	related: [
		{
			id: 'modal',
			diff: {
				en: 'An alert dialog is a modal for an urgent message that needs a response; its role lets browsers and screen readers tell it apart from other dialogs.',
				ja: 'アラートダイアログは応答が必要な緊急のメッセージ用のモーダルで、ブラウザやスクリーンリーダーはその role でほかのダイアログと区別できます。'
			}
		},
		{
			id: 'alert',
			diff: {
				en: 'An alert dialog stops the user until they respond; an alert informs without interrupting.',
				ja: 'アラートダイアログは応答するまで作業を止め、アラートは作業を中断させずに知らせます。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Alert and Message Dialogs Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'WAI-ARIA APG: Alert Dialog Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/examples/alertdialog/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'MDN: ARIA alertdialog role',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alertdialog_role',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Nielsen Norman Group: Confirmation Dialogs Can Prevent User Errors — If Not Overused',
			url: 'https://www.nngroup.com/articles/confirmation-dialog/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「モーダルダイアログ」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/modal-dialog/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ボタン（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/button/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Deceptive Patterns: Confirmshaming',
			url: 'https://www.deceptive.design/types/confirmshaming',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Apple Human Interface Guidelines: Alerts',
			url: 'https://developer.apple.com/design/human-interface-guidelines/alerts',
			checkedAt: '2026-11-02'
		}
	]
} satisfies ComponentData;
