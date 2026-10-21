import type { ComponentData } from '#lib/types.js';

export default {
	id: 'avatar',
	category: 'data',
	names: { en: 'Avatar', ja: 'アバター' },
	aliases: [],
	summary: {
		en: 'A small picture, initial, or icon that stands for a person or account.',
		ja: '人やアカウントを表す、小さな写真・頭文字・アイコン。'
	},
	appearance: {
		en: 'A circle (sometimes a rounded square) with a photo or a colored background and an initial. Several can overlap in a row with a “+N” at the end.',
		ja: '写真か、色の付いた背景に頭文字を入れた丸（角丸の四角のこともある）。複数を少し重ねて並べ、最後に「+N」を付けることもある。'
	},
	behavior: [
		{
			en: 'When there is no photo, or it fails to load, it falls back to an initial or a generic icon.',
			ja: '写真がないときや読み込めないときは、頭文字や汎用のアイコンで代わりに表示する。'
		},
		{
			en: 'If the person’s name is already next to it, the avatar is decorative; otherwise it needs the name as alternative text.',
			ja: '隣に名前があるならアバターは飾り扱いにし、ないなら名前を代替テキストとして付ける。'
		},
		{
			en: 'In this demo the initials are hidden from screen readers and each full name is read instead.',
			ja: 'このデモでは頭文字をスクリーンリーダーから隠し、代わりにフルネームを読ませている。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. An avatar that opens a profile is a link or button and follows its keys.',
				ja: 'なし。プロフィールを開くアバターはリンクかボタンにし、そのキー操作に従う。'
			}
		}
	],
	misuse: [
		{
			pattern: { en: 'Showing an avatar with no name anywhere', ja: '名前をどこにも示さずにアバターだけを置く' },
			harm: {
				en: 'People who have difficulty seeing the picture and use a screen reader or braille cannot get information that exists only in the picture, so they cannot tell whose avatar it is.',
				ja: '画像を見て内容をつかむことが難しく、スクリーンリーダーや点字を使う人には、画像にしかない情報が届かない。誰のアバターなのかが分からない。'
			},
			instead: {
				en: 'Give the avatar the person’s name as alternative text, or show the name next to it and mark the avatar as decorative.',
				ja: 'アバターに名前を代替テキストとして付ける。隣に名前を表示するなら、アバターは飾り扱いにする。'
			}
		}
	],
	sources: [
		{
			label: 'MUI: Avatar',
			url: 'https://mui.com/material-ui/react-avatar/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Understanding Success Criterion 1.1.1: Non-text Content (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
