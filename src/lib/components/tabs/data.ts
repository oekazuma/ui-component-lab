import type { ComponentData } from '#lib/types.js';

export default {
	id: 'tabs',
	category: 'navigation',
	names: { en: 'Tabs', ja: 'タブ' },
	aliases: [
		{ name: 'Tab view', source: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/tab-views' },
		{ name: 'TabList', source: 'Fluent UI React v9', url: 'https://storybooks.fluentui.dev/react/?path=/docs/components-tablist--docs' }
	],
	summary: {
		en: 'Switches between panels of related content, showing one panel at a time.',
		ja: '関連する内容を複数のパネルに分け、1つずつ切り替えて表示する部品。'
	},
	appearance: {
		en: 'A row of labels above a content area. The selected label is highlighted, often with an underline, and only its panel is visible.',
		ja: 'コンテンツ領域の上にラベルが横に並ぶ。選択中のラベルは下線などで強調され、そのパネルだけが表示される。'
	},
	behavior: [
		{
			en: 'Clicking a tab shows its panel and hides the others.',
			ja: 'タブをクリックすると、そのパネルが表示され、他のパネルは隠れる。'
		},
		{
			en: 'Only the selected tab is in the Tab order; arrow keys move between tabs.',
			ja: 'Tab キーで止まるのは選択中のタブだけで、タブ間の移動は矢印キーで行う。'
		},
		{
			en: 'In this demo, moving focus with the arrow keys also selects the tab (automatic activation).',
			ja: 'このデモでは、矢印キーでフォーカスを移すと同時にタブが選択される（自動アクティベーション）。'
		}
	],
	keyboard: [
		{
			key: 'Tab',
			action: {
				en: 'Moves focus into the tab list (to the selected tab), then to the panel.',
				ja: 'タブリスト（選択中のタブ）にフォーカスし、次に押すとパネルへ移る。'
			}
		},
		{
			key: '← / →',
			action: { en: 'Moves to the previous / next tab and selects it.', ja: '前・次のタブへ移って選択する。' }
		},
		{ key: 'Home / End', action: { en: 'Moves to the first / last tab and selects it.', ja: '最初・最後のタブへ移って選択する。' } }
	],
	usage: [
		{
			en: 'Do not use tabs for site navigation, step-by-step flows, filtering, or content users need to compare side by side.',
			ja: 'サイト内の移動、手順の進行、絞り込み、並べて比べたい内容には使わない。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Switching panels on focus alone when a panel takes time to appear',
				ja: '表示に時間がかかるパネルを、フォーカスを移しただけで切り替える'
			},
			harm: {
				en: 'Focus moves slowly from tab to tab, which makes it much harder for keyboard users to move through the tab list.',
				ja: 'タブ間のフォーカスの移動が遅くなり、キーボードで操作する人がタブの並びを効率よく移動しにくくなる。'
			},
			instead: {
				en: 'Switch the panel only when the user presses Enter or Space (manual activation), or load the panel content in advance.',
				ja: 'Enter や Space を押したときだけパネルを切り替える（手動アクティベーション）か、パネルの内容を先に読み込んでおく。'
			}
		}
	],
	related: [
		{
			id: 'carousel',
			diff: {
				en: 'Tabs let the user jump to any panel by its name; a carousel steps through slides in order with previous and next buttons.',
				ja: 'タブは名前の付いたパネルへ直接切り替え、カルーセルは前後のボタンで順に切り替える。'
			}
		},
		{
			id: 'accordion',
			diff: {
				en: 'Tabs show one panel at a time side by side; an accordion stacks sections vertically and can open several at once.',
				ja: 'タブは横に並べて1枚ずつ表示し、アコーディオンは縦に積んで複数を同時に開ける。'
			}
		},
		{
			id: 'stepper',
			diff: {
				en: 'Tabs can be opened in any order; a stepper shows steps that are completed in a fixed order.',
				ja: 'タブはどの順番でも開けるが、ステップナビゲーションの段階は決まった順に進める。'
			}
		}
	],
	sources: [
		{
			label: 'Open UI: Tabs',
			url: 'https://open-ui.org/components/tabs.research',
			checkedAt: '2026-10-20'
		},
		{
			label: 'WAI-ARIA APG: Tabs Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「タブ」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/tab/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
