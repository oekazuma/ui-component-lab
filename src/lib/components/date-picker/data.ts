import type { ComponentData } from '#lib/types.js';

export default {
	id: 'date-picker',
	category: 'input',
	names: { en: 'Date picker', ja: '日付ピッカー（デートピッカー）' },
	aliases: [
		{ name: '日付ピッカー／カレンダー', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/date-picker/' }
	],
	summary: {
		en: 'A field for entering a date, by typing or by choosing from a calendar.',
		ja: '日付を入力する欄です。直接入力するか、カレンダーから選びます。'
	},
	appearance: {
		en: 'A text field showing a date format such as yyyy/mm/dd, with a calendar icon at the right. Opening it shows a month grid.',
		ja: '「年/月/日」のような日付の形式が表示された入力欄で、右端にカレンダーのアイコンがあります。開くと1か月分の日付の表が出ます。'
	},
	behavior: [
		{
			en: 'The year, month, and day can be typed directly or picked from the calendar.',
			ja: '年・月・日は直接入力することも、カレンダーから選ぶこともできます。'
		},
		{
			en: 'This demo uses the native `<input type="date">`, so the display format and calendar depend on the browser and language settings; the value is always yyyy-mm-dd.',
			ja: 'このデモはネイティブの `<input type="date">` を使っているため、表示形式やカレンダーはブラウザと言語設定で変わります。値は常に yyyy-mm-dd になります。'
		},
		{
			en: 'Earliest and latest dates can be limited with `min` and `max`.',
			ja: '選べる日付の範囲は `min` と `max` で制限できます。'
		},
		{
			en: 'In this demo, `min` is today, so earlier days cannot be picked from the calendar. It is set in the browser when the page opens, because a date written into the page when it was built would go out of date. An earlier date can still be typed in, so once a whole date is entered, an error appears below the field.',
			ja: 'このデモでは `min` を今日にしているので、カレンダーでは今日より前の日を選べません。ページを作った時点の日付が残らないよう、`min` はページを開いたときにブラウザで入れます。直接入力では前の日付も入れられるので、日付を入れ終えた時点で欄の下にエラーを出します。'
		},
		{
			en: 'The hint between the label and the field says which dates can be chosen, that the year is in the Western calendar, and gives an example of a whole date. It is linked with `aria-describedby`, and no placeholder text is used.',
			ja: 'ラベルと欄の間の補足の文で、選べる日付と、年は西暦で入れることを伝え、年月日の入力例を示します。補足は `aria-describedby` でつなぎ、プレースホルダーは使いません。'
		}
	],
	keyboard: [
		{
			key: '↑ / ↓',
			action: {
				en: 'Changes the focused part (year, month, or day).',
				ja: 'フォーカス中の部分（年・月・日）の数値を増減します。'
			}
		},
		{
			key: '← / →',
			action: {
				en: 'Moves between the year, month, and day parts (in Chrome).',
				ja: '年・月・日の間を移動します（Chrome の場合）。'
			}
		},
		{
			key: '0–9',
			action: { en: 'Types the number for the focused part.', ja: 'フォーカス中の部分に数字を入力します。' }
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between the year, month, and day parts, then out of the field (in Chrome).',
				ja: '年・月・日の間を移動し、端からは入力欄の外へ出ます（Chrome の場合）。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Separate fields', ja: '年・月・日に分けた欄' },
			description: {
				en: 'Year, month and day are separate text fields, each with its own label and `inputmode="numeric"`. GOV.UK’s date input works this way. The Digital Agency Design System calls this the Separated type, and the single field the Consolidated type, and lets a field be left out when it is not needed, such as for a year and month only.',
				ja: '年・月・日をそれぞれラベル付きの別の入力欄にし、`inputmode="numeric"` を付けたものです。GOV.UK の日付入力もこの形です。デジタル庁デザインシステムではこれを Separated タイプ、1つの欄にまとめたものを Consolidated タイプと呼び、年月だけのように要らない欄は省けるとしています。'
			}
		},
		{
			name: { en: 'Calendar dialog', ja: 'カレンダーのダイアログ' },
			description: {
				en: 'A text field plus a button that opens a calendar grid in a dialog. In the grid, arrow keys move by day and week, and Page Up / Page Down move by month.',
				ja: '入力欄の横のボタンで、カレンダーの表をダイアログで開くものです。表の中は矢印キーで日・週単位、Page Up / Page Down で月単位に移動します。'
			}
		}
	],
	usage: [
		{
			en: 'Give an example of a whole date in the hint. Show the format in the hint rather than as placeholder text, which disappears once people start typing. The Digital Agency Design System also has the hint say that the year is in the Western calendar.',
			ja: '補足の文で年月日の入力例を示します。プレースホルダーは入力を始めると消えてしまうので、形式はプレースホルダーではなく補足の文で示します。デジタル庁デザインシステムでは、年は西暦で入れることも補足の文で伝えます。'
		},
		{
			en: 'The WAI-ARIA APG example and the Digital Agency Design System open the calendar only from its button, and the Digital Agency Design System says not to open it on focus or hover. Carbon also opens it when the field gets focus.',
			ja: 'WAI-ARIA APG の例とデジタル庁デザインシステムはカレンダーをボタンからだけ開き、デジタル庁デザインシステムはフォーカスやホバーで開かないよう求めています。Carbon は欄にフォーカスしたときにも開きます。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Making people pick a date they already know, such as a birthday, from a calendar',
				ja: '誕生日のように本人が知っている日付を、カレンダーから選ばせる'
			},
			harm: {
				en: 'Calendar pickers work for dates within a year. For a date far in the past they take too much navigation, which slows people down.',
				ja: 'カレンダーは1年以内の日付に向いています。遠い過去の日付では何度もめくる必要があり、入力に時間がかかります。'
			},
			instead: {
				en: 'Let people type the date directly, and do not add a calendar button for dates they already know, such as a birthday or a card expiry date.',
				ja: '日付は直接入力してもらい、生年月日やカードの有効期限のように本人が知っている日付にはカレンダーのボタンを置きません。'
			}
		}
	],
	sources: [
		{
			label: 'MDN: <input type="date">',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Date Picker Dialog Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「日付ピッカー／カレンダー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/date-picker/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Nielsen Norman Group: Date-Input Form Fields: UX Design Guidelines',
			url: 'https://www.nngroup.com/articles/date-input/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「日付ピッカー／カレンダー（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/date-picker/usage/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: date-picker',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/date-picker',
			checkedAt: '2026-10-21'
		},
		{
			label: 'GOV.UK Design System: Date input',
			url: 'https://design-system.service.gov.uk/components/date-input/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Carbon Design System: Date picker',
			url: 'https://carbondesignsystem.com/components/date-picker/usage/',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
