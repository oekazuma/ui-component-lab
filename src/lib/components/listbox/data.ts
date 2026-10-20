import type { ComponentData } from '#lib/types.js';

export default {
	id: 'listbox',
	category: 'input',
	names: { en: 'Listbox', ja: 'リストボックス' },
	aliases: [
		{ name: 'ListBox', source: 'React Aria', url: 'https://react-aria.adobe.com/ListBox' },
		{
			name: '<select size>',
			source: 'HTML',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select'
		}
	],
	summary: {
		en: 'A list of options that stays open, from which the user picks one (or several).',
		ja: '開いたままの選択肢のリストから、1つ（または複数）を選ぶ部品。'
	},
	appearance: {
		en: 'A bordered box showing several options at once, with a scroll bar when there are more. The chosen option is highlighted.',
		ja: '枠の中に複数の選択肢が見えていて、収まらない分はスクロールする。選んだ選択肢は色が変わる。'
	},
	behavior: [
		{
			en: 'Clicking an option or moving to it with the arrow keys selects it.',
			ja: '選択肢をクリックするか、矢印キーで移ると選ばれる。'
		},
		{
			en: 'This demo is a native <select> with the size attribute, so it does not open or close and browsers treat it as a listbox.',
			ja: 'このデモは size 属性を付けたネイティブの <select> なので、開閉せず、ブラウザはリストボックスとして扱う。'
		}
	],
	keyboard: [
		{ key: '↑ / ↓', action: { en: 'Moves to and selects the previous or next option.', ja: '前後の選択肢へ移り、選ぶ。' } },
		{ key: 'Home / End', action: { en: 'Moves to the first or last option.', ja: '最初または最後の選択肢へ移る。' } },
		{
			key: 'A–Z',
			action: {
				en: 'Jumps to an option starting with the typed characters.',
				ja: '入力した文字で始まる選択肢へ移る。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Multi-select', ja: '複数選択' },
			description: {
				en: 'Several options can be chosen. In the APG pattern, Space toggles the focused option. With a native <select>, add the multiple attribute (keys differ by browser).',
				ja: '複数の選択肢を選べるもの。APG のパターンでは Space でフォーカス中の選択肢の選択を切り替える。ネイティブの <select> では multiple 属性を付ける（キー操作はブラウザによって異なる）。'
			}
		}
	],
	usage: [
		{
			en: 'With more than five options, support Home / End; with more than seven, support jumping by typing.',
			ja: '選択肢が5つを超えるなら Home / End、7つを超えるなら文字入力での移動にも対応させる。'
		},
		{
			en: 'Selection that follows focus is only for single selection. It helps in some cases but can make the listbox much harder to use in others.',
			ja: 'フォーカスの移動と同時に選ぶ作りは単一選択に限る。役に立つ場面もあるが、かえってひどく使いにくくなる場面もある。'
		}
	],
	related: [
		{
			id: 'select',
			diff: {
				en: 'A listbox keeps several options visible all the time; a select shows only the chosen option until opened.',
				ja: 'リストボックスは複数の選択肢を常に見せておき、セレクトボックスは開くまで選んだ値しか見えない。'
			}
		},
		{
			id: 'radio',
			diff: {
				en: 'A listbox scrolls and is one tab stop; radio buttons show every option with its own label.',
				ja: 'リストボックスはスクロールでき Tab では1か所として扱われ、ラジオボタンは選択肢ごとにラベル付きで全部を見せる。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Listbox Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MDN: <select>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
