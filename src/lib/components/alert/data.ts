import type { ComponentData } from '#lib/types.js';

export default {
	id: 'alert',
	category: 'feedback',
	names: { en: 'Alert', ja: 'アラート' },
	aliases: [
		{ name: 'Inline notification', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/notification/usage/' }
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
			en: 'Content added to a role="alert" element is read out by screen readers without moving focus.',
			ja: 'role="alert" の要素に中身を入れると、フォーカスを動かさずにスクリーンリーダーが読み上げる。'
		},
		{
			en: 'An alert that is already on the page when it loads is not announced.',
			ja: 'ページを読み込んだ時点ですでにあるアラートは読み上げられない。'
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
	related: [
		{
			id: 'toast',
			diff: {
				en: 'An alert stays in the page content; a toast floats over the page and disappears on its own.',
				ja: 'アラートはページの中に残り、トーストはページの上に浮かんで自動で消える。'
			}
		},
		{
			id: 'modal',
			diff: {
				en: 'An alert informs without interrupting; an alert dialog (a kind of modal) stops the user until they respond.',
				ja: 'アラートは作業を中断させずに知らせ、アラートダイアログ（モーダルの一種）は応答するまで作業を止める。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Alert Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Carbon Design System: Notification',
			url: 'https://carbondesignsystem.com/components/notification/usage/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
