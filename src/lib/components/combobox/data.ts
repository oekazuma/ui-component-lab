import type { ComponentData } from '#lib/types.js';

export default {
	id: 'combobox',
	category: 'input',
	names: { en: 'Combobox', ja: 'コンボボックス' },
	aliases: [
		{ name: 'Autocomplete', source: 'MUI', url: 'https://mui.com/material-ui/react-autocomplete/' }
	],
	summary: {
		en: 'A text field with a list of suggestions; the user can pick one or type their own value.',
		ja: '候補リスト付きのテキスト入力欄です。候補から選ぶことも、自由に入力することもできます。'
	},
	appearance: {
		en: 'Looks like a text field, sometimes with a downward arrow on the right. Typing or pressing the arrow shows a list of suggestions below it.',
		ja: 'テキスト入力欄の見た目で、右端に下向きの矢印があることもあります。文字を入力するか矢印を押すと、下に候補のリストが出ます。'
	},
	behavior: [
		{
			en: 'Typing shows suggestions that start with the typed text.',
			ja: '文字を入力すると、その文字で始まる候補が出ます。'
		},
		{
			en: 'Choosing a suggestion puts it into the field; the user can also keep a value that is not in the list.',
			ja: '候補を選ぶと入力欄に入ります。リストにない値をそのまま使うこともできます。'
		},
		{
			en: 'Keyboard focus stays in the text field while the arrow keys highlight suggestions.',
			ja: '矢印キーで候補を選んでいる間も、キーボードのフォーカスは入力欄に残ります。'
		},
		{
			en: 'While text is still being composed with an input method (such as for Japanese), the arrow keys, Enter and Esc go to the input method and do not move through or choose suggestions.',
			ja: '日本語入力などで変換している間は、矢印キー・Enter・Esc は変換の操作に使われ、候補の移動や決定には使われません。'
		},
		{
			en: 'In this demo, the arrow button at the right end opens or closes the list of suggestions. As in the APG example, Tab skips it (`tabindex="-1"`): keyboard users open the list with ↓, and the button is there for pointer and touch users. Focus stays in the text field after pressing it.',
			ja: 'このデモでは、右端の矢印のボタンで候補のリストを開閉します。APG の例と同じく、このボタンは Tab で止まりません（`tabindex="-1"`）。キーボードでは ↓ で開き、ボタンはマウスやタッチの利用者のために置いています。押したあともフォーカスは入力欄に残ります。'
		},
		{
			en: 'In this demo, the typed part of each suggestion is marked with `<mark>` and shown in bold.',
			ja: 'このデモでは、候補のうち入力した文字に一致した部分を `<mark>` で示し、太字で表示します。'
		},
		{
			en: 'In this demo, when nothing matches, the list stays closed and “No matching fruit” appears below the field instead. It is a `role="status"` live region, so screen readers announce it.',
			ja: 'このデモでは、一致する候補がないとき、リストは開かず、代わりに欄の下に「該当する果物はありません」と出します。`role="status"` のライブリージョンなので、スクリーンリーダーが読み上げます。'
		},
		{
			en: 'HTML can also make a simple combobox with `<input list>` and `<datalist>`, but how the list looks and works differs by browser.',
			ja: 'HTML の `<input list>` と `<datalist>` でも簡易的なコンボボックスを作れますが、リストの見た目や動きはブラウザで異なります。'
		}
	],
	keyboard: [
		{
			key: '↓',
			action: {
				en: 'Opens the suggestions, or highlights the next one.',
				ja: '候補を開きます。開いているときは次の候補を選びます。'
			}
		},
		{
			key: '↑',
			action: {
				en: 'Opens the suggestions, or highlights the previous one.',
				ja: '候補を開きます。開いているときは前の候補を選びます。'
			}
		},
		{
			key: 'Alt + ↓',
			action: {
				en: 'Opens the suggestions without highlighting one.',
				ja: '候補を選ばずにリストだけを開きます。'
			}
		},
		{
			key: 'Enter',
			action: {
				en: 'Puts the highlighted suggestion into the field and closes the list.',
				ja: '選んでいる候補を入力欄に入れ、リストを閉じます。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the list. If it is already closed, clears the field.',
				ja: 'リストを閉じます。閉じているときは入力欄を空にします。'
			}
		},
		{
			key: '← / → / Home / End',
			action: {
				en: 'Moves the text cursor and removes the highlight from the suggestions.',
				ja: '入力欄の中でカーソルを動かし、候補の選択を外します。'
			}
		}
	],
	usage: [
		{
			en: 'Use it when there are many options. For a short list, a select is enough.',
			ja: '選択肢が多いときに使います。少なければセレクトで足ります。'
		},
		{
			en: 'There are two kinds: one that only filters a fixed list, and one that also accepts free text.',
			ja: '決まった選択肢を絞り込むだけのものと、自由な入力も受け付けるものの2種類があります。'
		}
	],
	related: [
		{
			id: 'command-palette',
			diff: {
				en: 'A combobox puts the chosen value into the field; a command palette puts a combobox in a dialog and runs or opens the chosen item.',
				ja: 'コンボボックスは選んだ値を入力欄に入れます。コマンドパレットはコンボボックスをダイアログに入れ、選んだものを実行したり開いたりします。'
			}
		},
		{
			id: 'text-field',
			diff: {
				en: 'A combobox adds a list of suggestions to a text field.',
				ja: 'コンボボックスはテキストフィールドに選べる候補のリストが付いたものです。'
			}
		},
		{
			id: 'select',
			diff: {
				en: 'A combobox lets the user type and accept a value outside the list; a select only allows options from the list.',
				ja: 'コンボボックスは文字を入力でき、リストにない値も使えますが、セレクトはリストの選択肢からしか選べません。'
			}
		},
		{
			id: 'search-field',
			diff: {
				en: 'A combobox suggests values to pick from while typing; a search field sends the typed words as they are.',
				ja: 'コンボボックスは入力中に選べる候補を出し、検索ボックスは入力した語をそのまま送ります。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Combobox Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Editable Combobox With List Autocomplete Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Open UI: Combobox (Explainer)',
			url: 'https://open-ui.org/components/combobox.explainer',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MUI: Autocomplete',
			url: 'https://mui.com/material-ui/react-autocomplete/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「コンボボックス」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/combobox/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
