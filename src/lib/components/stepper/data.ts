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
			en: 'In this demo, the steps themselves are not interactive. The current step is marked with `aria-current="step"`, and finished steps have hidden text saying so.',
			ja: 'このデモでは段階の表示そのものは操作できない。現在の段階には `aria-current="step"` を付け、終わった段階には読み上げ用の「完了」を添えている。'
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
			en: 'For a short wait such as loading, use a progress bar. For moving between pages in a sequence, use pagination.',
			ja: '読み込み待ちのような一時的な状態にはプログレスインジケーターを、順番に並んだページの行き来にはページネーションを使う。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Asking in a later step for information the user already entered in an earlier step',
				ja: '前の段階で入力した内容を、後の段階でもう一度入力させる'
			},
			harm: {
				en: 'People with cognitive, learning or memory disabilities have to recall earlier answers. They may make mistakes or give up on the process.',
				ja: '認知障害や学習障害、記憶に困難のある人は、前に入力した内容を思い出さなければならない。入力を誤ったり、手続きをあきらめたりすることがある。'
			},
			instead: {
				en: 'Fill in what the user already entered, or let them choose it, for example with a "Same as shipping address" checkbox.',
				ja: '入力済みの内容をあらかじめ入れておくか、選べるようにする。例えば「お届け先と同じ」のチェックボックスを置く。'
			}
		},
		{
			pattern: {
				en: 'Making cancellation or account deletion take many more steps than signing up',
				ja: '申し込みは少ない段階で済むのに、解約や退会には多くの段階を踏ませる'
			},
			harm: {
				en: 'Users who want to leave are kept away from it. Some give up and keep paying for a service they no longer need.',
				ja: 'やめたい利用者が、その操作から遠ざけられる。あきらめて、もう要らないサービスに払い続ける人も出る。'
			},
			instead: {
				en: 'Let users cancel in about as many steps as it took to sign up, and show the way to cancel where they can find it.',
				ja: '申し込みと同じくらいの段階数で解約できるようにし、解約の入り口を見つけやすい場所に置く。'
			},
			deceptive: true
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
		},
		{
			label: 'Apple Human Interface Guidelines: Steppers',
			url: 'https://developer.apple.com/design/human-interface-guidelines/steppers',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Understanding Success Criterion 3.3.7: Redundant Entry (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Deceptive Patterns: Hard to cancel',
			url: 'https://www.deceptive.design/types/hard-to-cancel',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
