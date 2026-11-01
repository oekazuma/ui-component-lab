import type { ComponentData } from '#lib/types.js';

export default {
	id: 'card',
	category: 'data',
	names: { en: 'Card', ja: 'カード' },
	aliases: [],
	summary: {
		en: 'A box that groups the content and actions about one topic, such as a product or an article.',
		ja: '商品や記事など、1つの話題についての内容と操作をまとめた箱です。'
	},
	appearance: {
		en: 'A rectangle with rounded corners and a border or shadow, often with an image at the top, then a small category label, a title, short text, and buttons.',
		ja: '角の丸い長方形で、枠線か影があります。上に画像、その下に小さな分類のラベル・見出し・短い文・ボタンが並ぶことが多いです。'
	},
	behavior: [
		{
			en: 'Cards are usually laid out in a grid so the user can scan and compare them. In this demo, the grid drops to fewer columns on narrow screens.',
			ja: '一覧で見比べられるよう、格子状に並べることが多いです。このデモでは、狭い画面では列の数を減らします。'
		},
		{
			en: 'If the whole card is a link, it should contain no other buttons or links. The cards in this demo have a Save button, so only the heading is a link.',
			ja: 'カード全体をリンクにするなら、中に別のボタンやリンクを置きません。このデモのカードには保存ボタンがあるため、見出しだけをリンクにしています。'
		},
		{
			en: 'Each card is an `<article>` named by its heading, and the cards are items of a list so screen readers announce how many there are.',
			ja: '各カードは見出しを名前にした `<article>` にし、カードの並びをリストにして、スクリーンリーダーが件数を伝えられるようにします。'
		},
		{
			en: 'In this demo, the ad card is labeled “Ad” in text and has a dashed border and a different background, so it is not mistaken for the other cards.',
			ja: 'このデモでは、広告のカードに「PR」と文字で示し、破線の枠と別の背景にして、ほかのカードと取り違えないようにしています。'
		},
		{
			en: 'In this demo, the heading links do not go anywhere.',
			ja: 'このデモでは、見出しのリンクを押しても移動しません。'
		},
		{
			en: 'In this demo, each Save button is described by its card’s heading with `aria-describedby`, so a list of buttons still tells which card each one belongs to.',
			ja: 'このデモでは、各カードの「保存」ボタンに `aria-describedby` でカードの見出しを結び、ボタンの一覧で聞いてもどのカードのものか分かるようにしています。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: { en: 'Moves through the heading links and buttons in the cards.', ja: 'カードの中の見出しのリンクとボタンの間を移動します。' }
		},
		{
			key: 'Enter',
			action: { en: 'Follows the focused link, or presses the focused button.', ja: 'フォーカス中のリンクを開きます。ボタンなら押します。' }
		},
		{
			key: 'Space',
			action: { en: 'Presses the focused button.', ja: 'フォーカス中のボタンを押します。' }
		}
	],
	usage: [
		{
			en: 'Separate cards with an outline of at least 3:1 contrast instead of relying on a shadow alone.',
			ja: '影だけに頼らず、背景とのコントラスト比3:1以上の枠線で区切ります。'
		},
		{
			en: 'A card has a container with a visible outline and a title. A label for a category, an image, text, and a sub area with links or buttons can be added. When the title is a link, underline it.',
			ja: 'カードは外周の見えるコンテナと見出しを必ず持ちます。分類などのラベル、画像、本文、リンクやボタンを置くサブエリアは必要に応じて加えます。見出しをリンクにするときは下線を付けます。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Putting links or buttons inside a card that is itself a link',
				ja: 'カード全体をリンクにしたうえで、中にリンクやボタンを置く'
			},
			harm: {
				en: 'Screen readers skip a control nested inside another one. Keyboard users can still reach it with Tab, but no name, role or state is announced, so it becomes an empty stop that tells them nothing.',
				ja: 'スクリーンリーダーは操作部品の中に入れ子になった操作部品を読み飛ばします。キーボードの利用者は Tab でそこへ移動できても、名前も役割も状態も伝わらず、何の手がかりもない場所に止まることになります。'
			},
			instead: {
				en: 'If the card needs its own buttons or links, make only the heading a link and leave the rest of the card unlinked.',
				ja: 'カードの中にボタンやリンクが要るなら、見出しだけをリンクにし、カード全体はリンクにしません。'
			}
		},
		{
			pattern: {
				en: 'Making an ad card look the same as the content cards around it',
				ja: '広告のカードを、周りの記事のカードと同じ見た目で並べる'
			},
			harm: {
				en: 'Users mistake the ad for content or a regular control and click it without meaning to, sometimes ending up on a page or sign-up they did not intend.',
				ja: '利用者は広告を記事やふつうの操作と思い込んで押してしまい、意図しないページや申し込みに進むことがあります。'
			},
			instead: {
				en: 'Label the card as an ad in text, such as “Ad” or “Sponsored”, and give it a look that sets it apart from content cards.',
				ja: '「広告」「PR」のように広告だと文字で示し、記事のカードと見分けられる見た目にします。'
			},
			deceptive: true
		}
	],
	related: [
		{
			id: 'list',
			diff: {
				en: 'Cards give each item room for an image and actions; a list stacks items compactly in rows.',
				ja: 'カードは1件ごとに画像や操作を置く余裕があり、リストは項目を行で詰めて並べます。'
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
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「カード（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/card/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Deque University: Interactive controls must not be nested',
			url: 'https://dequeuniversity.com/rules/axe/4.10/nested-interactive',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Deceptive Patterns: Disguised ads',
			url: 'https://www.deceptive.design/types/disguised-ads',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
