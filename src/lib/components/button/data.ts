import type { ComponentData } from '#lib/types.js';

export default {
	id: 'button',
	category: 'action',
	names: { en: 'Button', ja: 'ボタン' },
	aliases: [],
	summary: {
		en: 'Triggers an action, such as submitting a form or opening a dialog.',
		ja: 'フォームの送信やダイアログを開くなど、操作を実行する部品。'
	},
	appearance: {
		en: 'A short label (sometimes with an icon) inside a clickable area, usually with a background or border. The most important action is often filled with the accent color. In this demo, “Cancel”, “Save draft” and “Submit” sit in a row as a text button, an outline button and a filled button.',
		ja: '短いラベル（アイコン付きのこともある）を、背景色や枠線のある押せる領域で囲んだ形。最も重要な操作はアクセントカラーで塗りつぶされることが多い。このデモでは「キャンセル」「下書き保存」「送信する」を、テキストボタン、アウトラインボタン、塗りボタンとして横に並べている。'
	},
	behavior: [
		{
			en: 'Click or tap runs the action once.',
			ja: 'クリック・タップで操作を1回実行する。'
		},
		{
			en: 'Shows a hover style under a mouse pointer and a visible focus ring when reached by keyboard.',
			ja: 'マウスを乗せると見た目が変わり、キーボードでフォーカスするとフォーカスリングが出る。'
		},
		{
			en: 'Navigating to another page is the job of a link, not a button.',
			ja: '別のページへの移動はボタンではなくリンクの役割。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves focus to the button.', ja: 'ボタンにフォーカスを移す。' } },
		{ key: 'Enter / Space', action: { en: 'Activates the button.', ja: 'ボタンを実行する。' } }
	],
	variations: [
		{
			name: { en: 'Filled (primary)', ja: '塗りボタン（プライマリ）' },
			description: {
				en: 'Filled with the accent color, with a white label. Used for the main action of a screen.',
				ja: 'アクセントカラーで塗りつぶし、ラベルを白にしたもの。画面の主な操作に使う。'
			}
		},
		{
			name: { en: 'Outline (secondary)', ja: 'アウトラインボタン（セカンダリ）' },
			description: {
				en: 'A colored border and label on a white background. Used next to a filled button for alternative actions.',
				ja: '白い背景に、色の付いた枠線とラベルのもの。塗りボタンの隣で代わりの操作に使う。'
			}
		},
		{
			name: { en: 'Text (tertiary)', ja: 'テキストボタン（ターシャリ）' },
			description: {
				en: 'No border or background; the colored label is underlined so it still reads as something to press. Used for low-emphasis actions. Some design systems call it a ghost button.',
				ja: '枠線も背景もなく、色の付いたラベルに下線を引いて押せることを示すもの。目立たせなくてよい操作に使う。ゴーストボタンと呼ぶデザインシステムもある。'
			}
		}
	],
	usage: [
		{
			en: 'Use one primary (filled) button per screen, and show priority by shape (filled, outline, text) as well as color.',
			ja: '塗りのボタンは1画面に1つにし、優先度は色だけでなく形（塗り、枠線、テキスト）でも示す。'
		},
		{
			en: 'When buttons sit side by side, put the most important one on the right and the least important on the left, so actions such as Cancel or Back go on the left. A single button in a modal dialog goes in the center.',
			ja: 'ボタンを横に並べるときは、最も優先度の高いボタンを右端に、低いボタンを左に置き、「キャンセル」「戻る」のような操作は左にする。モーダルダイアログのボタンが1つだけなら中央に置く。'
		},
		{
			en: 'Make the target at least 44 × 44 CSS px.',
			ja: '押せる領域は 44 × 44 CSS px 以上にする。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Disabling the submit button until the form is complete',
				ja: '入力が終わるまで送信ボタンを無効にしておく'
			},
			harm: {
				en: 'People can see the button but cannot tell why it does not respond, so they get stuck or give up. A `disabled` button cannot be reached with Tab, so people using a screen reader with a keyboard have trouble finding where it is.',
				ja: 'ボタンは見えているのに押せない理由が分からず、操作が止まったり、途中でやめたりしてしまう。`disabled` のボタンは Tab で到達できないため、スクリーンリーダーとキーボードを使う人はボタンの位置をつかみにくい。'
			},
			instead: {
				en: 'Keep the button enabled. Mark required fields, and if it is pressed too early, explain what is missing with an error message. If it must be disabled, state the condition for enabling it right next to the button.',
				ja: 'ボタンは押せるままにし、必須の項目に印を付ける。早く押されたら、足りない項目をエラーメッセージで案内する。どうしても無効にするなら、押せるようになる条件をボタンのすぐ近くに書く。'
			}
		},
		{
			pattern: {
				en: 'Emphasizing the Agree button and making Disagree hard to notice',
				ja: '「同意する」ボタンを目立たせ、「同意しない」ボタンを目立たなくする'
			},
			harm: {
				en: 'People are steered toward the choice that suits the provider, such as agreeing to the use of their personal data, and may end up “agreeing” to something they never really consented to.',
				ja: '個人情報の利用への同意のように、提供する側に都合のよい選択へ誘導される。本人が納得して同意していないのに、同意したことになりかねない。'
			},
			instead: {
				en: 'Give both choices the same size and the same button style, and let the labels alone tell them apart.',
				ja: '「同意する」と「同意しない」を同じ大きさ、同じ種類のボタンにし、違いはラベルだけで示す。'
			},
			deceptive: true
		},
		{
			pattern: {
				en: 'Wording the decline button to make people feel guilty',
				ja: '断るボタンの文言で後ろめたさを感じさせる'
			},
			harm: {
				en: 'Turning down the offer is made to feel shameful, so people are pressured into choices they would not otherwise make.',
				ja: '断ることを恥ずかしく感じるように仕向けられ、本来なら選ばない選択をしてしまう。'
			},
			instead: {
				en: 'Label the decline button with a neutral description of what happens, such as “Not now” or “Don’t subscribe”.',
				ja: '「今はしない」「登録しない」のように、押すと何が起きるかだけを中立な言葉で書く。'
			},
			deceptive: true
		}
	],
	related: [
		{
			id: 'link',
			diff: {
				en: 'A button runs an action on the current page; a link moves to another page or place.',
				ja: 'ボタンは今のページで操作を実行し、リンクは別のページや場所へ移動する。'
			}
		},
		{
			id: 'toggle-button',
			diff: {
				en: 'A toggle button keeps an on or off state; a button runs its action once per press.',
				ja: 'トグルボタンはオン・オフの状態を保ち、ボタンは押すたびに操作を1回実行する。'
			}
		},
		{
			id: 'split-button',
			diff: {
				en: 'A split button adds a menu of related actions beside the main button.',
				ja: 'スプリットボタンは、主な操作のボタンの横に関連する操作のメニューが付く。'
			}
		},
		{
			id: 'file-upload',
			diff: {
				en: 'A button runs an action; a file upload’s button opens a file picker and keeps the chosen files as a form value.',
				ja: 'ボタンは操作を実行し、ファイルアップロードのボタンはファイル選択画面を開いて、選んだファイルをフォームの値として持つ。'
			}
		},
		{
			id: 'back-to-top',
			diff: {
				en: 'A button runs any action in its place in the layout; a back to top button only returns to the top and often floats over the page.',
				ja: 'ボタンはレイアウトの中の決まった場所でさまざまな操作を実行し、スクロールトップボタンは先頭へ戻ることだけを受け持ち、ページの上に浮かぶことが多い。'
			}
		}
	],
	sources: [
		{
			label: 'Open UI: Button',
			url: 'https://open-ui.org/components/button',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Button Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ボタン」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/button/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ボタン（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/button/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ボタン（アクセシビリティ）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/button/accessibility/',
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
