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
	related: [
		{
			id: 'alert',
			diff: {
				en: 'A toast floats over the page and disappears on its own; an alert stays in the page content until the problem is fixed.',
				ja: 'トーストはページの上に浮かんで自動で消え、アラートは問題が解決するまでページの中に残る。'
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
		}
	]
} satisfies ComponentData;
