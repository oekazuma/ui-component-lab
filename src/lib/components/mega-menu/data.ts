import type { ComponentData } from '#lib/types.js';

export default {
	id: 'mega-menu',
	category: 'navigation',
	names: { en: 'Mega menu', ja: 'メガメニュー' },
	aliases: [
		{ name: 'メガメニュー', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/mega-menu/' }
	],
	summary: {
		en: 'A wide panel that opens from a site’s horizontal menu and shows all the pages in one section at once.',
		ja: 'サイトの水平メニューから開く幅の広いパネル。1つのカテゴリの中のページをまとめて見せる。'
	},
	appearance: {
		en: 'A row of section names across the top of a site. Choosing one opens a wide panel under the row, with the section’s own page and a short description on one side and its pages in several columns on the other.',
		ja: 'サイトの上部にカテゴリ名が横に並ぶ。1つを選ぶとその下に幅の広いパネルが開き、片側にカテゴリのページへのリンクと短い説明、もう片側にカテゴリの中のページが何列かに並ぶ。'
	},
	behavior: [
		{
			en: 'Each section name is a button with `aria-expanded` that shows or hides its panel (the APG Disclosure pattern). The panel holds ordinary links, so the Tab key moves through them.',
			ja: 'カテゴリ名はそれぞれパネルを開閉する `aria-expanded` 付きのボタン（APG の Disclosure パターン）。パネルの中は普通のリンクなので、Tab キーで順に移る。'
		},
		{
			en: 'Only one panel is open at a time; opening another closes the first.',
			ja: '開くパネルは常に1つで、別のパネルを開くと前のパネルは閉じる。'
		},
		{
			en: 'Esc closes the panel and returns focus to its button. Moving focus out of the navigation or clicking outside it also closes the panel.',
			ja: 'Esc でパネルを閉じ、そのボタンにフォーカスを戻す。ナビゲーションの外へフォーカスを移したり、外側をクリックしたりしても閉じる。'
		},
		{
			en: 'Besides links, the panel can hold descriptions and images.',
			ja: 'パネルにはリンクのほかに説明文や画像も入れられる。'
		},
		{
			en: 'In this demo, the first panel starts open. The panel pushes the content below it down instead of covering the page, and choosing a link shows where it would go instead of leaving the page. Moving between the section names with the arrow keys, which the APG lists as optional, is left out.',
			ja: 'このデモでは、最初のパネルを開いた状態で始める。パネルはページに重ねず、下の内容を押し下げて開く。リンクを選ぶと、ページを移らずに行き先を表示する。APG で任意とされている、矢印キーでカテゴリ名の間を移る機能は省いている。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'On a section name, opens or closes its panel. Enter on a link goes to its page.',
				ja: 'カテゴリ名ではそのパネルを開閉する。リンクで Enter を押すと、そのページへ移る。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves through the section names, and from the name of the open section into the links in its panel.',
				ja: 'カテゴリ名を順に移動し、開いているカテゴリ名からはそのパネルのリンクへ進む。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the open panel and returns focus to its section name.',
				ja: '開いているパネルを閉じ、そのカテゴリ名にフォーカスを戻す。'
			}
		}
	],
	usage: [
		{
			en: 'Label each section name with the name of the page it leads to, not vague words such as “Details” or “More”. To switch between views of one subject, such as overview, specifications, and reviews, use tabs instead.',
			ja: 'カテゴリ名には行き先のページ名を使い、「詳細」「その他」のようなあいまいな言葉を避ける。概要・仕様・レビューのように同じ主題の内容を切り替えるなら、タブを使う。'
		},
		{
			en: 'Use it on desktop screens to list the pages under each section of the horizontal menu. On phones, use the hamburger menu button and the mobile menu instead.',
			ja: 'デスクトップの画面で、水平メニューの各カテゴリの下にあるページを一覧にするのに使う。スマートフォンでは、代わりにハンバーガーメニューボタンとモバイルメニューを使う。'
		},
		{
			en: 'The section name opens the panel and does not go to the section’s own page, so put a link to that page in the panel.',
			ja: 'カテゴリ名はパネルを開くだけで、カテゴリのページへは移らないので、そのページへのリンクをパネルの中に入れる。'
		},
		{
			en: 'Build it from buttons with `aria-expanded` and links, not from `role="menu"`. The menu role tells assistive technologies to expect complex keyboard behavior that site navigation does not need.',
			ja: '`role="menu"` は使わず、`aria-expanded` のボタンとリンクで作る。menu のロールを付けると、支援技術はサイトのナビゲーションには要らない複雑なキー操作を期待する。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Opening the panel only when the pointer hovers over a section name',
				ja: 'カテゴリ名にマウスを重ねたときだけ、パネルを開く'
			},
			harm: {
				en: 'People using a keyboard or a touch screen cannot open the panel at all.',
				ja: 'キーボードやタッチスクリーンで操作する人は、パネルを開けない。'
			},
			instead: {
				en: 'Open the panel when the section name is selected, by click, tap, Enter, or Space.',
				ja: 'カテゴリ名を選んだとき（クリック、タップ、Enter、Space）にパネルを開く。'
			}
		},
		{
			pattern: {
				en: 'Showing only some of a section’s pages in its panel',
				ja: 'パネルにカテゴリの中のページを一部だけ並べる'
			},
			harm: {
				en: 'People assume the panel lists every page in the section, so pages left out go unnoticed.',
				ja: '利用者はパネルにそのカテゴリの全ページが並んでいると思い込み、載っていないページがあることに気づかない。'
			},
			instead: {
				en: 'List every page of that level in the panel. If they cannot all fit, use another way to navigate instead of a mega menu.',
				ja: 'その階層のページはすべてパネルに並べる。すべてを並べられないなら、メガメニューを使わずにほかのナビゲーションにする。'
			}
		},
		{
			pattern: { en: 'Putting many section names in the horizontal menu', ja: '水平メニューに多くのカテゴリ名を並べる' },
			harm: {
				en: 'People have a harder time finding the page they are looking for.',
				ja: '利用者が目的のページを見つけにくくなる。'
			},
			instead: {
				en: 'Sort out the sections and, where needed, add levels so that each section name opens its pages in the panel.',
				ja: 'カテゴリを整理し、必要なら階層に分けて、カテゴリ名ごとにその中のページをパネルで開くようにする。'
			}
		}
	],
	related: [
		{
			id: 'menubar',
			diff: {
				en: 'A mega menu shows a site’s pages in a wide panel and is used with buttons and the Tab key; a menubar holds an app’s commands and is moved through with the arrow keys.',
				ja: 'メガメニューはサイトのページを幅の広いパネルで見せてボタンと Tab キーで操作し、メニューバーはアプリの操作をまとめ、矢印キーで移る。'
			}
		},
		{
			id: 'menu',
			diff: {
				en: 'A mega menu shows many navigation links in a wide panel; a menu lists a few actions in a narrow column.',
				ja: 'メガメニューは多くのナビゲーションのリンクを幅の広いパネルで見せ、メニューはいくつかの操作を細い列に並べる。'
			}
		},
		{
			id: 'drawer',
			diff: {
				en: 'A mega menu drops down under the horizontal menu on wide screens; a drawer slides in from the edge of the screen and covers the page.',
				ja: 'メガメニューは広い画面で水平メニューの下に開き、ドロワーは画面の端からすべり出てページを覆う。'
			}
		}
	],
	sources: [
		{
			label: 'デジタル庁デザインシステムウェブサイト「水平メニュー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/horizontal-menu/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「メガメニュー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/mega-menu/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'WAI-ARIA APG: Example Disclosure Navigation Menu',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
