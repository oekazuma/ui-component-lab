import type { ComponentData } from '#lib/types.js';

export default {
	id: 'badge',
	category: 'data',
	names: { en: 'Badge', ja: 'バッジ' },
	aliases: [],
	summary: {
		en: 'A small marker on another element, such as an unread count on a notification button.',
		ja: '通知ボタンの未読件数のように、別の要素に重ねて付ける小さな印。'
	},
	appearance: {
		en: 'A small round or pill-shaped label, usually red, in the top-right corner of an icon or button, holding a number or just a dot.',
		ja: 'アイコンやボタンの右上に重なる小さな丸や角丸の印で、多くは赤い。数字が入るか、点だけのこともある。'
	},
	behavior: [
		{
			en: 'Updates when the count changes and disappears at zero; in this demo, opening the notifications clears it.',
			ja: '件数が変わると更新され、0になると消える。このデモでは通知を開くと消える。'
		},
		{
			en: 'Large numbers are shortened, such as “99+”.',
			ja: '大きな数は「99+」のように省略する。'
		},
		{
			en: 'The badge itself is hidden from screen readers; the count is put into the name of the button it belongs to, such as “Notifications, 3 unread”.',
			ja: 'バッジ自体はスクリーンリーダーから隠し、件数は「通知 3件の未読」のように持ち主のボタンの名前に含める。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None for the badge. The button it sits on uses Enter / Space.',
				ja: 'バッジ自体にはない。付いているボタンは Enter / Space で押せる。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Dot', ja: 'ドット' },
			description: {
				en: 'A small dot with no number, showing only that there is something new.',
				ja: '数字のない小さな点で、新しいものがあることだけを示すもの。'
			}
		}
	],
	related: [
		{
			id: 'tag',
			diff: {
				en: 'A badge is attached to another element to show a count or status; a tag stands on its own as a label for content.',
				ja: 'バッジは別の要素に付けて件数や状態を示し、タグは単独で内容のラベルとして置く。'
			}
		}
	],
	sources: [
		{
			label: 'MUI: Badge',
			url: 'https://mui.com/material-ui/react-badge/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
