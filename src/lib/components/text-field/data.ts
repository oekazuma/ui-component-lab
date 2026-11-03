import type { ComponentData } from '#lib/types.js';

export default {
	id: 'text-field',
	category: 'input',
	names: { en: 'Text field', ja: 'テキストフィールド（インプットテキスト）' },
	aliases: [
		{ name: 'Text input', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/text-input/usage/' },
		{ name: 'Input', source: 'Ant Design', url: 'https://ant.design/components/input' },
		{ name: 'インプットテキスト', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/input-text/' },
		{ name: 'Text input', source: 'U.S. Web Design System', url: 'https://designsystem.digital.gov/components/text-input/' }
	],
	summary: {
		en: 'A box where the user types a short piece of free text, such as a name.',
		ja: '名前など、短い文字列を自由に入力する欄です。'
	},
	appearance: {
		en: 'A rectangle with a border or an underline, with a label above it. A required field has a mark such as “(required)” next to the label. Hint text often sits between the label and the field, and error text appears below the field.',
		ja: '枠線または下線のある長方形で、上にラベルがあります。入力が必須の欄はラベルの横に「※必須」などの表示があります。ラベルと欄の間に補足の文が、欄の下にエラーの文が出ることが多いです。'
	},
	behavior: [
		{
			en: 'Clicking or tabbing into it shows a text cursor, and typing enters text.',
			ja: 'クリックまたは Tab でフォーカスするとカーソルが出て、文字を入力できます。'
		},
		{
			en: 'The label stays visible; `placeholder` text disappears when typing starts, so it should not replace the label.',
			ja: 'ラベルは常に見えるようにします。`placeholder` は入力を始めると消えるため、ラベルの代わりにはしません。'
		},
		{
			en: 'Hint text is linked with `aria-describedby` so screen readers read it with the label.',
			ja: '補足の文は `aria-describedby` でつなぎ、スクリーンリーダーがラベルと一緒に読み上げるようにします。'
		},
		{
			en: 'In this demo, the field has no `maxlength`, so text past 20 characters is not cut off. Pressing Save with the field empty or too long shows an error below the field, links it with `aria-describedby`, sets `aria-invalid`, and moves focus to the field. After the first save, the error updates as you type and disappears once the value is fixed.',
			ja: 'このデモでは `maxlength` を付けていないので、20文字を超えても入力は切れません。空のまま、または長すぎるまま「保存」を押すと、欄の下にエラーの文を出して `aria-describedby` でつなぎ、`aria-invalid` を付けて、フォーカスを欄へ移します。一度保存したあとは、入力に合わせてエラーが変わり、直すと消えます。'
		}
	],
	keyboard: [
		{ key: 'Enter', action: { en: 'Submits the form (Save in this demo).', ja: 'フォームを送信します（このデモでは「保存」）。' } },
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves focus into or out of the field.', ja: 'フォーカスを入力欄に移したり、入力欄から外したりします。' } },
		{
			key: '← / → / Home / End',
			action: { en: 'Moves the text cursor.', ja: '文字のカーソルを移動します。' }
		}
	],
	usage: [
		{
			en: 'Match the width of the field to the expected length of the input.',
			ja: '入力欄の幅は、想定する入力の長さに合わせます。'
		},
		{
			en: 'Mark required fields in words next to the label, such as “(required)”, not with color alone.',
			ja: '入力が必須の欄は、ラベルの横に「※必須」のような文字で示し、色だけに頼りません。'
		},
		{
			en: 'Error messages should say what is wrong and how to fix it. Show them when the form is submitted, not while typing or when focus leaves the field.',
			ja: 'エラーメッセージには、何が問題でどう直せばよいかを書きます。エラーは送信したときに出し、入力中やフォーカスが外れたときには出しません。'
		},
		{
			en: 'Do not cut off input with `maxlength`. Let people type past the limit, and say in the error how many characters they entered.',
			ja: '`maxlength` で入力を打ち切りません。上限を超えても入力させ、エラーで入力した文字数を伝えます。'
		},
		{
			en: 'The U.S. Web Design System says to avoid placeholder text, which vanishes once people type and often has too little contrast, and not to split one number, such as a phone number, across several fields. It also says to choose between disabled and read-only on purpose: a native disabled field cannot be reached with Tab and its value is not submitted, while a read-only field stays focusable and its value is submitted.',
			ja: 'U.S. Web Design System は、入力し始めると消え、コントラストも足りないことが多いプレースホルダーを避けること、電話番号のように1つの番号を複数の欄に分けないことを求めています。無効（disabled）と読み取り専用（read-only）は意図して選びます。無効の欄は Tab キーで届かず、値も送信されません。読み取り専用の欄はフォーカスでき、値も送信されます。'
		},
		{
			en: 'Bring up the right on-screen keyboard. The GOV.UK Design System sets `inputmode="numeric"` for whole numbers and `inputmode="decimal"` for numbers with decimal places. Because some devices cannot enter negative values on the on-screen keypad, it leaves out `inputmode` when negative numbers are allowed.',
			ja: '内容に合う画面キーボードを出します。GOV.UK Design System は、整数には `inputmode="numeric"`、小数を含む数には `inputmode="decimal"` を指定します。画面のテンキーでマイナスを入力できない端末があるので、負の数を受け付けるときは `inputmode` を付けません。'
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
				ja: 'プレースホルダーは入力を始めると消えるため、記憶に困難のある人や、入力内容を見直す人が困ります。読み上げないスクリーンリーダーもあり、ブラウザ既定の表示色はコントラストの基準を満たさないことが多いです。'
			},
			instead: {
				en: 'Put a visible label outside the field, and write hints and examples as text outside it too, so they stay on screen while typing.',
				ja: '入力欄の外に常に見えるラベルを置き、補足説明や入力例も欄の外にテキストで書いて、入力中も見えるようにします。'
			}
		}
	],
	related: [
		{
			id: 'combobox',
			diff: {
				en: 'A text field has no suggestions; a combobox adds a list of suggestions to choose from.',
				ja: 'テキストフィールドには候補がなく、コンボボックスは選べる候補のリストが付きます。'
			}
		},
		{
			id: 'textarea',
			diff: {
				en: 'A text field takes one short line; a text area takes several lines of free text.',
				ja: 'テキストフィールドは短い1行を入力し、テキストエリアは複数行の文章を入力します。'
			}
		},
		{
			id: 'search-field',
			diff: {
				en: 'A text field takes any short text; a search field is one made for search terms, usually with a search button and a search landmark.',
				ja: 'テキストフィールドは短い文字列全般に使います。検索ボックスは検索語のための形で、検索ボタンや検索のランドマークが付くことが多いです。'
			}
		},
		{
			id: 'password-field',
			diff: {
				en: 'A text field always shows what is typed; a password field hides it and has a button to show it.',
				ja: 'テキストフィールドは入力した文字を常に見せます。パスワード入力は文字を隠し、表示するボタンが付きます。'
			}
		},
		{
			id: 'one-time-code',
			diff: {
				en: 'A text field takes any short text; a one-time code field is one set up for a code sent to the user, with a number keypad and autofill from the message.',
				ja: 'テキストフィールドは短い文字列全般に使います。確認コードの入力は、届いたコードのために整えた形で、数字のキーボードと、届いたメッセージからの自動入力が付きます。'
			}
		},
		{
			id: 'time-picker',
			diff: {
				en: 'A text field takes any text, and the U.S. Web Design System prefers it for exact past times such as a time of birth; a time picker takes only times of day, typically in set increments such as 30 minutes.',
				ja: 'テキストフィールドは自由な文字列を入れられ、U.S. Web Design System は出生時刻のような過去の正確な時刻にこちらを勧めていますが、タイムピッカーは30分刻みなど決まった刻みの時刻だけを受け取ります。'
			}
		},
		{
			id: 'color-picker',
			diff: {
				en: 'A text field takes any text, and React Aria’s ColorField is a text field for typing a hex or channel value; a color picker chooses a color from a swatch, a spectrum or presets, and the native input always holds a valid color.',
				ja: 'テキストフィールドは自由な文字列を入れられ、React Aria の ColorField は16進数やチャンネルの値を入力するための入力欄ですが、カラーピッカーは色を色見本やスペクトル、一覧から選び、ネイティブの入力は必ず有効な色を持ちます。'
			}
		},
		{
			id: 'date-picker',
			diff: {
				en: 'A text field alone suits dates people already know, such as a birthday; a date picker adds a calendar for dates they schedule or choose by the day of the week.',
				ja: 'テキストフィールドだけなら誕生日のように分かっている日付に向いていますが、日付ピッカーは、予定を入れる日や曜日で選ぶ日のためにカレンダーを添えます。'
			}
		},
		{
			id: 'number-input',
			diff: {
				en: 'A text field with `inputmode="numeric"` suits digits that are not amounts, such as a postal code; a number input is for counts that go up and down in small steps, such as a quantity.',
				ja: 'テキストフィールドに `inputmode="numeric"` を付けると郵便番号のように量ではない数字に向いていますが、数値入力は数量のように小刻みに増減する数のためのものです。'
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
			label: 'デジタル庁デザインシステムウェブサイト「インプットテキスト（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/input-text/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: input-text',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/input-text',
			checkedAt: '2026-10-21'
		},
		{
			label: 'GOV.UK Design System: Character count',
			url: 'https://design-system.service.gov.uk/components/character-count/',
			checkedAt: '2026-10-21'
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
		},
		{
			label: 'U.S. Web Design System: Text input',
			url: 'https://designsystem.digital.gov/components/text-input/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'MDN: inputmode',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode',
			checkedAt: '2026-11-04'
		}
	]
} satisfies ComponentData;
