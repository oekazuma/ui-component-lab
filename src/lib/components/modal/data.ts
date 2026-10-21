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
		en: 'A box in the middle of the screen over a dimmed background, usually with a title, a message, and buttons such as Cancel and OK. This demo is a short message with a receipt number and a single Close button in the center.',
		ja: '暗くした背景の上、画面中央に箱が出る。タイトル、本文、「キャンセル」「OK」などのボタンを持つことが多い。このデモは受付番号を知らせる短いメッセージで、中央に「閉じる」ボタンだけがある。'
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
		},
		{
			en: 'In this demo, the message is complete in itself and asks for no decision, so the only button is Close, and focus moves to it when the dialog opens. For confirming a destructive action, see the alert dialog.',
			ja: 'このデモのメッセージはダイアログの中で完結し、判断を求めないので、ボタンは「閉じる」だけで、開くとそこにフォーカスが移る。取り消せない操作の確認は、アラートダイアログを参照。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between the dialog’s controls. The page behind cannot be reached, though focus may move to the browser’s own controls.',
				ja: 'ダイアログ内の要素の間を移動する。背後のページには移らないが、ブラウザ自体の操作部分には移ることがある。'
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
			en: 'Do not use it for navigation menus or completion notices; use a drawer or a menu button for navigation.',
			ja: 'ナビゲーションメニューや完了の通知には使わない。ナビゲーションにはドロワーやメニューボタンを使う。'
		},
		{
			en: 'Add a separate close button only when there are no action buttons.',
			ja: '操作ボタンがないときだけ、別に閉じるボタンを置く。'
		},
		{
			en: 'When the dialog has only one button, place it in the center.',
			ja: 'ダイアログのボタンが1つだけのときは、中央に置く。'
		}
	],
	misuse: [
		{
			pattern: { en: 'Opening the dialog without a user action', ja: '利用者の操作なしにダイアログを開く' },
			harm: {
				en: 'People do not know why it appeared or whether they may close it, lose their place in what they were reading because it covers the page, and may not get focus back where they were after closing it.',
				ja: 'なぜ出たのか、閉じてよいのかがわからず戸惑う。読んでいた箇所が隠れて見失い、閉じたあと元の位置にフォーカスが戻らないこともある。'
			},
			instead: {
				en: 'Open it only when the user presses a button. Show messages the page needs to convey, such as announcements, within the page itself, for example as a notification banner.',
				ja: '利用者がボタンを押したときだけ開く。告知のようにページで伝え続けたい情報は、ノティフィケーションバナーなどでページ内に表示する。'
			}
		},
		{
			pattern: { en: 'Putting a form inside the dialog', ja: 'ダイアログの中にフォームを入れる' },
			harm: {
				en: 'While the dialog is open, people cannot read or copy information outside it that they need for their input, and checking their entries can require yet another dialog, stacking one mode on top of another.',
				ja: '開いている間はダイアログの外の情報を読んだりコピーしたりできず、入力に必要な情報を参照できない。入力内容の確認にさらにダイアログが要り、モードが重なることもある。'
			},
			instead: {
				en: 'Place the form directly on the page, next to the information needed to fill it in.',
				ja: 'フォームはページ上に直接置き、入力に必要な情報と同じ画面に並べる。'
			}
		},
		{
			pattern: {
				en: 'Making the “Agree” button prominent and the “Do not agree” button hard to notice',
				ja: '「同意する」のボタンだけを目立たせ、「同意しない」を目立たなくする'
			},
			harm: {
				en: 'People are steered toward the choice that suits the provider, such as agreeing to the use of their personal information, instead of the choice they would make themselves.',
				ja: '個人情報の利用への同意など、提供する側に都合のよい選択へ誘導され、利用者が自分で選ぶはずだった判断ができなくなる。'
			},
			instead: {
				en: 'Give both choices the same visual weight and label each button with what it does, so people can compare them and pick one.',
				ja: '両方のボタンを同じ見た目の強さにし、それぞれの結果がわかるラベルを付けて、利用者が見比べて選べるようにする。'
			},
			deceptive: true
		}
	],
	related: [
		{
			id: 'command-palette',
			diff: {
				en: 'A modal can hold any content; a command palette is a modal dialog that holds only a search field and a list of commands.',
				ja: 'モーダルはどんな内容でも持て、コマンドパレットは検索欄と操作の一覧だけを持つモーダルダイアログ。'
			}
		},
		{
			id: 'alert-dialog',
			diff: {
				en: 'A modal is any dialog that blocks the page; an alert dialog is the kind used for an urgent message that needs a response.',
				ja: 'モーダルは背後のページを止めるダイアログ全般で、アラートダイアログはそのうち応答が必要な緊急のメッセージに使うもの。'
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
		}
	]
} satisfies ComponentData;
