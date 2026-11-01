import type { ComponentData } from '#lib/types.js';

export default {
	id: 'tag',
	category: 'data',
	names: { en: 'Tag', ja: 'タグ' },
	aliases: [
		{ name: 'Chip', source: 'MUI', url: 'https://mui.com/material-ui/react-chip/' },
		{ name: 'チップタグ', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/chip-tag/' },
		{ name: 'チップラベル', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/chip-label/' }
	],
	summary: {
		en: 'A short keyword label used to categorize content or show an applied filter.',
		ja: '内容の分類や、適用中の絞り込みを示す短いキーワードのラベルです。'
	},
	appearance: {
		en: 'A small rounded label with a short word. Selectable tags look like pill-shaped buttons and change color with a check mark when chosen. Removable tags have a small “×” at the end.',
		ja: '短い単語の入った小さな角丸のラベルです。選べるタグは丸いボタンの形で、選ぶと色が変わりチェックの印が付きます。外せるタグは末尾に小さな「×」があります。'
	},
	behavior: [
		{
			en: 'Display-only tags only label content with a status or category, such as “Open”, and are not interactive.',
			ja: '表示だけのタグは、「受付中」のような状態や分類を示すだけで、操作できません。'
		},
		{
			en: 'Selectable tags are toggle buttons with `aria-pressed`, so screen readers announce whether each one is chosen.',
			ja: '選べるタグは `aria-pressed` を持つトグルボタンにするので、選ばれているかどうかをスクリーンリーダーが読み上げます。'
		},
		{
			en: 'Removable tags can be dismissed, for example to clear a filter. Each “×” is a button named after its tag, such as “Remove Red”.',
			ja: '外せるタグは絞り込みの解除などに使います。「×」はそれぞれボタンで、「赤を外す」のようにタグ名を含む名前を付けます。'
		},
		{
			en: 'After removing a tag, this demo moves focus to the next tag’s button (or the previous one if it was the last) so keyboard users do not lose their place.',
			ja: 'このデモではタグを外したあと、キーボード利用者が迷わないよう、次のタグ（最後のタグだったときは前のタグ）のボタンにフォーカスを移します。'
		},
		{
			en: 'In this demo, a chosen tag shows a check mark as well as a color change, so the choice is not shown by color alone.',
			ja: 'このデモでは、選んだタグに色の変化だけでなくチェックの印も付け、選択を色だけで示さないようにしています。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves between the selectable tags and the remove buttons. Display-only tags are skipped.', ja: '選べるタグと外すボタンの間を移動します。表示だけのタグには止まりません。' } },
		{
			key: 'Enter / Space',
			action: {
				en: 'On a selectable tag, chooses it or clears the choice. On a remove button, removes the tag and moves focus to the next one (or the previous one if it was the last).',
				ja: '選べるタグでは、選ぶか選択を外します。外すボタンでは、タグを外し、次のタグ（最後のタグだったときは前のタグ）へフォーカスを移します。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Display-only tag', ja: '表示だけのタグ' },
			description: {
				en: 'Shows a status or category that the content already has. The Digital Agency Design System calls it a chip label, and Carbon a read-only tag.',
				ja: '内容がすでに持っている状態や分類を示すものです。デジタル庁デザインシステムではチップラベル、Carbon では read-only tag と呼びます。'
			}
		},
		{
			name: { en: 'Selectable tag', ja: '選択できるタグ' },
			description: {
				en: 'Can be turned on or off, often to filter content on the page. Carbon calls it a selectable tag.',
				ja: 'オン・オフを切り替えられるものです。ページ内の内容の絞り込みに使うことが多いです。Carbon では selectable tag と呼びます。'
			}
		},
		{
			name: { en: 'Removable tag', ja: '外せるタグ' },
			description: {
				en: 'Shows a value the user chose or entered, with a “×” to remove it. The Digital Agency Design System calls it a chip tag, and Carbon a dismissible tag.',
				ja: '利用者が選んだ値や入力した値を示し、「×」で外せるものです。デジタル庁デザインシステムではチップタグ、Carbon では dismissible tag と呼びます。'
			}
		}
	],
	usage: [
		{
			en: 'A removable chip shows a value the user chose or entered, such as a filter or a recipient. Do not use it for removals that cannot be undone, or for a tag that must always stay.',
			ja: '× で外せるチップは、絞り込みの条件や宛先など、利用者が選んだ値や入力した値に使います。取り消せない削除や、常に残しておくべきタグには使いません。'
		},
		{
			en: 'A display-only chip shows a status or category. Always write the meaning as text, not by color alone. Colors can help tell categories apart, but too many make them harder to distinguish.',
			ja: '表示だけのチップは状態や分類に使います。意味は色だけで示さず、必ず文字で書きます。色は分類の見分けに役立ちますが、使いすぎるとかえって見分けにくくなります。'
		}
	],
	misuse: [
		{
			pattern: { en: 'Telling statuses or categories apart only by the tag’s color', ja: '状態や分類の違いをタグの色だけで示す' },
			harm: {
				en: 'People with color vision deficiency, many older people and people with partial sight, and anyone on a monochrome display cannot get information that is shown only by color.',
				ja: '色覚に特性のある人、色が見分けにくい高齢者や弱視の人、白黒の画面を使う人には、色だけで示した情報が伝わりません。'
			},
			instead: {
				en: 'Write the status or category as a word in the tag, and add an icon if it helps.',
				ja: 'タグの中に状態や分類を言葉で書き、必要ならアイコンも添えます。'
			}
		},
		{
			pattern: {
				en: 'Labeling items “Only a few left” or “Popular” when that is not true',
				ja: '事実でないのに「残りわずか」「人気」のタグを付ける'
			},
			harm: {
				en: 'Users believe stock is about to run out or that many others want the item, so they decide in a hurry without comparing options and misjudge its value.',
				ja: '利用者は在庫がなくなりそうだ、ほかの人も欲しがっていると思い込み、選択肢を比べないまま急いで決めてしまい、商品の価値を見誤ります。'
			},
			instead: {
				en: 'Show stock or popularity tags only when they come from real data, such as the actual stock count.',
				ja: '在庫や人気のタグは、実際の在庫数など本当のデータにもとづくときだけ表示します。'
			},
			deceptive: true
		}
	],
	related: [
		{
			id: 'badge',
			diff: {
				en: 'A tag stands on its own as a label for content; a badge is attached to another element to show a count or status.',
				ja: 'タグは単独で内容のラベルとして置き、バッジは別の要素に付けて件数や状態を示します。'
			}
		}
	],
	sources: [
		{
			label: 'Carbon Design System: Tag',
			url: 'https://carbondesignsystem.com/components/tag/usage/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MUI: Chip',
			url: 'https://mui.com/material-ui/react-chip/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「チップタグ」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/chip-tag/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「チップラベル」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/chip-label/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Understanding Success Criterion 1.4.1: Use of Color (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Deceptive Patterns: Fake scarcity',
			url: 'https://www.deceptive.design/types/fake-scarcity',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		},
		{
			label: 'WAI-ARIA APG: Button Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Inclusive Components: A Todo List',
			url: 'https://inclusive-components.design/a-todo-list/',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
