import type { ComponentData } from '#lib/types.js';

export default {
	id: 'meter',
	category: 'data',
	names: { en: 'Meter', ja: 'メーター' },
	aliases: [
		{ name: 'Meter', source: 'React Aria', url: 'https://react-aria.adobe.com/Meter' },
		{
			name: 'Gauge',
			source: 'HTML',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter'
		}
	],
	summary: {
		en: 'A bar that shows a measurement within a known range, such as storage used or battery level.',
		ja: 'ストレージの使用量や電池の残量など、決まった範囲の中の測定値を示す棒。'
	},
	appearance: {
		en: 'A horizontal bar filled to the current value. The color can change, for example to yellow or red, when the value is in a bad range.',
		ja: '現在の値まで塗られた横長の棒。値が良くない範囲に入ると、黄や赤などに色が変わることがある。'
	},
	behavior: [
		{
			en: 'It is not interactive; it only shows a value.',
			ja: '操作する部品ではなく、値を示すだけのもの。'
		},
		{
			en: 'This demo uses the native `<meter>` with low, high and optimum, so the browser colors the bar by range. Use the buttons to change the value.',
			ja: 'このデモはネイティブの `<meter>` に low・high・optimum を付けているため、ブラウザが範囲に応じて棒の色を変える。ボタンで値を変えられる。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. The demo’s buttons use Tab and Enter / Space.',
				ja: 'なし。デモのボタンは Tab と Enter / Space で操作する。'
			}
		}
	],
	usage: [
		{
			en: 'Do not use a meter for the progress of a task. Use a progress bar for that.',
			ja: '作業の進み具合には使わない。それにはプログレスバーを使う。'
		},
		{
			en: 'The maximum must mean something, like the size of the disk.',
			ja: '最大値には意味が必要（ディスクの容量など）。'
		}
	],
	misuse: [
		{
			pattern: { en: 'Showing whether the value is good or bad only by the bar’s color', ja: '値の良し悪しを棒の色だけで示す' },
			harm: {
				en: 'People with color vision deficiency, many older people and people with partial sight, and anyone on a monochrome display cannot get information that is shown only by color.',
				ja: '色覚に特性のある人、色が見分けにくい高齢者や弱視の人、白黒の画面を使う人には、色だけで示した情報が伝わらない。'
			},
			instead: {
				en: 'Show the value as text next to the bar, and add a word for the state when it matters, such as “Almost full”.',
				ja: '棒の横に数値を文字で示し、必要なら「もうすぐいっぱい」のように状態も言葉で添える。'
			}
		}
	],
	related: [
		{
			id: 'progress-bar',
			diff: {
				en: 'A meter shows a measurement within a range; a progress bar shows how far a task has gone.',
				ja: 'メーターは範囲の中の測定値を示し、プログレスバーは作業の進み具合を示す。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Meter Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/meter/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MDN: <meter>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Understanding Success Criterion 1.4.1: Use of Color (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
