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
			en: 'In this demo, the lines between sections are <hr>, which screen readers announce as a separator. The vertical lines between links are only decoration and are hidden from screen readers.',
			ja: 'このデモでは、セクションの間の線は <hr> で、スクリーンリーダーは区切りとして読み上げる。リンクの間の縦線は飾りなので、読み上げないようにしている。'
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
			ja: '別々の項目が1つに見えないよう、周りに十分な余白をとる（リストでは 8px 以上、セクションの間では 16px 以上）。'
		},
		{
			en: 'Use <hr> for a change of topic. For a purely visual line, use a CSS border instead.',
			ja: '話題の切り替わりには <hr> を使う。見た目だけの線なら CSS の border を使う。'
		}
	],
	sources: [
		{
			label: 'MDN: <hr>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hr',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ディバイダー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/divider/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
