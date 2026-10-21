import type { ComponentData } from '#lib/types.js';

export default {
	id: 'divider',
	category: 'data',
	names: { en: 'Divider', ja: 'ディバイダー（区切り線）' },
	aliases: [
		{ name: 'Divider', source: 'Ant Design', url: 'https://ant.design/components/divider' },
		{ name: 'Separator', source: 'React Aria', url: 'https://react-aria.adobe.com/Separator' },
		{ name: 'ディバイダー', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/divider/' }
	],
	summary: {
		en: 'A thin line that separates sections or groups of content.',
		ja: 'セクションや項目のまとまりの間を区切る細い線。'
	},
	appearance: {
		en: 'A thin gray horizontal line across the content, or a short vertical line between items in a row.',
		ja: '内容を横切る細い灰色の横線。横に並んだ項目の間に入る短い縦線のこともある。'
	},
	behavior: [
		{
			en: 'It is not interactive.',
			ja: '操作する部品ではない。'
		},
		{
			en: '`<hr>` is announced by screen readers as a separator. It marks a change of topic within the text of one section, such as from opening hours to parking.',
			ja: '`<hr>` はスクリーンリーダーが区切りとして読み上げる。1つのセクションの文章の中で、営業時間から駐車場の話へ移るような話題の切り替わりに使う。'
		},
		{
			en: 'In this demo, the lines between sections are CSS borders, because the headings already show where each section starts. They run edge to edge (full width), while the lines between the notification channels stay inside the padding (inset).',
			ja: 'このデモでは、セクションの間の線は CSS の border にしている。見出しでセクションの始まりがすでに伝わるため。セクションの間の線は枠の端から端まで（全幅）引き、通知の項目の間の線は余白の内側（インセット）に引いている。'
		},
		{
			en: 'In this demo, the vertical lines between links are only decoration and are hidden from screen readers.',
			ja: 'このデモでは、リンクの間の縦線は飾りなので、読み上げないようにしている。'
		}
	],
	keyboard: [
		{ key: '—', action: { en: 'None.', ja: 'なし。' } }
	],
	variations: [
		{
			name: { en: 'Full width', ja: '全幅' },
			description: {
				en: 'Runs edge to edge to separate major sections or lists.',
				ja: '端から端まで引き、大きなセクションやリストを区切る。'
			}
		},
		{
			name: { en: 'Inset', ja: 'インセット' },
			description: {
				en: 'Starts with an indent, separating items within the same section while keeping them related.',
				ja: '字下げした位置から引き、同じセクションの中の項目を、つながりを保ったまま区切る。'
			}
		}
	],
	usage: [
		{
			en: 'A divider only supports spacing. The layout should still make sense without the line.',
			ja: 'ディバイダーは余白を補うものにすぎない。線がなくても意味が通じる配置にする。'
		},
		{
			en: 'Leave enough space around it (at least 8 px in lists and 16 px between sections) so separate items do not look like one.',
			ja: '別々の項目が1つに見えないよう、周りに十分な余白をとる（リストでは8px 以上、セクションの間では16px 以上）。'
		},
		{
			en: 'Use `<hr>` for a change of topic within a section. Sections and headings already mark their own boundaries, so the line between sections, like any purely visual line, is a CSS border.',
			ja: 'セクションの中の話題の切り替わりには `<hr>` を使う。セクションと見出しはそれだけで区切りが伝わるので、セクションの間の線は、見た目だけの線と同じく CSS の border にする。'
		}
	],
	sources: [
		{
			label: 'MDN: <hr>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hr',
			checkedAt: '2026-10-20'
		},
		{
			label: 'HTML Standard: The hr element',
			url: 'https://html.spec.whatwg.org/multipage/grouping-content.html#the-hr-element',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ディバイダー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/divider/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ディバイダー（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/divider/usage/',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
