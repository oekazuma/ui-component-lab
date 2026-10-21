import type { ComponentData } from '#lib/types.js';

export default {
	id: 'popover',
	category: 'overlay',
	names: { en: 'Popover', ja: 'ポップオーバー' },
	aliases: [
		{ name: 'Toggletip', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/toggletip/usage/' }
	],
	summary: {
		en: 'A small panel that opens next to a button and closes when the user clicks elsewhere.',
		ja: 'ボタンの近くに開き、外側をクリックすると閉じる小さなパネル。'
	},
	appearance: {
		en: 'A small card with a border and shadow, placed right next to the button that opened it. It can hold a title, text, and buttons.',
		ja: '枠線と影のある小さなカードが、開いたボタンのすぐ隣に出る。見出し・文章・ボタンを入れられる。'
	},
	behavior: [
		{
			en: 'Opens and closes when the button is pressed.',
			ja: 'ボタンを押すと開き、もう一度押すと閉じる。'
		},
		{
			en: 'Clicking outside or pressing Esc closes it (“light dismiss”).',
			ja: '外側をクリックするか Esc を押すと閉じる（ライトディスミス）。'
		},
		{
			en: 'Unlike a modal, the rest of the page stays usable while it is open.',
			ja: 'モーダルと違い、開いている間もページの他の部分を操作できる。'
		},
		{
			en: 'This demo uses the HTML `popover` attribute; where CSS anchor positioning is not supported, it opens in the middle of the screen.',
			ja: 'このデモは HTML の `popover` 属性を使っている。CSS のアンカー配置に対応していないブラウザでは、画面の中央に出る。'
		}
	],
	keyboard: [
		{ key: 'Enter / Space', action: { en: 'Opens or closes the popover.', ja: 'ポップオーバーを開閉する。' } },
		{
			key: 'Tab',
			action: {
				en: 'From the button, moves into the popover’s contents.',
				ja: 'ボタンから、ポップオーバーの中身へ移動する。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the popover and returns focus to the button.',
				ja: 'ポップオーバーを閉じ、ボタンにフォーカスを戻す。'
			}
		}
	],
	related: [
		{
			id: 'tooltip',
			diff: {
				en: 'A popover opens on click and can contain buttons; a tooltip shows on hover or focus and holds only text.',
				ja: 'ポップオーバーはクリックで開いてボタンも入れられ、ツールチップはホバーやフォーカスで出て文字だけを持つ。'
			}
		},
		{
			id: 'modal',
			diff: {
				en: 'A popover leaves the page usable and closes on an outside click; a modal blocks the page until it is closed.',
				ja: 'ポップオーバーは開いたままページを操作でき、外側のクリックで閉じる。モーダルは閉じるまでページを操作できない。'
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
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
