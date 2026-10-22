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
		ja: '今のページの上の階層にあるページへのリンクを、階層順に並べたものです。'
	},
	appearance: {
		en: 'Page names separated by “/” or “>”, usually above the page title. A long trail wraps onto more lines. The last name is the current page, shown as plain text rather than a link.',
		ja: '「/」や「>」で区切ったページ名が並び、多くはページタイトルの上にあります。長いときは複数行に折り返します。最後の名前は今のページで、リンクではなくただの文字で表示されます。'
	},
	behavior: [
		{
			en: 'Each name links to that level of the site; the last one is the current page.',
			ja: 'それぞれの名前はその階層のページへのリンクで、最後の名前は今いるページを示します。'
		},
		{
			en: 'The current page is a `<span>` with `aria-current="page"`, not a link, because a link to the page you are already on does nothing when followed. Nielsen Norman Group and the Digital Agency Design System also show it as plain text, and GOV.UK leaves the current page out, ending the trail at its parent. APG also allows a link with `aria-current="page"`, and says `aria-current` is optional when the current page is not a link; this demo keeps it so screen readers announce the current page.',
			ja: '今いるページへのリンクはたどっても何も起きないので、今のページはリンクにせず、`aria-current="page"` を付けた `<span>` にします。Nielsen Norman Group とデジタル庁デザインシステムもただの文字で示し、GOV.UK は今のページを載せず、1つ上の階層で終えます。APG は `aria-current="page"` を付けたリンクも認め、今のページがリンクでなければ `aria-current` は任意としています。このデモでは、スクリーンリーダーが今のページと読み上げるよう付けています。'
		},
		{
			en: 'In this demo the links do not navigate; they show where they would go.',
			ja: 'このデモのリンクは移動せず、移動先を表示するだけにしています。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between the links. The current page is not a link, so focus skips it.',
				ja: 'リンク間を移動します。今のページはリンクではないので、フォーカスは止まりません。'
			}
		},
		{ key: 'Enter', action: { en: 'Follows the focused link.', ja: 'フォーカス中のリンク先へ移動します。' } }
	],
	usage: [
		{
			en: 'Place it between the header and the page heading.',
			ja: 'ヘッダーとページの見出しの間に置きます。'
		},
		{
			en: 'Page names cannot be kept short, so let the trail wrap when it is wider than the content area, also on narrow screens. The Digital Agency Design System allows a single line that scrolls sideways on phones when many pages have long trails, so the breadcrumb does not push the content down; in that case, also put a wrapping breadcrumb at the bottom of the page, above the footer. Nielsen Norman Group instead advises against trails that wrap, and suggests showing only the last level or two on phones. GOV.UK can show only the first and last items of a long trail on phones.',
			ja: 'ページ名の長さは制御できないので、コンテンツの幅を超えたら折り返します。狭い画面でも同じです。デジタル庁デザインシステムは、長いパンくずリストになるページが多いときに限り、コンテンツを押し下げないようスマートフォンで折り返さず横にスクロールさせる形も認めています。その場合は、ページ下部のフッターの上にも折り返すパンくずリストを置きます。一方 Nielsen Norman Group は複数行に折り返すパンくずリストを避け、スマートフォンでは最後の1〜2階層だけを見せる方法を挙げています。GOV.UK には、長いパンくずリストをスマートフォンで最初と最後の項目だけにする形があります。'
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
				ja: '並びが長く重複が多くなって分かりにくく、外部のリンクから深い階層のページに直接来た人には何の手がかりにもなりません。'
			},
			instead: {
				en: 'Show where the current page sits in the site’s hierarchy. Leave going back through history to the browser’s Back button.',
				ja: 'サイトの階層の中で今のページがどこにあるかを示します。たどってきた順に戻る操作は、ブラウザの「戻る」に任せます。'
			}
		},
		{
			pattern: {
				en: 'Using a breadcrumb in place of the global or section navigation',
				ja: 'グローバルナビゲーションやセクション内のナビゲーションの代わりに、パンくずリストだけを置く'
			},
			harm: {
				en: 'Users lose easy access to the other pages in the same section.',
				ja: '利用者が同じセクションのほかのページへ移りにくくなります。'
			},
			instead: {
				en: 'Keep the global and section navigation, and add the breadcrumb alongside them.',
				ja: 'グローバルナビゲーションやセクション内のナビゲーションは残し、パンくずリストはそれに添えて置きます。'
			}
		}
	],
	related: [
		{
			id: 'table-of-contents',
			diff: {
				en: 'A breadcrumb shows where the page sits among the pages of the site; a table of contents lists the sections within one page.',
				ja: 'パンくずリストはサイトの階層の中で今のページの位置を示し、目次は1つのページの中の節を並べます。'
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
			label: 'GOV.UK Design System: Breadcrumbs',
			url: 'https://design-system.service.gov.uk/components/breadcrumbs/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Nielsen Norman Group: Breadcrumbs: 11 Design Guidelines for Desktop and Mobile',
			url: 'https://www.nngroup.com/articles/breadcrumbs/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
