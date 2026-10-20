import type { ComponentData } from '#lib/types.js';

export default {
	id: 'breadcrumb',
	category: 'navigation',
	names: { en: 'Breadcrumb', ja: 'パンくずリスト（パンくずナビゲーション）' },
	aliases: [
		{ name: 'パンくずナビゲーション', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/breadcrumb/' }
	],
	summary: {
		en: 'A row of links to the parent pages of the current page, in order of hierarchy.',
		ja: '今のページの上の階層にあるページへのリンクを、階層順に並べたもの。'
	},
	appearance: {
		en: 'A single line of short page names separated by “/” or “>”, usually above the page title. The last name is the current page and is not styled as a link.',
		ja: '「/」や「>」で区切った短いページ名が1行に並び、多くはページタイトルの上にある。最後の名前は今のページで、リンクの見た目にはならない。'
	},
	behavior: [
		{
			en: 'Each name except the last links to that level of the site.',
			ja: '最後以外の名前は、それぞれの階層のページへのリンクになっている。'
		},
		{
			en: 'The current page is marked with aria-current="page".',
			ja: '今のページは aria-current="page" で示す。'
		},
		{
			en: 'In this demo the links do not navigate; they show where they would go.',
			ja: 'このデモのリンクは移動せず、移動先を表示するだけにしている。'
		}
	],
	keyboard: [
		{ key: 'Tab', action: { en: 'Moves between the links.', ja: 'リンク間を移動する。' } },
		{ key: 'Enter', action: { en: 'Follows the focused link.', ja: 'フォーカス中のリンク先へ移動する。' } }
	],
	usage: [
		{
			en: 'Place it between the header and the page heading.',
			ja: 'ヘッダーとページの見出しの間に置く。'
		},
		{
			en: 'On narrow screens, let it wrap instead of scrolling horizontally.',
			ja: '狭い画面では、横にスクロールさせず折り返して表示する。'
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Breadcrumb Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「パンくずナビゲーション」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/breadcrumb/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
