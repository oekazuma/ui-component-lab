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
		ja: '候補リスト付きのテキスト入力欄。候補から選ぶことも、自由に入力することもできる。'
	},
	appearance: {
		en: 'Looks like a text field, sometimes with a downward arrow on the right. Typing or pressing the arrow shows a list of suggestions below it.',
		ja: 'テキスト入力欄の見た目で、右端に下向きの矢印があることもある。文字を入力するか矢印を押すと、下に候補のリストが出る。'
	},
	behavior: [
		{
			en: 'Typing shows suggestions that start with the typed text.',
			ja: '文字を入力すると、その文字で始まる候補が出る。'
		},
		{
			en: 'Choosing a suggestion puts it into the field; the user can also keep a value that is not in the list.',
			ja: '候補を選ぶと入力欄に入る。リストにない値をそのまま使うこともできる。'
		},
		{
			en: 'Keyboard focus stays in the text field while the arrow keys highlight suggestions.',
			ja: '矢印キーで候補を選んでいる間も、キーボードのフォーカスは入力欄に残る。'
		},
		{
			en: 'HTML can also make a simple combobox with <input list> and <datalist>, but how the list looks and works differs by browser.',
			ja: 'HTML の <input list> と <datalist> でも簡易的なコンボボックスを作れるが、リストの見た目や動きはブラウザで異なる。'
		}
	],
	keyboard: [
		{
			key: '↓',
			action: {
				en: 'Opens the suggestions, or highlights the next one.',
				ja: '候補を開く。開いているときは次の候補を選ぶ。'
			}
		},
		{
			key: '↑',
			action: {
				en: 'Opens the suggestions, or highlights the previous one.',
				ja: '候補を開く。開いているときは前の候補を選ぶ。'
			}
		},
		{
			key: 'Alt + ↓',
			action: {
				en: 'Opens the suggestions without highlighting one.',
				ja: '候補を選ばずにリストだけを開く。'
			}
		},
		{
			key: 'Enter',
			action: {
				en: 'Puts the highlighted suggestion into the field and closes the list.',
				ja: '選んでいる候補を入力欄に入れ、リストを閉じる。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the list. If it is already closed, clears the field.',
				ja: 'リストを閉じる。閉じているときは入力欄を空にする。'
			}
		}
	],
	usage: [
		{
			en: 'Use it when there are many options. For a short list, a select is enough.',
			ja: '選択肢が多いときに使う。少なければセレクトで足りる。'
		},
		{
			en: 'There are two kinds: one that only filters a fixed list, and one that also accepts free text.',
			ja: '決まった選択肢を絞り込むだけのものと、自由な入力も受け付けるものの2種類がある。'
		}
	],
	related: [
		{
			id: 'text-field',
			diff: {
				en: 'A combobox adds a list of suggestions to a text field.',
				ja: 'コンボボックスは、テキストフィールドに選べる候補のリストが付いたもの。'
			}
		},
		{
			id: 'select',
			diff: {
				en: 'A combobox lets the user type and accept a value outside the list; a select only allows options from the list.',
				ja: 'コンボボックスは文字を入力でき、リストにない値も使えるが、セレクトはリストの選択肢からしか選べない。'
			}
		},
		{
			id: 'search-field',
			diff: {
				en: 'A combobox suggests values to pick from while typing; a search field sends the typed words as they are.',
				ja: 'コンボボックスは入力中に選べる候補を出し、検索ボックスは入力した語をそのまま送る。'
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
			checkedAt: '2026-10-20'
		},
		{
			label: 'Open UI: Combobox (Explainer)',
			url: 'https://open-ui.org/components/combobox.explainer',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MUI: Autocomplete',
			url: 'https://mui.com/material-ui/react-autocomplete/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「コンボボックス」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/combobox/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
