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
		},
		{
			en: 'In this demo, hidden panels stay in the page, so a switch turned on under “Notifications” is still on after you visit another tab.',
			ja: 'このデモでは、隠したパネルもページに残すので、「通知」で入れたスイッチはほかのタブを見たあとも入ったまま。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves focus into the tab list (to the selected tab), then to the panel. Shift + Tab goes back the same way.',
				ja: 'タブリスト（選択中のタブ）にフォーカスし、次に押すとパネルへ移る。Shift + Tab では同じ順に戻る。'
			}
		},
		{
			key: '← / →',
			action: {
				en: 'Moves to the previous / next tab and selects it. From the last tab, → moves to the first; from the first, ← moves to the last.',
				ja: '前・次のタブへ移って選択する。最後のタブで → を押すと最初へ、最初のタブで ← を押すと最後へ回る。'
			}
		},
		{ key: 'Home / End', action: { en: 'Moves to the first / last tab and selects it.', ja: '最初・最後のタブへ移って選択する。' } }
	],
	variations: [
		{
			name: { en: 'Tab-key navigation', ja: 'Tab キーナビゲーション' },
			description: {
				en: 'Each tab is a link to its panel, without the ARIA tab roles, and the Tab key moves through the tabs like any links. The Digital Agency Design System uses this for information and government service sites.',
				ja: '各タブはパネルへのリンクで、ARIA のタブのロールを使わず、Tab キーで普通のリンクと同じように移る。デジタル庁デザインシステムは、情報提供サイトや行政サービスのサイトにこの型を使う。'
			}
		},
		{
			name: { en: 'Arrow-key navigation', ja: '矢印キーナビゲーション' },
			description: {
				en: 'Follows the APG Tabs pattern with `role="tab"`, as in this demo. The Digital Agency Design System uses this for web applications and admin screens.',
				ja: 'このデモのように `role="tab"` を使い、APG の Tabs パターンに従う型。デジタル庁デザインシステムは、ウェブアプリケーションや管理画面にこの型を使う。'
			}
		},
		{
			name: { en: 'Link list', ja: 'リンクリスト' },
			description: {
				en: 'Each tab is a separate page. The tab for the current page has `aria-current="page"` and no `href`.',
				ja: 'タブごとに別のページになっているもの。今のページのタブには `aria-current="page"` を付け、`href` を省く。'
			}
		},
		{
			name: { en: 'Manual activation', ja: '手動アクティベーション' },
			description: {
				en: 'The arrow keys only move focus, and Enter or Space shows the focused tab’s panel. Use it when showing a panel takes time, such as loading its content.',
				ja: '矢印キーではフォーカスだけが移り、Enter か Space でそのタブのパネルを表示する。内容の読み込みなど、パネルの表示に時間がかかるときに使う。'
			}
		},
		{
			name: { en: 'Vertical tabs', ja: '縦並びのタブ' },
			description: {
				en: 'The tabs are stacked on the left or right of the panel. The tab list gets `aria-orientation="vertical"`, and ↑ / ↓ move between tabs.',
				ja: 'パネルの左か右にタブを縦に並べるもの。タブリストに `aria-orientation="vertical"` を付け、↑ / ↓ でタブ間を移る。'
			}
		}
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
				en: 'Tabs let the user jump to any panel by its name; a carousel picks slides by number or steps through them with previous and next buttons.',
				ja: 'タブは名前の付いたパネルへ直接切り替え、カルーセルは番号でスライドを選ぶか前後のボタンで順に切り替える。'
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
		},
		{
			id: 'menubar',
			diff: {
				en: 'A tab shows its own panel of content in place; a menubar item opens a list of commands.',
				ja: 'タブはその場で自分のパネルの内容を見せ、メニューバーの項目は操作の一覧を開く。'
			}
		},
		{
			id: 'segmented-control',
			diff: {
				en: 'Tabs switch between separate panels, each with its own content; a segmented control switches between closely related options or views of the same content.',
				ja: 'タブはそれぞれ別の内容を持つパネルを切り替え、セグメンテッドコントロールは近い関係にある選択肢や同じ内容の表示を切り替える。'
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
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「タブ」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/tab/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: tab',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/tab',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
