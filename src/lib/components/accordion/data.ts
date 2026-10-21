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
			action: { en: 'Moves between the headings, and into any focusable elements inside open sections.', ja: '見出しの間を移動する。開いた項目の中にフォーカスできる要素があれば、そこにも移る。' }
		},
		{
			key: 'Enter / Space',
			action: { en: 'Opens or closes the focused section.', ja: 'フォーカス中の項目を開閉する。' }
		}
	],
	usage: [
		{
			en: 'To collapse supplementary content within a single section, use a disclosure instead.',
			ja: '1つのセクションの中の補足を畳むなら、ディスクロージャーを使う。'
		},
		{
			en: 'Do not nest it inside a list, table, accordion or disclosure.',
			ja: 'リスト、テーブル、アコーディオン、ディスクロージャーの中には入れない。'
		}
	],
	misuse: [
		{
			pattern: { en: 'Collapsing information that most users need', ja: '多くの利用者が必要とする情報を閉じた項目に入れる' },
			harm: {
				en: 'People have to open sections one by one to find what they need, which adds clicks, and they can miss essential information.',
				ja: '必要な情報を探すために項目を1つずつ開くことになり、操作が増えるうえ、大事な情報を見落とすことがある。'
			},
			instead: {
				en: 'Show information that most people need directly on the page, even if the page gets longer. Use an accordion for content where each person needs only some of the sections.',
				ja: '多くの人が必要とする情報は、ページが長くなってもそのまま表示する。アコーディオンは、人によって必要な項目が違う内容に使う。'
			}
		},
		{
			pattern: { en: 'Putting fees or contract terms inside a collapsed section', ja: '料金や契約の条件を閉じた項目の中に入れる' },
			harm: {
				en: 'People agree to a purchase or contract without seeing the costs or conditions. They may pay for things they did not choose, or find out about a fee only after they have been charged.',
				ja: '費用や条件を見ないまま購入や契約に同意してしまう。選んでいないものにお金を払ったり、請求されてから手数料に気づいたりする。'
			},
			instead: {
				en: 'Show the total cost and the renewal and cancellation terms in the open, next to the button that confirms the purchase or agreement.',
				ja: '合計の金額と、自動更新や解約の条件は、購入や同意を確定するボタンの近くに、開いた状態で表示する。'
			},
			deceptive: true
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
			label: 'Nielsen Norman Group: Accordions on Desktop: When and How to Use',
			url: 'https://www.nngroup.com/articles/accordions-on-desktop/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'FTC Staff Report: Bringing Dark Patterns to Light (2022)',
			url: 'https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Deceptive Patterns: Sneaking',
			url: 'https://www.deceptive.design/types/sneaking',
			checkedAt: '2026-10-21'
		},
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
