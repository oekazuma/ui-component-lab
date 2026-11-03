import type { ComponentData } from '#lib/types.js';

export default {
	id: 'cookie-banner',
	category: 'feedback',
	names: { en: 'Cookie banner', ja: 'Cookie バナー' },
	aliases: [
		{ name: 'Cookie banner', source: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk/components/cookie-banner/' }
	],
	searchTerms: ['クッキー', 'クッキーバナー', 'Cookie consent', 'クッキー同意', 'Cookie 同意バナー'],
	summary: {
		en: 'A banner that asks visitors whether a site may set optional cookies, and lets them accept or reject them.',
		ja: '任意の Cookie をサイトが使ってよいかを訪問者に尋ね、受け入れるか拒否するかを選んでもらうバナーです。'
	},
	appearance: {
		en: 'A box in the normal flow of the page, near the top. It has a heading that includes the service name, a couple of short paragraphs, and a row with two buttons of the same style, accept and reject, plus a link to details. After a choice it becomes a one-line confirmation with a hide button.',
		ja: 'ページの上のほうに、ふつうの流れの中で置く箱です。サービス名を含む見出し、短い段落が2つ、同じ見た目の「受け入れる」「拒否する」の2つのボタン、詳細へのリンクが入ります。選ぶと、1行の確認の文と「隠す」ボタンに替わります。'
	},
	behavior: [
		{
			en: 'It stays in the page flow instead of floating over the page, because a fixed banner can cover the element that has focus. GOV.UK says not to make it sticky.',
			ja: 'ページの上に浮かべず、ページの流れの中に置きます。固定したバナーは、フォーカスのある要素を覆い隠すことがあるためです。GOV.UK は固定しないよう求めています。'
		},
		{
			en: 'It is a `<section>` with an `aria-label`, which screen readers expose as a region landmark. GOV.UK uses a region named after the service (“Cookies on …”). MDN says a region is for a section important enough that users will want to jump to it. It is labeled with `aria-label` instead of the heading, because the confirmation has no heading, so the name stays the same before and after the choice.',
			ja: '`<section>` に `aria-label` を付けたもので、スクリーンリーダーにはリージョンのランドマークとして伝わります。GOV.UK はサービス名を使った名前（「Cookies on …」）を付けたリージョンにしています。MDN は、リージョンを、利用者が一足飛びに移動したくなるほど重要な部分に使うものとしています。名前を見出しではなく `aria-label` で付けるのは、確認の文には見出しがなく、選ぶ前も後も同じ名前にするためです。'
		},
		{
			en: 'It is shown on every visit until the visitor accepts or rejects, or saves the choice on the cookies page. GOV.UK then saves the choice in a cookie for 1 year, does not show the banner again, and sets no optional cookies unless the visitor accepted them.',
			ja: '訪問者が受け入れるか拒否するか、Cookie のページで設定を保存するまで、訪れるたびに表示します。GOV.UK は、選んだあとは選択を Cookie に1年間保存し、バナーを再び出さず、受け入れられていない任意の Cookie は設定しません。'
		},
		{
			en: 'When the visitor chooses, the question is replaced by a confirmation with a hide button. In GOV.UK’s script-based version the confirmation has `tabindex="-1"` and `role="alert"` and receives focus, so assistive technology reads it.',
			ja: '選ぶと、質問が確認の文と「隠す」ボタンに替わります。GOV.UK のスクリプトによる実装では、確認の文に `tabindex="-1"` と `role="alert"` を付けてフォーカスを移し、支援技術が読み上げられるようにします。'
		},
		{
			en: 'GOV.UK’s version works without scripts too, when the banner is inside a form and a submitted choice reloads the page with the confirmation.',
			ja: 'GOV.UK の実装には、バナーをフォームの中に入れ、選択を送信するとページを読み込み直して確認の文を出す、スクリプトなしでも動く形もあります。'
		},
		{
			en: 'In this demo, the confirmation takes focus, as in GOV.UK, and shows the site’s own focus indicator. GOV.UK removes the focus ring from it, for three reasons: the message cannot be used, it is the first element at the very top of the page, and it appears in place of the cookie message, which was the last thing the visitor used. GOV.UK says this is an assumption and that it still needs more research.',
			ja: 'このデモでは、GOV.UK と同じく確認の文にフォーカスを移し、サイトのフォーカスの表示を出します。GOV.UK は、確認の文にはフォーカスの枠を出しません。理由は3つで、操作できないメッセージであること、ページの一番上の最初の要素であること、直前に使った Cookie のメッセージの代わりに出ることです。GOV.UK はこれを推測だとし、さらに調べる必要があるとしています。'
		},
		{
			en: 'In this demo, the hide button moves focus to the “Cookie settings” button, which always stays on the page and stands in for the cookies page. Pressing it says where a real site would go and asks the question in the banner again, and the message is read out each time. The “View cookies” link also shows where it would go instead of leaving the page.',
			ja: 'このデモでは、「隠す」ボタンを押すとフォーカスを「Cookie の設定」ボタンに移します。このボタンは常にページに残り、Cookie のページの代わりをします。押すと、実際のサイトの行き先を表示してバナーでもう一度尋ね、そのたびにメッセージを読み上げます。「Cookie の一覧を見る」リンクもページを移らず、行き先を表示します。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves focus between the accept button, the reject button, and the details link. After a choice, focus is on the confirmation, and the next stop is the hide button.',
				ja: '受け入れるボタン、拒否するボタン、詳細へのリンクの間でフォーカスを移します。選んだあとはフォーカスが確認の文にあり、次は「隠す」ボタンです。'
			}
		},
		{ key: 'Enter', action: { en: 'Presses the focused button, or follows the focused link.', ja: 'フォーカスのあるボタンを押すか、リンク先へ移動します。' } },
		{ key: 'Space', action: { en: 'Presses the focused button.', ja: 'フォーカスのあるボタンを押します。' } }
	],
	usage: [
		{
			en: 'GOV.UK says to use it when a service sets any cookies on a visitor’s device, and that a service must tell visitors about its cookies and let them accept or reject the optional ones (its “non-essential cookies” include HTML5 local storage and service workers). It also says its page is not legal advice, so check with the organization’s privacy expert.',
			ja: 'GOV.UK は、サービスが訪問者の端末に何らかの Cookie を設定するときに使うとしています。サービスは Cookie について訪問者に知らせ、任意のものは受け入れるか拒否するかを選べるようにしなければならない、としています（GOV.UK の「任意の Cookie」には、HTML5 のローカルストレージやサービスワーカーも含まれます）。また、このページは法的な助言ではないので、組織の個人情報の専門家に確かめるよう求めています。'
		},
		{
			en: 'If the service sets only essential cookies, GOV.UK says no banner is needed, but the visitor still has to be told, for example on a cookies page linked from the footer.',
			ja: 'サービスが必須の Cookie しか設定しないなら、GOV.UK はバナーは要らないとしています。ただし訪問者への案内は必要で、たとえばフッターからリンクした Cookie のページで知らせます。'
		},
		{
			en: 'Put the service name in the heading, so visitors can tell these cookies from other sites’ cookies. Keep the text as short as it can be while still describing the cookies accurately, and mention third parties if they set cookies.',
			ja: '見出しにサービス名を入れ、ほかのサイトの Cookie とは別のものだと分かるようにします。説明は、Cookie の使い方を正しく伝えられる範囲でできるだけ短くし、第三者も Cookie を設定するならそのことも書きます。'
		},
		{
			en: 'Place it after the opening `<body>` tag and before the skip link, and do not fix it to the screen. WCAG says a sticky cookie banner fails success criterion 2.4.11, Focus Not Obscured (Minimum), if it completely covers the focused element. It lists making the banner modal, or adding scroll padding so it does not overlap other content, as ways to pass.',
			ja: '`<body>` の開始タグの直後、スキップリンクより前に置き、画面に固定はしません。WCAG は、固定したクッキーバナーがフォーカスのある要素を完全に隠すと、達成基準 2.4.11 Focus Not Obscured (Minimum) を満たさないとしています。満たす方法として、バナーをモーダルにするか、スクロールの余白を付けてほかの内容と重ならないようにする方法を挙げています。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Making the reject button small or faint, with a large accept button',
				ja: '受け入れるボタンを大きくし、拒否するボタンを小さく薄くする'
			},
			harm: {
				en: 'Small, low-contrast text is hard to see, so people can miss that they are allowed to refuse. Deceptive Patterns calls hiding, obscuring or disguising information in this way visual interference.',
				ja: '小さく、コントラストの低い文字は見えにくく、拒否できることに気づかないことがあります。Deceptive Patterns は、このように情報を隠したり目立たなくしたり偽装したりすることを、視覚的な干渉（visual interference）としています。'
			},
			instead: {
				en: 'Give accept and reject the same size and button style, side by side, as the GOV.UK banner does, and let only the labels tell them apart.',
				ja: 'GOV.UK のバナーのように、受け入れると拒否を同じ大きさ、同じボタンの種類で並べ、違いはラベルだけで示します。'
			},
			deceptive: true
		},
		{
			pattern: {
				en: 'Asking again on every visit after the answer, or offering only “Not now”',
				ja: '答えたあとも訪れるたびに尋ねる、または「今はしない」しか選べなくする'
			},
			harm: {
				en: 'Each interruption costs the person time and attention. Deceptive Patterns calls this nagging: after enough of them, people may agree to what is asked even if it is not in their interest.',
				ja: '尋ねられるたびに、利用者の時間と注意が奪われます。Deceptive Patterns はこれをしつこい要求（nagging）としていて、何度も続くと、自分のためにならなくても求めに応じてしまうことがあるとしています。'
			},
			instead: {
				en: 'Offer a real reject button, save the answer, and do not show the banner again once it is saved, as GOV.UK says.',
				ja: '本当の「拒否する」ボタンを用意し、答えを保存して、GOV.UK の求めるとおり、保存したあとはバナーを再び出しません。'
			},
			deceptive: true
		},
		{
			pattern: {
				en: 'Showing optional cookie choices already switched on',
				ja: '任意の Cookie の選択肢をあらかじめオンにしておく'
			},
			harm: {
				en: 'People tend to keep the option that is already chosen. If they do not notice, read and understand it, they pass by it without knowing what it means for them.',
				ja: '人はあらかじめ選ばれている選択肢をそのまま使いがちです。気づいて読み、意味を理解しなければ、何が起きるかを知らないまま通り過ぎてしまいます。'
			},
			instead: {
				en: 'In a banner that adds toggles for optional cookies (GOV.UK’s has none), show them switched off, and set no optional cookies until the visitor has accepted them, as GOV.UK says.',
				ja: '任意の Cookie の切り替えを加えたバナーでは（GOV.UK のバナーにはありません）、オフの状態で見せます。GOV.UK の求めるとおり、訪問者が受け入れるまで任意の Cookie は設定しません。'
			},
			deceptive: true
		},
		{
			pattern: {
				en: 'Fixing the banner to the top or bottom of the screen',
				ja: 'バナーを画面の上端や下端に固定する'
			},
			harm: {
				en: 'Keyboard users cannot see what has focus when the banner covers it. WCAG says people who cannot use a mouse need to see what has keyboard focus, and that a sticky cookie banner fails if it completely hides the focused element.',
				ja: 'バナーが覆うと、キーボードを使う人はフォーカスのある場所が見えなくなります。WCAG は、マウスを使えない人にはキーボードフォーカスの位置が見える必要があるとし、固定したクッキーバナーがフォーカスのある要素を完全に隠すと基準を満たさないとしています。'
			},
			instead: {
				en: 'Leave it in the page flow, as GOV.UK does.',
				ja: 'GOV.UK のように、ページの流れの中に置きます。'
			}
		}
	],
	related: [
		{
			id: 'emergency-banner',
			diff: {
				en: 'A cookie banner asks the visitor to choose and can be hidden once answered; an emergency banner warns about urgent danger and cannot be closed.',
				ja: 'Cookie バナーは訪問者に選択を尋ね、答えたあとは隠せます。緊急時バナーは差し迫った危険を知らせ、閉じられません。'
			}
		},
		{
			id: 'modal',
			diff: {
				en: 'A cookie banner stays in the page flow and lets the visitor keep using the page; a modal blocks the page until it is closed.',
				ja: 'Cookie バナーはページの流れの中に置かれ、訪問者はページを使い続けられます。モーダルは閉じるまでページを操作できなくします。'
			}
		},
		{
			id: 'alert',
			diff: {
				en: 'A cookie banner asks for a choice with two buttons and is replaced by a confirmation once answered; an alert reports an important message and asks for nothing.',
				ja: 'Cookie バナーは2つのボタンで選択を尋ね、答えると確認の文に替わります。アラートは重要なお知らせを伝えるだけで、何も求めません。'
			}
		}
	],
	sources: [
		{
			label: 'GOV.UK Design System: Cookie banner',
			url: 'https://design-system.service.gov.uk/components/cookie-banner/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Understanding Success Criterion 2.4.11: Focus Not Obscured (Minimum) (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MDN: ARIA: region role',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Deceptive Patterns: Visual interference',
			url: 'https://www.deceptive.design/types/visual-interference',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Deceptive Patterns: Nagging',
			url: 'https://www.deceptive.design/types/nagging',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Deceptive Patterns: Preselection',
			url: 'https://www.deceptive.design/types/preselection',
			checkedAt: '2026-11-03'
		}
	]
} satisfies ComponentData;
