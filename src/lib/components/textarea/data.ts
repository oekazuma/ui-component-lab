import type { ComponentData } from '#lib/types.js';

export default {
	id: 'textarea',
	category: 'input',
	names: { en: 'Textarea', ja: 'テキストエリア' },
	aliases: [
		{ name: 'Text area', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/building-blocks/core/components/text-input' },
		{ name: 'テキストエリア', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/textarea/' }
	],
	summary: {
		en: 'A tall box for typing several lines of free text, such as comments or a description.',
		ja: 'コメントや説明など、複数行の文章を自由に入力する縦長の欄。'
	},
	appearance: {
		en: 'A bordered rectangle several lines tall, with a label above it. A character count often appears below, and the bottom-right corner may have a resize handle.',
		ja: '数行分の高さがある枠付きの長方形で、上にラベルがある。下に文字数が出ることが多く、右下の角に大きさを変えるつまみが付くこともある。'
	},
	behavior: [
		{
			en: 'Enter starts a new line instead of submitting the form.',
			ja: 'Enter を押すとフォームが送信されず、改行になる。'
		},
		{
			en: 'The text scrolls inside the box when it gets longer than the visible lines.',
			ja: '見えている行数より長くなると、欄の中でスクロールする。'
		},
		{
			en: 'This demo shows the remaining characters and lets you type past the limit, showing how many characters are over instead of cutting the text off.',
			ja: 'このデモは残りの文字数を表示する。上限を超えても入力は止めず、何文字超えているかを示す。'
		}
	],
	keyboard: [
		{ key: 'Tab', action: { en: 'Moves focus into or out of the box.', ja: '入力欄へ、または入力欄から移動する。' } },
		{ key: 'Enter', action: { en: 'Inserts a line break.', ja: '改行する。' } },
		{
			key: '← / → / ↑ / ↓',
			action: { en: 'Moves the text cursor.', ja: '文字のカーソルを移動する。' }
		}
	],
	usage: [
		{
			en: 'Free text takes effort to write. Narrow the question first, for example by asking only people who chose “Other”.',
			ja: '自由記述は書く手間が大きい。「その他」を選んだ人にだけ尋ねるなど、先に質問の範囲を絞る。'
		},
		{
			en: 'Put the character limit in the label. For limits of more than about 20 characters, always show a counter.',
			ja: '文字数の上限はラベルに書く。上限がおよそ20文字を超えるなら、文字数のカウンターを常に表示する。'
		},
		{
			en: 'Do not let the limit become visible only through an error. When the text is too long, say so in an error message along with the current count.',
			ja: 'エラーが出て初めて上限が分かる作りにしない。超えたときは、入力済みの文字数とあわせてエラーで知らせる。'
		},
		{
			en: 'Set the height to match the expected length of the answer.',
			ja: '高さは想定する回答の長さに合わせる。'
		}
	],
	related: [
		{
			id: 'text-field',
			diff: {
				en: 'A text area takes several lines of free text; a text field takes one short line.',
				ja: 'テキストエリアは複数行の文章を入力し、テキストフィールドは短い1行を入力する。'
			}
		}
	],
	sources: [
		{
			label: 'MDN: <textarea>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea',
			checkedAt: '2026-10-20'
		},
		{
			label: 'GOV.UK Design System: Textarea',
			url: 'https://design-system.service.gov.uk/components/textarea/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'GOV.UK Design System: Character count',
			url: 'https://design-system.service.gov.uk/components/character-count/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「テキストエリア」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/textarea/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
