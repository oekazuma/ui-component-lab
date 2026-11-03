import type { ComponentData } from '#lib/types.js';

export default {
	id: 'popover',
	category: 'overlay',
	names: { en: 'Popover', ja: 'ポップオーバー' },
	aliases: [
		{ name: 'Toggletip', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/toggletip/usage/' }
	],
	searchTerms: ['ポップアップ'],
	summary: {
		en: 'A small panel that opens next to a button and closes when the user clicks elsewhere.',
		ja: 'ボタンの近くに開き、外側をクリックすると閉じる小さなパネルです。'
	},
	appearance: {
		en: 'A small card with a border and shadow, placed right next to the button that opened it. It can hold a title, text, and buttons.',
		ja: '枠線と影のある小さなカードが、開いたボタンのすぐ隣に出ます。見出し・文章・ボタンを入れられます。'
	},
	behavior: [
		{
			en: 'Opens and closes when the button is pressed.',
			ja: 'ボタンを押すと開き、もう一度押すと閉じます。'
		},
		{
			en: 'Clicking outside or pressing Esc closes it (“light dismiss”).',
			ja: '外側をクリックするか Esc を押すと閉じます（ライトディスミス）。'
		},
		{
			en: 'Unlike a modal, the rest of the page stays usable while it is open.',
			ja: 'モーダルと違い、開いている間もページの他の部分を操作できます。'
		},
		{
			en: 'This demo uses the HTML `popover` attribute; where CSS anchor positioning is not supported, it opens in the middle of the screen.',
			ja: 'このデモは HTML の `popover` 属性を使っています。CSS のアンカー配置に対応していないブラウザでは、画面の中央に出ます。'
		},
		{
			en: 'In this demo, it explains the shipping fee in an order summary, and holds a link to more details and a Close button.',
			ja: 'このデモでは、注文内容の送料の決まり方を説明し、中に詳しい説明へのリンクと「閉じる」ボタンを置いています。'
		},
		{
			en: 'With the native `popover` attribute, moving focus out of it does not close it; it stays open until the button, an outside click or Esc closes it.',
			ja: 'ネイティブの `popover` 属性では、フォーカスが外へ出ても閉じません。ボタン、外側のクリック、Esc のどれかで閉じるまで開いたままです。'
		}
	],
	keyboard: [
		{ key: 'Enter / Space', action: { en: 'Opens or closes the popover.', ja: 'ポップオーバーを開閉します。' } },
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'From the button, moves into the popover’s contents, then on to the rest of the page. The popover stays open after focus leaves it.',
				ja: 'ボタンから、ポップオーバーの中身へ、さらにページの続きへ移動します。フォーカスが外へ出てもポップオーバーは開いたままです。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the popover and returns focus to the button.',
				ja: 'ポップオーバーを閉じ、ボタンにフォーカスを戻します。'
			}
		}
	],
	related: [
		{
			id: 'tooltip',
			diff: {
				en: 'A popover opens on click and can contain buttons; a tooltip shows on hover or focus and holds only text (Material Design 3’s rich tooltip, which can have buttons and links, is the exception).',
				ja: 'ポップオーバーはクリックで開いてボタンも入れられ、ツールチップはホバーやフォーカスで出て文字だけを持ちます（ボタンやリンクも持てる Material Design 3 のリッチツールチップは例外です）。'
			}
		},
		{
			id: 'modal',
			diff: {
				en: 'A popover leaves the page usable and closes on an outside click; a modal blocks the page until it is closed.',
				ja: 'ポップオーバーは開いたままページを操作でき、外側のクリックで閉じます。モーダルは閉じるまでページを操作できません。'
			}
		},
		{
			id: 'context-menu',
			diff: {
				en: 'A popover is a panel of any content next to its button; a context menu lists actions for an item and opens where it is right-clicked.',
				ja: 'ポップオーバーは、ボタンの隣に好きな内容を出すパネルです。コンテキストメニューは項目に対する操作を並べ、右クリックした場所に開きます。'
			}
		},
		{
			id: 'bottom-sheet',
			diff: {
				en: 'A popover opens next to the button that opened it and leaves the page usable; a bottom sheet is anchored to the bottom edge of the screen, and a modal one dims the page.',
				ja: 'ポップオーバーは開いたボタンの隣に出てページを操作でき、ボトムシートは画面の下端に固定され、モーダルのものはページを暗くします。'
			}
		}
	],
	sources: [
		{
			label: 'MDN: popover',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Open UI: Popover API (Explainer)',
			url: 'https://open-ui.org/components/popover.research.explainer/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Carbon Design System: Toggletip',
			url: 'https://carbondesignsystem.com/components/toggletip/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Material Design 3: Tooltips (guidelines)',
			url: 'https://m3.material.io/components/tooltips/guidelines',
			checkedAt: '2026-11-03'
		}
	]
} satisfies ComponentData;
