import type { ComponentData } from '#lib/types.js';

export default {
	id: 'badge',
	category: 'data',
	names: { en: 'Badge', ja: 'バッジ' },
	aliases: [],
	summary: {
		en: 'A small marker on another element, such as an unread count on a notification button.',
		ja: '通知ボタンの未読件数のように、別の要素に重ねて付ける小さな印です。'
	},
	appearance: {
		en: 'A small round or pill-shaped label, usually red, in the top-right corner of an icon or button, holding a number or just a dot.',
		ja: 'アイコンやボタンの右上に重なる小さな丸や角丸の印で、多くは赤色です。数字が入るか、点だけのこともあります。'
	},
	behavior: [
		{
			en: 'Updates when the count changes and disappears at zero; in this demo, pressing a button clears its badge.',
			ja: '件数が変わると更新され、0になると消えます。このデモではボタンを押すとバッジが消えます。'
		},
		{
			en: 'Large numbers are capped, such as “99+” for 120.',
			ja: '大きな数は、120件を「99+」とするように頭打ちにします。'
		},
		{
			en: 'The badge itself is hidden from screen readers; the count is put into the name of the button it belongs to, such as “Notifications, 3 unread”. A capped count goes into the name as shown, “99+”, so that voice control users can say what they see.',
			ja: 'バッジ自体はスクリーンリーダーから隠し、件数は「通知、未読3件」のように持ち主のボタンの名前に含めます。頭打ちにした件数は見えているとおり「99+」と名前に入れ、音声で操作する人が見たままの言葉で呼べるようにします。'
		},
		{
			en: 'In this demo, the buttons show only an icon, so each gets its name from `aria-label`. A dot carries no number, so the name says “new” instead.',
			ja: 'このデモのボタンはアイコンだけなので、名前は `aria-label` で付けます。ドットには数がないため、名前に「新着あり」と入れます。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None for the badge. The button it sits on uses Enter / Space.',
				ja: 'バッジ自体にはありません。付いているボタンは Enter / Space で押せます。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Count', ja: '件数' },
			description: {
				en: 'A number, capped at a maximum such as “99+”. It is usually hidden at zero.',
				ja: '数字を入れるものです。「99+」のように上限で頭打ちにし、0のときはふつう隠します。'
			}
		},
		{
			name: { en: 'Dot', ja: 'ドット' },
			description: {
				en: 'A small dot with no number, showing only that there is something new.',
				ja: '数字のない小さな点で、新しいものがあることだけを示すものです。'
			}
		}
	],
	related: [
		{
			id: 'tag',
			diff: {
				en: 'A badge is attached to another element to show a count or status; a tag stands on its own as a label for content.',
				ja: 'バッジは別の要素に付けて件数や状態を示し、タグは単独で内容のラベルとして置きます。'
			}
		}
	],
	sources: [
		{
			label: 'Understanding Success Criterion 2.5.3: Label in Name (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html',
			checkedAt: '2026-10-21'
		},
		{
			label: 'MUI: Badge',
			url: 'https://mui.com/material-ui/react-badge/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
