import type { ComponentData } from '#lib/types.js';

export default {
	id: 'file-upload',
	category: 'input',
	names: { en: 'File upload', ja: 'ファイルアップロード（ドロップエリア）' },
	aliases: [
		{ name: 'File uploader', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/building-blocks/core/components/file-uploader' },
		{ name: 'Upload', source: 'Ant Design', url: 'https://ant.design/components/upload' },
		{ name: 'DropZone', source: 'React Aria', url: 'https://react-aria.adobe.com/DropZone' },
		{ name: 'ファイルアップロード／ドロップエリア', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/file-upload/' }
	],
	summary: {
		en: 'Lets the user choose files from their device, by a button or by dragging them in.',
		ja: '端末にあるファイルを、ボタンで選ぶかドラッグして入れることで指定する部品。'
	},
	appearance: {
		en: 'A “Choose files” button, often inside a dashed box where files can be dropped. Chosen files are listed below with their names and sizes.',
		ja: '「ファイルを選択」ボタンがあり、ファイルを落とせる点線の枠に入っていることが多い。選んだファイルは名前と大きさが下に並ぶ。'
	},
	behavior: [
		{
			en: 'The button opens the operating system’s file picker.',
			ja: 'ボタンを押すと OS のファイル選択画面が開く。'
		},
		{
			en: 'Dropping files on the dashed box also chooses them. This demo uses the native <input type="file"> and handles drops on the surrounding box.',
			ja: '点線の枠にファイルを落としても選べる。このデモはネイティブの <input type="file"> を使い、周りの枠へのドロップも受け付けている。'
		},
		{
			en: 'Each chosen file can be removed from the list. Removing moves focus back to the file button.',
			ja: '選んだファイルは1件ずつ解除できる。解除するとフォーカスはファイル選択ボタンに戻る。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'Opens the file picker (on the file button), or removes a file (on its remove button).',
				ja: 'ファイル選択ボタンでは選択画面を開き、解除ボタンではそのファイルを外す。'
			}
		},
		{ key: 'Tab', action: { en: 'Moves between the buttons.', ja: 'ボタンの間を移動する。' } }
	],
	usage: [
		{
			en: 'Show the chosen files as a numbered list with the name, the size and a remove button, and say “No file selected” when there are none.',
			ja: '選んだファイルは番号付きリストにし、各行にファイル名・大きさ・解除ボタンを置く。何も選んでいないときは「未選択」と表示する。'
		},
		{
			en: 'The accept attribute only narrows what the file picker shows. Check the files on the server too.',
			ja: 'accept 属性はファイル選択画面での絞り込みにすぎない。サーバー側でもファイルを確かめる。'
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
				ja: '正確にドラッグできない人や、トラックボール、ヘッドポインター、視線入力、音声で動かすポインターを使う人には、ドラッグが難しく、誤りやすい。'
			},
			instead: {
				en: 'Always provide a file button (<input type="file">) next to the drop area, so files can be chosen with a click or the keyboard.',
				ja: 'ドロップエリアのそばにファイル選択ボタン（<input type="file">）を必ず置き、クリックやキーボードでも選べるようにする。'
			}
		}
	],
	related: [
		{
			id: 'button',
			diff: {
				en: 'A file upload is built around a button, but the button opens a file picker and keeps the chosen files as a form value.',
				ja: 'ファイルアップロードの中心はボタンだが、押すとファイル選択画面が開き、選んだファイルをフォームの値として持つ。'
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
		}
	]
} satisfies ComponentData;
