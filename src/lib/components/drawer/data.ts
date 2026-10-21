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
		ja: '画面の端からページの上にすべり出てくるパネル。'
	},
	appearance: {
		en: 'A tall panel along the left or right edge (sometimes the top or bottom), with the rest of the page dimmed behind it.',
		ja: '左右どちらか（上下のこともある）の端に沿った縦長のパネルで、後ろのページは暗くなる。'
	},
	behavior: [
		{
			en: 'Opened from a button, often a menu or filter icon.',
			ja: 'メニューや絞り込みのアイコンなど、ボタンから開く。'
		},
		{
			en: 'While open, the page behind cannot be used; Esc or the close button closes it and focus returns to the button.',
			ja: '開いている間は後ろのページを操作できない。Esc か閉じるボタンで閉じ、フォーカスは開いたボタンに戻る。'
		},
		{
			en: 'Used for navigation menus, filters, or a shopping cart.',
			ja: 'ナビゲーションメニュー、絞り込み、カートなどに使う。'
		},
		{
			en: 'This demo is a native modal <dialog> styled to sit at the right edge.',
			ja: 'このデモはネイティブのモーダル <dialog> を右端に寄せたもの。'
		}
	],
	keyboard: [
		{ key: 'Enter / Space', action: { en: 'Opens the drawer from the button.', ja: 'ボタンからドロワーを開く。' } },
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between the controls inside the drawer.',
				ja: 'ドロワー内の操作できる要素の間を移動する。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the drawer and returns focus to the button.',
				ja: 'ドロワーを閉じ、ボタンにフォーカスを戻す。'
			}
		}
	],
	usage: [
		{
			en: 'Open it from a trigger such as a menu button, cover the page with an overlay, and include a close button.',
			ja: 'メニューボタンなどから開き、背後にオーバーレイを敷き、閉じるボタンを付ける。'
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
				ja: 'ナビゲーションが見えている場合より、利用者がコンテンツを見つけにくくなり、作業に時間がかかり、使いにくいと感じる。この差はデスクトップで特に大きい。'
			},
			instead: {
				en: 'On desktop, show the top-level links across the top or down the side of the page. On phones, show up to four top-level links directly; if there are more, put the rest in the drawer and add links to important pages within the page.',
				ja: 'デスクトップでは、最上位のリンクをページの上部か横に並べて見せる。スマートフォンでは最上位のリンクが4つまでなら直接見せ、それより多いときは残りをドロワーに入れ、重要なページへのリンクをページ内にも置く。'
			}
		}
	],
	related: [
		{
			id: 'modal',
			diff: {
				en: 'A drawer slides in from an edge and is often tall; a modal dialog appears in the middle of the screen.',
				ja: 'ドロワーは端からすべり出る縦長のパネルで、モーダルは画面の中央に出る。'
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
			label: 'Nielsen Norman Group: Hamburger Menus and Hidden Navigation Hurt UX Metrics',
			url: 'https://www.nngroup.com/articles/hamburger-menus/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
