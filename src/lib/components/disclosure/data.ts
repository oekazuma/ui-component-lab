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
	misuse: [
		{
			pattern: { en: 'Hiding information that most users need in a disclosure', ja: '多くの利用者が必要とする情報をディスクロージャーにしまう' },
			harm: {
				en: 'Some people do not open it because they expect the label to take them away from the page, so they miss the information inside.',
				ja: 'ラベルを押すと別のページに移ると考えて開かない人がいて、その人は中の情報を見落とす。'
			},
			instead: {
				en: 'Show information that most people need directly on the page, and keep disclosures for extra details that only some people need.',
				ja: '多くの人が必要とする情報はそのまま表示し、ディスクロージャーには一部の人だけが必要とする補足を入れる。'
			}
		},
		{
			pattern: { en: 'Putting fees or contract terms inside a closed disclosure', ja: '料金や契約の条件を閉じたディスクロージャーの中に入れる' },
			harm: {
				en: 'People agree to a purchase or contract without seeing the costs or conditions. They may pay for things they did not choose, or find out about a fee only after they have been charged.',
				ja: '費用や条件を見ないまま購入や契約に同意してしまう。選んでいないものにお金を払ったり、請求されてから手数料に気づいたりする。'
			},
			instead: {
				en: 'Show the total cost and the renewal and cancellation terms in the open, next to the button that confirms the purchase or agreement.',
				ja: '合計の金額と、自動更新や解約の条件は、購入や同意を確定するボタンの近くに、開いた状態で表示する。'
			},
			deceptive: true
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
			label: 'FTC Staff Report: Bringing Dark Patterns to Light (2022)',
			url: 'https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Deceptive Patterns: Sneaking',
			url: 'https://www.deceptive.design/types/sneaking',
			checkedAt: '2026-10-21'
		},
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
