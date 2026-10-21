import type { ComponentData } from '#lib/types.js';

export default {
	id: 'skip-link',
	category: 'navigation',
	names: { en: 'Skip link', ja: 'スキップリンク' },
	aliases: [
		{ name: 'Skip link', source: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk/components/skip-link/' }
	],
	summary: {
		en: 'A link at the very start of a page that lets keyboard users jump past the header and navigation to the main content.',
		ja: 'ページの最初に置くリンク。キーボードの利用者がヘッダーやナビゲーションを飛ばして、本文へ移れるようにする。'
	},
	appearance: {
		en: 'Usually nothing is visible. When the first Tab reaches it, a link such as “Skip to main content” appears in the top left corner of the page.',
		ja: 'ふだんは何も見えない。最初の Tab キーでフォーカスが来ると、「本文へ移動」のようなリンクがページの左上に現れる。'
	},
	behavior: [
		{
			en: 'It is the first thing Tab reaches on the page. Following it moves focus to the main content, so the next Tab continues from there instead of going through every link in the header.',
			ja: 'ページの中で、Tab キーで最初にフォーカスが来る。たどると本文へフォーカスが移り、次の Tab キーはヘッダーのリンクを順にたどらず、本文から先へ進む。'
		},
		{
			en: 'It is hidden by moving it off screen, not with `display: none` or the `hidden` attribute, so it stays in the keyboard order and is shown when it gets focus.',
			ja: '`display: none` や `hidden` 属性ではなく画面の外へ動かして隠すので、キーボードの順番に残り、フォーカスが来たときに表示される。'
		},
		{
			en: 'The target, such as `<main>`, has `tabindex="-1"`, so it can take focus from the link even though it is not a control.',
			ja: '移り先の `<main>` などには `tabindex="-1"` を付け、操作する要素でなくてもリンクからフォーカスを受けられるようにする。'
		},
		{
			en: 'The “Skip to content” link at the top of this page is this component. Press Tab right after the page loads to see it.',
			ja: 'このページの先頭にある「本文へ移動」がこの部品。ページを開いてすぐに Tab キーを押すと現れる。'
		},
		{
			en: 'In this demo, the skip link belongs to the small page in the box and moves focus to that page’s main content, not to the main content of this site. In the thumbnail on the list page, it is shown as it looks with focus.',
			ja: 'このデモでは、スキップリンクは枠の中の小さなページのもので、このサイトの本文ではなく、そのページの本文へフォーカスを移す。一覧ページのサムネイルでは、フォーカスが来たときの見た目で表示している。'
		}
	],
	keyboard: [
		{
			key: 'Tab',
			action: {
				en: 'The first press shows the skip link and moves focus to it.',
				ja: '最初に押すと、スキップリンクが現れてフォーカスが移る。'
			}
		},
		{
			key: 'Enter',
			action: {
				en: 'Moves focus to the main content.',
				ja: '本文へフォーカスを移す。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Always visible', ja: '常に表示' },
			description: {
				en: 'A skip link that is always shown as ordinary text at the top of the page. It is the easiest to build and sighted keyboard users can see it, but some designers avoid it because it can look out of place to people who do not need it.',
				ja: 'ページの上部に、ふつうの文字のリンクとして常に表示しておくもの。いちばん簡単に作れ、画面を見ながらキーボードを使う人にも見えるが、必要のない人には目障りだとして避けるデザイナーもいる。'
			}
		}
	],
	usage: [
		{
			en: 'Put it on pages that repeat blocks such as a header or navigation. Screen reader users then do not have to hear the same header on every page, and keyboard users reach the content with far fewer keystrokes.',
			ja: 'ヘッダーやナビゲーションのように、ページごとに繰り返す部分があるページに置く。スクリーンリーダーの利用者はページごとに同じヘッダーを聞かずに済み、キーボードの利用者ははるかに少ないキー操作で本文に届く。'
		},
		{
			en: 'Word it by where it goes, such as “Skip to main content”, rather than by what it skips.',
			ja: '何を飛ばすかではなく、「本文へ移動」のように行き先を表す文言にする。'
		},
		{
			en: 'One link is usually enough. Each extra skip link adds clutter.',
			ja: 'たいていは1つで足りる。増やすほど、リンクがごちゃごちゃする。'
		},
		{
			en: 'Do not put it inside a `<nav>` or inside the header. Place it right after the opening `<body>` tag, or right after a cookie banner if there is one.',
			ja: '`<nav>` やヘッダーの中には入れない。`<body>` の開始タグの直後、Cookie のバナーがあればその直後に置く。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Hiding the skip link with `display: none` or the `hidden` attribute',
				ja: 'スキップリンクを `display: none` や `hidden` 属性で隠す'
			},
			harm: {
				en: 'The link is removed from keyboard navigation, so no one can use it.',
				ja: 'リンクがキーボードの操作の順番から外れ、だれも使えなくなる。'
			},
			instead: {
				en: 'Move it off screen with CSS, and bring it back on screen when it gets focus.',
				ja: 'CSS で画面の外へ動かし、フォーカスが来たら画面の中に戻す。'
			}
		},
		{
			pattern: {
				en: 'Placing the skip link after other links, such as the logo or the menu',
				ja: 'ロゴやメニューなど、ほかのリンクより後ろにスキップリンクを置く'
			},
			harm: {
				en: 'Screen reader and keyboard users may not realize that there is a skip link.',
				ja: 'スクリーンリーダーやキーボードの利用者が、スキップリンクがあることに気づかないことがある。'
			},
			instead: {
				en: 'Make it the first thing on the page that Tab reaches and screen readers read.',
				ja: 'ページの中で、Tab キーで最初にフォーカスが来て、スクリーンリーダーが最初に読む要素にする。'
			}
		}
	],
	related: [
		{
			id: 'link',
			diff: {
				en: 'A skip link is a link to a place on the same page that usually stays hidden until it gets focus; an ordinary link is always visible.',
				ja: 'スキップリンクは同じページの中の場所へのリンクで、多くはフォーカスが来るまで隠れている。ふつうのリンクは常に見えている。'
			}
		},
		{
			id: 'back-to-top',
			diff: {
				en: 'A skip link at the very top jumps past the header to the main content; a back to top button returns to the top after reading.',
				ja: 'スキップリンクはページの先頭からヘッダーを飛ばして本文へ移り、スクロールトップボタンは読み進めたあとに先頭へ戻る。'
			}
		}
	],
	sources: [
		{
			label: 'Understanding Success Criterion 2.4.1: Bypass Blocks (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html',
			checkedAt: '2026-10-22'
		},
		{
			label: 'WebAIM: Skip Navigation Links',
			url: 'https://webaim.org/techniques/skipnav/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'GOV.UK Design System: Skip link',
			url: 'https://design-system.service.gov.uk/components/skip-link/',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
