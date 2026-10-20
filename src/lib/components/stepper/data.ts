import type { ComponentData } from '#lib/types.js';

export default {
	id: 'stepper',
	category: 'navigation',
	names: { en: 'Stepper', ja: 'ステップナビゲーション' },
	aliases: [
		{ name: 'Progress indicator', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/building-blocks/core/components/progress-indicator' },
		{ name: 'Steps', source: 'Ant Design', url: 'https://ant.design/components/steps' },
		{ name: 'ステップナビゲーション', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/step-navigation/' }
	],
	summary: {
		en: 'Shows the steps of a multi-page procedure, such as an application, and which step the user is on.',
		ja: '申請など複数画面にまたがる手続きの段階と、今どの段階にいるかを示す部品。'
	},
	appearance: {
		en: 'Numbered circles in a row (or column) with a name under each. Finished steps show a check mark and the current one is highlighted.',
		ja: '番号の付いた丸が横（または縦）に並び、それぞれに名前が付く。終わった段階にはチェックが付き、現在の段階は強調される。'
	},
	behavior: [
		{
			en: 'The display changes as the user moves through the procedure with buttons such as “Next”.',
			ja: '「次へ」などのボタンで手続きを進めると、表示が切り替わる。'
		},
		{
			en: 'In this demo, the steps themselves are not interactive. The current step is marked with aria-current="step", and finished steps have hidden text saying so.',
			ja: 'このデモでは段階の表示そのものは操作できない。現在の段階には aria-current="step" を付け、終わった段階には読み上げ用の「完了」を添えている。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None for the step display. The demo’s Back and Next buttons use Tab and Enter / Space.',
				ja: '段階の表示にはない。デモの「戻る」「次へ」は Tab と Enter / Space で操作する。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Vertical', ja: '縦並び' },
			description: {
				en: 'Steps stacked vertically, useful when the names are long or on narrow screens.',
				ja: '段階を縦に並べたもの。名前が長いときや、幅の狭い画面に向く。'
			}
		},
		{
			name: { en: 'Clickable steps', ja: '段階へ移動できるもの' },
			description: {
				en: 'Finished steps are links or buttons so the user can go back to them.',
				ja: '終わった段階をリンクやボタンにして、戻れるようにしたもの。'
			}
		}
	],
	usage: [
		{
			en: 'Split the task into logical steps so the user can see the whole procedure before starting.',
			ja: '作業を意味のまとまりで段階に分け、始める前に手続きの全体が分かるようにする。'
		},
		{
			en: 'Show the state of each step: done, current, skipped or with errors.',
			ja: '各段階の状態（完了・現在・スキップ・エラー）を表示する。'
		},
		{
			en: 'For a short wait such as loading, use a progress indicator. For moving between pages in a sequence, use pagination.',
			ja: '読み込み待ちのような一時的な状態にはプログレスインジケーターを、順番に並んだページの行き来にはページネーションを使う。'
		}
	],
	related: [
		{
			id: 'tabs',
			diff: {
				en: 'A stepper shows steps completed in a fixed order; tabs can be opened in any order.',
				ja: 'ステップナビゲーションの段階は決まった順に進め、タブはどの順番でも開ける。'
			}
		},
		{
			id: 'progress-bar',
			diff: {
				en: 'A stepper shows the user’s place in a multi-page procedure; a progress bar shows progress within one task.',
				ja: 'ステップナビゲーションは複数画面の手続きの中での現在地を示し、プログレスバーは1つの作業の進み具合を示す。'
			}
		},
		{
			id: 'pagination',
			diff: {
				en: 'A stepper shows distinct steps of a procedure; pagination moves through pages of the same kind of content.',
				ja: 'ステップナビゲーションは内容の異なる手順を示し、ページネーションは同じ種類の内容のページを行き来する。'
			}
		},
		{
			id: 'number-input',
			diff: {
				en: 'Apple’s “stepper” is the − / + control of a number input, not a step indicator.',
				ja: 'Apple の「Stepper」は数値入力の − / + の部品で、段階の表示ではない。'
			}
		}
	],
	sources: [
		{
			label: 'Carbon Design System: Progress indicator',
			url: 'https://carbondesignsystem.com/building-blocks/core/components/progress-indicator',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Ant Design: Steps',
			url: 'https://ant.design/components/steps',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ステップナビゲーション」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/step-navigation/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
