import type { ComponentData } from '#lib/types.js';

export default {
	id: 'language-selector',
	category: 'navigation',
	names: { en: 'Language selector', ja: 'ランゲージセレクター' },
	aliases: [
		{ name: 'ランゲージセレクター', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/language-selector/' }
	],
	summary: {
		en: 'A control that lets people choose the language in which the site is shown.',
		ja: 'サイトを表示する言語を、利用者が選べるようにする部品です。'
	},
	appearance: {
		en: 'A button with a globe icon in a top corner of the site. Pressing it opens a list of languages, each written in its own language, with a check mark next to the current one.',
		ja: 'サイトの上部の隅にある、地球のアイコンが付いたボタンです。押すと言語の一覧が開き、それぞれの言語名はその言語で書かれ、今の言語にはチェックの印が付きます。'
	},
	behavior: [
		{
			en: 'The button is a `<button>` with `aria-expanded` that opens and closes the list (the APG Disclosure pattern). Each language is a link to the same page in that language, so Tab moves through them.',
			ja: 'ボタンは一覧を開閉する `aria-expanded` 付きの `<button>` です（APG の Disclosure パターン）。言語はそれぞれ、同じページのその言語版へのリンクなので、Tab キーで順に移ります。'
		},
		{
			en: 'Each link has `lang` and `hreflang` for its language, so screen readers read the language name in that language. The current language has `aria-current="true"` as well as the check mark and bold text.',
			ja: '各リンクには、その言語の `lang` と `hreflang` を付け、スクリーンリーダーが言語名をその言語で読めるようにします。今の言語には、チェックの印と太字に加えて `aria-current="true"` を付けます。'
		},
		{
			en: 'Esc closes the list and returns focus to the button. Moving focus out of it or clicking outside it also closes the list.',
			ja: 'Esc で一覧を閉じ、ボタンにフォーカスを戻します。外へフォーカスを移したり、外側をクリックしたりしても閉じます。'
		},
		{
			en: 'The language switch in the header of this site is this component. It shows the name of the current language instead of “Language”, and hides the name on narrow screens.',
			ja: 'このサイトのヘッダーにある言語の切り替えがこの部品です。ボタンには「Language」の代わりに今の言語の名前を出し、狭い画面では名前を隠しています。'
		},
		{
			en: 'In this demo, choosing a language changes the small page in the box instead of moving to another page, then closes the list and returns focus to the button. Moving between the languages with ↑ / ↓ and Home / End is optional in the APG disclosure navigation example, and this demo leaves it out, like the switch in this site’s header.',
			ja: 'このデモでは、言語を選ぶと別のページへは移らず、枠の中の小さなページの言語が変わり、一覧を閉じてボタンにフォーカスを戻します。↑ / ↓ と Home / End で言語の間を移る機能は APG の Disclosure ナビゲーションの例では任意とされており、このデモではこのサイトのヘッダーの切り替えと同じく省いています。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'On the button, opens or closes the list. Enter on a language switches to it.',
				ja: 'ボタンでは一覧を開閉します。言語で Enter を押すと、その言語に切り替わります。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves from the button into the open list and through the languages.',
				ja: 'ボタンから開いている一覧へ進み、言語を順に移ります。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the list and returns focus to the button.',
				ja: '一覧を閉じ、ボタンにフォーカスを戻します。'
			}
		}
	],
	variations: [
		{
			name: { en: 'In the hamburger menu', ja: 'ハンバーガーメニューの中' },
			description: {
				en: 'On phones and in layouts that use a hamburger menu, the languages are listed as items in that menu instead.',
				ja: 'スマートフォンや、ハンバーガーメニューを使うレイアウトでは、言語をそのメニューの項目として並べます。'
			}
		},
		{
			name: { en: 'Links on the page', ja: 'ページに並べたリンク' },
			description: {
				en: 'When a site has only a few languages, links to each of them placed directly on the page, so people can see them right away without opening anything.',
				ja: '言語の数が少ないサイトで、各言語へのリンクをページに直接並べるものです。何も開かずに、すぐ見つけられます。'
			}
		}
	],
	usage: [
		{
			en: 'Place it in the top left or top right corner on wide screens.',
			ja: '広い画面では、画面の左上か右上の隅に置きます。'
		},
		{
			en: 'Write each language name in that language, such as “français” rather than “French”.',
			ja: '言語名は、「フランス語」ではなく「français」のように、それぞれの言語で書きます。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Labeling the selector only with words in one language, such as “Select language”',
				ja: '言語を選ぶ部品のラベルを、「言語を選択」のような1つの言語の言葉だけにする'
			},
			harm: {
				en: 'People who do not read that language cannot tell that this is where to change the language.',
				ja: 'その言語を読めない人には、ここで言語を変えられることが分かりません。'
			},
			instead: {
				en: 'Add an icon that does not depend on one language, such as a globe. The Digital Agency Design System puts a globe icon on the button and labels it “Language” in English, whatever the current language.',
				ja: '地球のような、特定の言語に頼らないアイコンを添えます。デジタル庁デザインシステムは、ボタンに地球のアイコンを付け、ラベルを今の言語にかかわらず英語の「Language」にしています。'
			}
		},
		{
			pattern: {
				en: 'Moving to the other language as soon as an option is chosen in a `<select>`',
				ja: '`<select>` で選択肢を選んだとたんに、その言語のページへ移る'
			},
			harm: {
				en: 'People with visual or cognitive disabilities may not notice that the page has changed, or may be thrown off by the change.',
				ja: '視覚や認知に障害のある人は、ページが変わったことに気づけなかったり、変化に戸惑ったりします。'
			},
			instead: {
				en: 'Use links to each language, or put a button next to the `<select>` that moves to the chosen language when pressed.',
				ja: '各言語へのリンクにします。`<select>` を使うなら横にボタンを置き、そのボタンを押したら選んだ言語へ移るようにします。'
			}
		}
	],
	related: [
		{
			id: 'select',
			diff: {
				en: 'A language selector lists links to each language’s version of the page; a select keeps the chosen option as a form value.',
				ja: 'ランゲージセレクターはページの各言語版へのリンクを並べ、セレクトボックスは選んだ選択肢をフォームの値として保持します。'
			}
		},
		{
			id: 'menu',
			diff: {
				en: 'A language selector lists links to the same page in other languages; a menu lists actions to run on the current page.',
				ja: 'ランゲージセレクターは同じページの別の言語版へのリンクを並べ、メニューは今のページで実行する操作を並べます。'
			}
		}
	],
	sources: [
		{
			label: 'デジタル庁デザインシステムウェブサイト「ランゲージセレクター」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/language-selector/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ランゲージセレクター（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/language-selector/usage/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: language-selector',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/language-selector',
			checkedAt: '2026-10-22'
		},
		{
			label: 'W3C Internationalization: Using select to link to localized content',
			url: 'https://www.w3.org/International/questions/qa-navigation-select',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Understanding Success Criterion 3.2.2: On Input (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/on-input.html',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Understanding Success Criterion 3.1.2: Language of Parts (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html',
			checkedAt: '2026-10-22'
		},
		{
			label: 'WAI-ARIA APG: Example Disclosure Navigation Menu',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
