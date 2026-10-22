import type { ComponentData } from '#lib/types.js';

export default {
	id: 'mobile-menu',
	category: 'navigation',
	names: { en: 'Mobile menu', ja: 'モバイルメニュー' },
	aliases: [
		{ name: 'モバイルメニュー', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/mobile-menu/' }
	],
	summary: {
		en: 'The site’s navigation links stacked in a column for small touch screens, opened from a hamburger menu button.',
		ja: '小さなタッチスクリーン向けに、サイトのナビゲーションのリンクを縦に並べたメニュー。ハンバーガーメニューボタンから開く。'
	},
	appearance: {
		en: 'A full-width list of tall rows, one link or group per row, inside a panel that covers part of the screen. Groups open in place or slide to a second list, and section names in bold separate the parts.',
		ja: 'パネルの中に、1行に1つのリンクかまとまりを置いた、幅いっぱいの高い行が縦に並ぶ。まとまりはその場で開くか次の一覧へすべって移り、太字のセクション名が部分を区切る。'
	},
	behavior: [
		{
			en: 'Opened with the hamburger menu button and shown in a drawer that slides in from the left or right, with the rest of the screen dimmed.',
			ja: 'ハンバーガーメニューボタンで開き、左か右からすべり出るドロワーに入れて表示する。メニュー以外の部分は半透明の黒で覆う。'
		},
		{
			en: 'Rows are tall enough to tap. A link goes to its page; a group shows the links under it.',
			ja: '行はタップしやすい高さになっている。リンクはそのページへ移り、まとまりはその下のリンクを見せる。'
		},
		{
			en: 'This demo is the accordion type: each group is a `<details>` element, so the browser opens and closes it and tells screen readers whether it is open.',
			ja: 'このデモはアコーディオンタイプで、まとまりはそれぞれ `<details>` 要素にしている。開閉と、開いているかどうかの読み上げはブラウザが受け持つ。'
		},
		{
			en: 'In this demo, links end with › and groups end with + or −, so the two kinds of rows look clearly different.',
			ja: 'このデモでは、リンクの行の端に ›、まとまりの行の端に + か − を付け、2種類の行の見た目をはっきり分けている。'
		},
		{
			en: 'In this demo, only the menu itself is shown, without the hamburger menu button and the drawer. Choosing a link shows where it would go instead of leaving the page.',
			ja: 'このデモでは、ハンバーガーメニューボタンとドロワーを省き、メニューの中身だけを見せる。リンクを選ぶと、ページを移らずに行き先を表示する。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'On a group, opens or closes it. Enter on a link goes to its page.',
				ja: 'まとまりではそれを開閉する。リンクで Enter を押すと、そのページへ移る。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves through the links and groups. Links inside a closed group are skipped.',
				ja: 'リンクとまとまりを順に移動する。閉じているまとまりの中のリンクは飛ばす。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Standard (sliding) type', ja: 'スタンダードタイプ（スライド型）' },
			description: {
				en: 'Choosing a group slides in a second list with a Back button at the top. Suits menus with a second level or many items.',
				ja: 'まとまりを選ぶと、上に戻るボタンを置いた第二階層の一覧がすべって出る。第二階層がある場合や、項目が多い場合に向く。'
			}
		},
		{
			name: { en: 'Accordion type', ja: 'アコーディオンタイプ' },
			description: {
				en: 'Each group opens in place to show its links, as in this demo.',
				ja: 'このデモのように、まとまりをその場で開いて中のリンクを見せる。'
			}
		},
		{
			name: { en: 'Right or left', ja: '右タイプ・左タイプ' },
			description: {
				en: 'The menu opens over the page from the right or left edge of the screen.',
				ja: '画面の右端か左端から、ページの上に重ねて開く。'
			}
		}
	],
	usage: [
		{
			en: 'Phone layouts often leave out related links from the content, so some pages can be reached only from the mobile menu. Include every page people need to reach.',
			ja: 'スマートフォンの画面では本文から関連リンクが省かれることが多く、モバイルメニューからしか行けないページが出る。利用者が行く必要のあるページをすべて含める。'
		},
		{
			en: 'Do not nest the menu deeper than two levels.',
			ja: 'メニューの階層は第二階層より深くしない。'
		},
		{
			en: 'Avoid mixing icons that mark links with icons that mark groups. If both are needed, make their shapes clearly different, as in this demo.',
			ja: 'リンクを示すアイコンと、まとまりを示すアイコンを混ぜるのはできるだけ避ける。どうしても混ぜるなら、このデモのように形をはっきり変える。'
		},
		{
			en: 'Separate sections with bold section names. Put a divider between sections whose content differs a lot, and add a section icon as a supporting cue when the sections need to stand out more.',
			ja: 'セクションは太字のセクション名で分ける。内容が大きく違うセクションの間には区切り線を入れ、セクションをさらにはっきり見せたいときは、セクションアイコンを補助として足す。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Mixing the sliding type and the accordion type in one menu',
				ja: '1つのメニューにスライド型とアコーディオン型を混ぜる'
			},
			harm: {
				en: 'People have to deal with two different ways of opening groups, which makes the menu complicated to use.',
				ja: 'まとまりの開き方が2通りになり、利用者にとって操作が複雑になる。'
			},
			instead: {
				en: 'Choose one type for the whole menu. Use the sliding type when there is a second level or many items.',
				ja: 'メニュー全体でどちらか一方の型にする。第二階層がある場合や項目が多い場合は、スライド型にする。'
			}
		},
		{
			pattern: {
				en: 'Telling links and groups apart only by the direction of the same chevron, such as › for links and ⌄ for groups',
				ja: 'リンクは ›、まとまりは ⌄ のように、同じシェブロンの向きの違いだけでリンクとまとまりを見分けさせる'
			},
			harm: {
				en: 'It takes extra mental effort to see at a glance which rows go to a page and which open a group.',
				ja: 'どの行がページへ移り、どの行がまとまりを開くのかを一目で見分けるのに、頭の負担がかかる。'
			},
			instead: {
				en: 'Use clearly different icons, such as › for links and + / − for groups, and use the same icon for the same behavior across the site.',
				ja: 'リンクは ›、まとまりは + / − のように、はっきり違うアイコンを使う。サイトの中では、同じ動きには同じアイコンを使い続ける。'
			}
		}
	],
	related: [
		{
			id: 'hamburger-menu',
			diff: {
				en: 'A mobile menu is the list of links; the hamburger menu button is the button that opens it.',
				ja: 'モバイルメニューはリンクの一覧で、ハンバーガーメニューボタンはそれを開くボタン。'
			}
		},
		{
			id: 'drawer',
			diff: {
				en: 'A mobile menu is the navigation inside; a drawer is the panel that holds it and slides in from the edge.',
				ja: 'モバイルメニューは中に入るナビゲーションで、ドロワーはそれを入れて端からすべり出るパネル。'
			}
		}
	],
	sources: [
		{
			label: 'デジタル庁デザインシステムウェブサイト「モバイルメニュー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/mobile-menu/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「モバイルメニュー（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/mobile-menu/usage/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
