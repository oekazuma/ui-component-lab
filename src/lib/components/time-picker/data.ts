import type { ComponentData } from '#lib/types.js';

export default {
	id: 'time-picker',
	category: 'input',
	names: { en: 'Time picker', ja: 'タイムピッカー' },
	aliases: [],
	searchTerms: ['時刻入力', '時間入力', '時刻ピッカー'],
	summary: {
		en: 'A control for choosing a time of day, by typing the hour and minute or by picking from a list or a clock.',
		ja: '時刻を選ぶ部品です。時と分を入力するか、一覧や時計から選びます。'
	},
	appearance: {
		en: 'A field showing a time such as 1:30 PM or 13:30, split into parts for the hour and minute (and AM/PM in a 12-hour display). Time pickers often add a button or icon that opens a list of times or a clock. This demo is a reservation time field, with a hint between the label and the field and an error message below it.',
		ja: '「1:30 PM」や「13:30」のような時刻が表示された入力欄で、時と分（12時間表示ではAM/PMも）の部分に分かれています。時刻の一覧や時計を開くボタンやアイコンが付くことも多いです。このデモは予約時刻の欄で、ラベルと欄の間に補足の文、欄の下にエラーの文が出ます。'
	},
	behavior: [
		{
			en: 'It takes a time of day, an hour and a minute (and a second if needed), with no date. People can type it or pick it; Ant Design describes its TimePicker as for selecting or entering a time.',
			ja: '日付を含まない時刻（時と分、必要なら秒）を受け取ります。直接入力することも、選ぶこともできます。Ant Design は TimePicker を、時刻を選ぶか入力するための部品としています。'
		},
		{
			en: 'This demo uses the native `<input type="time">`. Its value is always a 24-hour `HH:mm` string such as `13:30`, whatever the field shows.',
			ja: 'このデモはネイティブの `<input type="time">` を使っています。欄の表示にかかわらず、値は常に `13:30` のような24時間表記の `HH:mm` になります。'
		},
		{
			en: 'How the field looks depends on the browser. MDN says the interface follows the browser and operating system, and that the 12-hour or 24-hour format is likely chosen from the user’s locale. In Chrome, the 12-hour or 24-hour display follows the browser’s own language, not the page’s `lang`, and a clock button at the right edge of the field opens a popup with an hour column and a minute column.',
			ja: '欄の見た目はブラウザによって変わります。MDN は、画面の作りはブラウザと OS によって決まり、12時間か24時間かはたいてい利用者のロケールから選ばれるとしています。Chrome では、12時間か24時間かはページの `lang` ではなくブラウザ自身の言語に従い、欄の右端の時計のボタンで、時の列と分の列のポップアップが開きます。'
		},
		{
			en: 'In this demo, `min="09:00"`, `max="18:00"` and `step="1800"` limit the time to 9:00 AM to 6:00 PM in 30-minute steps. `step` is in seconds (the default is 60) and counts from `min`; a value that is not a multiple of 60 adds seconds to the field.',
			ja: 'このデモでは `min="09:00"`、`max="18:00"`、`step="1800"` で、9:00から18:00までの30分刻みに限っています。`step` の単位は秒（既定は60）で、`min` から数えます。60の倍数でない値にすると、欄に秒が加わります。'
		},
		{
			en: 'The browser does not always stop people leaving the range or the steps. In Chrome, ↑ on the hour goes past `max` (from 5:30 PM to 6:30 PM), and a typed 9:10 AM is kept as it is rather than rounded to the step, although MDN says a browser may round it. Both are marked invalid, so the demo has to say so itself.',
			ja: 'ブラウザは、範囲や刻みから外れることを必ずしも止めません。Chrome では、時の ↑ が `max` を越えて進み（午後5:30から午後6:30へ）、入力した午前9:10は刻みに丸められずそのまま残ります（MDN は、ブラウザが丸めることもあるとしています）。どちらも無効な値として扱われるので、デモ側で知らせる必要があります。'
		},
		{
			en: 'In this demo, a time outside the range or off the 30-minute steps turns the border red and shows an error message below the field. The message is tied to the field with `aria-describedby`, and the field gets `aria-invalid="true"`. The error goes away as soon as the time is fixed or the field is cleared.',
			ja: 'このデモでは、範囲外や30分刻みでない時刻になると、枠が赤くなり、欄の下にエラー文が出ます。エラー文は `aria-describedby` で欄と結び、欄には `aria-invalid="true"` を付けます。時刻を直すか欄を空にすると、エラーはすぐ消えます。'
		},
		{
			en: 'In this demo, the hint states the range and the steps in text, with an example, because MDN says the browser shows its own error for a time outside `min` and `max` when the form is submitted. A status line under the field shows the value as `Value: 13:30`, and stays empty while the time is incomplete or invalid.',
			ja: 'このデモでは、補足の文で範囲と刻みを文字で伝え、入力例も添えています。MDN によると、`min` と `max` から外れたときのブラウザ独自のエラーは、フォームを送信したときに出るためです。欄の下の状態表示には `値: 13:30` のように値が出て、時刻が入力の途中のときや無効なときは空になります。'
		}
	],
	keyboard: [
		{
			key: '↑ / ↓',
			action: {
				en: 'Changes the focused part: the hour by 1, the minute by `step` (30 minutes here, without changing the hour), and AM/PM between the two, without stopping at `min` or `max` (in Chrome).',
				ja: 'フォーカス中の部分を増減します。時は1ずつ、分は `step` ずつ（ここでは30分。時は変わりません）、AM/PM は交互に切り替わります。`min` や `max` では止まりません（Chrome の場合）。'
			}
		},
		{
			key: '← / →',
			action: {
				en: 'Moves between the hour, minute and AM/PM parts, and stays at the ends (in Chrome).',
				ja: '時・分・AM/PM の部分の間を移動します。端では動きません（Chrome の場合）。'
			}
		},
		{
			key: '0–9',
			action: {
				en: 'Types the number for the focused part, then moves to the next part once it is complete. Over a time that is already set, each digit takes effect at once, so typing 1 over 9:30 AM gives 1:30 AM and the error shows until the next digit (in Chrome).',
				ja: 'フォーカス中の部分に数字を入力し、入力し終えると次の部分に移ります。すでに時刻が入っているときは、数字を1つ打つたびに値が変わるので、午前9:30に1と打つと午前1:30になり、次の数字を打つまでエラーが出ます（Chrome の場合）。'
			}
		},
		{
			key: 'A / P',
			action: {
				en: 'In a 12-hour display, sets the AM/PM part to AM or PM (in Chrome).',
				ja: '12時間表示では、AM/PM の部分を AM か PM にします（Chrome の場合）。'
			}
		},
		{
			key: 'Backspace / Delete',
			action: {
				en: 'Clears the focused part only, which leaves the time incomplete and the value empty (in Chrome).',
				ja: 'フォーカス中の部分だけを消します。時刻は入力の途中になり、値は空になります（Chrome の場合）。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between the hour, minute and AM/PM parts (no AM/PM part in a 24-hour display), then to the clock button, then out of the field (in Chrome).',
				ja: '時・分・AM/PM の部分（24時間表示では AM/PM はありません）、時計のボタンの順に移動し、端からは欄の外へ出ます（Chrome の場合）。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Segmented field', ja: '部分に分けた入力欄' },
			description: {
				en: 'One field with separate editable parts for the hour, minute and AM/PM. React Aria’s TimeField is only this, edited with the keyboard, and in Chrome the native `<input type="time">` has the same parts.',
				ja: '時・分・AM/PM を、それぞれ編集できる部分に分けた1つの欄です。React Aria の TimeField はこの形だけで、キーボードで編集します。Chrome のネイティブの `<input type="time">` も同じ部分に分かれています。'
			}
		},
		{
			name: { en: 'List of times', ja: '時刻の一覧' },
			description: {
				en: 'A text box with a list of times at set steps. The U.S. Web Design System’s time picker is a combo box whose options run from `data-min-time` to `data-max-time` every `data-step` minutes (30 by default), and typing filters them. Atlassian’s time field opens a menu of times (its example is 30 minutes apart), and keeps typing available.',
				ja: '一定の刻みの時刻を並べた一覧が付いた入力欄です。U.S. Web Design System のタイムピッカーはコンボボックスで、`data-min-time` から `data-max-time` までを `data-step` 分ごと（既定は30分）の選択肢にし、入力で絞り込めます。Atlassian の時刻の欄は時刻のメニューを開き（例は30分ごと）、入力もできます。'
			}
		},
		{
			name: { en: 'Clock face', ja: '時計の盤面' },
			description: {
				en: 'A clock or a list of digital-clock times in a popup or dialog. Material Design 3’s time picker is a modal dialog with a dial and a keyboard icon that switches to typed hour and minute boxes. MUI shows a digital clock in a popover on desktop and a clock in a modal on touch devices.',
				ja: 'ポップアップやダイアログに、時計の盤面かデジタル時計の形の一覧を出すものです。Material Design 3 のタイムピッカーはモーダルのダイアログで、ダイヤルと、時と分を入力する欄に切り替えるキーボードのアイコンがあります。MUI はデスクトップではポップオーバーにデジタル時計を、タッチ端末ではモーダルに時計の盤面を出します。'
			}
		},
		{
			name: { en: 'Wheels (native apps)', ja: 'ホイール（ネイティブアプリ）' },
			description: {
				en: 'Apple’s date picker has a time mode that shows hours, minutes and an optional AM/PM. Its wheels style is a set of scrolling wheels that also accepts typing on a keyboard. This is guidance for iOS and iPadOS apps, not for the web.',
				ja: 'Apple の日付ピッカーには、時・分・任意の AM/PM を表示する時刻のモードがあります。ホイールのスタイルは、スクロールするホイールを並べたもので、キーボードでの入力にも対応します。これは iOS と iPadOS のアプリ向けの案内で、ウェブ向けではありません。'
			}
		}
	],
	usage: [
		{
			en: 'The U.S. Web Design System uses its time picker to schedule a time from common, consistent increments, such as 30-minute blocks for a meeting. For an exact time in the past, such as a time of birth, it prefers a plain text input.',
			ja: 'U.S. Web Design System は、会議を30分単位で決めるように、よく使う一定の刻みの中から時刻を決めるときにタイムピッカーを使います。出生時刻のような過去の正確な時刻には、ふつうのテキスト入力のほうが向くとしています。'
		},
		{
			en: 'Say in the hint how to enter the time and what format is expected. The U.S. Web Design System reports 9 of its 11 WCAG 2.1 AA tests for the time picker as passed, none failed, and 2 conditional on your own implementation, one of them being clear instructions on how to select a time and the expected format (3.3.2). It rewrote the hint in 2024 for that criterion.',
			ja: '補足の文で、時刻の入れ方と、どの形式で入れるかを伝えます。U.S. Web Design System はタイムピッカーの WCAG 2.1 AA の11のテストのうち、9つが合格、失敗は0、2つは利用する側の実装しだいの条件付きとしています。条件付きの1つが、時刻の選び方と求める形式が分かる説明（3.3.2）です。同システムはこの基準のために、2024年に補足の文を書き換えました。'
		},
		{
			en: 'Choose a step that fits the task. Apple’s guidance for its native date pickers says a minute list has 60 values by default and suggests a coarser interval that divides 60 evenly, such as quarter hours. The U.S. Web Design System’s list defaults to 30 minutes, and Atlassian’s example shows 30-minute increments.',
			ja: '刻みは用途に合わせて選びます。Apple のネイティブの日付ピッカー向けの案内では、分の一覧は既定で60個の値になるので、15分刻みのように、60を割り切れる粗い刻みにすることを勧めています。U.S. Web Design System の一覧は既定が30分刻みで、Atlassian の例も30分刻みで時刻を並べています。'
		},
		{
			en: 'Material Design 3 describes its time picker as a modal dialog, and lists Flutter, Jetpack Compose and Android Views as available and Web as unavailable. It says to offer typing as well as the dial, and to make the typed input the default when a dial is not needed.',
			ja: 'Material Design 3 は、タイムピッカーをモーダルのダイアログとして説明し、Flutter、Jetpack Compose、Android Views では利用可能、Web では利用不可としています。ダイヤルだけでなく入力もできるようにし、ダイヤルが要らないときは入力を既定にするよう案内しています。'
		},
		{
			en: 'MUI’s time picker shows the desktop version when the device matches `@media (pointer: fine)` and the mobile version otherwise. Both keep a field for editing with the keyboard.',
			ja: 'MUI のタイムピッカーは、端末が `@media (pointer: fine)` に合えばデスクトップ版を、合わなければモバイル版を出します。どちらもキーボードで編集する欄を備えています。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'A time that can be set only with a dial, wheels or a list, with no typing',
				ja: 'ダイヤルやホイール、一覧からしか時刻を決められず、入力できない'
			},
			harm: {
				en: 'Material Design 3 says manual entry makes the picker easier for people using a keyboard rather than a touchscreen, and Atlassian says some people prefer typing to selecting, especially keyboard users.',
				ja: 'Material Design 3 は、手で入力できるとタッチ画面ではなくキーボードを使う人が使いやすくなるとしています。Atlassian も、選ぶより入力を好む人、特にキーボードを使う人がいるとしています。'
			},
			instead: {
				en: 'Let people type the time as well as pick it, for example with a text input for the hour and minute, or the native `<input type="time">`, which accepts typed digits.',
				ja: '選べるだけでなく、時刻を入力もできるようにします。時と分を入れるテキスト入力や、数字を入力できるネイティブの `<input type="time">` を使います。'
			}
		}
	],
	related: [
		{
			id: 'date-picker',
			diff: {
				en: 'A time picker chooses a time of day, in hours and minutes with no date; a date picker chooses a day, usually from a calendar.',
				ja: 'タイムピッカーは日付を含まない時刻を時と分で選び、日付ピッカーは日付をカレンダーなどで選びます。'
			}
		},
		{
			id: 'select',
			diff: {
				en: 'A time picker takes a time of day within a range and a step; a select chooses from options its author wrote one by one.',
				ja: 'タイムピッカーは範囲と刻みの中の時刻を受け取り、セレクトボックスは作り手が1つずつ書いた選択肢から選びます。'
			}
		},
		{
			id: 'combobox',
			diff: {
				en: 'A time picker is made for times of day, and the U.S. Web Design System builds one as a combo box of times at set steps; a combobox suggests whatever list its author provides.',
				ja: 'タイムピッカーは時刻のための部品で、U.S. Web Design System は一定の刻みの時刻を並べたコンボボックスとして作っていますが、コンボボックスは作り手が用意したどんな候補の一覧も出せます。'
			}
		},
		{
			id: 'text-field',
			diff: {
				en: 'A time picker takes only times of day, typically in set increments such as 30 minutes; a text field takes any text, and the U.S. Web Design System prefers it for exact past times such as a time of birth.',
				ja: 'タイムピッカーは30分刻みなど決まった刻みの時刻だけを受け取り、テキストフィールドは自由な文字列を入れられ、U.S. Web Design System は出生時刻のような過去の正確な時刻にこちらを勧めています。'
			}
		},
		{
			id: 'color-picker',
			diff: {
				en: 'A time picker chooses a time of day, in hours and minutes with no date; a color picker chooses a color, usually from a swatch, a spectrum or presets.',
				ja: 'タイムピッカーは日付を含まない時刻を時と分で選び、カラーピッカーは色を色見本やスペクトル、一覧から選びます。'
			}
		}
	],
	sources: [
		{
			label: 'MDN: <input type="time">',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time',
			checkedAt: '2026-11-02'
		},
		{
			label: 'U.S. Web Design System: Time picker',
			url: 'https://designsystem.digital.gov/components/time-picker/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'U.S. Web Design System: Time picker accessibility tests',
			url: 'https://designsystem.digital.gov/components/time-picker/accessibility-tests/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Material Design 3: Time pickers (Overview)',
			url: 'https://m3.material.io/components/time-pickers/overview',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Material Design 3: Time pickers (Guidelines)',
			url: 'https://m3.material.io/components/time-pickers/guidelines',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Material Design 3: Time pickers (Accessibility)',
			url: 'https://m3.material.io/components/time-pickers/accessibility',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Ant Design: TimePicker',
			url: 'https://ant.design/components/time-picker/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'MUI X: Time Picker',
			url: 'https://mui.com/x/react-date-pickers/time-picker/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'React Aria: TimeField',
			url: 'https://react-aria.adobe.com/TimeField',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Atlassian Design System: Date time picker (Examples)',
			url: 'https://atlassian.design/components/datetime-picker/examples',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Atlassian Design System: Date time picker (Usage)',
			url: 'https://atlassian.design/components/datetime-picker/usage',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Apple Human Interface Guidelines: Pickers',
			url: 'https://developer.apple.com/design/human-interface-guidelines/pickers',
			checkedAt: '2026-11-02'
		}
	]
} satisfies ComponentData;
