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
			en: 'The label stays visible; `placeholder` text disappears when typing starts, so it should not replace the label.',
			ja: 'ラベルは常に見えるようにする。`placeholder` は入力を始めると消えるため、ラベルの代わりにはしない。'
		},
		{
			en: 'Hint text is linked with `aria-describedby` so screen readers read it with the label.',
			ja: '補足の文は `aria-describedby` でつなぎ、スクリーンリーダーがラベルと一緒に読み上げるようにする。'
		}
	],
	keyboard: [
		{ key: 'Tab', action: { en: 'Moves focus into or out of the field.', ja: '入力欄へ、または入力欄から移動する。' } },
		{
			key: '← / → / Home / End',
			action: { en: 'Moves the text cursor.', ja: '文字のカーソルを移動する。' }
		}
	],
	usage: [
		{
			en: 'Match the width of the field to the expected length of the input.',
			ja: '入力欄の幅は、想定する入力の長さに合わせる。'
		},
		{
			en: 'Error messages should say what is wrong and how to fix it.',
			ja: 'エラーメッセージには、何が問題でどう直せばよいかを書く。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Using placeholder text in place of a label or hint',
				ja: 'プレースホルダーをラベルや補足説明の代わりにする'
			},
			harm: {
				en: 'Placeholder text disappears once typing starts, which is a problem for people with memory difficulties and for anyone reviewing their answers. Not all screen readers announce it, and the default browser styling for it often fails contrast requirements.',
				ja: 'プレースホルダーは入力を始めると消えるため、記憶に困難のある人や、入力内容を見直す人が困る。読み上げないスクリーンリーダーもあり、ブラウザ既定の表示色はコントラストの基準を満たさないことが多い。'
			},
			instead: {
				en: 'Put a visible label outside the field, and write hints and examples as text outside it too, so they stay on screen while typing.',
				ja: '入力欄の外に常に見えるラベルを置き、補足説明や入力例も欄の外にテキストで書いて、入力中も見えるようにする。'
			}
		}
	],
	related: [
		{
			id: 'combobox',
			diff: {
				en: 'A text field has no suggestions; a combobox adds a list of suggestions to choose from.',
				ja: 'テキストフィールドには候補がなく、コンボボックスは選べる候補のリストが付く。'
			}
		},
		{
			id: 'textarea',
			diff: {
				en: 'A text field takes one short line; a text area takes several lines of free text.',
				ja: 'テキストフィールドは短い1行を入力し、テキストエリアは複数行の文章を入力する。'
			}
		},
		{
			id: 'search-field',
			diff: {
				en: 'A text field takes any short text; a search field is one made for search terms, usually with a search button and a search landmark.',
				ja: 'テキストフィールドは短い文字列全般に使う。検索ボックスは検索語のための形で、検索ボタンや検索のランドマークが付くことが多い。'
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
		},
		{
			label: 'GOV.UK Design System: Text input',
			url: 'https://design-system.service.gov.uk/components/text-input/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'W3C WAI Tutorials: Form Instructions',
			url: 'https://www.w3.org/WAI/tutorials/forms/instructions/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Nielsen Norman Group: Placeholders in Form Fields Are Harmful',
			url: 'https://www.nngroup.com/articles/form-design-placeholders/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
