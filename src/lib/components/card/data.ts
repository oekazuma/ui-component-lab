import type { ComponentData } from '#lib/types.js';

export default {
	id: 'card',
	category: 'data',
	names: { en: 'Card', ja: 'カード' },
	aliases: [],
	summary: {
		en: 'A box that groups the content and actions about one topic, such as a product or an article.',
		ja: '商品や記事など、1つの話題についての内容と操作をまとめた箱。'
	},
	appearance: {
		en: 'A rectangle with rounded corners and a border or shadow, often with an image at the top, then a title, short text, and buttons.',
		ja: '角の丸い長方形で、枠線か影がある。上に画像、その下に見出し・短い文・ボタンが並ぶことが多い。'
	},
	behavior: [
		{
			en: 'Cards are usually laid out in a grid so the user can scan and compare them.',
			ja: '一覧で見比べられるよう、格子状に並べることが多い。'
		},
		{
			en: 'If the whole card is a link, it should contain no other buttons or links; this demo has a button, so only the button is interactive.',
			ja: 'カード全体をリンクにするなら、中に別のボタンやリンクを置かない。このデモはボタンがあるため、操作できるのはボタンだけにしている。'
		},
		{
			en: 'Each card is an <article> named by its heading.',
			ja: '各カードは見出しを名前にした <article> にする。'
		}
	],
	keyboard: [
		{
			key: 'Tab',
			action: { en: 'Moves to the buttons or links in the card.', ja: 'カード内のボタンやリンクへ移動する。' }
		},
		{
			key: 'Enter / Space',
			action: { en: 'Uses the focused button.', ja: 'フォーカス中のボタンを押す。' }
		}
	],
	usage: [
		{
			en: 'If the whole card is clickable, do not put links or buttons inside it.',
			ja: 'カード全体を押せるようにするなら、中にリンクやボタンを置かない。'
		},
		{
			en: 'Separate cards with an outline of at least 3:1 contrast instead of relying on a shadow alone.',
			ja: '影だけに頼らず、背景とのコントラスト比 3:1 以上の枠線で区切る。'
		}
	],
	related: [
		{
			id: 'list',
			diff: {
				en: 'Cards give each item room for an image and actions; a list stacks items compactly in rows.',
				ja: 'カードは1件ごとに画像や操作を置く余裕があり、リストは項目を行で詰めて並べる。'
			}
		}
	],
	sources: [
		{
			label: 'MUI: Card',
			url: 'https://mui.com/material-ui/react-card/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「カード」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/card/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
