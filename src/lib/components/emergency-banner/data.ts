import type { ComponentData } from '#lib/types.js';

export default {
	id: 'emergency-banner',
	category: 'feedback',
	names: { en: 'Emergency banner', ja: '緊急時バナー' },
	aliases: [
		{ name: '緊急時バナー', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/emergency-banner/' }
	],
	summary: {
		en: 'A banner that takes over the top of a site to warn about an urgent event that affects people’s lives or property.',
		ja: '人の命や財産に関わる緊急の出来事を知らせるため、サイトの上部を占めて表示するバナーです。'
	},
	appearance: {
		en: 'A box with a thick border in the error color at the top of the page, above other notices and sometimes above the header itself. It holds a large title that names the danger, the time it was updated, a short description, and sometimes one link button in the center.',
		ja: 'ページの上部、ほかのお知らせよりも上（ヘッダーよりも上のこともある）にある、エラーの色の太い枠線で囲んだ箱です。危険の内容を表す大きなタイトル、更新日時、短い説明が入り、中央にリンクのボタンが1つ付くこともあります。'
	},
	behavior: [
		{
			en: 'It interrupts what the site would normally say and fills the first screen, so that everyone notices it.',
			ja: 'サイトが本来伝える内容を中断してでも最初の画面を占め、だれもが気づけるようにします。'
		},
		{
			en: 'The user cannot close or hide it.',
			ja: '利用者が閉じたり隠したりすることはできません。'
		},
		{
			en: 'It is an `<article>` with a heading, so screen reader users can find it in the list of headings. It is already on the page when it loads, so it has no `role="alert"`; it is read first because it comes first.',
			ja: '見出しを持つ `<article>` なので、スクリーンリーダーの利用者は見出しの一覧から見つけられます。ページを開いた時点で表示されているため `role="alert"` は付けず、ページの先頭にあることで最初に読まれます。'
		},
		{
			en: 'The update time is a `<time>` element with a `datetime` attribute, so the date can also be read by machines.',
			ja: '更新日時は `datetime` 属性付きの `<time>` 要素にし、機械でも日時を読み取れるようにします。'
		},
		{
			en: 'Only the button is clickable; the rest of the banner is not a link.',
			ja: '押せるのはボタンだけで、バナーのほかの部分はリンクにしません。'
		},
		{
			en: 'In this demo, the button shows where it would go instead of leaving the page. If the link opens the details in a new tab, the Digital Agency Design System example marks this with an icon that has alternative text.',
			ja: 'このデモでは、ボタンを押してもページを移らず、行き先を表示します。リンク先を新しいタブで開く場合、デジタル庁デザインシステムの実装例は、そのことを代替テキスト付きのアイコンで示します。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves focus to the link button.', ja: 'リンクのボタンにフォーカスを移します。' } },
		{ key: 'Enter', action: { en: 'Follows the link.', ja: 'リンク先へ移動します。' } }
	],
	usage: [
		{
			en: 'Use it only for urgent, important information that affects people’s lives or property, such as an evacuation order. For other notices, such as opening hours over the holidays, use an alert instead. GOV.UK shows one at the top of every page for a national or local emergency, or a notable death.',
			ja: '避難の呼びかけのように、人の命や財産に関わる緊急で重要な情報だけに使います。年末年始の営業時間のようなそれ以外のお知らせには、アラートを使います。GOV.UK は国や地域の緊急事態や著名人の死去のときに、全ページの上部に表示します。'
		},
		{
			en: 'Make the title name the actual danger. The banner itself already says it is an emergency, so a title such as “Emergency notice” tells nothing.',
			ja: 'タイトルには具体的な警告の内容を書きます。このバナーを使った時点で緊急のお知らせであることは示されているので、「緊急のお知らせ」のようなタイトルでは何も伝わりません。'
		},
		{
			en: 'Give it a style that differs a little from the rest of the site, so it catches the eye.',
			ja: 'サイトのほかの部分とは少し違う、違和感のあるスタイルにして目を引くようにします。'
		},
		{
			en: 'Give it at most one link, and put the details on the linked page.',
			ja: 'リンクは1つまでにし、詳しい説明はリンク先のページに書きます。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Leaving the banner up for a long time',
				ja: '緊急時バナーを長い間出したままにする'
			},
			harm: {
				en: 'Even an urgent warning, kept on screen, wears people out (alert fatigue). It stops drawing attention and comes to be ignored.',
				ja: '緊急の警告でも出し続けると、見る人が慣れて疲れてしまい（アラート疲れ）、注意を引く効果が薄れて無視されるようになります。'
			},
			instead: {
				en: 'Remove it once the urgency has passed. For a message that has to stay up for a long time, use an alert.',
				ja: '緊急でなくなったら外します。長く載せておく必要のあるお知らせには、アラートを使います。'
			}
		},
		{
			pattern: {
				en: 'Writing a long description in the banner',
				ja: 'バナーの説明に長い文章を書く'
			},
			harm: {
				en: 'It is hard to get detailed information across accurately with flat text in a banner.',
				ja: 'バナーの平たい文字だけでは、詳しい情報を正しく伝えるのが難しいです。'
			},
			instead: {
				en: 'Keep the description short (the Digital Agency Design System suggests about 100 Japanese characters), structured with headings or a list if needed, and link to a page with the details.',
				ja: '説明は短くし（デジタル庁デザインシステムは全角100文字程度までとしている）、必要なら見出しや箇条書きで整理して、詳細はリンク先のページに書きます。'
			}
		}
	],
	related: [
		{
			id: 'alert',
			diff: {
				en: 'An emergency banner warns about urgent danger and cannot be closed; an alert carries ordinary important messages and can stay up for a long time.',
				ja: '緊急時バナーは差し迫った危険を知らせて閉じられず、アラートはふだんの重要なお知らせを伝え、長く載せておけます。'
			}
		},
		{
			id: 'callout',
			diff: {
				en: 'An emergency banner takes over the top of the page to warn about an urgent danger; a callout sits next to the content it adds to.',
				ja: '緊急時バナーはページの上部を占めて差し迫った危険を知らせ、注釈ブロックは補足する内容のそばに置きます。'
			}
		}
	],
	sources: [
		{
			label: 'デジタル庁デザインシステムウェブサイト「緊急時バナー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/emergency-banner/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「緊急時バナー（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/emergency-banner/usage/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: emergency-banner',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/emergency-banner',
			checkedAt: '2026-10-22'
		},
		{
			label: 'GOV.UK Publishing Components: Emergency banner',
			url: 'https://components.publishing.service.gov.uk/component-guide/emergency_banner',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: ARIA: alert role',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: <time>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
