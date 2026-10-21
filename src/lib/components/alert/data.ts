import type { ComponentData } from '#lib/types.js';

export default {
	id: 'alert',
	category: 'feedback',
	names: { en: 'Alert', ja: 'アラート（ノティフィケーションバナー）' },
	aliases: [
		{ name: 'Inline notification', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/notification/usage/' },
		{ name: 'ノティフィケーションバナー', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/notification-banner/' }
	],
	summary: {
		en: 'An important message shown in the page, announced right away without interrupting what the user is doing.',
		ja: 'ページの中に表示する重要なメッセージ。作業を中断させずに、すぐ読み上げられる。'
	},
	appearance: {
		en: 'A colored box with an icon and a short message, placed near the related content or at the top of the page. The color shows the type: error, warning, success, or info.',
		ja: 'アイコンと短い文の入った色付きの箱で、関連する内容の近くかページの上部に出る。色でエラー・警告・成功・お知らせの種類を表す。'
	},
	behavior: [
		{
			en: 'Content added to a `role="alert"` element is read out by screen readers without moving focus.',
			ja: '`role="alert"` の要素に中身を入れると、フォーカスを動かさずにスクリーンリーダーが読み上げる。'
		},
		{
			en: 'An alert that is already on the page when it loads is not announced.',
			ja: 'ページを読み込んだ時点ですでにあるアラートは読み上げられない。'
		},
		{
			en: 'In this demo, the message is rebuilt each time Save is pressed, because putting the same text in again is not read out.',
			ja: 'このデモでは、同じ文を入れ直しても読み上げられないため、「保存」を押すたびにメッセージを作り直している。'
		},
		{
			en: 'In this demo, the type is given in words (“Error:”) as well as by color and the icon, so the icon is hidden from screen readers to avoid reading it twice.',
			ja: 'このデモでは、色とアイコンに加えて「エラー：」の文字で種類を示す。読み上げが重ならないよう、アイコンはスクリーンリーダーから隠している。'
		},
		{
			en: 'It should not disappear on its own, so the user has time to read it.',
			ja: '読む時間を確保するため、自動で消さない。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. An alert does not take focus, so the user can keep working.',
				ja: 'なし。アラートはフォーカスを受けないので、そのまま作業を続けられる。'
			}
		}
	],
	usage: [
		{
			en: 'If it can be closed, keep it closed and provide a way to show it again.',
			ja: '閉じられるようにする場合は、閉じた状態を保ち、もう一度表示する手段を用意する。'
		}
	],
	misuse: [
		{
			pattern: { en: 'Showing the type of message by color alone', ja: 'メッセージの種類を色だけで示す' },
			harm: {
				en: 'People with low vision or color vision deficiency, many older people, and anyone on a monochrome or limited-color display cannot tell an error from a success, so they can miss what the message means.',
				ja: '弱視や色覚に特性のある人、色を見分けにくくなった高齢の人、白黒や色数の少ない画面で見ている人には、エラーか成功かが分からず、メッセージの意味を受け取れない。'
			},
			instead: {
				en: 'Pair the color with an icon and words that name the type, such as “Error:” or “Done:”.',
				ja: '色に加えて、種類を表すアイコンと「エラー：」「完了：」のような文言を添える。'
			}
		},
		{
			pattern: { en: 'Showing alerts one after another', ja: 'アラートを次々と出す' },
			harm: {
				en: 'Every alert interrupts the user. Frequent interruptions make the page harder to use for people with visual or cognitive disabilities, and a stream of notices breaks anyone’s concentration.',
				ja: 'アラートは出るたびに利用者の作業に割り込む。頻繁に割り込まれると、視覚や認知に障害のある人には使いにくくなる。通知が多いと、だれでも集中が途切れる。'
			},
			instead: {
				en: 'Use an alert only for what the user needs to know now. Combine related messages into one, and show the rest in the page without `role="alert"`.',
				ja: 'アラートは今すぐ知る必要があることだけに使う。関連するメッセージは1つにまとめ、それ以外は `role="alert"` を付けずにページに載せる。'
			}
		},
		{
			pattern: { en: 'Removing the alert automatically after a few seconds', ja: '数秒で自動で消す' },
			harm: {
				en: 'People who need more time to find and read content, such as screen reader users and people with low vision or cognitive disabilities, can lose the message before they finish reading it.',
				ja: 'スクリーンリーダーの利用者や、弱視や認知に障害のある人など、内容を見つけて読むのに時間がかかる人は、読み終える前にメッセージを見失うことがある。'
			},
			instead: {
				en: 'Keep the alert until it is no longer needed or the user closes it.',
				ja: '不要になるか、利用者が閉じるまで表示しておく。'
			}
		}
	],
	related: [
		{
			id: 'toast',
			diff: {
				en: 'An alert stays in the page content; a toast floats over the page and disappears on its own.',
				ja: 'アラートはページの中に残り、トーストはページの上に浮かんで自動で消える。'
			}
		},
		{
			id: 'alert-dialog',
			diff: {
				en: 'An alert informs without interrupting; an alert dialog stops the user until they respond.',
				ja: 'アラートは作業を中断させずに知らせ、アラートダイアログは応答するまで作業を止める。'
			}
		},
		{
			id: 'callout',
			diff: {
				en: 'An alert tells the user something important, and content added to it is announced right away; a callout sets apart helpful extra information and is never announced on its own.',
				ja: 'アラートは重要なことを知らせ、中身を入れるとすぐに読み上げられる。注釈ブロックは役立つ補足を区別して見せるだけで、ひとりでに読み上げられることはない。'
			}
		},
		{
			id: 'emergency-banner',
			diff: {
				en: 'An alert carries ordinary important messages and can stay up for a long time; an emergency banner warns about urgent danger and cannot be closed.',
				ja: 'アラートはふだんの重要なお知らせを伝えて長く載せておけ、緊急時バナーは差し迫った危険を知らせて閉じられない。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Alert Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Understanding Success Criterion 1.4.1: Use of Color (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Understanding Success Criterion 2.2.1: Timing Adjustable (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Carbon Design System: Notification',
			url: 'https://carbondesignsystem.com/components/notification/usage/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ノティフィケーションバナー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/notification-banner/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
