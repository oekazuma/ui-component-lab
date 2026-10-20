import type { ComponentData } from '#lib/types.js';

export default {
	id: 'text-field',
	category: 'input',
	names: { en: 'Text field', ja: 'テキストフィールド（インプットテキスト）' },
	aliases: [
		{ name: 'Text input', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/text-input/usage/' },
		{ name: 'Input', source: 'Ant Design', url: 'https://ant.design/components/input' },
		{ name: 'インプットテキスト', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/input-text/' }
	],
	summary: {
		en: 'A box where the user types a short piece of free text, such as a name.',
		ja: '名前など、短い文字列を自由に入力する欄。'
	},
	appearance: {
		en: 'A rectangle with a border or an underline, with a label above it. Hint or error text often appears below.',
		ja: '枠線または下線のある長方形で、上にラベルがある。下に補足やエラーの文が出ることが多い。'
	},
	behavior: [
		{
			en: 'Clicking or tabbing into it shows a text cursor, and typing enters text.',
			ja: 'クリックまたは Tab でフォーカスするとカーソルが出て、文字を入力できる。'
		},
		{
			en: 'The label stays visible; placeholder text disappears when typing starts, so it should not replace the label.',
			ja: 'ラベルは常に見えるようにする。placeholder は入力を始めると消えるため、ラベルの代わりにはしない。'
		},
		{
			en: 'Hint text is linked with aria-describedby so screen readers read it with the label.',
			ja: '補足の文は aria-describedby でつなぎ、スクリーンリーダーがラベルと一緒に読み上げるようにする。'
		}
	],
	keyboard: [
		{ key: 'Tab', action: { en: 'Moves focus into or out of the field.', ja: '入力欄へ、または入力欄から移動する。' } },
		{
			key: '← / → / Home / End',
			action: { en: 'Moves the text cursor.', ja: '文字のカーソルを移動する。' }
		}
	],
	variations: [
		{
			name: { en: 'Text area', ja: 'テキストエリア' },
			description: {
				en: 'A taller box for several lines of text, such as comments.',
				ja: 'コメントなど、複数行の文章を入力する縦長の欄。'
			}
		}
	],
	usage: [
		{
			en: 'Do not use placeholder text in place of a label or hint.',
			ja: 'プレースホルダーをラベルや補足説明の代わりにしない。'
		},
		{
			en: 'Match the width of the field to the expected length of the input.',
			ja: '入力欄の幅は、想定する入力の長さに合わせる。'
		},
		{
			en: 'Error messages should say what is wrong and how to fix it.',
			ja: 'エラーメッセージには、何が問題でどう直せばよいかを書く。'
		}
	],
	related: [
		{
			id: 'combobox',
			diff: {
				en: 'A text field has no suggestions; a combobox adds a list of suggestions to choose from.',
				ja: 'テキストフィールドには候補がなく、コンボボックスは選べる候補のリストが付く。'
			}
		}
	],
	sources: [
		{
			label: 'Carbon Design System: Text input',
			url: 'https://carbondesignsystem.com/components/text-input/usage/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Ant Design: Input',
			url: 'https://ant.design/components/input',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「インプットテキスト」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/input-text/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
