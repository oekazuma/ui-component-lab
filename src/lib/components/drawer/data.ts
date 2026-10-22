import type { ComponentData } from '#lib/types.js';

export default {
	id: 'drawer',
	category: 'overlay',
	names: { en: 'Drawer', ja: 'ドロワー' },
	aliases: [
		{ name: 'Offcanvas', source: 'Bootstrap', url: 'https://getbootstrap.com/docs/5.3/components/offcanvas/' }
	],
	summary: {
		en: 'A panel that slides in from the edge of the screen, over the page.',
		ja: '画面の端からページの上にすべり出てくるパネルです。'
	},
	appearance: {
		en: 'A tall panel along the left or right edge (sometimes the top or bottom), with the rest of the page dimmed behind it.',
		ja: '左右どちらか（上下のこともある）の端に沿った縦長のパネルで、後ろのページは暗くなります。'
	},
	behavior: [
		{
			en: 'Opened from a button, often a menu or filter icon.',
			ja: 'メニューや絞り込みのアイコンなどのボタンから開きます。'
		},
		{
			en: 'While open, the page behind cannot be used; Esc or the close button closes it and focus returns to the button.',
			ja: '開いている間は後ろのページを操作できません。Esc か閉じるボタンで閉じ、フォーカスは開いたボタンに戻ります。'
		},
		{
			en: 'Used for navigation menus, filters, or a shopping cart.',
			ja: 'ナビゲーションメニュー、絞り込み、カートなどに使います。'
		},
		{
			en: 'This demo is a native modal `<dialog>` styled to sit at the right edge.',
			ja: 'このデモはネイティブのモーダル `<dialog>` を右端に寄せたものです。'
		},
		{
			en: 'In this demo, `closedby="any"` also closes the drawer when the dimmed background is clicked. Browsers that do not support `closedby` ignore it, and the drawer then closes only with the close button or Esc.',
			ja: 'このデモでは `closedby="any"` により、暗くした背景をクリックしても閉じます。`closedby` に対応していないブラウザはこれを無視し、閉じるボタンか Esc でしか閉じません。'
		},
		{
			en: 'In this demo, the choices take effect only when “Apply” is pressed, and the button that opens the drawer then shows how many filters are on. Closing it any other way drops the choices made since it opened.',
			ja: 'このデモでは、選んだ条件は「適用」を押したときに反映され、開くボタンに件数が出ます。ほかの方法で閉じると、開いてから選んだ内容は取り消されます。'
		}
	],
	keyboard: [
		{ key: 'Enter / Space', action: { en: 'Opens the drawer from the button.', ja: 'ボタンからドロワーを開きます。' } },
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between the controls inside the drawer.',
				ja: 'ドロワー内の操作できる要素の間を移動します。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the drawer without applying and returns focus to the button.',
				ja: '適用せずにドロワーを閉じ、ボタンにフォーカスを戻します。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Left or right', ja: '左・右' },
			description: {
				en: 'Slides in from the left or right edge over part of the page. This demo opens from the right.',
				ja: 'ページの左端か右端から、ページの一部に重ねて出ます。このデモは右から開きます。'
			}
		},
		{
			name: { en: 'Full screen', ja: '全面' },
			description: {
				en: 'Covers the whole screen instead of sliding in over part of it.',
				ja: 'ページの一部ではなく、画面全体を覆って出ます。'
			}
		}
	],
	usage: [
		{
			en: 'Open it from a trigger such as a menu button, cover the page with an overlay, and include a close button.',
			ja: 'メニューボタンなどから開き、背後にオーバーレイを敷き、閉じるボタンを付けます。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Hiding the main navigation in a drawer on desktop screens',
				ja: 'デスクトップの画面でも、主なナビゲーションをドロワーの中だけに隠す'
			},
			harm: {
				en: 'People find the site’s content less often, take longer to complete tasks, and find the site harder to use than when the navigation is visible; the drop is largest on desktop.',
				ja: 'ナビゲーションが見えている場合より、利用者がコンテンツを見つけにくくなり、作業に時間がかかり、使いにくいと感じます。この差はデスクトップで特に大きくなります。'
			},
			instead: {
				en: 'On desktop, show the top-level links across the top or down the side of the page. On phones, show up to four top-level links directly; if there are more, put the rest in the drawer and add links to important pages within the page.',
				ja: 'デスクトップでは、最上位のリンクをページの上部か横に並べて見せます。スマートフォンでは最上位のリンクが4つまでなら直接見せ、それより多いときは残りをドロワーに入れ、重要なページへのリンクをページ内にも置きます。'
			}
		}
	],
	related: [
		{
			id: 'modal',
			diff: {
				en: 'A drawer slides in from an edge and is often tall; a modal dialog appears in the middle of the screen.',
				ja: 'ドロワーは端からすべり出る縦長のパネルで、モーダルは画面の中央に出ます。'
			}
		},
		{
			id: 'hamburger-menu',
			diff: {
				en: 'A drawer is the panel that slides in from the edge; a hamburger menu button is the button that often opens it.',
				ja: 'ドロワーは端からすべり出るパネルで、ハンバーガーメニューボタンはそれを開くことが多いボタンです。'
			}
		},
		{
			id: 'mobile-menu',
			diff: {
				en: 'A drawer is the panel that slides in from the edge; a mobile menu is the navigation placed inside it.',
				ja: 'ドロワーは端からすべり出るパネルで、モバイルメニューはその中に入れるナビゲーションです。'
			}
		},
		{
			id: 'mega-menu',
			diff: {
				en: 'A drawer slides in from the edge of the screen and covers the page; a mega menu drops down under the horizontal menu on wide screens.',
				ja: 'ドロワーは画面の端からすべり出てページを覆い、メガメニューは広い画面で水平メニューの下に開きます。'
			}
		}
	],
	sources: [
		{
			label: 'Bootstrap: Offcanvas',
			url: 'https://getbootstrap.com/docs/5.3/components/offcanvas/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Dialog (Modal) Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ドロワー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/drawer/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ドロワー（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/drawer/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'MDN: <dialog> closedby',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Nielsen Norman Group: Hamburger Menus and Hidden Navigation Hurt UX Metrics',
			url: 'https://www.nngroup.com/articles/hamburger-menus/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
