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
		ja: '申請など複数画面にまたがる手続きの段階と、今どの段階にいるかを示す部品です。'
	},
	appearance: {
		en: 'Numbered circles in a row (or column) with a name under each. Finished steps show a check mark, skipped steps a dashed circle with “Skipped”, and the current one is highlighted.',
		ja: '番号の付いた丸が横（または縦）に並び、それぞれに名前が付きます。終わった段階にはチェックが、スキップした段階には点線の丸と「スキップ」が付き、現在の段階は強調されます。'
	},
	behavior: [
		{
			en: 'The display changes as the user moves through the procedure with buttons such as “Next”.',
			ja: '「次へ」などのボタンで手続きを進めると、表示が切り替わります。'
		},
		{
			en: 'The current step is marked with `aria-current="step"`, and finished steps have hidden text saying so. Hidden text before the steps, as in the Digital Agency Design System example, tells screen reader users the overall progress, such as “4 steps in total; reached step 2”.',
			ja: '現在の段階には `aria-current="step"` を付け、終わった段階には読み上げ用の「完了」を添えます。段階の並びの前には、デジタル庁デザインシステムの実装例と同じく、「全4ステップ中、2ステップ目まで到達済み」のように全体の進み具合を伝える読み上げ用の文を置きます。'
		},
		{
			en: 'In this demo, every step already reached is a button, so you can go back to a finished step and return. The current step and steps not yet reached are plain text. Pressing a step button moves focus to the heading of that step, because the button turns into plain text.',
			ja: 'このデモでは、一度たどり着いた段階はボタンになり、終わった段階へ戻ってまた先へ進めます。現在の段階とまだたどり着いていない段階はただの文字です。段階のボタンを押すと、そのボタンは文字に変わるので、移った段階の見出しへフォーカスを移します。'
		},
		{
			en: 'In this demo, “Documents” is optional and there is nothing to attach, so moving past it marks it as skipped. The state is shown in words, not only by the dashed circle.',
			ja: 'このデモでは「添付書類」は任意で、添付する操作もないため、先へ進むとスキップ扱いになります。状態は点線の丸だけでなく文字でも示します。'
		},
		{
			en: 'In this demo, the last step’s button says “Submit” instead of “Next”. After submitting, focus moves to the confirmation message.',
			ja: 'このデモでは、最後の段階のボタンは「次へ」ではなく「申請する」になります。申請すると、受付の文へフォーカスが移ります。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves through the step buttons and the Back and Next buttons.',
				ja: '段階のボタンと「戻る」「次へ」の間を移ります。'
			}
		},
		{
			key: 'Enter / Space',
			action: {
				en: 'On a step button, goes to that step and moves focus to its heading. Also presses Back, Next and Submit.',
				ja: '段階のボタンでは、その段階へ移り、見出しへフォーカスを移します。「戻る」「次へ」「申請する」もこのキーで押します。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Vertical', ja: '縦並び' },
			description: {
				en: 'Steps stacked vertically, useful when the names are long or on narrow screens. Carbon recommends the vertical layout whenever possible, for easier reading.',
				ja: '段階を縦に並べたものです。名前が長いときや、幅の狭い画面に向きます。Carbon は読みやすさのため、できるだけ縦に並べるよう勧めています。'
			}
		},
		{
			name: { en: 'Clickable steps', ja: '段階へ移動できるもの' },
			description: {
				en: 'Finished steps are links or buttons so the user can go back to them, as in this demo. Carbon’s interactive progress indicator lets the user move to each step, while Nielsen Norman Group advises not letting users pick a step before finishing the ones before it. With links, the Digital Agency Design System wraps the steps in a `<nav>` with an `aria-label`.',
				ja: 'このデモのように、終わった段階をリンクやボタンにして戻れるようにしたものです。Carbon の操作できるプログレスインジケーターはどの段階へも移れますが、Nielsen Norman Group は前の段階を終えるまで先の段階を選べないようにすることを勧めています。リンクにする場合、デジタル庁デザインシステムは全体を `aria-label` 付きの `<nav>` で囲みます。'
			}
		}
	],
	usage: [
		{
			en: 'Split the task into logical steps so the user can see the whole procedure before starting.',
			ja: '作業を意味のまとまりで段階に分け、始める前に手続きの全体が分かるようにします。'
		},
		{
			en: 'Show the state of each step, such as done, current or with errors. The Digital Agency Design System also marks skipped steps, with a dashed circle.',
			ja: '各段階の状態（完了・現在・エラーなど）を表示します。デジタル庁デザインシステムではスキップした段階も点線の丸で示します。'
		},
		{
			en: 'For a short wait such as loading, use a progress bar. For moving between pages in a sequence, use pagination.',
			ja: '読み込み待ちのような一時的な状態にはプログレスバーを、順番に並んだページの行き来にはページネーションを使います。'
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
				ja: '認知障害や学習障害、記憶に困難のある人は、前に入力した内容を思い出さなければなりません。入力を誤ったり、手続きをあきらめたりすることがあります。'
			},
			instead: {
				en: 'Fill in what the user already entered, or let them choose it, for example with a “Same as shipping address” checkbox.',
				ja: '入力済みの内容をあらかじめ入れておくか、選べるようにします。例えば「お届け先と同じ」のチェックボックスを置きます。'
			}
		},
		{
			pattern: {
				en: 'Making cancellation or account deletion take many more steps than signing up',
				ja: '申し込みは少ない段階で済むのに、解約や退会には多くの段階を踏ませる'
			},
			harm: {
				en: 'Users who want to leave are kept away from it. Some give up and keep paying for a service they no longer need.',
				ja: 'やめたい利用者が、その操作から遠ざけられます。あきらめて、もう要らないサービスの料金を払い続ける人も出ます。'
			},
			instead: {
				en: 'Let users cancel in about as many steps as it took to sign up, and show the way to cancel where they can find it.',
				ja: '申し込みと同じくらいの段階数で解約できるようにし、解約の入り口を見つけやすい場所に置きます。'
			},
			deceptive: true
		}
	],
	related: [
		{
			id: 'tabs',
			diff: {
				en: 'A stepper shows steps completed in a fixed order; tabs can be opened in any order.',
				ja: 'ステップナビゲーションは決まった順に進む段階を示し、タブはどの順番でも開けます。'
			}
		},
		{
			id: 'progress-bar',
			diff: {
				en: 'A stepper shows the user’s place in a multi-page procedure; a progress bar shows progress within one task.',
				ja: 'ステップナビゲーションは複数画面の手続きの中での現在地を示し、プログレスバーは1つの作業の進み具合を示します。'
			}
		},
		{
			id: 'pagination',
			diff: {
				en: 'A stepper shows distinct steps of a procedure; pagination moves through pages of the same kind of content.',
				ja: 'ステップナビゲーションは内容の異なる手順を示し、ページネーションは同じ種類の内容のページを行き来します。'
			}
		},
		{
			id: 'number-input',
			diff: {
				en: 'A stepper here is a step indicator, not what Apple calls a “stepper”, the − / + control of a number input.',
				ja: 'ステップナビゲーションは段階の表示で、Apple が「Stepper」と呼ぶ数値入力の − / + の部品とは別のものです。'
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
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: step-navigation',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/step-navigation',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Apple Human Interface Guidelines: Steppers',
			url: 'https://developer.apple.com/design/human-interface-guidelines/steppers',
			checkedAt: '2026-10-21'
		},
		{
			label: 'MDN: aria-current',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Nielsen Norman Group: Wizards: Definition and Design Recommendations',
			url: 'https://www.nngroup.com/articles/wizards/',
			checkedAt: '2026-10-22'
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
