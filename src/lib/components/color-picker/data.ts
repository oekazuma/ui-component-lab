import type { ComponentData } from '#lib/types.js';

export default {
	id: 'color-picker',
	category: 'input',
	names: { en: 'Color picker', ja: 'カラーピッカー' },
	aliases: [
		{
			name: 'Color well',
			source: 'Apple Human Interface Guidelines',
			url: 'https://developer.apple.com/design/human-interface-guidelines/color-wells'
		},
		{
			name: 'Color well control',
			source: 'HTML',
			url: 'https://html.spec.whatwg.org/multipage/input.html#color-state-(type=color)'
		}
	],
	searchTerms: ['色選択', '色指定', 'カラーパレット'],
	summary: {
		en: 'A control for choosing a color. It usually shows the current color as a small swatch and opens a picker when activated.',
		ja: '色を選ぶ部品です。たいてい今の色を小さな色見本で見せ、押すと色を選ぶ画面が開きます。'
	},
	appearance: {
		en: 'A small swatch of the current color, often with its value as text, that opens a picker with a color spectrum, preset swatches or text boxes for the color values. This demo is a background color field: a label, the browser’s own swatch, a larger preview swatch with a border, and the value as text.',
		ja: '今の色を見せる小さな色見本で、値を文字で添えることも多く、押すと、色のスペクトルや色見本の一覧、色の値を入れる欄を備えたピッカーが開きます。このデモは背景色の欄で、ラベル、ブラウザ自身の色見本、枠線付きの大きなプレビュー、文字の値が並びます。'
	},
	behavior: [
		{
			en: 'This demo uses the native `<input type="color">`. It always holds a color: the HTML Standard says there is no way for people to set it to the empty string, and MDN says it starts as opaque black (`#000000`) when `value` is missing or invalid.',
			ja: 'このデモはネイティブの `<input type="color">` を使っています。値は必ず色になります。HTML Standard は、空の文字列にする方法は利用者にないとしており、MDN は、`value` がないか無効なときは不透明な黒（`#000000`）から始まるとしています。'
		},
		{
			en: 'The HTML Standard says the value is sanitized by parsing it as a CSS color and serializing the result, and that a value that does not parse becomes opaque black. Without `alpha`, and with the default `limited-srgb` color space, the serialization is the `#rrggbb` form, which MDN describes as seven-character lowercase hexadecimal, such as `#ff8800`.',
			ja: 'HTML Standard は、値を CSS の色として解釈し、その結果を文字列にして整えるとしており、解釈できない値は不透明な黒になります。`alpha` がなく、色空間が既定の `limited-srgb` なら、文字列は `#rrggbb` の形で、MDN はこれを `#ff8800` のような小文字の7文字の16進数と説明しています。'
		},
		{
			en: 'The `alpha` attribute lets people change the opacity, and `colorspace` (`limited-srgb` by default, or `display-p3`) sets the color space and hints at the picker’s interface. With them the value is no longer a plain hex string: the HTML Standard serializes it as a `color()` string such as `color(display-p3 …)`. When this page was checked, MDN’s compatibility data listed them as supported from Safari 18.4, only as a preview in Firefox, and not in Chrome or Edge, so this demo uses neither.',
			ja: '`alpha` 属性で透明度を変えられるようになり、`colorspace`（既定は `limited-srgb`、もう1つは `display-p3`）で色空間とピッカーの画面の傾向を指定できます。どちらかを使うと、値はふつうの16進数ではなくなり、HTML Standard の定める `color(display-p3 …)` のような `color()` 形式の文字列になります。このページを確かめた時点の MDN の互換性データでは、Safari 18.4 から対応、Firefox はプレビューのみ、Chrome と Edge は未対応とされているので、このデモはどちらも使いません。'
		},
		{
			en: 'The picker is drawn by the browser, not by the page. MDN says the interface may vary substantially between browsers and platforms, from a plain text box that validates the format to a platform color picker or a custom picker window.',
			ja: 'ピッカーはページではなくブラウザが描きます。MDN は、画面の作りがブラウザやプラットフォームによって大きく変わることがあり、形式を確かめるだけのテキストボックスのこともあれば、プラットフォームのカラーピッカーや独自のピッカーのウィンドウのこともあるとしています。'
		},
		{
			en: 'MDN says `input` fires every time the color changes, even while someone is still adjusting it in the picker, and `change` fires when the picker is dismissed. In this demo, `oninput` updates the preview swatch and the text, so they follow the picker as it moves.',
			ja: 'MDN によると、`input` は、ピッカーで調整している最中も含め、色が変わるたびに発火し、`change` はピッカーを閉じたときに発火します。このデモでは `oninput` でプレビューと文字を更新するので、ピッカーの動きに合わせて追従します。'
		},
		{
			en: 'In this demo, the value text is not a live region, because `input` keeps firing while the picker is dragged and each change would be read out. A visually hidden status is updated on `change` instead, so screen reader users hear the chosen value once, when the picker is dismissed.',
			ja: 'このデモでは、値の文字を読み上げ領域にしていません。ピッカーを動かしている間は `input` が発火し続け、変わるたびに読み上げられてしまうためです。代わりに、見えない状態表示を `change` で更新するので、スクリーンリーダーの利用者には、ピッカーを閉じたときに選んだ値が1回だけ読み上げられます。'
		},
		{
			en: 'In this demo, the value is also written as text beside the preview swatch. The swatch only repeats the color, so people who cannot tell colors apart still get the value, which WCAG 1.4.1 asks for by saying color should not be the only means of conveying information. The border keeps the swatch’s edge visible whatever color is chosen.',
			ja: 'このデモでは、プレビューの色見本の隣に、値を文字でも書いています。色見本は色をなぞるだけなので、色を見分けにくい人にも値が伝わります。WCAG 1.4.1 が、色だけで情報を伝えないよう求めているためです。枠線は、どの色を選んでも色見本の輪郭が見えるようにします。'
		},
		{
			en: 'In this demo, `list` points to a `<datalist>` of four suggested colors. MDN’s `<datalist>` page documents this for the color type, as predefined colors in a browser-provided interface, and whether and how they appear is up to the browser. When this page was checked, MDN’s compatibility data said Firefox does not support it on macOS and Android, so the suggestions may not appear there.',
			ja: 'このデモでは、`list` で4色のおすすめを入れた `<datalist>` を結んでいます。MDN の `<datalist>` のページは、色の入力ではあらかじめ決めた色がブラウザの画面に出るとしており、出るかどうか、どう出るかはブラウザしだいです。このページを確かめた時点の MDN の互換性データでは、Firefox は macOS と Android で対応していないので、そこではおすすめが出ないことがあります。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'Activates the input, and the HTML Standard says activating it shows the picker. The browser decides which keys activate it; both work in Chrome.',
				ja: '入力を操作します。HTML Standard は、操作するとピッカーが出るとしています。どのキーで操作できるかはブラウザしだいで、Chrome ではどちらでも開きます。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves focus onto the input and away from it; the input is a single stop (in Chrome).',
				ja: '入力に入り、そこから出ます。入力で止まるのは1回だけです（Chrome の場合）。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the picker and puts focus back on the input (in Chrome). Other keys inside the picker depend on the browser and the operating system.',
				ja: 'ピッカーを閉じて、フォーカスを入力に戻します（Chrome の場合）。ピッカーの中のほかのキーの動作は、ブラウザと OS によって変わります。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Swatch with a popup', ja: '色見本から開くポップアップ' },
			description: {
				en: 'The current color as a swatch that opens a picker when activated. Apple’s “color well” names only this swatch, which shows a color picker, the system’s or a custom one, when tapped or clicked. Ant Design’s ColorPicker is a trigger that opens a popup panel, and can show the color as text beside the swatch with `showText`. The native `<input type="color">` is this form.',
				ja: '今の色を色見本として見せ、押すとピッカーが開く形です。Apple の「カラーウェル」は、タップやクリックでシステムのものか独自のカラーピッカーを出すこの色見本だけを指します。Ant Design の ColorPicker は、押すとポップアップのパネルが開くトリガーで、`showText` で色見本の横に色を文字でも表示できます。ネイティブの `<input type="color">` はこの形です。'
			}
		},
		{
			name: { en: 'Picker built from parts', ja: '部品を組み合わせたピッカー' },
			description: {
				en: 'A picker laid out on the page from separate controls. React Aria’s ColorPicker keeps one color in sync across its ColorArea, ColorSlider, ColorWheel and ColorField, which you compose. Fluent’s ColorPicker has a spectrum to navigate by default, and text boxes for RGB, alpha or hex values.',
				ja: '別々の部品を並べて作るピッカーです。React Aria の ColorPicker は、組み合わせて使う ColorArea、ColorSlider、ColorWheel、ColorField の間で、1つの色を同期します。Fluent の ColorPicker は、既定でスペクトルから色を選べ、RGB、アルファ、16進数の値を入れる欄も備えます。'
			}
		},
		{
			name: { en: 'Preset swatches', ja: '色見本の一覧' },
			description: {
				en: 'A set of ready-made colors to choose from. React Aria’s ColorSwatchPicker provides presets for a ColorPicker, Ant Design has a `presets` option, and a native color input can take a `<datalist>`.',
				ja: 'あらかじめ用意した色から選ぶ形です。React Aria の ColorSwatchPicker は ColorPicker に色見本の一覧を足し、Ant Design には `presets` があり、ネイティブの色の入力は `<datalist>` を結べます。'
			}
		},
		{
			name: { en: 'Color value field', ja: '色の値の入力欄' },
			description: {
				en: 'A text field for typing the color. React Aria’s ColorField edits a hex color or a single channel value, and shows hex by default.',
				ja: '色を文字で入力する欄です。React Aria の ColorField は16進数の色か1つのチャンネルの値を編集でき、既定では16進数で表示します。'
			}
		}
	],
	usage: [
		{
			en: 'Ant Design says to use its ColorPicker when people need to make a customized color selection. It offers color formats (`hex`, `rgb`, `hsb`), `presets`, `allowClear` to let people clear the color, and `disabledAlpha` to turn the alpha channel off.',
			ja: 'Ant Design は、自分で色を選ぶ必要があるときに ColorPicker を使うとしています。色の形式（`hex`、`rgb`、`hsb`）、`presets`、色を消せる `allowClear`、アルファのチャンネルを使わない `disabledAlpha` を用意しています。'
		},
		{
			en: 'If “no color” is a valid answer, add a way to clear it. A native color input always holds a color and cannot be emptied, while Ant Design’s `allowClear` lets people clear the color.',
			ja: '「色なし」が有効な答えなら、色を消す手段を足します。ネイティブの色の入力は必ず色を持ち、空にできませんが、Ant Design の `allowClear` は色を消せます。'
		},
		{
			en: 'Consider the system’s color picker in native apps. Apple says it gives a consistent, familiar experience, lets people save a set of colors they can reach from any app, and helps across iOS, iPadOS and macOS. A custom one is allowed.',
			ja: 'ネイティブアプリではシステムのカラーピッカーを検討します。Apple は、一貫した使い慣れた操作になり、どのアプリからも使える色の組を保存でき、iOS、iPadOS、macOS をまたぐアプリでも使い慣れた操作になるとしています。独自のピッカーを使うこともできます。'
		},
		{
			en: 'Name the color, not only show it. React Aria’s ColorSwatch gives screen reader users a localized color description by default, such as “dark vibrant blue”, and lets you replace it with a more specific name through `colorName`, together with an `aria-label` for context.',
			ja: '色は見せるだけでなく、名前や値でも伝えます。React Aria の ColorSwatch は、既定で「dark vibrant blue」のような、ロケールに合った色の説明をスクリーンリーダー向けに付け、`colorName` でより具体的な名前に置き換えられ、`aria-label` で文脈も添えられます。'
		},
		{
			en: 'Fluent’s ColorPicker guidance says to label each part clearly, update the selected color in real time while people use the sliders or boxes, validate hex and RGB text with clear error messages, allow keyboard input, and keep one color format rather than mixing several.',
			ja: 'Fluent の ColorPicker の案内では、各部分に分かりやすいラベルを付ける、スライダーや入力欄を操作している間も選んだ色をその場で更新する、16進数と RGB の文字は検証して分かりやすいエラーを出す、キーボードで入力できるようにする、複数の形式を混ぜず1つにそろえる、としています。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Showing a chosen color only as a swatch, with no name or value',
				ja: '選んだ色を、名前や値なしに色見本だけで見せる'
			},
			harm: {
				en: 'WCAG says some people have difficulty perceiving color, that people with partial sight often have limited color vision, and that many older people do not see color well. It adds that people on limited-color or monochrome displays cannot get information given only in color.',
				ja: 'WCAG は、色を見分けにくい人がいること、弱視の人は色の見え方が限られることが多いこと、高齢の人の多くは色がよく見えないことを挙げています。また、色数の限られた表示や白黒の表示では、色だけで示された情報は得られないとしています。'
			},
			instead: {
				en: 'Show the value or name as text next to the swatch, such as the hex value, as Fluent says to make and show color selections without relying on color alone, using labels, indicators and tooltips.',
				ja: '色見本の隣に、16進数の値のような値や名前を文字で出します。Fluent も、ラベル、印、ツールチップを使い、色だけに頼らずに色を選べて確かめられるようにするよう求めています。'
			}
		},
		{
			pattern: {
				en: 'Mixing color formats in one picker without saying which is which',
				ja: '1つのピッカーの中で、色の形式を説明なしに混ぜる'
			},
			harm: {
				en: 'Fluent says mixing different formats without a clear explanation confuses people.',
				ja: 'Fluent は、形式を混ぜて説明がないと、利用者が混乱するとしています。'
			},
			instead: {
				en: 'Keep one format throughout, or label each box and the format switch clearly, as in React Aria’s example that lets people switch the color space with a select.',
				ja: 'ピッカー全体で形式を1つにそろえるか、欄と形式の切り替えにはっきりラベルを付けます。React Aria の例は、セレクトボックスで色空間を切り替えられるようにしています。'
			}
		}
	],
	related: [
		{
			id: 'date-picker',
			diff: {
				en: 'A color picker chooses a color, usually from a swatch, a spectrum or presets; a date picker chooses a day, usually from a calendar.',
				ja: 'カラーピッカーは色を色見本やスペクトル、一覧から選び、日付ピッカーは日付をカレンダーなどで選びます。'
			}
		},
		{
			id: 'time-picker',
			diff: {
				en: 'A color picker chooses a color, usually from a swatch, a spectrum or presets; a time picker chooses a time of day, in hours and minutes with no date.',
				ja: 'カラーピッカーは色を色見本やスペクトル、一覧から選び、タイムピッカーは日付を含まない時刻を時と分で選びます。'
			}
		},
		{
			id: 'text-field',
			diff: {
				en: 'A color picker chooses a color from a swatch, a spectrum or presets, and the native input always holds a valid color; a text field takes any text, and React Aria’s ColorField is a text field for typing a hex or channel value.',
				ja: 'カラーピッカーは色を色見本やスペクトル、一覧から選び、ネイティブの入力は必ず有効な色を持ちますが、テキストフィールドは自由な文字列を入れられ、React Aria の ColorField は16進数やチャンネルの値を入力するための入力欄です。'
			}
		}
	],
	sources: [
		{
			label: 'MDN: <input type="color">',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color',
			checkedAt: '2026-11-03'
		},
		{
			label: 'HTML Standard: Color state (type=color)',
			url: 'https://html.spec.whatwg.org/multipage/input.html#color-state-(type=color)',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MDN: <datalist>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MDN browser-compat-data: input type="color"',
			url: 'https://github.com/mdn/browser-compat-data/blob/main/html/elements/input/color.json',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MDN browser-compat-data: input alpha and colorspace',
			url: 'https://github.com/mdn/browser-compat-data/blob/main/html/elements/input.json',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Ant Design: ColorPicker',
			url: 'https://ant.design/components/color-picker/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'React Aria: ColorPicker',
			url: 'https://react-aria.adobe.com/ColorPicker',
			checkedAt: '2026-11-03'
		},
		{
			label: 'React Aria: ColorSwatch',
			url: 'https://react-aria.adobe.com/ColorSwatch',
			checkedAt: '2026-11-03'
		},
		{
			label: 'React Aria: ColorField',
			url: 'https://react-aria.adobe.com/ColorField',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Fluent UI React v9: ColorPicker',
			url: 'https://react.fluentui.dev/?path=/docs/components-colorpicker--docs',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Apple Human Interface Guidelines: Color wells',
			url: 'https://developer.apple.com/design/human-interface-guidelines/color-wells',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Understanding Success Criterion 1.4.1: Use of Color (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
			checkedAt: '2026-11-03'
		}
	]
} satisfies ComponentData;
