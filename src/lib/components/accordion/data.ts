import type { ComponentData } from '#lib/types.js';

export default {
	id: 'accordion',
	category: 'disclosure',
	names: { en: 'Accordion', ja: 'アコーディオン' },
	aliases: [
		{ name: 'Collapse', source: 'Ant Design', url: 'https://ant.design/components/collapse' },
		{ name: 'Expansion panel', source: 'Angular Material', url: 'https://material.angular.dev/components/expansion/overview' }
	],
	summary: {
		en: 'A vertical stack of headings that each show or hide a section of content.',
		ja: '縦に並んだ見出しごとに、内容の表示・非表示を切り替える部品。'
	},
	appearance: {
		en: 'A list of rows separated by lines, each with a title and a +/− or chevron icon. An open row shows its content directly below the title.',
		ja: '線で区切られた行が並び、各行にタイトルと「+/−」や山形のアイコンがある。開いた行はタイトルのすぐ下に内容が出る。'
	},
	behavior: [
		{
			en: 'Clicking a heading opens or closes its section.',
			ja: '見出しをクリックすると、その項目が開閉する。'
		},
		{
			en: 'The icon changes to show whether the section is open.',
			ja: 'アイコンが変わり、開いているかどうかが分かる。'
		},
		{
			en: 'Some accordions allow only one open section at a time; this demo lets each section open independently.',
			ja: '同時に1つしか開けないものもある。このデモでは各項目を独立して開閉できる。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: { en: 'Moves between headings and content.', ja: '見出しと内容の間を移動する。' }
		},
		{
			key: 'Enter / Space',
			action: { en: 'Opens or closes the focused section.', ja: 'フォーカス中の項目を開閉する。' }
		}
	],
	related: [
		{
			id: 'disclosure',
			diff: {
				en: 'An accordion is a set of disclosures stacked under headings; a disclosure is a single toggle on its own.',
				ja: 'アコーディオンはディスクロージャーを見出し付きで縦に並べたもので、ディスクロージャーは単独の開閉部品。'
			}
		},
		{
			id: 'tabs',
			diff: {
				en: 'An accordion stacks sections vertically and can open several at once; tabs show one panel at a time side by side.',
				ja: 'アコーディオンは縦に積んで複数を同時に開けるが、タブは横に並べて1枚ずつ表示する。'
			}
		}
	],
	sources: [
		{
			label: 'Open UI: Accordion',
			url: 'https://open-ui.org/components/accordion.research',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Accordion Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
