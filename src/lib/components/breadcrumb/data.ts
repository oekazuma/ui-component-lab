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
		en: 'Page names separated by “/” or “>”, usually above the page title. A long trail wraps onto more lines. The last name is the current page, shown as plain text rather than a link.',
		ja: '「/」や「>」で区切ったページ名が並び、多くはページタイトルの上にある。長いときは複数行に折り返す。最後の名前は今のページで、リンクではなくただの文字で表示される。'
	},
	behavior: [
		{
			en: 'Each name links to that level of the site; the last one is the current page.',
			ja: 'それぞれの名前はその階層のページへのリンクで、最後の名前は今いるページを示す。'
		},
		{
			en: 'The current page is a `<span>` with `aria-current="page"`, not a link. A link to the page you are already on does nothing when followed, so this demo follows the Digital Agency Design System and Nielsen Norman Group. APG also allows a link with `aria-current="page"`, and says `aria-current` is optional when the current page is not a link; this demo keeps it so screen readers announce the current page.',
			ja: '今のページは、リンクではなく `aria-current="page"` を付けた `<span>` にする。今いるページへのリンクはたどっても何も起きないため、このデモはデジタル庁デザインシステムと Nielsen Norman Group に合わせている。APG は `aria-current="page"` を付けたリンクも認め、今のページがリンクでなければ `aria-current` は任意としている。このデモでは、スクリーンリーダーが今のページと読み上げるよう付けている。'
		},
		{
			en: 'In this demo the links do not navigate; they show where they would go.',
			ja: 'このデモのリンクは移動せず、移動先を表示するだけにしている。'
		}
	],
	keyboard: [
		{
			key: 'Tab',
			action: {
				en: 'Moves between the links. The current page is not a link, so focus skips it.',
				ja: 'リンク間を移動する。今のページはリンクではないので、フォーカスは止まらない。'
			}
		},
		{ key: 'Enter', action: { en: 'Follows the focused link.', ja: 'フォーカス中のリンク先へ移動する。' } }
	],
	usage: [
		{
			en: 'Place it between the header and the page heading.',
			ja: 'ヘッダーとページの見出しの間に置く。'
		},
		{
			en: 'Page names cannot be kept short, so let the trail wrap when it is wider than the content area, also on narrow screens. The Digital Agency Design System allows a single line that scrolls sideways on phones when many pages have long trails, so the breadcrumb does not push the content down; in that case, also put a wrapping breadcrumb at the bottom of the page, above the footer.',
			ja: 'ページ名の長さは制御できないので、コンテンツの幅を超えたら折り返す。狭い画面でも同じ。デジタル庁デザインシステムは、長いパンくずリストになるページが多いときに限り、コンテンツを押し下げないようスマートフォンで折り返さず横にスクロールさせる形も認めている。その場合は、ページ下部のフッターの上にも折り返すパンくずリストを置く。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Listing the pages the user visited, in the order visited',
				ja: '利用者が見てきたページを、見た順に並べる'
			},
			harm: {
				en: 'The trail grows long, repetitive and confusing, and it does nothing for people who land on a deep page directly from an outside link.',
				ja: '並びが長く重複が多くなって分かりにくく、外部のリンクから深い階層のページに直接来た人には何の手がかりにもならない。'
			},
			instead: {
				en: 'Show where the current page sits in the site’s hierarchy. Leave going back through history to the browser’s Back button.',
				ja: 'サイトの階層の中で今のページがどこにあるかを示す。たどってきた順に戻る操作は、ブラウザの「戻る」に任せる。'
			}
		},
		{
			pattern: {
				en: 'Using a breadcrumb in place of the global or section navigation',
				ja: 'グローバルナビゲーションやセクション内のナビゲーションの代わりに、パンくずリストだけを置く'
			},
			harm: {
				en: 'Users lose easy access to the other pages in the same section.',
				ja: '利用者が、同じセクションのほかのページへ移りにくくなる。'
			},
			instead: {
				en: 'Keep the global and section navigation, and add the breadcrumb alongside them.',
				ja: 'グローバルナビゲーションやセクション内のナビゲーションは残し、パンくずリストはそれに添えて置く。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Breadcrumb Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「パンくずナビゲーション」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/breadcrumb/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「パンくずナビゲーション（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/breadcrumb/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: breadcrumb',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/breadcrumb',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Nielsen Norman Group: Breadcrumbs: 11 Design Guidelines for Desktop and Mobile',
			url: 'https://www.nngroup.com/articles/breadcrumbs/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
