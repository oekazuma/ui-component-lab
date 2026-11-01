import type { ComponentData } from '#lib/types.js';

export default {
	id: 'toast',
	category: 'feedback',
	names: { en: 'Toast', ja: 'トースト' },
	aliases: [{ name: 'Snackbar', source: 'MUI', url: 'https://mui.com/material-ui/react-snackbar/' }],
	summary: {
		en: 'A brief message that pops up at the edge of the screen after an action; one with only a message disappears on its own.',
		ja: '操作の結果を画面の端に短く表示するメッセージです。文字だけのものは、しばらくすると自動で消えます。'
	},
	appearance: {
		en: 'A small dark or colored box floating near the bottom or top of the screen, with one line of text and sometimes a close or undo button.',
		ja: '画面の下か上の近くに浮かぶ小さな暗い色の箱で、1行の文と、閉じる・元に戻すボタンが付くこともあります。'
	},
	behavior: [
		{
			en: 'Appears after an action, such as “Message archived”, without moving focus.',
			ja: '「アーカイブしました」のように操作のあとに表示され、フォーカスは動かしません。'
		},
		{
			en: 'It is announced through a live region (`role="status"`) that is already on the page before the message is added. The buttons are kept outside the live region so that only the message is read.',
			ja: 'メッセージを入れる前からページにあるライブリージョン（`role="status"`）で読み上げます。ボタンまで読み上げないよう、ボタンはライブリージョンの外に置きます。'
		},
		{
			en: 'Repeating the same message is not read again, so the message element is created anew each time the toast is shown.',
			ja: '同じ文を入れ直しても読み上げられないため、表示するたびにメッセージの要素を作り直します。'
		},
		{
			en: 'A toast without buttons disappears after a few seconds. A toast with buttons, such as Undo, stays until the user closes it, because keyboard users may not reach the buttons in time.',
			ja: 'ボタンのないトーストは数秒で消えます。「元に戻す」などのボタンを含むトーストは、キーボード利用者が間に合わないことがあるため、利用者が閉じるまで残します。'
		},
		{
			en: 'A toast that disappears on its own stops its timer while the pointer is over it, so people can finish reading. A message-only toast has nothing to focus, so anything people may need to reach with the keyboard belongs in a toast with buttons.',
			ja: '自動で消えるトーストは、ポインターを乗せている間はタイマーを止め、読み終えるまで残します。メッセージだけのトーストにはフォーカスできるものがないので、キーボードで操作したいものはボタン付きのトーストに入れます。'
		},
		{
			en: 'In this demo, Copy link shows a message-only toast that disappears after 5 seconds. Moving the pointer off the toast starts the 5 seconds again. The demo does not actually write to the clipboard; the share link on the page is marked as copied, so the result can still be checked after the toast is gone.',
			ja: 'このデモでは、「リンクをコピー」でメッセージだけのトーストが出て、5秒で消えます。ポインターをトーストから離すと、5秒を数え直します。実際にはクリップボードに書き込まず、ページの共有リンクに「コピー済み」と出すので、トーストが消えたあとも結果を確かめられます。'
		},
		{
			en: 'In this demo, Archive message shows a toast with Undo and Close that stays until it is dismissed. Undo puts the message back in the inbox. Undo and Close return focus to the Archive message button. When the inbox is empty, that button is marked `aria-disabled` rather than `disabled`, so focus stays on it.',
			ja: 'このデモでは、「メッセージをアーカイブ」で「元に戻す」と「閉じる」の付いたトーストが出て、消すまで残ります。「元に戻す」でメッセージが受信トレイに戻ります。「元に戻す」と「閉じる」を押すと、フォーカスは「メッセージをアーカイブ」のボタンへ戻ります。受信トレイが空になると、そのボタンは `disabled` ではなく `aria-disabled` で押せないことを示し、フォーカスが外れないようにしています。'
		},
		{
			en: 'Important information, such as form errors, belongs in an alert rather than a toast.',
			ja: 'フォームのエラーなど重要な情報は、トーストではなくアラートで伝えます。'
		}
	],
	keyboard: [
		{ key: 'Enter / Space', action: { en: 'Runs the action that shows the toast, or uses the focused button in the toast.', ja: 'トーストを出す操作を実行します。トーストの中のボタンにフォーカスがあれば、そのボタンを押します。' } },
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves to the Undo and Close buttons in the toast, in page order.', ja: 'ページの並び順で、トーストの中の「元に戻す」と「閉じる」のボタンへ移動します。' } },
		{ key: 'Esc', action: { en: 'Dismisses the toast.', ja: 'トーストを消します。' } }
	],
	variations: [
		{
			name: { en: 'Message only', ja: 'メッセージだけ' },
			description: {
				en: 'Shows one line of text and disappears on its own after a few seconds. The timer stops while the pointer is over it.',
				ja: '1行の文だけを表示し、数秒で自動で消えるものです。ポインターを乗せている間はタイマーを止めます。'
			}
		},
		{
			name: { en: 'With an action', ja: '操作付き' },
			description: {
				en: 'Adds a button such as Undo, and a Close button. It does not disappear on its own.',
				ja: '「元に戻す」などのボタンと閉じるボタンを添えたものです。自動では消しません。'
			}
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Putting information that cannot be found elsewhere only in a toast that disappears',
				ja: 'ほかで確かめられない情報を、消えるトーストだけで伝える'
			},
			harm: {
				en: 'A notice in a corner of the screen is easy to miss. People who need more time to find and read content, such as screen reader users and people with low vision or cognitive disabilities, may lose it before they finish reading.',
				ja: '画面の隅の通知は見過ごされやすいものです。スクリーンリーダーの利用者や、弱視や認知に障害のある人など、内容を見つけて読むのに時間がかかる人は、読み終える前に見失うことがあります。'
			},
			instead: {
				en: 'Use a toast only for results the user can also check elsewhere, such as an archived message that appears in the archive. Otherwise use an alert in the page, or keep the toast until the user closes it.',
				ja: 'トーストは、アーカイブしたメッセージがアーカイブ一覧に並ぶように、ほかでも確かめられる結果だけに使います。そうでないものは、ページの中のアラートで伝えるか、利用者が閉じるまで残します。'
			}
		},
		{
			pattern: {
				en: 'Popping up made-up activity such as “Someone in Tokyo just bought this”',
				ja: '「東京の方がたった今購入しました」のような作り物の通知を出す'
			},
			harm: {
				en: 'Users come to believe a product is more popular or trusted than it is, and buy or sign up without weighing it for themselves.',
				ja: '利用者は商品が実際より人気があり信頼されていると思い込み、自分で比べて考えないまま購入や申し込みに進みます。'
			},
			instead: {
				en: 'Show purchase or viewing counts only when they come from real records, and use toasts to report the result of the user’s own action.',
				ja: '購入数や閲覧数は、実際の記録に基づくときだけ示します。トーストは利用者自身の操作の結果を知らせるのに使います。'
			},
			deceptive: true
		}
	],
	related: [
		{
			id: 'alert',
			diff: {
				en: 'A toast floats over the page, and one with only a message disappears on its own; an alert sits in the page content and stays until it is no longer needed or the user closes it.',
				ja: 'トーストはページの上に浮かび、文字だけのものは自動で消えますが、アラートはページの中に置かれ、不要になるか利用者が閉じるまで残ります。'
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
			checkedAt: '2026-10-21'
		},
		{
			label: 'MUI: Snackbar API',
			url: 'https://mui.com/material-ui/api/snackbar/',
			checkedAt: '2026-10-21'
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
