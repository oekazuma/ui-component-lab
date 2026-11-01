import type { ComponentData } from '#lib/types.js';

export default {
	id: 'link',
	category: 'navigation',
	names: { en: 'Link', ja: 'リンク' },
	aliases: [],
	summary: {
		en: 'Text or an image that takes the user to another page or another place on the same page.',
		ja: '別のページや、同じページ内の別の場所へ移動するための文字や画像です。'
	},
	appearance: {
		en: 'Text in the accent color, usually underlined. It often changes color or underline on hover, and links already visited often have a different color.',
		ja: 'アクセントカラーの文字で、多くは下線が付きます。マウスを乗せると色や下線が変わることが多く、訪問済みのリンクは別の色になることが多いです。'
	},
	behavior: [
		{
			en: 'Clicking it opens the destination in the same tab.',
			ja: 'クリックすると、同じタブで移動先が開きます。'
		},
		{
			en: 'The browser also offers opening in a new tab, copying the address, and going back with history.',
			ja: '新しいタブで開く・アドレスをコピーする・履歴で戻るといった操作も、ブラウザが用意しています。'
		},
		{
			en: 'In this demo, the link in the sentence goes to the Button page of this site. The second link opens the Digital Agency’s page in a new tab with `target="_blank"`, and its icon has `role="img"` and an `aria-label` that says so. The third link opens this site’s preview image, with the file type and size in the link text.',
			ja: 'このデモでは、文中のリンクはこのサイトのボタンのページへ移動します。2つ目のリンクは `target="_blank"` でデジタル庁のページを新しいタブで開き、そのことをアイコンの `role="img"` と `aria-label` で伝えます。3つ目のリンクはこのサイトの紹介画像を開き、ファイルの形式と大きさをリンクの文言に含めています。'
		},
		{
			en: 'In this demo, hovering thickens the underline and changes the color, and visited links turn purple. The weight and size of the text stay the same, so the surrounding text does not move.',
			ja: 'このデモでは、マウスを乗せると下線が太くなって色が変わり、訪問済みのリンクは紫になります。文字の太さや大きさは変えないので、周りの文字は動きません。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves focus to the link.', ja: 'リンクにフォーカスを移します。' } },
		{ key: 'Enter', action: { en: 'Follows the link.', ja: 'リンク先へ移動します。' } }
	],
	usage: [
		{
			en: 'To move between pages, use links, such as a horizontal menu. Do not use ARIA tabs (`role="tab"`) for it, since tabs switch content in place.',
			ja: 'ページ間の移動にはリンク（水平メニューなど）を使います。ARIA のタブ（`role="tab"`）はその場で内容を切り替える部品なので、ページ間の移動には使いません。'
		},
		{
			en: 'Mark links that open a new tab or another site with an icon that has alternative text.',
			ja: '新しいタブや外部サイトで開くリンクには、代替テキスト付きのアイコンを付けます。'
		},
		{
			en: 'For links to files such as PDFs, put the file type and size in the link text, for example “Brochure (PDF, 100 KB)”.',
			ja: 'PDF などのファイルへのリンクには、「紹介パンフレット（PDF:100KB）」のように形式と大きさをリンクの文言に含めます。'
		},
		{
			en: 'Give visited links their own color so users can see which pages they have already opened, especially on pages with many links.',
			ja: '訪問済みのリンクには別の色を付け、すでに開いたページが分かるようにします。リンクの多いページでは特に役立ちます。'
		}
	],
	misuse: [
		{
			pattern: { en: 'Marking links with color alone', ja: 'リンクを色だけで示す' },
			harm: {
				en: 'People with partial sight, older people, people with color vision deficiencies, and people using monochrome displays may not be able to tell which text is a link.',
				ja: '弱視の人、高齢の人、色の見え方に特性のある人、白黒の画面を使う人には、どの文字がリンクなのか見分けられないことがあります。'
			},
			instead: {
				en: 'Underline links so they can be recognized without color, in addition to using the link color.',
				ja: 'リンクの色に加えて下線を付け、色が分からなくてもリンクだと分かるようにします。'
			}
		},
		{
			pattern: {
				en: 'Link text such as “here” or “Details” that does not say where it goes',
				ja: '「こちら」「詳細」のように、行き先が分からないリンク文言'
			},
			harm: {
				en: 'Screen reader users who pick from a list of the page’s links cannot tell which link to choose. People with motor impairments spend extra keystrokes on links they did not want, and people with cognitive disabilities can lose their way after landing on unwanted pages.',
				ja: 'ページ内のリンクを一覧にして選ぶスクリーンリーダーの利用者は、どのリンクを選べばよいか分かりません。運動機能に障害のある人は不要なリンクを開いて戻る操作が増え、認知障害のある人は思わぬページへ移って迷いやすくなります。'
			},
			instead: {
				en: 'Make the destination itself the link text, for example “Price list” instead of “Click here for prices”.',
				ja: '行き先を表す語をリンクにします。例えば「料金はこちら」ではなく「料金表」をリンクにします。'
			}
		},
		{
			pattern: {
				en: 'Styling ad links to look like the site’s own navigation or articles',
				ja: '広告へのリンクをサイトのナビゲーションや記事へのリンクと同じ見た目にする'
			},
			harm: {
				en: 'Users click the ad believing it is part of the interface or the site’s own content.',
				ja: '利用者は、画面の部品やサイト自身の記事だと思い込んで広告を開いてしまいます。'
			},
			instead: {
				en: 'Label ads as ads in text, and give them a look that differs from the site’s own links.',
				ja: '広告には「広告」と文字のラベルを付け、サイト自身のリンクとは異なる見た目にします。'
			},
			deceptive: true
		}
	],
	related: [
		{
			id: 'button',
			diff: {
				en: 'A link moves to another page or place; a button runs an action on the current page.',
				ja: 'リンクは別のページや場所へ移動し、ボタンは今のページで操作を実行します。'
			}
		},
		{
			id: 'back-to-top',
			diff: {
				en: 'A link moves to any page or place; a back to top button only returns to the top of the current page.',
				ja: 'リンクはどのページや場所へも移動でき、スクロールトップボタンは今のページの先頭へ戻るだけです。'
			}
		},
		{
			id: 'skip-link',
			diff: {
				en: 'An ordinary link is always visible; a skip link is a link to a place on the same page that usually stays hidden until it gets focus.',
				ja: 'ふつうのリンクは常に見えており、スキップリンクは同じページの中の場所へのリンクで、多くはフォーカスが来るまで隠れています。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Link Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/link/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「リンクテキスト」をもとに作成',
			url: 'https://design.digital.go.jp/dads/foundations/link-text/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: link',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/link',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Understanding Success Criterion 1.4.1: Use of Color (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Understanding Success Criterion 2.4.4: Link Purpose (In Context) (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		},
		{
			label: 'MDN: <a>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Nielsen Norman Group: Change the Color of Visited Links',
			url: 'https://www.nngroup.com/articles/change-the-color-of-visited-links/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Deceptive Patterns: Disguised ads',
			url: 'https://www.deceptive.design/types/disguised-ads',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「タブ」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/tab/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'GOV.UK Design System: Tabs',
			url: 'https://design-system.service.gov.uk/components/tabs/',
			checkedAt: '2026-11-02'
		}
	]
} satisfies ComponentData;
