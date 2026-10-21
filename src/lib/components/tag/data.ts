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
		ja: '内容の分類や、適用中の絞り込みを示す短いキーワードのラベル。'
	},
	appearance: {
		en: 'A small pill-shaped label with a short word. Removable tags have a small “×” at the end.',
		ja: '短い単語の入った小さな角丸のラベル。外せるタグは末尾に小さな「×」がある。'
	},
	behavior: [
		{
			en: 'Read-only tags only label content; removable tags can be dismissed, for example to clear a filter.',
			ja: '表示だけのタグは内容にラベルを付けるだけで、外せるタグは絞り込みの解除などに使う。'
		},
		{
			en: 'Each “×” is a button named after its tag, such as “Remove Red”.',
			ja: '「×」はそれぞれボタンで、「赤を外す」のようにタグ名を含む名前を付ける。'
		},
		{
			en: 'After removing a tag, this demo moves focus to the next tag’s button (or the previous one if it was the last) so keyboard users do not lose their place.',
			ja: 'このデモではタグを外したあと、キーボード利用者が迷わないよう、隣のタグのボタンにフォーカスを移す。'
		}
	],
	keyboard: [
		{ key: 'Tab', action: { en: 'Moves between the remove buttons.', ja: '外すボタンの間を移動する。' } },
		{
			key: 'Enter / Space',
			action: {
				en: 'Removes the tag and moves focus to the next one (or the previous one if it was the last).',
				ja: 'タグを外し、隣のタグへフォーカスを移す。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Selectable tag', ja: '選択できるタグ' },
			description: {
				en: 'Can be turned on or off, often to filter content on the page.',
				ja: 'オン・オフを切り替えられるもの。ページ内の内容の絞り込みに使うことが多い。'
			}
		}
	],
	usage: [
		{
			en: 'A removable chip shows a value the user chose or entered. Do not use it for removals that cannot be undone.',
			ja: '× で外せるチップは、利用者が選んだ値や入力した値に使う。取り消せない削除には使わない。'
		},
		{
			en: 'A display-only chip shows a status or category.',
			ja: '表示だけのチップは状態や分類に使う。'
		}
	],
	misuse: [
		{
			pattern: { en: 'Telling statuses or categories apart only by the tag’s color', ja: '状態や分類の違いをタグの色だけで示す' },
			harm: {
				en: 'People with color vision deficiency, many older people and people with partial sight, and anyone on a monochrome display cannot get information that is shown only by color.',
				ja: '色覚に特性のある人、色が見分けにくい高齢者や弱視の人、白黒の画面を使う人には、色だけで示した情報が伝わらない。'
			},
			instead: {
				en: 'Write the status or category as a word in the tag, and add an icon if it helps.',
				ja: 'タグの中に状態や分類を言葉で書き、必要ならアイコンも添える。'
			}
		},
		{
			pattern: {
				en: 'Labeling items “Only a few left” or “Popular” when that is not true',
				ja: '事実でないのに「残りわずか」「人気」のタグを付ける'
			},
			harm: {
				en: 'Users believe stock is about to run out or that many others want the item, so they decide in a hurry without comparing options and misjudge its value.',
				ja: '利用者は在庫がなくなりそうだ、ほかの人も欲しがっていると思い込み、選択肢を比べないまま急いで決めてしまい、商品の価値を見誤る。'
			},
			instead: {
				en: 'Show stock or popularity tags only when they come from real data, such as the actual stock count.',
				ja: '在庫や人気のタグは、実際の在庫数など本当のデータにもとづくときだけ表示する。'
			},
			deceptive: true
		}
	],
	related: [
		{
			id: 'badge',
			diff: {
				en: 'A tag stands on its own as a label for content; a badge is attached to another element to show a count or status.',
				ja: 'タグは単独で内容のラベルとして置き、バッジは別の要素に付けて件数や状態を示す。'
			}
		}
	],
	sources: [
		{
			label: 'Carbon Design System: Tag',
			url: 'https://carbondesignsystem.com/components/tag/usage/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MUI: Chip',
			url: 'https://mui.com/material-ui/react-chip/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「チップタグ」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/chip-tag/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「チップラベル」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/chip-label/',
			checkedAt: '2026-10-21'
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
		}
	]
} satisfies ComponentData;
