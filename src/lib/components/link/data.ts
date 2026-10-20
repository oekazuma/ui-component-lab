import type { ComponentData } from '#lib/types.js';

export default {
	id: 'link',
	category: 'navigation',
	names: { en: 'Link', ja: 'リンク' },
	aliases: [],
	summary: {
		en: 'Text or an image that takes the user to another page or another place on the same page.',
		ja: '別のページや、同じページ内の別の場所へ移動するための文字や画像。'
	},
	appearance: {
		en: 'Text in the accent color, usually underlined. It often changes color or underline on hover.',
		ja: 'アクセントカラーの文字で、多くは下線が付く。マウスを乗せると色や下線が変わることが多い。'
	},
	behavior: [
		{
			en: 'Clicking it opens the destination in the same tab.',
			ja: 'クリックすると、同じタブで移動先が開く。'
		},
		{
			en: 'The browser also offers opening in a new tab, copying the address, and going back with history.',
			ja: '新しいタブで開く・アドレスをコピーする・履歴で戻るといった操作も、ブラウザが用意している。'
		},
		{
			en: 'The link in this demo goes to the Button page of this site.',
			ja: 'このデモのリンクは、このサイトのボタンのページへ移動する。'
		}
	],
	keyboard: [
		{ key: 'Tab', action: { en: 'Moves focus to the link.', ja: 'リンクにフォーカスを移す。' } },
		{ key: 'Enter', action: { en: 'Follows the link.', ja: 'リンク先へ移動する。' } }
	],
	related: [
		{
			id: 'button',
			diff: {
				en: 'A link moves to another page or place; a button runs an action on the current page.',
				ja: 'リンクは別のページや場所へ移動し、ボタンは今のページで操作を実行する。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Link Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/link/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
