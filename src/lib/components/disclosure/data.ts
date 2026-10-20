import type { ComponentData } from '#lib/types.js';

export default {
	id: 'disclosure',
	category: 'disclosure',
	names: { en: 'Disclosure', ja: 'ディスクロージャー' },
	aliases: [
		{ name: 'Details', source: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk/components/details/' },
		{ name: 'Collapse', source: 'Bootstrap', url: 'https://getbootstrap.com/docs/5.3/components/collapse/' }
	],
	summary: {
		en: 'A single button that shows or hides one section of content.',
		ja: '1つのボタンで、1か所の内容の表示・非表示を切り替える部品。'
	},
	appearance: {
		en: 'A short label, often with a triangle or chevron that points right when closed and down when open. The hidden content appears just below the label.',
		ja: '短いラベルの横に、閉じているときは右向き、開くと下向きになる三角や山形のアイコンがある。隠れていた内容はラベルのすぐ下に出る。'
	},
	behavior: [
		{
			en: 'Activating the label toggles the content between shown and hidden.',
			ja: 'ラベルを押すと、内容の表示・非表示が切り替わる。'
		},
		{
			en: 'Used for optional extra information, such as help text, that most users do not need.',
			ja: '補足の説明など、多くの人には不要な追加情報をしまっておくのに使う。'
		},
		{
			en: 'This demo uses the native <details> and <summary> elements, which handle the toggling and keyboard support.',
			ja: 'このデモはネイティブの <details> と <summary> 要素を使っており、開閉とキーボード操作はブラウザが受け持つ。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: { en: 'Shows or hides the content.', ja: '内容を表示・非表示にする。' }
		}
	],
	usage: [
		{
			en: 'Use it for supplementary content within a section, such as a transcript or a chart\'s data.',
			ja: '文字起こしやグラフの元データなど、セクションの中の補足に使う。'
		},
		{
			en: 'Make the title describe the content. Avoid vague text like "Show more", and do not switch it between "Open" and "Close".',
			ja: 'タイトルには中身が分かる文言を使う。「もっと見る」のような曖昧な文言や、「開く」「閉じる」の切り替えは避ける。'
		}
	],
	related: [
		{
			id: 'accordion',
			diff: {
				en: 'A disclosure is one toggle on its own; an accordion is a set of disclosures stacked under headings.',
				ja: 'ディスクロージャーは単独の開閉部品で、それを見出し付きで縦に並べたものがアコーディオン。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Disclosure (Show/Hide) Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'GOV.UK Design System: Details',
			url: 'https://design-system.service.gov.uk/components/details/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Bootstrap: Collapse',
			url: 'https://getbootstrap.com/docs/5.3/components/collapse/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ディスクロージャー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/disclosure/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
