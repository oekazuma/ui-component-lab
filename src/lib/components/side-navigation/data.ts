import type { ComponentData } from '#lib/types.js';

export default {
	id: 'side-navigation',
	category: 'navigation',
	names: { en: 'Side navigation', ja: 'サイドナビゲーション' },
	aliases: [
		{ name: 'Sidebar', source: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/sidebars' },
		{ name: 'Side nav', source: 'Atlassian Design System', url: 'https://atlassian.design/components/navigation-system/layout/examples' },
		{ name: 'Nav', source: 'Fluent UI React v9', url: 'https://react.fluentui.dev/?path=/docs/components-nav--docs' },
		{ name: 'NavList', source: 'Primer', url: 'https://primer.style/product/components/nav-list/' }
	],
	searchTerms: ['サイドバー', 'サイドメニュー', 'ローカルナビゲーション', 'vertical navigation'],
	summary: {
		en: 'A vertical, often nested list of links to the pages of a site or a section, placed beside the content, with the current page marked.',
		ja: 'サイトや、サイトのあるまとまりのページへのリンクを縦に並べた、入れ子にもできる一覧です。内容の横に置き、今のページを示します。'
	},
	appearance: {
		en: 'A column of links at the left or right of the content. Lower levels are indented under their parent, and the current page is set apart with a bar, bold text or a filled background. A parent with many children can have a button that opens and closes its sublinks.',
		ja: '内容の左か右に置く、リンクの縦の列です。下の階層は親の項目の下に字下げして並び、今のページは線や太字、塗りつぶした背景で区別します。子の項目が多い親には、下のリンクを開閉するボタンを付けることがあります。'
	},
	behavior: [
		{
			en: 'Each item is a link to a page of the site or section. Following it loads that page, and the navigation stays in the same place so people can move on to the next page.',
			ja: '項目はそれぞれ、サイトやそのまとまりのページへのリンクです。たどるとそのページが開き、ナビゲーションは同じ場所に残るので、続けて次のページへ移れます。'
		},
		{
			en: 'It is a `<nav>` given a name with `aria-label`, so screen reader users can find it among the landmarks. The levels are nested `<ul>` lists, and the nesting tells assistive technology about the hierarchy.',
			ja: '`aria-label` で名前を付けた `<nav>` なので、スクリーンリーダーの利用者はランドマークの一覧から見つけられます。階層は入れ子の `<ul>` で作り、入れ子によって階層が支援技術に伝わります。'
		},
		{
			en: 'The link to the current page has `aria-current="page"` as well as a visible mark. Only one element in a set is marked with `aria-current`.',
			ja: '今のページのリンクには、見た目の印に加えて `aria-current="page"` を付けます。`aria-current` を付けるのは、1つの集まりの中で1つの要素だけです。'
		},
		{
			en: 'When a parent has many children, a `<button>` with `aria-expanded` opens and closes its sublinks, following the Disclosure pattern. The Disclosure Navigation example of the WAI-ARIA Authoring Practices Guide does not use the `menu` role, because ordinary site navigation does not need what that role promises.',
			ja: '親の項目に子が多いときは、`aria-expanded` を付けた `<button>` で、Disclosure パターンに沿って下のリンクを開閉します。WAI-ARIA Authoring Practices Guide の Disclosure Navigation の例は `menu` ロールを使いません。ふつうのサイトのナビゲーションには、そのロールが約束する動きが要らないためです。'
		},
		{
			en: 'On small screens it is often collapsed and opened over the content on request.',
			ja: '小さな画面では、たたんでおき、求めに応じて内容の上に重ねて開くことがよくあります。'
		},
		{
			en: 'In this demo, choosing a link does not leave the page. It marks the link as the current page and changes the content beside it. The section with a button starts open.',
			ja: 'このデモでは、リンクを選んでもページは移りません。そのリンクを今のページとして示し、横の内容を切り替えます。ボタンの付いた項目は、開いた状態で始まります。'
		},
		{
			en: 'In this demo, when a section is closed and the current page is inside it, the button is bold and its name gets “(contains the current page)” added in visually hidden text, so screen reader users also learn where the current page is.',
			ja: 'このデモでは、項目が閉じていて今のページがその中にあるとき、ボタンを太字にし、見えない文字でボタンの名前に「（今のページを含む）」を足します。スクリーンリーダーの利用者にも、今のページの場所が伝わります。'
		},
		{
			en: 'In this demo, a section closes only when its button is pressed again. In the Disclosure Navigation example a dropdown also closes on Esc and when focus leaves the navigation. That example says the Esc behavior is needed to meet WCAG 1.4.13.',
			ja: 'このデモでは、項目はボタンをもう一度押したときだけ閉じます。Disclosure Navigation の例では、Esc キーを押したときと、フォーカスがナビゲーションの外へ出たときにも開いたドロップダウンが閉じます。この例は、Esc キーで閉じることは WCAG 1.4.13 を満たすために必要だとしています。'
		},
		{
			en: 'In this demo, the arrow keys, Home and End do nothing special. The Disclosure Navigation example offers them as optional additions that supplement Tab, not replace it.',
			ja: 'このデモでは、矢印キーと Home / End キーに特別な動作はありません。Disclosure Navigation の例は、これらを Tab キーの代わりではなく、Tab キーを補う任意の追加として示しています。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves through the links and buttons in order. Sublinks inside a closed section are skipped.',
				ja: 'リンクとボタンを順に移動します。閉じている項目の中のリンクは飛ばします。'
			}
		},
		{
			key: 'Enter / Space',
			action: {
				en: 'On a button, opens or closes its sublinks. Enter on a link goes to its page.',
				ja: 'ボタンでは下のリンクを開閉します。リンクで Enter を押すと、そのページへ移ります。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Always shown beside the content', ja: '内容の横に常に表示' },
			description: {
				en: 'A column at the side of the page that shows the pages of a site or a section. The U.S. Web Design System uses it as the sub-navigation of a section of a site, with one to three levels.',
				ja: 'サイトやそのあるまとまりのページを、ページの横の列に並べるものです。U.S. Web Design System は、サイトのあるまとまりの中のナビゲーションとして、1〜3階層で使います。'
			}
		},
		{
			name: { en: 'Collapsible', ja: '開閉できるもの' },
			description: {
				en: 'The column can be collapsed or expanded to give the content more room. Atlassian’s side nav also resizes, collapses on viewports narrower than 1024px, and then opens over the content. Apple suggests letting people hide the sidebar, but not hiding it by default, so that it stays easy to find.',
				ja: '内容に広い場所を譲るため、列をたたんだり広げたりできるものです。Atlassian のサイドナビは幅も変えられ、1024px より狭い画面ではたたんでおいて、開くと内容の上に重なります。Apple は、サイドバーを隠せるようにすることを勧める一方で、見つけやすいよう、はじめから隠しておくことは避けるよう勧めています。'
			}
		},
		{
			name: { en: 'Navigation rail', ja: 'ナビゲーションレール' },
			description: {
				en: 'Material Design 3 offers a vertical column of icons with short labels along the leading edge, for medium to extra large windows. The collapsed rail holds three to seven navigation items, and the expanded rail can reveal secondary destinations. In the Material 3 Expressive update the collapsed rail replaced the baseline navigation rail, which is no longer recommended, and the expanded rail replaced the navigation drawer.',
				ja: 'Material Design 3 にある、アイコンと短いラベルを縦に並べた、画面の端の列です。中くらいから特大までの画面向けで、たたんだレールは3〜7個の項目を並べ、広げたレールは二次的な行き先も見せられます。Material 3 Expressive の更新で、たたんだレールが従来のナビゲーションレールに、広げたレールがナビゲーションドロワーに代わりました。従来のナビゲーションレールは勧められなくなっています。'
			}
		},
		{
			name: { en: 'Navigation drawer', ja: 'ナビゲーションドロワー' },
			description: {
				en: 'Material Design 3 has two kinds: a standard one that stays beside the content on wide windows, and a modal one used on compact and medium windows. The modal kind slides over the page, which is a drawer rather than side navigation. In the Material 3 Expressive update, Material Design 3 stopped recommending the navigation drawer and points to the expanded navigation rail.',
				ja: 'Material Design 3 には2種類あります。広い画面で内容の横に残す標準のものと、小さめや中くらいの画面で使うモーダルのものです。モーダルのものはページの上にすべり出るので、サイドナビゲーションではなくドロワーにあたります。Material 3 Expressive の更新で、Material Design 3 はナビゲーションドロワーを勧めなくなり、広げたナビゲーションレールを使うよう案内しています。'
			}
		}
	],
	usage: [
		{
			en: 'Use it to show the hierarchy of the pages of a site or a section in one to three levels. The U.S. Web Design System uses it for the sub-navigation within a section of a site. Keep the link text short; it can be a shortened form of the page title.',
			ja: 'サイトやそのあるまとまりのページの階層を、1〜3階層で見せるために使います。U.S. Web Design System は、サイトのあるまとまりの中のナビゲーションとして使います。リンクの文言は短くし、ページのタイトルを縮めた形にしてかまいません。'
		},
		{
			en: 'Show the current page, so people can tell where they are in the hierarchy. Do not rely on color alone; add a bar, bold text or similar, and `aria-current="page"`.',
			ja: '階層の中で今どこにいるのか分かるよう、今のページを示します。色だけで示さず、線や太字などと `aria-current="page"` を足します。'
		},
		{
			en: 'Keep the levels few. Apple advises showing no more than two levels, Fluent’s Nav allows up to two, the U.S. Web Design System up to three and Primer’s NavList up to four. Carbon’s UI shell left panel supports no more than two, and suggests tabs within the page for further content.',
			ja: '階層は少なく保ちます。Apple は2階層までを勧め、Fluent の Nav は2階層まで、U.S. Web Design System は3階層まで、Primer の NavList は4階層まで使えます。Carbon の UI shell left panel は2階層までで、それより下の内容にはページ内のタブを勧めています。'
		},
		{
			en: 'Carbon suggests a left panel when there are more than five secondary items or when people are expected to switch between them often. The U.S. Web Design System says that a site with fewer than five pages does not need a navigational hierarchy.',
			ja: 'Carbon は、二次ナビゲーションの項目が5つより多いときや、利用者が項目をたびたび切り替えると見込まれるときに、左のパネルを使うよう勧めています。U.S. Web Design System は、ページが5つに満たないサイトにはナビゲーションの階層は要らないとしています。'
		},
		{
			en: 'If the page already has both a horizontal and a vertical navigation bar, the U.S. Web Design System suggests looking for ways to simplify the navigation system.',
			ja: 'ページにすでに水平と垂直の両方のナビゲーションバーがあるときは、U.S. Web Design System はナビゲーションの仕組みを単純にできないか考えるよう勧めています。'
		},
		{
			en: 'Do not mix icons that mark links with icons that mark sections that open. If both are needed, use clearly different shapes, not the same chevron turned in another direction, and use the same icon for the same behavior across the site. This follows the Digital Agency Design System’s guidance for its menu list, which it uses as a local menu in the content area.',
			ja: 'リンクを示すアイコンと、開くまとまりを示すアイコンを混ぜるのは避けます。どちらも要るときは、同じシェブロンの向きを変えただけにせず、はっきり違う形にし、サイトの中では同じ動きには同じアイコンを使います。これは、デジタル庁デザインシステムが、内容の領域に置くローカルメニューとして使うメニューリストについて示している指針に沿っています。'
		},
		{
			en: 'Give the navigation an accessible name. Primer asks that a NavList always has one, even when its visible heading is hidden.',
			ja: 'ナビゲーションにはアクセシブルな名前を付けます。Primer は、見える見出しを出さないときでも、NavList に必ず名前を付けるよう求めています。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Making a parent item both a link to its own page and the button that opens its sublinks',
				ja: '親の項目を、自分のページへのリンクと、下のリンクを開くボタンの両方にする'
			},
			harm: {
				en: 'Voice control and screen reader users cannot perform two different actions through the same semantic button, even if a separate click event is attached to the nested item.',
				ja: '音声操作やスクリーンリーダーの利用者は、同じボタンから2つの異なる操作を行えません。入れ子の項目に別のクリックイベントを付けていても同じです。'
			},
			instead: {
				en: 'Make the parent only a button that opens and closes, as in Primer’s NavList, where only the top-level items toggle and are not links. Put a link to the parent’s own page among the sublinks if people need it.',
				ja: '親の項目は開閉するだけのボタンにします。Primer の NavList も、最上位の項目は開閉するだけでリンクにしません。利用者にそのページが要るときは、親自身のページへのリンクを下のリンクの中に入れます。'
			}
		},
		{
			pattern: {
				en: 'Showing the current page by color alone',
				ja: '今のページを色だけで示す'
			},
			harm: {
				en: 'Not everyone sees colors, or sees them the same way, and people using limited-color or monochrome displays cannot get information that is shown only in color.',
				ja: '色が見えない人や、色の見え方が違う人がいます。色数の限られた画面や白黒の画面を使っている人は、色だけで示された情報を得られません。'
			},
			instead: {
				en: 'Add a shape or text cue, such as a bar beside the link or bold text, and set `aria-current="page"` so assistive technology says it too.',
				ja: 'リンクの横の線や太字など、形や文字の手がかりを足し、支援技術にも伝わるよう `aria-current="page"` を付けます。'
			}
		},
		{
			pattern: {
				en: 'Letting the navigation grow very long or very deep',
				ja: 'ナビゲーションを、とても長くしたり深くしたりする'
			},
			harm: {
				en: 'If the hierarchy is too long, people may miss items at the bottom; if it is too deep, they may miss items that take too many clicks to reach.',
				ja: '階層が長すぎると下のほうの項目を見落とし、深すぎると、たどり着くまでのクリックが多い項目を見落とします。'
			},
			instead: {
				en: 'Keep to a few levels and test with people to find the right balance between breadth and depth.',
				ja: '階層は少なくし、利用者で試して、幅と深さのちょうどよい釣り合いを探します。'
			}
		}
	],
	related: [
		{
			id: 'table-of-contents',
			diff: {
				en: 'Side navigation links to other pages of a section; a table of contents links to the sections within the current page.',
				ja: 'サイドナビゲーションはあるまとまりの別のページへのリンクを並べ、目次は今のページの中の節へのリンクを並べます。'
			}
		},
		{
			id: 'tree-view',
			diff: {
				en: 'Side navigation is a list of links that is read as navigation; a tree view is a widget with its own arrow-key behavior for opening and choosing items, and Primer says it is not an accessible replacement for navigation.',
				ja: 'サイドナビゲーションはナビゲーションとして読まれるリンクの一覧で、ツリービューは項目の開閉と選択に専用の矢印キー操作を持つ部品であり、Primer は、ツリービューがナビゲーションのアクセシブルな代わりになることはないとしています。'
			}
		},
		{
			id: 'mobile-menu',
			diff: {
				en: 'Side navigation stays beside the content on a wide screen; a mobile menu stacks the site’s navigation for small touch screens and is opened from a button.',
				ja: 'サイドナビゲーションは広い画面で内容の横に残り、モバイルメニューは小さなタッチスクリーン向けにサイトのナビゲーションを縦に積んで、ボタンから開きます。'
			}
		},
		{
			id: 'drawer',
			diff: {
				en: 'Side navigation is a list of links placed beside the content; a drawer is a panel that slides in over the page.',
				ja: 'サイドナビゲーションは内容の横に置くリンクの一覧で、ドロワーはページの上にすべり出るパネルです。'
			}
		},
		{
			id: 'tabs',
			diff: {
				en: 'Side navigation links to separate pages, with the current page marked; tabs switch between panels inside one page.',
				ja: 'サイドナビゲーションは別々のページへのリンクで今のページを示し、タブは1つのページの中のパネルを切り替えます。'
			}
		},
		{
			id: 'bottom-navigation',
			diff: {
				en: 'Side navigation lists the pages of a site or a section in a column beside the content; bottom navigation puts three to five top-level destinations in a bar along the bottom of a phone screen.',
				ja: 'サイドナビゲーションはサイトやそのあるまとまりのページを内容の横の列に並べ、ボトムナビゲーションはスマートフォンの画面の下のバーに3〜5個の最上位の行き先を並べます。'
			}
		},
		{
			id: 'header',
			diff: {
				en: 'Side navigation lists the pages within one section in a column beside the content; a header holds the site’s main sections in a row across the top of every page.',
				ja: 'サイドナビゲーションは、あるセクションの中のページを内容の横の列に並べ、ヘッダーは各ページの上端に、サイトの主なセクションを横一列に収めます。'
			}
		}
	],
	sources: [
		{
			label: 'U.S. Web Design System: Side navigation',
			url: 'https://designsystem.digital.gov/components/side-navigation/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「メニューリスト」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/menu-list/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「メニューリスト（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/menu-list/usage/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Apple Human Interface Guidelines: Sidebars',
			url: 'https://developer.apple.com/design/human-interface-guidelines/sidebars',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Material Design 3: Navigation rail',
			url: 'https://m3.material.io/components/navigation-rail/overview',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Material Design 3: Navigation rail (guidelines)',
			url: 'https://m3.material.io/components/navigation-rail/guidelines',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Material Design 3: Navigation drawer',
			url: 'https://m3.material.io/components/navigation-drawer/overview',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Carbon Design System: UI shell left panel',
			url: 'https://carbondesignsystem.com/components/UI-shell-left-panel/usage/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Atlassian Design System: Navigation system, Layout',
			url: 'https://atlassian.design/components/navigation-system/layout/examples',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Fluent UI React v9: Nav',
			url: 'https://react.fluentui.dev/?path=/docs/components-nav--docs',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Primer: NavList',
			url: 'https://primer.style/product/components/nav-list/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Primer: NavList accessibility',
			url: 'https://primer.style/product/components/nav-list/accessibility/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'WAI-ARIA APG: Disclosure Navigation Menu Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'MDN: aria-current',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Understanding Success Criterion 1.4.1: Use of Color (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
			checkedAt: '2026-11-02'
		}
	]
} satisfies ComponentData;
