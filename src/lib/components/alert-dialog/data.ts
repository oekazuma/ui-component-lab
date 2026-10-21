import type { ComponentData } from '#lib/types.js';

export default {
	id: 'alert-dialog',
	category: 'overlay',
	names: { en: 'Alert dialog', ja: 'アラートダイアログ' },
	aliases: [],
	summary: {
		en: 'A modal dialog that interrupts the user with an urgent message and waits for a response.',
		ja: '緊急のメッセージで作業を中断させ、応答を待つモーダルダイアログ。'
	},
	appearance: {
		en: 'Looks like a modal dialog: a box over a dimmed page with a short title, a message and two buttons, one of them for the risky action.',
		ja: 'モーダルダイアログと同じく、暗くした背景の上に箱が出る。短いタイトルと本文、危険な操作のボタンを含む2つのボタンを持つ。'
	},
	behavior: [
		{
			en: 'It has role="alertdialog", so screen readers announce its title and message as soon as it opens.',
			ja: 'role="alertdialog" を持ち、開くとスクリーンリーダーがタイトルと本文をすぐに読み上げる。'
		},
		{
			en: 'When it opens, focus goes to the least destructive button; in this demo, “Keep editing”.',
			ja: '開くと、最も安全なボタンにフォーカスが移る。このデモでは「編集を続ける」。'
		},
		{
			en: 'Like any modal, the page behind cannot be used until it closes, and focus then returns to the button that opened it.',
			ja: '他のモーダルと同じく、閉じるまで背後のページは使えず、閉じると開いたボタンにフォーカスが戻る。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves between the dialog’s buttons.', ja: 'ダイアログ内のボタンの間を移動する。' } },
		{ key: 'Enter / Space', action: { en: 'Activates the focused button.', ja: 'フォーカス中のボタンを押す。' } },
		{
			key: 'Esc',
			action: {
				en: 'Closes the dialog as if “Keep editing” was chosen.',
				ja: '「編集を続ける」を選んだのと同じ扱いで閉じる。'
			}
		}
	],
	usage: [
		{
			en: 'Use it only for urgent messages that need a decision, such as confirming an action that cannot be undone.',
			ja: '取り消せない操作の確認など、判断が必要な緊急のメッセージにだけ使う。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Relying on the confirmation dialog as the only safeguard, or asking for confirmation on routine actions',
				ja: '確認ダイアログだけを安全策にする、日常的な操作にも確認を出す'
			},
			harm: {
				en: 'When confirmations appear often, people stop reading them and press the confirm button out of habit, so the dialog no longer prevents mistakes; people can still delete things such as their account by accident even after several confirmations.',
				ja: '確認がたびたび出ると、利用者は読まずに反射的に確定のボタンを押すようになり、誤操作を防げなくなる。何度確認しても、アカウントなどを誤って削除してしまうことがある。'
			},
			instead: {
				en: 'Keep confirmations for actions that destroy work or cost money, say exactly what will happen, and label the buttons with their outcome, such as “Delete file” and “Keep file”. Wherever possible, let people undo or restore instead.',
				ja: '確認は作業内容が消える操作やお金がかかる操作に絞り、何が起きるかを具体的に書き、「ファイルを削除」「ファイルを残す」のように結果がわかるボタン名にする。できる限り、取り消しや復元ができるようにする。'
			}
		},
		{
			pattern: {
				en: 'Wording the decline button to make people feel guilty or foolish',
				ja: '断るボタンに、罪悪感や恥ずかしさを覚えさせる文言を付ける'
			},
			harm: {
				en: 'Being made to feel guilty or foolish for saying no pressures people into the choice the provider wants, even one they would not otherwise make.',
				ja: '断ることに後ろめたさや恥ずかしさを感じさせられ、本来なら選ばない、提供する側の望む選択をしてしまう。'
			},
			instead: {
				en: 'Label both buttons neutrally with what they do, such as “Cancel subscription” and “Keep subscription”.',
				ja: '「解約する」「契約を続ける」のように、両方のボタンに操作の結果だけを中立的な言葉で書く。'
			},
			deceptive: true
		}
	],
	related: [
		{
			id: 'modal',
			diff: {
				en: 'An alert dialog is a modal for an urgent message that needs a response; screen readers announce it as an alert.',
				ja: 'アラートダイアログは応答が必要な緊急のメッセージ用のモーダルで、スクリーンリーダーには警告として伝わる。'
			}
		},
		{
			id: 'alert',
			diff: {
				en: 'An alert dialog stops the user until they respond; an alert informs without interrupting.',
				ja: 'アラートダイアログは応答するまで作業を止め、アラートは作業を中断させずに知らせる。'
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
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Deceptive Patterns: Confirmshaming',
			url: 'https://www.deceptive.design/types/confirmshaming',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
