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
			en: 'After removing a tag, this demo moves focus to the next tag’s button so keyboard users do not lose their place.',
			ja: 'このデモではタグを外したあと、キーボード利用者が迷わないよう、隣のタグのボタンにフォーカスを移す。'
		}
	],
	keyboard: [
		{ key: 'Tab', action: { en: 'Moves between the remove buttons.', ja: '外すボタンの間を移動する。' } },
		{
			key: 'Enter / Space',
			action: {
				en: 'Removes the tag and moves focus to the next one.',
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
			en: 'A display-only chip shows a status or category. Do not tell them apart by color alone.',
			ja: '表示だけのチップは状態や分類に使い、色だけで区別しない。'
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
		}
	]
} satisfies ComponentData;
