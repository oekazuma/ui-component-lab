import type { ComponentData } from '#lib/types.js';

export default {
	id: 'date-picker',
	category: 'input',
	names: { en: 'Date picker', ja: 'デートピッカー' },
	aliases: [],
	summary: {
		en: 'A field for entering a date, by typing or by choosing from a calendar.',
		ja: '日付を入力する欄。直接入力するか、カレンダーから選ぶ。'
	},
	appearance: {
		en: 'A text field showing a date format such as yyyy/mm/dd, with a calendar icon at the right. Opening it shows a month grid.',
		ja: '「年/月/日」のような日付の形式が表示された入力欄で、右端にカレンダーのアイコンがある。開くと1か月分の日付の表が出る。'
	},
	behavior: [
		{
			en: 'The year, month, and day can be typed directly or picked from the calendar.',
			ja: '年・月・日は直接入力することも、カレンダーから選ぶこともできる。'
		},
		{
			en: 'This demo uses the native <input type="date">, so the display format and calendar depend on the browser and language settings; the value is always yyyy-mm-dd.',
			ja: 'このデモはネイティブの <input type="date"> を使っているため、表示形式やカレンダーはブラウザと言語設定で変わる。値は常に yyyy-mm-dd になる。'
		},
		{
			en: 'Earliest and latest dates can be limited with min and max.',
			ja: '選べる日付の範囲は min と max で制限できる。'
		}
	],
	keyboard: [
		{
			key: '↑ / ↓',
			action: {
				en: 'Changes the focused part (year, month, or day).',
				ja: 'フォーカス中の部分（年・月・日）の数値を増減する。'
			}
		},
		{
			key: '← / → / Tab',
			action: {
				en: 'Moves between the year, month, and day parts (in Chrome).',
				ja: '年・月・日の間を移動する（Chrome の場合）。'
			}
		},
		{
			key: '0–9',
			action: { en: 'Types the number for the focused part.', ja: 'フォーカス中の部分に数字を入力する。' }
		}
	],
	variations: [
		{
			name: { en: 'Calendar dialog', ja: 'カレンダーのダイアログ' },
			description: {
				en: 'A text field plus a button that opens a calendar grid in a dialog. In the grid, arrow keys move by day and week, and Page Up / Page Down move by month.',
				ja: '入力欄の横のボタンで、カレンダーの表をダイアログで開くもの。表の中は矢印キーで日・週単位、Page Up / Page Down で月単位に移動する。'
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
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
