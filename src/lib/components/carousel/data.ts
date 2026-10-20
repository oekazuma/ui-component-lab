import type { ComponentData } from '#lib/types.js';

export default {
	id: 'carousel',
	category: 'disclosure',
	names: { en: 'Carousel', ja: 'カルーセル' },
	aliases: [
		{ name: 'Slide show', source: 'WAI-ARIA APG', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/' },
		{ name: 'Image rotator', source: 'WAI-ARIA APG', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/' }
	],
	summary: {
		en: 'Shows a set of slides one at a time, with buttons to move to the previous or next one.',
		ja: '複数のスライドを1枚ずつ表示し、ボタンで前後のスライドへ切り替える部品。'
	},
	appearance: {
		en: 'A wide panel showing one image or card, with arrow buttons at the sides and small dots below that show which slide is visible.',
		ja: '1枚の画像やカードを表示する横長の枠で、左右に矢印のボタン、下に今どのスライドかを示す小さな点が並ぶ。'
	},
	behavior: [
		{
			en: 'The previous and next buttons switch slides; this demo wraps around from the last slide to the first.',
			ja: '前後のボタンでスライドが切り替わる。このデモは最後のスライドから最初に戻る。'
		},
		{
			en: 'Switching slides does not move focus off the button, and the new slide is announced through a live region.',
			ja: '切り替えてもフォーカスはボタンに残り、新しいスライドはライブリージョンで読み上げられる。'
		},
		{
			en: 'If slides rotate automatically, there must be a button to stop rotation, and rotation stops while the carousel has focus or the mouse is over it.',
			ja: '自動で切り替わる場合は止めるボタンが必要で、フォーカスやマウスがカルーセル上にある間は切り替えを止める。'
		}
	],
	keyboard: [
		{
			key: 'Tab',
			action: { en: 'Moves between the carousel buttons.', ja: 'カルーセルのボタン間を移動する。' }
		},
		{
			key: 'Enter / Space',
			action: {
				en: 'Shows the previous or next slide, keeping focus on the button.',
				ja: '前または次のスライドを表示する。フォーカスはボタンに残る。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Auto-rotating', ja: '自動再生' },
			description: {
				en: 'Changes slides on a timer, with a stop/start button placed first inside the carousel.',
				ja: '一定時間ごとにスライドが切り替わるもの。停止・再開のボタンをカルーセル内の最初に置く。'
			}
		},
		{
			name: { en: 'Tabbed', ja: 'タブ付き' },
			description: {
				en: 'The dots are tabs that jump to a specific slide and follow the Tabs keyboard pattern.',
				ja: '下の点がタブになっていて、特定のスライドへ直接移動できるもの。キー操作はタブと同じ。'
			}
		}
	],
	related: [
		{
			id: 'tabs',
			diff: {
				en: 'A carousel steps through slides in order with previous and next buttons; tabs let the user jump to any panel by its name.',
				ja: 'カルーセルは前後のボタンで順に切り替え、タブは名前の付いたパネルへ直接切り替える。'
			}
		},
		{
			id: 'pagination',
			diff: {
				en: 'A carousel shows one slide of a small set in place; pagination moves through pages of a long list.',
				ja: 'カルーセルは少数のスライドをその場で1枚ずつ見せ、ページネーションは長い一覧のページを移動する。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Carousel (Slide Show or Image Rotator) Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
