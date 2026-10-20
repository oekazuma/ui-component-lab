import type { ComponentData } from '#lib/types.js';

export default {
	id: 'modal',
	category: 'overlay',
	names: { en: 'Modal (Dialog)', ja: 'モーダルダイアログ' },
	aliases: [
		{ name: 'Dialog', source: 'Material Design 3', url: 'https://m3.material.io/components/dialogs/overview' },
		{ name: 'Modal dialog', source: 'Atlassian Design System', url: 'https://atlassian.design/components/modal-dialog' },
		{ name: 'モーダルダイアログ', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/modal-dialog/' }
	],
	summary: {
		en: 'A window on top of the page that blocks the rest of the page until it is closed.',
		ja: 'ページの上に重ねて表示し、閉じるまで背後のページを操作できなくするウィンドウ。'
	},
	appearance: {
		en: 'A box in the middle of the screen over a dimmed background, usually with a title, a message, and buttons such as Cancel and OK.',
		ja: '暗くした背景の上、画面中央に箱が出る。タイトル、本文、「キャンセル」「OK」などのボタンを持つことが多い。'
	},
	behavior: [
		{
			en: 'When it opens, focus moves into the dialog.',
			ja: '開くと、フォーカスがダイアログの中に移る。'
		},
		{
			en: 'While it is open, the page behind cannot be clicked or reached with Tab.',
			ja: '開いている間は、背後のページをクリックしたり Tab キーで移動したりできない。'
		},
		{
			en: 'When it closes, focus returns to the element that opened it.',
			ja: '閉じると、開くきっかけになった要素にフォーカスが戻る。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between focusable elements inside the dialog only.',
				ja: 'ダイアログ内の要素の間だけを移動する。'
			}
		},
		{ key: 'Esc', action: { en: 'Closes the dialog.', ja: 'ダイアログを閉じる。' } }
	],
	usage: [
		{
			en: 'Use it to confirm a destructive action or to show a short, self-contained message.',
			ja: '取り消せない操作の確認や、短く完結したメッセージに使う。'
		},
		{
			en: 'Do not open it without a user action, and do not use it for forms, navigation menus or completion notices.',
			ja: '利用者の操作なしに開かず、フォーム、ナビゲーションメニュー、完了の通知には使わない。'
		},
		{
			en: 'Add a separate close button only when there are no action buttons.',
			ja: '操作ボタンがないときだけ、別に閉じるボタンを置く。'
		}
	],
	related: [
		{
			id: 'alert',
			diff: {
				en: 'An alert dialog (a kind of modal) stops the user until they respond; an alert informs without interrupting.',
				ja: 'アラートダイアログ（モーダルの一種）は応答するまで作業を止め、アラートは作業を中断させずに知らせる。'
			}
		},
		{
			id: 'drawer',
			diff: {
				en: 'A modal dialog appears in the middle of the screen; a drawer slides in from an edge as a tall panel.',
				ja: 'モーダルは画面の中央に出て、ドロワーは端から縦長のパネルとしてすべり出る。'
			}
		},
		{
			id: 'popover',
			diff: {
				en: 'A modal blocks the page until it is closed; a popover leaves the page usable and closes on an outside click.',
				ja: 'モーダルは閉じるまでページを操作できず、ポップオーバーは開いたままページを操作でき、外側のクリックで閉じる。'
			}
		}
	],
	sources: [
		{
			label: 'Open UI: Dialog',
			url: 'https://open-ui.org/components/dialog.research',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Dialog (Modal) Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MDN: <dialog>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「モーダルダイアログ」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/modal-dialog/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
