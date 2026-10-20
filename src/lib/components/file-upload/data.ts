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
			en: 'Always provide a file button. Not everyone can drag, so a drop area alone is not enough (WCAG 2.2, 2.5.7 Dragging Movements).',
			ja: 'ファイル選択ボタンを必ず置く。ドラッグできない人もいるため、ドロップエリアだけの作りにはしない（WCAG 2.2 の 2.5.7「ドラッグ動作」）。'
		},
		{
			en: 'Show the chosen files as a numbered list with the name, the size and a remove button, and say “No file selected” when there are none.',
			ja: '選んだファイルは番号付きリストにし、各行にファイル名・大きさ・解除ボタンを置く。何も選んでいないときは「未選択」と表示する。'
		},
		{
			en: 'The accept attribute only narrows what the file picker shows. Check the files on the server too.',
			ja: 'accept 属性はファイル選択画面での絞り込みにすぎない。サーバー側でもファイルを確かめる。'
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
		}
	]
} satisfies ComponentData;
