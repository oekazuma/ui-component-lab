import type { ComponentData } from '#lib/types.js';

export default {
	id: 'button-group',
	category: 'action',
	names: { en: 'Button group', ja: 'ボタングループ' },
	aliases: [
		{ name: 'Button group', source: 'U.S. Web Design System', url: 'https://designsystem.digital.gov/components/button-group/' },
		{ name: 'Button group', source: 'Bootstrap', url: 'https://getbootstrap.com/docs/5.3/components/button-group/' },
		{ name: 'Button Group', source: 'MUI', url: 'https://mui.com/material-ui/react-button-group/' },
		{ name: 'ButtonGroup', source: 'Primer', url: 'https://primer.style/product/components/button-group/guidelines/' },
		{ name: 'Button group', source: 'Atlassian Design System', url: 'https://atlassian.design/components/button/button-group/usage' }
	],
	summary: {
		en: 'A set of related buttons placed side by side, each running its own action, such as Save, Save as draft and Cancel.',
		ja: '「保存する」「下書き保存」「キャンセル」のように、関係するボタンを並べたものです。ボタンはそれぞれの操作を実行します。'
	},
	appearance: {
		en: 'Two or three buttons in a row, often with one filled as the main action and the others in a quieter style. Some design systems leave a gap between the buttons, and others join them into one bar. In this demo, “Save”, “Save as draft” and “Cancel” sit in a row with a gap between them and wrap onto the next row on a narrow screen. The result of each press appears in the line below.',
		ja: '2つか3つのボタンが1列に並び、主な操作のボタンを塗りつぶし、ほかを控えめな見た目にすることが多いです。デザインシステムによって、ボタンの間をあけるものと、1本の帯のようにつなげるものがあります。このデモでは「保存する」「下書き保存」「キャンセル」が間をあけて並び、狭い画面では次の行に折り返します。押した結果は下の行に出ます。'
	},
	behavior: [
		{
			en: 'Each button runs its own action when pressed. The group does not mark any button as selected.',
			ja: '各ボタンは押すとそれぞれの操作を実行します。グループのどのボタンも、選ばれた状態にはなりません。'
		},
		{
			en: 'The group itself is not a focus target, and each button is its own Tab stop, so three buttons are three Tab stops. Primer says a button group becomes a single Tab stop, with the cursor keys moving between the buttons, only when it is given `role="toolbar"`, which makes it a toolbar.',
			ja: 'グループ自体にはフォーカスが止まらず、ボタンごとに Tab の止まる場所があります。3つのボタンなら Tab の止まる場所は3か所です。Primer によると、ボタングループの Tab の止まる場所が1か所になり、ボタンの間をカーソルキーで移るようになるのは、`role="toolbar"` を付けたときだけで、そうするとツールバーになります。'
		},
		{
			en: 'Material Design 3’s accessibility page says Tab lands on the first button and the arrow keys move between the items, while its key table lists Tab for moving between the buttons and the arrow keys for moving inside the component. This page and demo follow the plain Tab behavior that Primer describes.',
			ja: 'Material Design 3 のアクセシビリティのページは、Tab が最初のボタンに届き、項目の間は矢印キーで移ると書いています。一方、同じページのキーの表では、Tab はボタンの間の移動、矢印キーは部品の中の移動としています。このページとデモは、Primer が書いている、Tab だけで移るふつうの動作に合わせています。'
		},
		{
			en: 'Bootstrap asks for `role="group"` and a name from `aria-label` or `aria-labelledby`, so screen readers announce the buttons as a group. USWDS asks for `role="group"` when the buttons are not in a list. MDN describes the `group` role as a collection of items with related functionality that is left out of a page summary.',
			ja: 'Bootstrap は、スクリーンリーダーがボタンをひとまとまりとして読み上げるように、`role="group"` と、`aria-label` か `aria-labelledby` による名前を求めています。USWDS は、ボタンをリストに入れないとき `role="group"` を付けるよう求めています。MDN は `group` ロールを、関連する機能を持つ項目の集まりで、ページの要約には含めないものと説明しています。'
		},
		{
			en: 'The sources do not agree on this. The GOV.UK example is a plain `<div>` with no role, Primer says the grouping is purely visual unless `role="toolbar"` is added, and Material Design 3 says the container does not need a label.',
			ja: 'この点は資料によって違います。GOV.UK の例は役割のない `<div>` で、Primer は `role="toolbar"` を足さない限りグループ分けは見た目だけだとし、Material Design 3 は入れ物に名前は要らないとしています。'
		},
		{
			en: 'In this demo, the group is a `<div role="group">` named with `aria-label`, and each button is a native `<button>`. The browser handles Tab and Enter / Space, and the demo adds no key handling. The result of a press appears in a `role="status"` line.',
			ja: 'このデモでは、グループを `aria-label` で名前を付けた `<div role="group">` にし、各ボタンをネイティブの `<button>` にしています。Tab や Enter / Space の操作はブラウザが受け持ち、デモはキー操作を足していません。押した結果は `role="status"` の行に出ます。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves focus to the next or previous button in the group, one button at a time, and then out of the group.',
				ja: 'グループの中の次または前のボタンへ、1つずつフォーカスを移し、端まで来るとグループの外へ出ます。'
			}
		},
		{
			key: 'Enter / Space',
			action: {
				en: 'Presses the focused button.',
				ja: 'フォーカス中のボタンを押します。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Separate buttons', ja: '間をあけて並べる型' },
			description: {
				en: 'Each button stays a separate element with a gap between them, as in the default button group of USWDS and the GOV.UK example. USWDS stacks these buttons in a column on mobile screens.',
				ja: '各ボタンを別の要素として、間をあけて並べるものです。USWDS の標準のボタングループと GOV.UK の例がこの形で、USWDS はモバイルの画面ではボタンを縦に積みます。'
			}
		},
		{
			name: { en: 'Joined buttons', ja: 'つなげる型' },
			description: {
				en: 'USWDS has a segmented button group that shows discrete buttons in a row as a single element, for categorically related controls such as switching between views. It shows the current state by button style, with the default style for the current button and the outline style for the others. That is a selection, so this site covers it as the segmented control, not as a plain button group.',
				ja: 'USWDS には、独立したボタンを1列に並べ、1つの要素として見せるセグメンテッドのボタングループがあります。分類として関係のある操作部品、たとえば表示を切り替えるものに使います。現在の状態はボタンの見た目で示し、現在のボタンは標準の見た目、それ以外はアウトラインにします。これは選択なので、このサイトでは通常のボタングループでなく、セグメンテッドコントロールとして扱っています。'
			}
		},
		{
			name: { en: 'Vertical', ja: '縦に積む型' },
			description: {
				en: 'Bootstrap has a vertical button group, and MUI sets it with an `orientation` prop. The Digital Agency Design System says buttons are often stacked vertically on mobile devices, in the same meaning-based order as on desktop.',
				ja: 'Bootstrap には縦に積むボタングループがあり、MUI は `orientation` プロパティで切り替えます。デジタル庁デザインシステムは、モバイルではボタンを縦に積むことが多く、順序の意味はデスクトップと同じにするとしています。'
			}
		},
		{
			name: { en: 'With a menu', ja: 'メニューを加える型' },
			description: {
				en: 'Bootstrap nests a dropdown button inside a group. MUI and Primer build a split button out of a button group, with a main action and a button that opens a list of related actions. This site covers that as the split button.',
				ja: 'Bootstrap はグループの中にドロップダウンのボタンを入れ子にします。MUI と Primer はボタングループで、主な操作のボタンと関連する操作の一覧を開くボタンからなるスプリットボタンを作ります。このサイトではスプリットボタンとして扱っています。'
			}
		}
	],
	usage: [
		{
			en: 'Group only buttons whose actions are related, such as a main action with an alternative in a form, or Back and Next through sequential content (USWDS). Do not group buttons just because they sit close together (Primer).',
			ja: 'まとめるのは、操作に関係があるボタンだけにします。たとえば、フォームの主な操作とその代わりの操作、順に進む内容での「戻る」「次へ」です（USWDS）。近くに置くというだけでまとめません（Primer）。'
		},
		{
			en: 'Carbon uses a button group for two or three actions the user weighs against each other, groups more than three into menu buttons, and suggests a toolbar for interfaces that need many common actions.',
			ja: 'Carbon は、ボタングループを、利用者が見比べる2つか3つの操作に使います。3つを超える操作はメニューボタンにまとめ、よく使う操作がたくさん要る画面ではツールバーを考えるよう勧めています。'
		},
		{
			en: 'Keep to one main action. Carbon asks for one high-emphasis button, Primer treats a primary button in a group as rare and allows at most one, and Atlassian lets the main action be the primary button.',
			ja: '主な操作は1つにします。Carbon は強調の強いボタンを1つにするよう求め、Primer はグループに主なボタンを入れるのはまれで、入れても1つまでとし、Atlassian は主な操作を主なボタンにしてよいとしています。'
		},
		{
			en: 'The name means different things. Here it means buttons that each run an action, as in USWDS, GOV.UK, Atlassian and Primer. Material Design 3’s connected button group holds toggle buttons for single or multiple selection and replaces its segmented button, which this site covers as the segmented control. Primer says to use a segmented control, not a button group, to show a selection.',
			ja: '名前が指すものは資料によって違います。ここでは、USWDS、GOV.UK、Atlassian、Primer と同じく、それぞれが操作を実行するボタンを指します。Material Design 3 のコネクテッドボタングループは、1つまたは複数を選ぶトグルボタンを入れるもので、セグメンテッドボタンに代わるものです。このサイトではセグメンテッドコントロールとして扱っています。Primer は、選んだ状態を示すときはボタングループでなくセグメンテッドコントロールを使うよう書いています。'
		},
		{
			en: 'Bootstrap and USWDS use `role="group"` for a button group and `role="toolbar"` for a toolbar, and Bootstrap builds a toolbar out of several groups. The WAI-ARIA Authoring Practices Guide says to use a toolbar only when it has three or more controls.',
			ja: 'Bootstrap と USWDS は、ボタングループには `role="group"`、ツールバーには `role="toolbar"` を使います。Bootstrap は複数のグループを組み合わせてツールバーを作ります。WAI-ARIA Authoring Practices Guide は、ツールバーにするのは操作部品が3つ以上のときだけとしています。'
		},
		{
			en: 'Material Design 3 keeps a button group on one line and lets the buttons at its end collapse into an overflow menu on small screens. This demo wraps onto the next row instead, so every button stays visible at 320 px wide and at 200% text size.',
			ja: 'Material Design 3 は、ボタングループを1行に収め、小さい画面では端のボタンをオーバーフローメニューにしまえるとしています。このデモは代わりに次の行へ折り返し、幅320pxや文字を200%にしても、すべてのボタンが見えるようにしています。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Putting a destructive action, such as delete, in the same group as non-destructive ones',
				ja: '削除のような破壊的な操作を、そうでない操作と同じグループに入れる'
			},
			harm: {
				en: 'USWDS says mixing them can lead to input mistakes.',
				ja: '混ぜると、入力の間違いにつながることがあると USWDS は書いています。'
			},
			instead: {
				en: 'Look for another placement or structure, such as giving the destructive action its own place apart from the group.',
				ja: '別の配置や構成を考えます。たとえば、破壊的な操作をグループから離して、別の場所に置きます。'
			}
		},
		{
			pattern: {
				en: 'Putting many buttons in one group',
				ja: '1つのグループに多くのボタンを入れる'
			},
			harm: {
				en: 'Carbon says too many calls to action overwhelm and confuse people, and Primer says a group of too many buttons can be overwhelming.',
				ja: '行動を促すボタンが多すぎると利用者が圧倒され、混乱すると Carbon は書いています。Primer も、ボタンが多すぎるグループは圧倒されかねないとしています。'
			},
			instead: {
				en: 'Keep it to two or three buttons. Put more than three actions in menu buttons, or consider a toolbar for interfaces that need many common actions (Carbon).',
				ja: '2つか3つのボタンにとどめます。3つを超える操作はメニューボタンにまとめ、よく使う操作がたくさん要る画面ではツールバーを考えます（Carbon）。'
			}
		}
	],
	related: [
		{
			id: 'button',
			diff: {
				en: 'A button group puts a few related buttons together, each running its own action; a button is a single control that runs one action.',
				ja: 'ボタングループは関連するボタンを数個まとめて並べ、それぞれが自分の操作を実行します。ボタンは1つの操作を実行する単独の部品です。'
			}
		},
		{
			id: 'toolbar',
			diff: {
				en: 'A button group is a few related buttons that each take a Tab stop; a toolbar is a single Tab stop with the arrow keys moving between its controls.',
				ja: 'ボタングループは関連するボタンを数個並べ、Tab はボタンごとに止まります。ツールバーは Tab の止まる場所が1か所で、中の操作部品の間を矢印キーで移ります。'
			}
		},
		{
			id: 'segmented-control',
			diff: {
				en: 'A button group has each button run its own action and marks none as chosen; a segmented control shows which of its segments is chosen.',
				ja: 'ボタングループはそれぞれのボタンが自分の操作を実行し、選ばれた状態を示しません。セグメンテッドコントロールは、区画のうちどれが選ばれているかを示します。'
			}
		},
		{
			id: 'split-button',
			diff: {
				en: 'A button group is a set of separate buttons, each running its own action; a split button is one main action joined to an arrow button that opens a menu of related actions.',
				ja: 'ボタングループは別々のボタンを並べ、それぞれが自分の操作を実行します。スプリットボタンは主な操作に、関連する操作のメニューを開く矢印のボタンをつなげたものです。'
			}
		}
	],
	sources: [
		{
			label: 'U.S. Web Design System: Button group',
			url: 'https://designsystem.digital.gov/components/button-group/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'GOV.UK Design System: Button (Grouping buttons)',
			url: 'https://design-system.service.gov.uk/components/button/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Bootstrap: Button group',
			url: 'https://getbootstrap.com/docs/5.3/components/button-group/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MUI: Button Group',
			url: 'https://mui.com/material-ui/react-button-group/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Primer: ButtonGroup guidelines',
			url: 'https://primer.style/product/components/button-group/guidelines/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Primer: ButtonGroup accessibility',
			url: 'https://primer.style/product/components/button-group/accessibility/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Atlassian Design System: Button group usage',
			url: 'https://atlassian.design/components/button/button-group/usage',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Carbon Design System: Button usage',
			url: 'https://carbondesignsystem.com/components/button/usage/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Material Design 3: Button groups guidelines',
			url: 'https://m3.material.io/components/button-groups/guidelines',
			checkedAt: '2026-11-03'
		},
		{
			label: 'Material Design 3: Button groups accessibility',
			url: 'https://m3.material.io/components/button-groups/accessibility',
			checkedAt: '2026-11-03'
		},
		{
			label: 'MDN: ARIA group role',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/group_role',
			checkedAt: '2026-11-03'
		},
		{
			label: 'WAI-ARIA APG: Toolbar Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/',
			checkedAt: '2026-11-03'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ボタン（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/button/usage/',
			checkedAt: '2026-11-03'
		}
	]
} satisfies ComponentData;
