import type { ComponentData } from '#lib/types.js';

export default {
	id: 'footer',
	category: 'navigation',
	names: { en: 'Footer', ja: 'フッター' },
	aliases: [
		{ name: 'GOV.UK footer', source: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk/components/footer/' },
		{ name: 'Footer', source: 'U.S. Web Design System', url: 'https://designsystem.digital.gov/components/footer/' }
	],
	searchTerms: ['サイトフッター', 'ページフッター', 'Site footer'],
	summary: {
		en: 'The area at the bottom of a page for information that applies to the whole site, such as the copyright notice and links to its policies and contact details.',
		ja: 'ページの下端に置く領域で、著作権の表示や、サイトの方針、連絡先へのリンクなど、サイト全体に関わる情報を収めます。'
	},
	appearance: {
		en: 'A band across the bottom of every page. It has a copyright line, usually with a row of links such as Privacy and Accessibility. A larger footer repeats the site’s navigation in columns and may add contact details or a newsletter sign-up.',
		ja: 'すべてのページの下端にある帯です。著作権の行があり、ふつうはプライバシーやアクセシビリティなどのリンクの並びが添えられます。大きなフッターでは、サイトのナビゲーションを列で繰り返し、連絡先やニュースレターの登録を加えることもあります。'
	},
	behavior: [
		{
			en: 'It serves visitors who reach the bottom of a page without finding what they wanted, so its links should point to content that may answer their remaining questions.',
			ja: 'ページの下端まで来ても探しているものが見つからなかった訪問者の役に立つ場所で、リンクは、残った疑問に答えそうな内容へ向けます。'
		},
		{
			en: 'A `<footer>` that is not inside `<article>`, `<aside>`, `<main>`, `<nav>` or `<section>`, or an element with one of those roles, is exposed as the contentinfo landmark, so screen reader users can jump to it. Inside one of those, it is only the footer of that part, such as an article’s author details and copyright, and is not a landmark.',
			ja: '`<article>`、`<aside>`、`<main>`、`<nav>`、`<section>`、またはそれらのロールを持つ要素の中にない `<footer>` は contentinfo のランドマークとして公開されるので、スクリーンリーダーの利用者はそこへ直接移れます。これらの中にある場合は、記事の筆者の情報や著作権など、その部分だけのフッターで、ランドマークにはなりません。'
		},
		{
			en: 'In the U.S. Web Design System’s big footer, the navigation columns collapse into accordions on small screens, and Tab still moves from link to link.',
			ja: 'U.S. Web Design System の大きなフッターでは、小さな画面でナビゲーションの列がアコーディオンにたたまれますが、Tab キーは今までどおりリンクからリンクへ移ります。'
		},
		{
			en: 'In this demo, the footer is in normal flow and does not stay fixed. Because it sits inside this page’s `<main>`, it does not become a contentinfo landmark here; at the bottom of a real page it would. This site’s own footer is the contentinfo on this page. The `<nav>` inside it keeps its label and is still a navigation landmark.',
			ja: 'このデモでは、フッターは通常の流れに置き、固定しません。このページの `<main>` の中にあるため、ここでは contentinfo のランドマークにならず、実際のページの下端に置いたときにはなります。このページの contentinfo はサイト自身のフッターです。中の `<nav>` は名前を持ったまま、navigation のランドマークです。'
		},
		{
			en: 'In this demo, the links do not navigate. Choosing one shows below the box where a real site would go.',
			ja: 'このデモでは、リンクは移動しません。リンクを選ぶと、実際のサイトならどこへ移動するかを枠の下に表示します。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves focus to the next or previous link in the footer.',
				ja: 'フッターの次のリンク、前のリンクへフォーカスを移します。'
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
			name: { en: 'Big', ja: '大' },
			description: {
				en: 'A multi-column footer that repeats the site’s navigation, and can offer a newsletter sign-up. The U.S. Web Design System suggests it when the footer has more than five links.',
				ja: 'サイトのナビゲーションを列にして繰り返す、複数の列のフッターで、ニュースレターの登録も置けます。U.S. Web Design System は、リンクが5つを超えるときに勧めています。'
			}
		},
		{
			name: { en: 'Medium', ja: '中' },
			description: {
				en: 'A few links for disclaimers or terms of service, plus social media icons and contact information.',
				ja: '免責事項や利用規約などへの少数のリンクに、ソーシャルメディアのアイコンと連絡先を加えたものです。'
			}
		},
		{
			name: { en: 'Slim', ja: 'スリム' },
			description: {
				en: 'A compact footer with only a few links and nothing else.',
				ja: '少数のリンクだけを置く、小さなフッターです。'
			}
		},
		{
			name: { en: 'With secondary navigation', ja: '補助ナビゲーション付き' },
			description: {
				en: 'The GOV.UK footer can add titled lists of links to move around the wider GOV.UK site. It suits a GOV.UK service where leaving is acceptable, but probably not a linear, form-type service.',
				ja: 'GOV.UK のフッターには、GOV.UK の広いサイトの中を移るための、見出し付きのリンクの一覧を加えられます。サイトの外へ出てもよい GOV.UK のサービス向きで、一本道のフォーム形式のサービスにはおそらく向きません。'
			}
		}
	],
	usage: [
		{
			en: 'Put it at the bottom of every page, with a copyright notice that says who owns the copyright and, where it applies, how the content may be reused.',
			ja: 'すべてのページの下端に置き、だれが著作権を持つかと、該当するときは内容をどう再利用できるかを示す、著作権の表示を入れます。'
		},
		{
			en: 'Keep it to links to popular content. Legal links are sometimes required, but try to keep “disclaimer bloat” to a minimum. The footer does not need to mirror the header’s grouping.',
			ja: 'リンクは、よく見られる内容へのものに絞ります。法的な内容へのリンクが必要なことはありますが、免責事項を増やしすぎないようにします。フッターのまとまりは、ヘッダーに合わせる必要はありません。'
		},
		{
			en: 'GOV.UK suggests the link texts “Privacy”, “Accessibility”, “Cookies” and “Terms and conditions”. Keep help links in the same place on every page, to meet WCAG 2.2 success criterion 3.2.6 Consistent Help.',
			ja: 'GOV.UK は、リンクの文言に「Privacy」「Accessibility」「Cookies」「Terms and conditions」を挙げています。ヘルプへのリンクは、WCAG 2.2 の達成基準 3.2.6（一貫したヘルプ）を満たすため、どのページでも同じ位置に置きます。'
		},
		{
			en: 'Limit contact details to a general email address and phone number, as links people can tap to call. Leave physical addresses to a contact page. Link only to social media accounts that are updated often.',
			ja: '連絡先は、全体の問い合わせのメールアドレスと電話番号に絞り、押して発信できるリンクにします。所在地は連絡先のページに任せます。ソーシャルメディアは、よく更新しているアカウントだけにリンクします。'
		},
		{
			en: 'A page may have one contentinfo landmark, and each nested document, such as an `<iframe>`, may have its own. If a page does have more than one, give each a unique label.',
			ja: 'contentinfo のランドマークは、1ページに1つとします。`<iframe>` のような入れ子の文書は、それぞれ1つ持てます。1ページに複数あるときは、それぞれに異なる名前を付けます。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Keeping the footer fixed to the bottom of the screen with no room left for it as focus moves down the page',
				ja: 'フッターを画面の下端に固定し、フォーカスが下へ進むときにその分の余白を残さない'
			},
			harm: {
				en: 'A fixed footer can cover the item that has keyboard focus. Then people who use the keyboard cannot see where focus is, and may think the page has stopped responding.',
				ja: '固定したフッターが、キーボードのフォーカスがある項目を覆うことがあります。キーボードで操作する人はフォーカスの位置が見えず、ページが反応しなくなったと思うことがあります。'
			},
			instead: {
				en: 'Leave the footer in normal flow at the end of the page. If it must stay fixed, make sure a focused item is never hidden under it, for example with CSS scroll-padding (WCAG technique C43).',
				ja: 'フッターはページの終わりの通常の流れに置きます。固定する場合は、フォーカスのある項目がその下に隠れないようにします。たとえば CSS の scroll-padding を使います（WCAG の技法 C43）。'
			}
		}
	],
	related: [
		{
			id: 'header',
			diff: {
				en: 'A footer holds information about the whole site, such as the copyright notice and policy links, at the bottom of every page; a header holds the site’s identity and main navigation at the top.',
				ja: 'フッターは各ページの下端に、著作権の表示や方針へのリンクなど、サイト全体に関わる情報を収め、ヘッダーは上端に、サイトを示すものと主なナビゲーションを収めます。'
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
			label: 'WAI-ARIA APG: Contentinfo Landmark',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MDN: <footer>: The Footer element',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer',
			checkedAt: '2026-11-03'
		},
		{
			label: 'GOV.UK Design System: Footer',
			url: 'https://design-system.service.gov.uk/components/footer/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'U.S. Web Design System: Footer',
			url: 'https://designsystem.digital.gov/components/footer/',
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
		}
	]
} satisfies ComponentData;
