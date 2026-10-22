import type { ComponentData } from '#lib/types.js';

export default {
	id: 'table-of-contents',
	category: 'navigation',
	names: { en: 'Table of contents', ja: '目次' },
	aliases: [{ name: '目次', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/toc/' }],
	summary: {
		en: 'A list of links to the headings of a long page, showing how the page is organized and jumping to a section.',
		ja: '長いページの見出しへのリンクを並べたものです。ページの構成を示し、目当ての節へ移れるようにします。'
	},
	appearance: {
		en: 'A titled list of the page’s headings, at the start of the page or in a column beside the text. Lower levels are indented as nested lists. Some mark the section being read in bold or in the accent color.',
		ja: 'タイトルの付いた、ページの見出しの一覧です。ページの冒頭か、本文の横の列に置きます。下の階層は入れ子のリストで字下げします。今読んでいる節を太字やアクセントカラーで示すものもあります。'
	},
	behavior: [
		{
			en: 'Each item is a link to a heading on the same page. Following it moves to that section, and the next Tab continues from there.',
			ja: '項目はそれぞれ、同じページの見出しへのリンクです。たどるとその節へ移り、次に Tab キーを押すとそこから先へ進みます。'
		},
		{
			en: 'It is a `<nav>` named by its title with `aria-labelledby`, so screen reader users can find it among the landmarks.',
			ja: 'タイトルを `aria-labelledby` で名前にした `<nav>` なので、スクリーンリーダーの利用者はランドマークの一覧から見つけられます。'
		},
		{
			en: 'When it marks the section being read, the link has `aria-current="location"` as well as the bold text and color.',
			ja: '今読んでいる節を示すときは、太字と色に加えて、そのリンクに `aria-current="location"` を付けます。'
		},
		{
			en: 'The table of contents on the right of this page (under the demo on phones) is this component. It marks the section being read.',
			ja: 'このページの右側（スマートフォンではデモの下）にある「このページの内容」がこの部品です。今読んでいる節を示します。'
		},
		{
			en: 'In this demo, the article scrolls inside its own box so the page stays still. A link scrolls the box to its heading and moves focus there, and the section at the top of the box, or the last one once the box reaches its end, is marked as current.',
			ja: 'このデモでは、ページを動かさないよう、記事を専用の枠の中でスクロールさせます。リンクを押すと枠がその見出しまでスクロールしてフォーカスが移り、枠の上端にある節（枠の終わりまで来たら最後の節）を今の節として示します。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves between the links.', ja: 'リンク間を移動します。' } },
		{
			key: 'Enter',
			action: {
				en: 'Moves to the section of the focused link.',
				ja: 'フォーカス中のリンクの節へ移ります。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Nested', ja: '入れ子' },
			description: {
				en: 'Lists the lower heading levels under their parents as nested lists. The parent items can also be links.',
				ja: '下の階層の見出しを、親の項目の下に入れ子のリストで並べるものです。親の項目もリンクにできます。'
			}
		},
		{
			name: { en: 'Sticky beside the text', ja: '本文の横に固定' },
			description: {
				en: 'Stays in view in a column beside the text while the page scrolls, and marks the section being read, like the table of contents on this page.',
				ja: 'このページの目次のように、ページをスクロールしても本文の横の列に見えたまま残り、今読んでいる節を示すものです。'
			}
		}
	],
	usage: [
		{
			en: 'Use it on long pages, to show the structure before people start reading and to let them jump to a section.',
			ja: '長いページで、読み始める前に全体の構成を示し、目当ての節へすぐ移れるようにするために使います。'
		},
		{
			en: 'Keep the title, such as “Contents”, so people can tell that the list is a table of contents.',
			ja: '目次だと分かるよう、「このページの目次」のようなタイトルを残します。'
		},
		{
			en: 'If there are several on one page, give each title its own `id` so the `aria-labelledby` values do not clash.',
			ja: '1つのページに複数置くときは、`aria-labelledby` が重ならないよう、タイトルにそれぞれ別の `id` を付けます。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Wording the items differently from the headings they link to',
				ja: '項目を、リンク先の見出しと違う文言にする'
			},
			harm: {
				en: 'When the label in the table of contents does not match the heading, people cannot find the place they were looking for.',
				ja: '目次の項目と見出しの文言が一致していないと、利用者は目当ての場所を見つけられなくなります。'
			},
			instead: {
				en: 'Use the text of each heading as it is.',
				ja: '見出しの文言をそのまま項目にします。'
			}
		},
		{
			pattern: {
				en: 'Listing every heading level of a deeply structured page',
				ja: '見出しの階層が深いページで、すべての階層の見出しを並べる'
			},
			harm: {
				en: 'The list grows so long that it becomes harder to read, not easier.',
				ja: '項目が多くなりすぎて、かえって見づらくなります。'
			},
			instead: {
				en: 'When the heading structure is deep, include only the levels people need.',
				ja: '見出しの階層が深いときは、目次に含める階層を必要なものに絞ります。'
			}
		}
	],
	related: [
		{
			id: 'breadcrumb',
			diff: {
				en: 'A table of contents lists the sections within one page; a breadcrumb shows where the page sits among the pages of the site.',
				ja: '目次は1つのページの中の節を並べ、パンくずリストはサイトのページの階層の中で今のページの位置を示します。'
			}
		},
		{
			id: 'tabs',
			diff: {
				en: 'A table of contents links to sections that are all on the page at once; tabs show one panel at a time and hide the others.',
				ja: '目次はすべてが同時にページにある節へのリンクで、タブはパネルを1つずつ見せてほかを隠します。'
			}
		}
	],
	sources: [
		{
			label: 'デジタル庁デザインシステムウェブサイト「目次」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/toc/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: toc',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/toc',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Nielsen Norman Group: Table of Contents: The Ultimate Design Guide',
			url: 'https://www.nngroup.com/articles/table-of-contents/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: <nav>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: aria-current',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
