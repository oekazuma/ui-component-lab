import type { ComponentData } from '#lib/types.js';

export default {
	id: 'select',
	category: 'input',
	names: { en: 'Select', ja: 'セレクト' },
	aliases: [
		{ name: 'Pop-up button', source: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons' },
		{ name: 'Dropdown', source: 'Carbon Design System (custom-styled variant)', url: 'https://carbondesignsystem.com/components/dropdown/usage/' }
	],
	summary: {
		en: 'Lets the user pick one option from a list that opens on demand.',
		ja: '開いたリストから選択肢を1つ選ぶ部品。'
	},
	appearance: {
		en: 'A box showing the current value with a downward arrow on the right. Opening it shows a list of options.',
		ja: '現在の値を表示した箱の右端に下向きの矢印がある。開くと選択肢のリストが出る。'
	},
	behavior: [
		{
			en: 'Clicking the box opens the list; choosing an option closes it and updates the value.',
			ja: '箱をクリックするとリストが開き、選択肢を選ぶと閉じて値が変わる。'
		},
		{
			en: 'Only options from the list can be chosen; the user cannot type a free value.',
			ja: '選べるのはリストにある値だけで、自由入力はできない。'
		},
		{
			en: 'This demo uses the native <select> element, so the list looks different on each OS and browser.',
			ja: 'このデモはネイティブの <select> 要素を使っているため、リストの見た目は OS やブラウザで異なる。'
		}
	],
	keyboard: [
		{
			key: '↑ / ↓',
			action: {
				en: 'Changes the option (opens the list on some platforms).',
				ja: '選択肢を切り替える（環境によってはリストを開く）。'
			}
		},
		{
			key: 'Space / Enter',
			action: {
				en: 'Opens the list, or confirms the highlighted option.',
				ja: 'リストを開く。開いているときは選択中の項目を確定する。'
			}
		},
		{
			key: 'A–Z',
			action: {
				en: 'Jumps to an option starting with the typed character.',
				ja: '入力した文字で始まる選択肢に移る。'
			}
		},
		{ key: 'Esc', action: { en: 'Closes the list without changing.', ja: '変更せずにリストを閉じる。' } }
	],
	sources: [
		{
			label: 'Open UI: Select',
			url: 'https://open-ui.org/components/select.research',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Select-Only Combobox Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MDN: <select>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
