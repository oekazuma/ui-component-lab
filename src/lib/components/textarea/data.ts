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
		ja: 'コメントや説明など、複数行の文章を自由に入力する縦長の欄です。'
	},
	appearance: {
		en: 'A bordered rectangle several lines tall, with a label above it. A character count often appears below, and the bottom-right corner may have a resize handle.',
		ja: '数行分の高さがある枠付きの長方形で、上にラベルがあります。下に文字数が出ることが多く、右下の角に大きさを変えるつまみが付くこともあります。'
	},
	behavior: [
		{
			en: 'Enter starts a new line instead of submitting the form.',
			ja: 'Enter を押してもフォームは送信されず、改行になります。'
		},
		{
			en: 'The text scrolls inside the box when it gets longer than the visible lines.',
			ja: '見えている行数より長くなると、欄の中でスクロールします。'
		},
		{
			en: 'This demo shows the remaining characters and lets you type past the limit, showing how many characters are over instead of cutting the text off with `maxlength`.',
			ja: 'このデモは残りの文字数を表示します。上限を超えても `maxlength` で打ち切らずに入力でき、何文字超えているかを示します。'
		},
		{
			en: 'In this demo, pressing Send while the text is over the limit shows an error with the number of characters entered, links it with `aria-describedby`, sets `aria-invalid`, and moves focus to the box. After the first send, the error updates as you type and disappears once the text fits.',
			ja: 'このデモでは、上限を超えたまま「送信」を押すと、入力した文字数を書いたエラーを出して `aria-describedby` でつなぎ、`aria-invalid` を付けて、フォーカスを欄へ移します。一度送信したあとは、入力に合わせてエラーが変わり、上限内に収まると消えます。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves focus into or out of the box.', ja: 'フォーカスを入力欄に移したり、入力欄から外したりします。' } },
		{ key: 'Enter', action: { en: 'Inserts a line break.', ja: '改行します。' } },
		{
			key: '← / → / ↑ / ↓',
			action: { en: 'Moves the text cursor.', ja: '文字のカーソルを移動します。' }
		}
	],
	usage: [
		{
			en: 'Free text takes effort to write. Narrow the question first, for example by splitting it into simpler questions or by asking only people who chose “Other”.',
			ja: '自由記述は書くのに大きな手間がかかります。簡単な質問に分ける、「その他」を選んだ人にだけ尋ねるなどして、先に質問の範囲を絞ります。'
		},
		{
			en: 'Tell people the character limit before they start typing. DADS puts it in the label and shows a counter for limits of more than about 20 characters. GOV.UK states the limit in a count message below the box, and uses a character count only when there is a good reason to limit the text.',
			ja: '文字数の上限は入力を始める前に伝えます。DADS は上限をラベルに書き、上限がおよそ20文字を超えるなら文字数のカウンターを表示します。GOV.UK は欄の下の文字数の表示で上限を伝え、文字数を制限する十分な理由があるときだけ文字数のカウンターを使います。'
		},
		{
			en: 'When the text is too long, DADS gives the number of characters entered in the error, such as “You entered 201 characters”, so people can tell how much to cut. GOV.UK gives the limit in the error, such as “Job description must be 350 characters or less”, and the count message below the box says that too many characters have been entered.',
			ja: '上限を超えたとき、DADS は「（入力文字数201文字）」のように入力した文字数をエラーに書き、どれだけ削ればよいか分かるようにします。GOV.UK は「職務内容は350文字以内で入力してください」のように上限をエラーに書き、欄の下の表示で文字数が多すぎることを知らせます。'
		},
		{
			en: 'Set the height to match the expected length of the answer.',
			ja: '高さは想定する回答の長さに合わせます。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Revealing the character limit only through an error',
				ja: '文字数の上限をエラーで初めて知らせる'
			},
			harm: {
				en: 'The person writing cannot tell how many characters are allowed until an error appears, and some error messages do not give the limit even then.',
				ja: '書いている人はエラーが出るまで何文字まで入力できるか分かりません。エラーが出ても、何文字まで許されるのか分からないこともあります。'
			},
			instead: {
				en: 'Tell people the limit before they type, in the label or in a count message below the box. When the text is too long, say so in an error that gives the limit or the number of characters entered.',
				ja: '上限はラベルや欄の下の文字数の表示で、入力する前に伝えます。超えたときは、上限か入力済みの文字数を書いたエラーで知らせます。'
			}
		}
	],
	related: [
		{
			id: 'text-field',
			diff: {
				en: 'A text area takes several lines of free text; a text field takes one short line.',
				ja: 'テキストエリアは複数行の文章を入力し、テキストフィールドは短い1行を入力します。'
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
			checkedAt: '2026-10-22'
		},
		{
			label: 'GOV.UK Design System: Character count',
			url: 'https://design-system.service.gov.uk/components/character-count/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「テキストエリア」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/textarea/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「テキストエリア（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/textarea/usage/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: textarea',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/textarea',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
