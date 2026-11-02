import type { ComponentData } from '#lib/types.js';

export default {
	id: 'file-upload',
	category: 'input',
	names: { en: 'File upload', ja: 'ファイルアップロード（ドロップエリア）' },
	aliases: [
		{ name: 'File uploader', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/building-blocks/core/components/file-uploader' },
		{ name: 'Upload', source: 'Ant Design', url: 'https://ant.design/components/upload' },
		{ name: 'DropZone', source: 'React Aria', url: 'https://react-aria.adobe.com/DropZone' },
		{ name: 'ファイルアップロード／ドロップエリア', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/file-upload/' },
		{ name: 'File input', source: 'U.S. Web Design System', url: 'https://designsystem.digital.gov/components/file-input/' }
	],
	summary: {
		en: 'Lets the user choose files from their device, by a button or by dragging them in.',
		ja: '端末にあるファイルを、ボタンで選ぶかドラッグして入れることで指定する部品です。'
	},
	appearance: {
		en: 'A “Choose files” button, often inside a dashed box where files can be dropped. Chosen files are listed below with their names and sizes.',
		ja: '「ファイルを選択」ボタンがあり、ファイルを落とせる点線の枠に入っていることが多いです。選んだファイルの名前と大きさが下に並びます。'
	},
	behavior: [
		{
			en: 'The button opens the operating system’s file picker.',
			ja: 'ボタンを押すと OS のファイル選択画面が開きます。'
		},
		{
			en: 'Dropping files on the dashed box also chooses them. This demo uses the native `<input type="file">` and handles drops on the surrounding box.',
			ja: '点線の枠にファイルを落としても選べます。このデモはネイティブの `<input type="file">` を使い、周りの枠へのドロップも受け付けています。'
		},
		{
			en: 'In this demo, every file is checked for its type (PDF, PNG or JPEG) and size (up to 10 MB), whether it was chosen with the button or dropped. A file that fails stays in the list with an error message under its name, and an error message for the whole field appears under the number of chosen files.',
			ja: 'このデモでは、ボタンで選んだファイルもドロップしたファイルも、形式（PDF・PNG・JPEG）と大きさ（10MBまで）を確かめます。条件に合わないファイルは一覧に残し、ファイル名の下にエラー文を出します。選んだ件数の下には、全体のエラー文を出します。'
		},
		{
			en: 'Each chosen file can be removed from the list. Removing moves focus back to the file button.',
			ja: '選んだファイルは1件ずつ解除できます。解除するとフォーカスはファイル選択ボタンに戻ります。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'Opens the file picker (on the file button), or removes a file (on its remove button).',
				ja: 'ファイル選択ボタンでは選択画面を開き、解除ボタンではそのファイルを外します。'
			}
		},
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves between the buttons.', ja: 'ボタンの間を移動します。' } }
	],
	usage: [
		{
			en: 'Show the chosen files as a numbered list with the name, the size and a remove button, and say “No file selected” when there are none.',
			ja: '選んだファイルは番号付きリストにし、各行にファイル名・大きさ・解除ボタンを置きます。何も選んでいないときは「未選択」と表示します。'
		},
		{
			en: 'The `accept` attribute only narrows what the file picker shows, and does not apply to dropped files. Check the type and size in the page, and on the server too.',
			ja: '`accept` 属性はファイル選択画面での絞り込みにすぎず、ドロップしたファイルには効きません。ページの中で形式と大きさを確かめ、サーバー側でも確かめます。'
		},
		{
			en: 'The GOV.UK Design System says to ask for an upload only if it is critical to delivering the service. It says to let people reuse a file they uploaded earlier in the same journey, and to write a specific error message for each problem, such as no file selected, the wrong file type or a file that is too large.',
			ja: 'GOV.UK は、サービスの提供に欠かせないときだけファイルのアップロードを求めるよう勧めています。同じ一連の手続きの中で前にアップロードしたファイルを使い回せるようにし、ファイルが選ばれていない、種類が違う、大きすぎるといった問題ごとに、具体的なエラーメッセージを書くよう求めています。'
		},
		{
			en: 'The U.S. Web Design System says to ask for files only when they are required, to accept several file formats, and to prefer one file per input because some people do not know how to select several. It explains restrictions such as file types and size in hint text. Its file input does not upload in the background: files are sent only when the form is submitted.',
			ja: 'U.S. Web Design System は、ファイルを求めるのは必須のときだけにし、複数のファイル形式を受け付け、1つの入力欄につきファイルは1つにするよう勧めています。複数のファイルの選び方が分からない人がいるためです。ファイルの種類や大きさといった制限は、ヒントのテキストで説明します。このファイル入力は裏でアップロードを進めず、フォームを送信したときに初めてファイルを送ります。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Offering only a drop area for choosing files',
				ja: 'ファイルの選択をドロップエリアだけにする'
			},
			harm: {
				en: 'People who cannot drag precisely, and people who use a trackball, head pointer, eye-gaze system or speech-controlled pointer, find dragging hard and error-prone.',
				ja: '正確にドラッグできない人や、トラックボール、ヘッドポインター、視線入力、音声で動かすポインターを使う人には、ドラッグが難しく、誤りやすいです。'
			},
			instead: {
				en: 'Always provide a file button (`<input type="file">`) next to the drop area, so files can be chosen with a click or the keyboard.',
				ja: 'ドロップエリアのそばにファイル選択ボタン（`<input type="file">`）を必ず置き、クリックやキーボードでも選べるようにします。'
			}
		}
	],
	related: [
		{
			id: 'button',
			diff: {
				en: 'A file upload is built around a button, but the button opens a file picker and keeps the chosen files as a form value.',
				ja: 'ファイルアップロードの中心はボタンですが、押すとファイル選択画面が開き、選んだファイルをフォームの値として持ちます。'
			}
		}
	],
	sources: [
		{
			label: 'MDN: <input type="file">',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Open UI: File',
			url: 'https://open-ui.org/components/file.research/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ファイルアップロード／ドロップエリア」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/file-upload/usage/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WCAG 2.2: Understanding SC 2.5.7 Dragging Movements',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html',
			checkedAt: '2026-10-21'
		},
		{
			label: 'GOV.UK Design System: File upload',
			url: 'https://design-system.service.gov.uk/components/file-upload/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'U.S. Web Design System: File input',
			url: 'https://designsystem.digital.gov/components/file-input/',
			checkedAt: '2026-11-02'
		}
	]
} satisfies ComponentData;
