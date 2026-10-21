import type { ComponentData } from '#lib/types.js';

export default {
	id: 'toast',
	category: 'feedback',
	names: { en: 'Toast', ja: 'トースト' },
	aliases: [{ name: 'Snackbar', source: 'MUI', url: 'https://mui.com/material-ui/react-snackbar/' }],
	summary: {
		en: 'A brief message that pops up at the edge of the screen after an action and disappears on its own.',
		ja: '操作の結果を画面の端に短く表示し、しばらくすると自動で消えるメッセージ。'
	},
	appearance: {
		en: 'A small dark or colored box floating near the bottom or top of the screen, with one line of text and sometimes a close or undo button.',
		ja: '画面の下か上の近くに浮かぶ小さな暗い色の箱で、1行の文と、閉じる・元に戻すボタンが付くこともある。'
	},
	behavior: [
		{
			en: 'Appears after an action, such as “Message archived”, without moving focus.',
			ja: '「アーカイブしました」のように操作のあとに表示され、フォーカスは動かさない。'
		},
		{
			en: 'It is announced through a live region (role="status") that is already on the page before the message is added.',
			ja: 'メッセージを入れる前からページにあるライブリージョン（role="status"）で読み上げる。'
		},
		{
			en: 'Disappears after a few seconds (5 seconds in this demo). Toasts with buttons should not disappear by themselves, because keyboard users may not reach them in time.',
			ja: '数秒で消える（このデモは5秒）。ボタンを含むトーストは、キーボード利用者が間に合わないため自動で消さない。'
		},
		{
			en: 'Important information, such as form errors, belongs in an alert rather than a toast.',
			ja: 'フォームのエラーなど重要な情報は、トーストではなくアラートで伝える。'
		}
	],
	keyboard: [
		{ key: 'Enter / Space', action: { en: 'Runs the action that shows the toast.', ja: 'トーストを出す操作を実行する。' } },
		{ key: 'Esc', action: { en: 'Dismisses the toast.', ja: 'トーストを消す。' } }
	],
	misuse: [
		{
			pattern: {
				en: 'Putting information that cannot be found elsewhere only in a toast that disappears',
				ja: 'ほかで確かめられない情報を、消えるトーストだけで伝える'
			},
			harm: {
				en: 'A notice in a corner of the screen is easy to miss. People who need more time to find and read content, such as screen reader users and people with low vision or cognitive disabilities, may lose it before they finish reading.',
				ja: '画面の隅の通知は気づかれずに見過ごされやすい。スクリーンリーダーの利用者や、弱視や認知に障害のある人など、内容を見つけて読むのに時間がかかる人は、読み終える前に見失うことがある。'
			},
			instead: {
				en: 'Use a toast only for results the user can also check elsewhere, such as an archived message that appears in the archive. Otherwise use an alert in the page, or keep the toast until the user closes it.',
				ja: 'トーストは、アーカイブしたメッセージがアーカイブ一覧に並ぶように、ほかでも確かめられる結果だけに使う。そうでないものは、ページの中のアラートで伝えるか、利用者が閉じるまで残す。'
			}
		},
		{
			pattern: {
				en: 'Popping up made-up activity such as “Someone in Tokyo just bought this”',
				ja: '「東京の方がたった今購入しました」のような作り物の通知を出す'
			},
			harm: {
				en: 'Users come to believe a product is more popular or trusted than it is, and buy or sign up without weighing it for themselves.',
				ja: '利用者は商品が実際より人気があり信頼されていると思い込み、自分で比べて考えないまま購入や申し込みに進む。'
			},
			instead: {
				en: 'Show purchase or viewing counts only when they come from real records, and use toasts to report the result of the user’s own action.',
				ja: '購入数や閲覧数は、実際の記録に基づくときだけ示す。トーストは利用者自身の操作の結果を知らせるのに使う。'
			},
			deceptive: true
		}
	],
	related: [
		{
			id: 'alert',
			diff: {
				en: 'A toast floats over the page and disappears on its own; an alert sits in the page content and stays until it is no longer needed or the user closes it.',
				ja: 'トーストはページの上に浮かんで自動で消え、アラートはページの中に置かれ、不要になるか利用者が閉じるまで残る。'
			}
		}
	],
	sources: [
		{
			label: 'Bootstrap: Toasts',
			url: 'https://getbootstrap.com/docs/5.3/components/toasts/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MUI: Snackbar',
			url: 'https://mui.com/material-ui/react-snackbar/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Carbon Design System: Notification',
			url: 'https://carbondesignsystem.com/components/notification/usage/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Understanding Success Criterion 2.2.1: Timing Adjustable (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Deceptive Patterns: Fake social proof',
			url: 'https://www.deceptive.design/types/fake-social-proof',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
