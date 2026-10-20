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
	usage: [
		{
			en: 'Do not use it just to save space or to hide important information.',
			ja: 'スペースを節約するためだけに使ったり、重要な情報を隠したりしない。'
		},
		{
			en: 'To collapse supplementary content within a single section, use a disclosure instead.',
			ja: '1つのセクションの中の補足を畳むなら、ディスクロージャーを使う。'
		},
		{
			en: 'Do not nest it inside a list, table, accordion or disclosure.',
			ja: 'リスト、テーブル、アコーディオン、ディスクロージャーの中には入れない。'
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
		},
		{
			id: 'tree-view',
			diff: {
				en: 'An accordion opens sections of content; a tree view opens nested items, such as folders, in several levels.',
				ja: 'アコーディオンは内容のまとまりを開閉し、ツリービューはフォルダのような入れ子の項目を何段にも開閉する。'
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
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「アコーディオン」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/accordion/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
