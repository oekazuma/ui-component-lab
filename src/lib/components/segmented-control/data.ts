import type { ComponentData } from '#lib/types.js';

export default {
	id: 'segmented-control',
	category: 'input',
	names: { en: 'Segmented control', ja: 'セグメンテッドコントロール' },
	aliases: [
		{ name: 'Segmented', source: 'Ant Design', url: 'https://ant.design/components/segmented' },
		{ name: 'Content switcher', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/content-switcher/usage/' }
	],
	summary: {
		en: 'A row of joined buttons of equal width where exactly one is selected, used to switch between closely related options or views.',
		ja: '同じ幅のボタンをつなげて横に並べ、そのうち1つだけを選ぶ部品。近い関係にある選択肢や表示を切り替える。'
	},
	appearance: {
		en: 'A single bar divided into a few segments with short labels, such as Day, Week, Month, and Year. The selected segment is filled in, and the content under the bar follows it.',
		ja: '1本のバーを数個の区画に分け、「日」「週」「月」「年」のような短いラベルを付けたもの。選んでいる区画は塗りつぶされ、バーの下の内容がそれに合わせて変わる。'
	},
	behavior: [
		{
			en: 'Exactly one segment is selected at all times, and choosing another moves the selection to it. The first segment is usually selected at the start.',
			ja: '選ばれている区画は常に1つで、別の区画を選ぶと選択がそちらへ移る。ふつうは最初から先頭の区画が選ばれている。'
		},
		{
			en: 'The whole control is a single Tab stop, and the arrow keys move the selection between segments.',
			ja: '部品全体で Tab キーが止まるのは1か所だけで、区画の間は矢印キーで選択を移す。'
		},
		{
			en: 'This demo is a group of native radio buttons in a `<fieldset>`, styled as segments. The browser keeps exactly one selected and handles the arrow keys and the Tab stop. The `<legend>` gives the group its name and is visually hidden.',
			ja: 'このデモは `<fieldset>` の中のネイティブのラジオボタンを区画の見た目にしたもの。常に1つだけが選ばれた状態を保つこと、矢印キーの操作、Tab キーで止まる場所は、ブラウザが受け持つ。グループの名前は `<legend>` で付け、見た目には隠している。'
		},
		{
			en: 'In this demo, the selected period changes the step count shown under the control.',
			ja: 'このデモでは、選んだ期間に合わせて、部品の下に出る歩数が変わる。'
		}
	],
	keyboard: [
		{
			key: 'Space',
			action: {
				en: 'Selects the focused segment.',
				ja: 'フォーカスしている区画を選ぶ。'
			}
		},
		{
			key: '↑ / ↓',
			action: {
				en: 'Same as ← / →.',
				ja: '← / → と同じ。'
			}
		},
		{
			key: '← / →',
			action: {
				en: 'Moves to the previous / next segment and selects it. From the last segment, → moves to the first; from the first, ← moves to the last.',
				ja: '前・次の区画へ移って選ぶ。最後の区画で → を押すと最初へ、最初の区画で ← を押すと最後へ回る。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves into the control at the selected segment, and then out of it.',
				ja: '部品に入るときは選んでいる区画へ移り、次に押すと部品の外へ出る。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Icon only', ja: 'アイコンだけ' },
			description: {
				en: 'Each segment shows only an icon, such as list and grid views, when space is short or the icons are clear. Every segment still needs a name, given with `aria-label` or visually hidden text.',
				ja: '場所が狭いときや、一覧表示と格子表示のようにアイコンで意味が分かるとき、区画にアイコンだけを置くもの。区画にはそれぞれ `aria-label` や見た目に隠した文字で名前を付ける。'
			}
		},
		{
			name: { en: 'Full width', ja: '幅いっぱい' },
			description: {
				en: 'Stretches to the width of its container, as in this demo.',
				ja: 'このデモのように、入れ物の幅いっぱいに広げるもの。'
			}
		},
		{
			name: { en: 'Built as tabs', ja: 'タブとして作る型' },
			description: {
				en: 'When the segments switch views of the content under them, Carbon Design System builds it as a `tablist` of `role="tab"` buttons and lets the team choose whether the arrow keys switch the view right away or only move focus.',
				ja: '区画で下の内容の表示を切り替えるとき、Carbon Design System は `role="tab"` のボタンを並べた `tablist` として作る。矢印キーで表示をすぐ切り替えるか、フォーカスだけを移すかは作る側が選ぶ。'
			}
		},
		{
			name: { en: 'Multiple choice', ja: '複数選択' },
			description: {
				en: 'On macOS, a segmented control can also let people turn on several segments at once, such as bold, italic, and underline.',
				ja: 'macOS では、太字・斜体・下線のように、複数の区画を同時にオンにできるものもある。'
			}
		}
	],
	usage: [
		{
			en: 'Label segments with short nouns or noun phrases, such as Day or List, not with actions.',
			ja: '区画のラベルは「日」「一覧」のような短い名詞にし、操作を表す言葉にしない。'
		},
		{
			en: 'Keep the segments the same width.',
			ja: '区画の幅はそろえる。'
		},
		{
			en: 'For switching between completely separate parts of an app or a page, use tabs instead. For a yes/no or on/off choice, use a switch.',
			ja: 'アプリやページのまったく別の部分を切り替えるなら、タブを使う。はい・いいえやオン・オフの選択には、スイッチを使う。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Putting many segments in one control',
				ja: '1つの部品に多くの区画を並べる'
			},
			harm: {
				en: 'Too many segments are hard to take in and take a long time to move through.',
				ja: '区画が多すぎると、ひと目で把握しにくく、目当ての区画まで移るのにも時間がかかる。'
			},
			instead: {
				en: 'Keep it to about five segments on a phone and five to seven on a wide screen. For more options, use a select or radio buttons.',
				ja: 'スマートフォンでは5つ程度、広い画面でも5〜7つ程度までにする。選択肢がそれより多いなら、セレクトボックスやラジオボタンにする。'
			}
		},
		{
			pattern: {
				en: 'Mixing text segments and icon segments in one control',
				ja: '1つの部品に文字の区画とアイコンの区画を混ぜる'
			},
			harm: {
				en: 'The control looks disjointed and confusing.',
				ja: '部品がまとまりなく見え、分かりにくくなる。'
			},
			instead: {
				en: 'Use only text or only icons in each control.',
				ja: '1つの部品の中では、文字だけかアイコンだけにそろえる。'
			}
		}
	],
	related: [
		{
			id: 'tabs',
			diff: {
				en: 'A segmented control switches between closely related options or views of the same content; tabs switch between separate panels, each with its own content.',
				ja: 'セグメンテッドコントロールは近い関係にある選択肢や同じ内容の表示を切り替え、タブはそれぞれ別の内容を持つパネルを切り替える。'
			}
		},
		{
			id: 'radio',
			diff: {
				en: 'A segmented control shows a few short choices as joined buttons in one row; radio buttons list choices with round markers and can hold longer labels.',
				ja: 'セグメンテッドコントロールは数個の短い選択肢をつながったボタンとして1列に並べ、ラジオボタンは丸い印を付けて選択肢を並べ、長いラベルも置ける。'
			}
		},
		{
			id: 'toggle-button',
			diff: {
				en: 'A segmented control picks one of several segments; a toggle button turns a single option on or off.',
				ja: 'セグメンテッドコントロールは複数の区画から1つを選び、トグルボタンは1つの機能をオンかオフにする。'
			}
		}
	],
	sources: [
		{
			label: 'Apple Human Interface Guidelines: Segmented controls',
			url: 'https://developer.apple.com/design/human-interface-guidelines/segmented-controls',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Ant Design: Segmented',
			url: 'https://ant.design/components/segmented',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Carbon Design System: Content switcher',
			url: 'https://carbondesignsystem.com/components/content-switcher/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Carbon Design System: Content switcher accessibility',
			url: 'https://carbondesignsystem.com/components/content-switcher/accessibility/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
