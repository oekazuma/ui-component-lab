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
		}
	]
} satisfies ComponentData;
