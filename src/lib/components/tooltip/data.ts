import type { ComponentData } from '#lib/types.js';

export default {
	id: 'tooltip',
	category: 'overlay',
	names: { en: 'Tooltip', ja: 'ツールチップ' },
	aliases: [],
	summary: {
		en: 'A short note that appears near an element while it is hovered or focused.',
		ja: '要素にマウスを乗せたりフォーカスしたりしている間だけ、近くに出る短い説明。'
	},
	appearance: {
		en: 'A small dark label, often with a little arrow, just above or below the element it describes.',
		ja: '説明する要素のすぐ上か下に出る、小さな暗い色のラベル。小さな矢印が付くことが多い。'
	},
	behavior: [
		{
			en: 'Appears after a short delay on hover or keyboard focus, and disappears when the pointer leaves or focus moves away.',
			ja: 'マウスを乗せるかキーボードでフォーカスすると少し遅れて表示され、ポインターが離れるかフォーカスが移ると消える。'
		},
		{
			en: 'It never receives focus, so it should not contain links or buttons.',
			ja: 'ツールチップ自体はフォーカスを受けないため、リンクやボタンを入れてはいけない。'
		},
		{
			en: 'The element points to the tooltip with aria-describedby, so screen readers read it as a description.',
			ja: '要素から aria-describedby でツールチップを参照し、スクリーンリーダーに説明として読ませる。'
		},
		{
			en: 'The APG Tooltip pattern is still marked as work in progress.',
			ja: 'APG の Tooltip パターンは、まだ作業中と明記されている。'
		}
	],
	keyboard: [
		{ key: 'Tab', action: { en: 'Focusing the element shows the tooltip.', ja: '要素にフォーカスするとツールチップが出る。' } },
		{ key: 'Esc', action: { en: 'Hides the tooltip.', ja: 'ツールチップを消す。' } }
	],
	related: [
		{
			id: 'popover',
			diff: {
				en: 'A tooltip shows on hover or focus and holds only text; a popover opens on click and can contain buttons and links.',
				ja: 'ツールチップはホバーやフォーカスで出て文字だけを持ち、ポップオーバーはクリックで開いてボタンやリンクも入れられる。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Tooltip Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
