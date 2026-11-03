import type { ComponentData } from '#lib/types.js';

export default {
	id: 'header',
	category: 'navigation',
	names: { en: 'Header', ja: 'ヘッダー' },
	aliases: [
		{ name: 'GOV.UK header', source: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk/components/header/' },
		{ name: 'GOV.UK masthead', source: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk/components/header/' },
		{ name: 'Header', source: 'U.S. Web Design System', url: 'https://designsystem.digital.gov/components/header/' },
		{ name: 'ヘッダーコンテナ', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/header-container/' }
	],
	searchTerms: ['サイトヘッダー', 'グローバルナビゲーション', 'グローバルナビ', 'Site header'],
	summary: {
		en: 'The band across the top of a page that says which site you are on and holds the main way to move around it.',
		ja: 'ページの上端に置く帯で、今どのサイトにいるかを示し、サイトの中を移動するための主な入り口を収めます。'
	},
	appearance: {
		en: 'A full-width band at the top of every page. The site name or logo sits at the left, with a row of links to the main sections beside it. Some sites add a search box, a language selector or sign-in links. On a narrow screen the links often fold into a menu button.',
		ja: 'すべてのページの上端にある、横幅いっぱいの帯です。左にサイト名かロゴがあり、その横に主なセクションへのリンクが並びます。検索ボックスや言語の切り替え、ログインのリンクを加えるサイトもあります。画面が狭いと、リンクはメニューのボタンにまとめられることが多くあります。'
	},
	behavior: [
		{
			en: 'The site name or logo is a link to the home page, and the link for the section you are in is highlighted.',
			ja: 'サイト名やロゴはホームページへのリンクで、今いるセクションのリンクは目立たせて示します。'
		},
		{
			en: 'A `<header>` that is not inside `<article>`, `<aside>`, `<main>`, `<nav>` or `<section>`, or an element with one of those roles, is exposed as the banner landmark, so screen reader users can jump to it. Inside one of those, it only groups the introductory content of that part, is not a landmark, and cannot be given a name with `aria-label`.',
			ja: '`<article>`、`<aside>`、`<main>`、`<nav>`、`<section>`、またはそれらのロールを持つ要素の中にない `<header>` は banner のランドマークとして公開されるので、スクリーンリーダーの利用者はそこへ直接移れます。これらの中にある場合は、その部分の導入にあたる内容をまとめるだけでランドマークにはならず、`aria-label` で名前を付けることもできません。'
		},
		{
			en: 'When the screen is narrow, the items and links are folded into a menu that a button opens and closes, as in the Digital Agency Design System header container.',
			ja: '画面が狭いと、項目やリンクはボタンで開閉するメニューにまとめられます。デジタル庁デザインシステムのヘッダーコンテナがその例です。'
		},
		{
			en: 'In this demo, the header is in normal flow and does not stay fixed. Because it sits inside this page’s `<main>`, it does not become a banner landmark here; at the top of a real page it would. This site’s own header is the banner on this page. The `<nav>` inside it keeps its label and is still a navigation landmark.',
			ja: 'このデモでは、ヘッダーは通常の流れに置き、固定しません。このページの `<main>` の中にあるため、ここでは banner のランドマークにならず、実際のページの上端に置いたときにはなります。このページの banner はサイト自身のヘッダーです。中の `<nav>` は名前を持ったまま、navigation のランドマークです。'
		},
		{
			en: 'In this demo, the links do not navigate. Choosing a link marks it as the current page, changes the heading below and announces the current page in a status line. The site name goes back to Home but is not marked as current, so Home is not announced twice.',
			ja: 'このデモでは、リンクは移動しません。リンクを選ぶと、そのリンクが現在のページになり、下の見出しが変わって、現在のページが状態表示の行で読み上げられます。サイト名はホームに戻りますが、現在地の印は付けないので、ホームが二重に読み上げられることはありません。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves focus to the next or previous link in the header.',
				ja: 'ヘッダーの次のリンク、前のリンクへフォーカスを移します。'
			}
		},
		{
			key: 'Enter',
			action: {
				en: 'Follows the link that has focus.',
				ja: 'フォーカスのあるリンクをたどります。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Basic', ja: '基本' },
			description: {
				en: 'The logo and a row of main links side by side, for a site with a modest number of sections. The U.S. Web Design System can add dropdown menus and a search box.',
				ja: 'ロゴと主なリンクを横に並べたもので、セクションの数がそれほど多くないサイトに向きます。U.S. Web Design System では、ドロップダウンのメニューや検索ボックスを加えられます。'
			}
		},
		{
			name: { en: 'Extended', ja: '拡張' },
			description: {
				en: 'For a site with more sections than fit next to the logo, or one that wants secondary links such as Log in and Sign up. It takes more space than the basic header.',
				ja: 'ロゴの横に収まらないほどセクションが多いサイトや、ログインや新規登録のような副次的なリンクを加えたいサイト向けです。基本より場所をとります。'
			}
		},
		{
			name: { en: 'Logo only', ja: 'ロゴだけ' },
			description: {
				en: 'The GOV.UK header shows only the GOV.UK logo and any GOV.UK-wide links. A service’s own name and links go in the separate Service navigation component. GOV.UK also has a Generic header for government services that are not on the GOV.UK website, which likewise has only a logo and no navigation links.',
				ja: 'GOV.UK のヘッダーには、GOV.UK のロゴと GOV.UK 全体のリンクだけを置きます。サービス自身の名前やリンクは、別の Service navigation 部品に入れます。GOV.UK には、GOV.UK のサイトにない政府のサービス向けの Generic header もあり、こちらもロゴだけで、ナビゲーションのリンクは置きません。'
			}
		}
	],
	usage: [
		{
			en: 'Use it on every page for what identifies the site and leads to its main sections. GOV.UK requires its header at the top of every page of a service on GOV.UK.',
			ja: 'サイトを示すものと、主なセクションへの入り口を収めて、すべてのページに置きます。GOV.UK は、GOV.UK 上のサービスのすべてのページの先頭にヘッダーを置くよう求めています。'
		},
		{
			en: 'Keep link labels short and plain, put the most wanted links first, and mark the current section. Base the sections on the tasks people come for, not on how the organization is arranged.',
			ja: 'リンクのラベルは短く平易にして、よく使われるものを先に置き、今いるセクションを示します。セクションは組織の構成ではなく、利用者が済ませたい作業をもとに決めます。'
		},
		{
			en: 'Put a skip link before the header, so keyboard users can go straight to the main content.',
			ja: 'ヘッダーの前にスキップリンクを置き、キーボードの利用者が本文へ直接移れるようにします。'
		},
		{
			en: 'Label the `<nav>` with `aria-label` when the page has more than one, and write the links as list items. Give a logo image alternative text. For a text logo, use `<em>` rather than `<h1>` except on the home page.',
			ja: 'ページに `<nav>` が複数あるときは `aria-label` で区別し、リンクはリストの項目として書きます。ロゴが画像なら代替テキストを付けます。文字のロゴは、ホームページを除き、`<h1>` ではなく `<em>` にします。'
		},
		{
			en: 'A page may have one banner landmark, and each nested document, such as an `<iframe>`, may have its own. If a page does have more than one, give each a unique label.',
			ja: 'banner のランドマークは、1ページに1つとします。`<iframe>` のような入れ子の文書は、それぞれ1つ持てます。1ページに複数あるときは、それぞれに異なる名前を付けます。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Keeping the header fixed to the top of the screen with no room left for it as focus moves down the page',
				ja: 'ヘッダーを画面の上端に固定し、フォーカスが下へ進むときにその分の余白を残さない'
			},
			harm: {
				en: 'A fixed header can cover the item that has keyboard focus. Then people who use the keyboard cannot see where focus is, and may think the page has stopped responding.',
				ja: '固定したヘッダーが、キーボードのフォーカスがある項目を覆うことがあります。キーボードで操作する人はフォーカスの位置が見えず、ページが反応しなくなったと思うことがあります。'
			},
			instead: {
				en: 'Leave the header in normal flow. If it must stay fixed, make sure a focused item is never hidden under it, for example with CSS scroll-padding (WCAG technique C43).',
				ja: 'ヘッダーは通常の流れに置きます。固定する場合は、フォーカスのある項目がその下に隠れないようにします。たとえば CSS の scroll-padding を使います（WCAG の技法 C43）。'
			}
		},
		{
			pattern: {
				en: 'Opening dropdown menus in the header only when the pointer hovers',
				ja: 'ヘッダーのドロップダウンのメニューを、ポインターを重ねたときだけ開く'
			},
			harm: {
				en: 'Hover is difficult for some people and does not work on touch screens.',
				ja: 'ポインターを重ねる操作が難しい人がいて、タッチスクリーンでも使えません。'
			},
			instead: {
				en: 'Open dropdowns on click or from the keyboard.',
				ja: 'ドロップダウンは、クリックかキーボードで開きます。'
			}
		}
	],
	related: [
		{
			id: 'footer',
			diff: {
				en: 'A header holds the site’s identity and main navigation at the top of every page; a footer holds information about the whole site, such as the copyright notice and policy links, at the bottom.',
				ja: 'ヘッダーは各ページの上端にサイトを示すものと主なナビゲーションを収め、フッターは下端に、著作権の表示や方針へのリンクなど、サイト全体に関わる情報を収めます。'
			}
		},
		{
			id: 'skip-link',
			diff: {
				en: 'A header holds the site’s identity and navigation at the top of every page; a skip link comes before it and lets keyboard users jump past it to the main content.',
				ja: 'ヘッダーは各ページの上端にサイトを示すものとナビゲーションを収め、スキップリンクはその前に置いて、キーボードの利用者がヘッダーを飛ばして本文へ移れるようにします。'
			}
		},
		{
			id: 'side-navigation',
			diff: {
				en: 'A header holds the site’s main sections in a row across the top of every page; side navigation lists the pages within one section in a column beside the content.',
				ja: 'ヘッダーは各ページの上端に、サイトの主なセクションを横一列に収め、サイドナビゲーションは、あるセクションの中のページを内容の横の列に並べます。'
			}
		},
		{
			id: 'hamburger-menu',
			diff: {
				en: 'A header is the whole band at the top of a page; a hamburger menu button is one control inside it that opens the menu when the links no longer fit.',
				ja: 'ヘッダーはページの上端の帯全体で、ハンバーガーメニューボタンは、その中にあって、リンクが収まらないときにメニューを開く1つの部品です。'
			}
		},
		{
			id: 'mega-menu',
			diff: {
				en: 'A header is the band at the top of a page that holds the main links; a mega menu is a wide panel that opens from one of those links to show many pages of that section.',
				ja: 'ヘッダーは主なリンクを収めるページの上端の帯で、メガメニューは、そのリンクの1つから開いて、そのセクションの多くのページを見せる幅の広いパネルです。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Landmark Regions',
			url: 'https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'WAI-ARIA APG: Banner Landmark',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MDN: <header>: The Header element',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header',
			checkedAt: '2026-11-03'
		},
		{
			label: 'GOV.UK Design System: Header',
			url: 'https://design-system.service.gov.uk/components/header/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'GOV.UK Design System: Generic header',
			url: 'https://design-system.service.gov.uk/components/generic-header/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'U.S. Web Design System: Header',
			url: 'https://designsystem.digital.gov/components/header/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ヘッダーコンテナ」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/header-container/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Understanding Success Criterion 2.4.11: Focus Not Obscured (Minimum) (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html',
			checkedAt: '2026-11-03'
		},
		{
			label: 'WCAG 2.2 Technique C43: Using CSS scroll-padding to un-obscure content',
			url: 'https://www.w3.org/WAI/WCAG22/Techniques/css/C43',
			checkedAt: '2026-11-03'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ヘッダーコンテナ（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/header-container/usage/',
			checkedAt: '2026-11-03'
		}
	]
} satisfies ComponentData;
