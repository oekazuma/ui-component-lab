import type { ComponentData } from '#lib/types.js';

export default {
	id: 'rating',
	category: 'input',
	names: { en: 'Rating', ja: '評価（星）' },
	aliases: [
		{ name: 'Rating', source: 'MUI', url: 'https://mui.com/material-ui/react-rating/' },
		{ name: 'Rate', source: 'Ant Design', url: 'https://ant.design/components/rate' },
		{ name: 'Rating', source: 'Fluent UI React v9', url: 'https://storybooks.fluentui.dev/react/?path=/docs/components-rating--docs' }
	],
	summary: {
		en: 'A row of stars for giving something a score, such as 4 out of 5.',
		ja: '星の数で、5段階中の4のように点数を付ける部品です。'
	},
	appearance: {
		en: 'Five stars in a row. The stars up to the chosen score are filled, and the rest are outlines. The score is often also written next to them.',
		ja: '星が5つ横に並びます。選んだ点数までの星が塗られ、残りは輪郭だけになります。横に点数が文字でも書かれることが多いです。'
	},
	behavior: [
		{
			en: 'Clicking a star chooses that score. Moving the pointer over the stars previews the score before clicking.',
			ja: '星をクリックするとその点数になります。マウスを星の上に動かすと、クリックする前にその点数を見せます。'
		},
		{
			en: 'It is a radio group with the inputs visually hidden: each star is a native radio button with a label such as “3 stars”. Tab moves into the group as one stop, and the arrow keys choose a score, as with any radio group.',
			ja: '入力を見えなくしたラジオボタンのグループで作ります。星はそれぞれ「星3つ」のようなラベルを持つネイティブのラジオボタンです。ふつうのラジオボタンと同じく、Tab ではグループ全体が1か所として扱われ、矢印キーで点数を選びます。'
		},
		{
			en: 'A radio button cannot be cleared once chosen, so there is also a hidden “No rating” option for 0 stars, chosen at first. When focus is on it, the whole row of stars gets a focus ring.',
			ja: 'ラジオボタンは一度選ぶと外せないので、0にあたる見えない「評価なし」の選択肢も置き、最初はそれを選んでおきます。そこにフォーカスがあるときは、星の並び全体にフォーカスの枠を出します。'
		},
		{
			en: 'Chosen stars differ in shape (★ and ☆) as well as color, and the score is written below in words.',
			ja: '選んだ星は、色だけでなく形（★と☆）でも区別し、点数は下に文字でも書きます。'
		},
		{
			en: 'In this demo, the arrow keys wrap from 5 stars to “No rating”, as native radio buttons do.',
			ja: 'このデモでは、ネイティブのラジオボタンと同じく、矢印キーで星5つから「評価なし」へ回ります。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: { en: 'Moves into the group (to the chosen score) and out of it.', ja: 'グループ（選ばれている点数）へ入ったり、グループから出たりします。' }
		},
		{
			key: '↑ / ←',
			action: { en: 'Chooses one star fewer. From “No rating” it goes to 5 stars.', ja: '星を1つ減らします。「評価なし」からは星5つになります。' }
		},
		{
			key: '↓ / →',
			action: { en: 'Chooses one more star. From 5 stars it goes back to “No rating”.', ja: '星を1つ増やします。星5つからは「評価なし」に戻ります。' }
		}
	],
	variations: [
		{
			name: { en: 'Half stars', ja: '半分の星' },
			description: {
				en: 'Allows scores such as 3.5, by choosing the left or right half of a star.',
				ja: '星の左半分か右半分を選んで、3.5のような点数も付けられるものです。'
			}
		},
		{
			name: { en: 'Read-only rating', ja: '表示だけの評価' },
			description: {
				en: 'Shows a score, such as an average of reviews, that cannot be changed. It is one image for screen readers, named in words such as “4 out of 5 stars”, and is not focusable.',
				ja: 'レビューの平均のように、変えられない点数を見せるものです。スクリーンリーダーには「5段階中の4」のような名前を付けた1つの画像として伝え、フォーカスは当たりません。'
			}
		}
	],
	usage: [
		{
			en: 'Give each star a label in words, such as “1 star”, so screen readers say the score and not just “star”.',
			ja: '星にはそれぞれ「星1つ」のような文字のラベルを付け、スクリーンリーダーが「星」だけでなく点数を読み上げるようにします。'
		},
		{
			en: 'Do not show the chosen score by color alone. Change the shape of the stars or write the score as text too.',
			ja: '選んだ点数を色だけで示しません。星の形を変えるか、点数を文字でも書きます。'
		}
	],
	related: [
		{
			id: 'radio',
			diff: {
				en: 'A rating is a radio group drawn as stars, where the choices are ordered scores; radio buttons list choices with their own labels.',
				ja: '評価は、選択肢が順に並んだ点数になっているラジオボタンのグループを星の形で見せたものです。ラジオボタンは選択肢をそれぞれのラベル付きで並べます。'
			}
		},
		{
			id: 'slider',
			diff: {
				en: 'A rating chooses one of a few scores, such as 1 to 5 stars, each a separate option; a slider chooses any value along a track by moving a knob.',
				ja: '評価は、星1〜5のような数個の点数から1つを選び、点数はそれぞれ別の選択肢になります。スライダーは、つまみを溝に沿って動かして、範囲内の値を選びます。'
			}
		}
	],
	sources: [
		{
			label: 'W3C WAI Tutorials: Custom Controls',
			url: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'WAI-ARIA APG: Rating Radio Group Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MUI: Rating',
			url: 'https://mui.com/material-ui/react-rating/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Ant Design: Rate',
			url: 'https://ant.design/components/rate',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Fluent UI React v9: Rating',
			url: 'https://storybooks.fluentui.dev/react/?path=/docs/components-rating--docs',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
