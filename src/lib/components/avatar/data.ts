import type { ComponentData } from '#lib/types.js';

export default {
	id: 'avatar',
	category: 'data',
	names: { en: 'Avatar', ja: 'アバター' },
	aliases: [],
	summary: {
		en: 'A small picture, initial, or icon that stands for a person or account.',
		ja: '人やアカウントを表す、小さな写真・頭文字・アイコンです。'
	},
	appearance: {
		en: 'A circle (sometimes a rounded square) with a photo or a colored background and an initial. Several can overlap in a row with a “+N” at the end.',
		ja: '写真か、色の付いた背景に頭文字を入れた丸（角丸の四角のこともある）です。複数を少し重ねて並べ、最後に「+N」を付けることもあります。'
	},
	behavior: [
		{
			en: 'When there is no photo, or it fails to load, it falls back to an initial or a generic icon.',
			ja: '写真がないときや読み込めないときは、代わりに頭文字や汎用のアイコンを表示します。'
		},
		{
			en: 'If the person’s name is already next to it, the avatar is decorative (`alt=""`), so the name is not read twice; otherwise it needs the name as alternative text.',
			ja: '隣に名前があるならアバターは飾り扱い（`alt=""`）にして、名前が2回読み上げられないようにします。ないなら名前を代替テキストとして付けます。'
		},
		{
			en: 'In this demo, the member list shows no names, so the photo has the name as its `alt`, and each initial is hidden from screen readers with the full name read instead. In the line below, the name is shown next to the photo, so the photo is decorative.',
			ja: 'このデモのメンバー一覧には名前が見えていないので、写真の `alt` に名前を入れ、頭文字はスクリーンリーダーから隠して代わりにフルネームを読ませています。下の行では写真の隣に名前があるので、写真は飾り扱いにしています。'
		},
		{
			en: 'In this demo, the second photo is an empty data URL that fails to load without a network request, and the `error` event switches it to the initial.',
			ja: 'このデモでは、2人目の写真を、通信せずに読み込みに失敗する空の data URL にしています。`error` イベントで頭文字に切り替わります。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. An avatar that opens a profile is a link or button and follows its keys.',
				ja: 'なし。プロフィールを開くアバターはリンクかボタンにし、そのキー操作に従います。'
			}
		}
	],
	misuse: [
		{
			pattern: { en: 'Showing an avatar with no name anywhere', ja: '名前をどこにも示さずにアバターだけを置く' },
			harm: {
				en: 'People who have difficulty seeing the picture and use a screen reader or braille cannot get information that exists only in the picture, so they cannot tell whose avatar it is.',
				ja: '画像を見て内容をつかむことが難しく、スクリーンリーダーや点字を使う人には、画像にしかない情報が届かず、誰のアバターなのかが分かりません。'
			},
			instead: {
				en: 'Give the avatar the person’s name as alternative text, or show the name next to it and mark the avatar as decorative.',
				ja: 'アバターに名前を代替テキストとして付けます。隣に名前を表示するなら、アバターは飾り扱いにします。'
			}
		}
	],
	sources: [
		{
			label: 'MUI: Avatar',
			url: 'https://mui.com/material-ui/react-avatar/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Understanding Success Criterion 1.1.1: Non-text Content (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
