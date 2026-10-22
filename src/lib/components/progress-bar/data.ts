import type { ComponentData } from '#lib/types.js';

export default {
	id: 'progress-bar',
	category: 'feedback',
	names: { en: 'Progress bar', ja: 'プログレスバー' },
	aliases: [
		{ name: 'プログレスインジケーター', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/progress-indicator/' }
	],
	summary: {
		en: 'A bar that fills up to show how much of a task, such as an upload, is done.',
		ja: 'アップロードなどの作業がどこまで進んだかを、伸びていく棒で示す部品です。'
	},
	appearance: {
		en: 'A thin horizontal track that fills with color from left to right, often with a percentage or label nearby.',
		ja: '細い横長の溝が左から右へ色で埋まっていきます。近くに割合やラベルが表示されることが多いです。'
	},
	behavior: [
		{
			en: 'The filled part grows as the task progresses and reaches the end when it finishes.',
			ja: '作業が進むと塗られた部分が伸び、終わると端まで届きます。'
		},
		{
			en: 'When the remaining time is not yet known, it shows an indeterminate bar that moves without a value, and switches to the percentage once it is known.',
			ja: '残りの時間がまだ分からないうちは、値を持たずに動く不確定の表示にし、分かった時点で割合の表示に切り替えます。'
		},
		{
			en: 'It is not interactive; the user only watches it. The label next to it says what is being done, and changes to the result when the task finishes or is canceled. Carbon instead keeps the label as it is and shows the result with the bar’s color and an icon, with helper text explaining an error.',
			ja: '操作する部品ではなく、見るだけのものです。近くのラベルで何の作業かを示し、終わったときや中止したときは結果を表す文に変えます。一方 Carbon はラベルを変えず、棒の色とアイコンで結果を示し、エラーの内容は補助テキストで伝えます。'
		},
		{
			en: 'For a long task, tell assistive technology the percentage at intervals rather than at every change. The Digital Agency Design System HTML implementation announces it every 5 seconds by default.',
			ja: '長い処理では、途中の割合を変わるたびではなく、間隔をあけて支援技術に伝えます。デジタル庁デザインシステムの HTML 実装では、既定で5秒ごとに知らせます。'
		},
		{
			en: 'This demo uses the native `<progress>` element with a `<label>`; leaving out `value` makes it indeterminate. The task is short, so only the start, completion and cancellation are announced, through a `role="status"` live region.',
			ja: 'このデモはネイティブの `<progress>` 要素と `<label>` を使い、`value` を省いて不確定の表示にしています。作業が短いため、開始・完了・中止だけを `role="status"` のライブリージョンで知らせます。'
		},
		{
			en: 'In this demo, the start button cannot be pressed while the upload is running, and Cancel stops it where it is. Both are marked with `aria-disabled` rather than `disabled`, so focus stays on the button.',
			ja: 'このデモでは、アップロード中は開始ボタンを押せず、キャンセルを押すとその位置で止まります。どちらも `disabled` ではなく `aria-disabled` で押せないことを示し、フォーカスがボタンから外れないようにしています。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. The demo’s start and cancel buttons use Enter / Space.',
				ja: 'なし。デモの開始ボタンとキャンセルボタンは Enter / Space で押せます。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Determinate', ja: '確定' },
			description: {
				en: 'Shows how much of the task is done, often with a percentage nearby.',
				ja: '作業がどこまで済んだかを示すものです。近くに割合を添えることが多いです。'
			}
		},
		{
			name: { en: 'Indeterminate', ja: '不確定' },
			description: {
				en: 'Shows that work is ongoing without knowing how long it will take, often as a moving stripe. Made by leaving out the `value` attribute.',
				ja: '終わるまでの時間が分からないときに、動く帯などで作業中であることだけを示すものです。`value` 属性を省くとこの状態になります。'
			}
		}
	],
	usage: [
		{
			en: 'Do not use it to show progress through the steps of a form. Use a stepper for that.',
			ja: 'フォームの手順の進み具合を示すのには使いません。それにはステップナビゲーションを使います。'
		}
	],
	related: [
		{
			id: 'spinner',
			diff: {
				en: 'A progress bar shows how far along a task is; a spinner only shows that something is happening.',
				ja: 'プログレスバーは作業の進み具合を示し、スピナーは処理中であることだけを示します。'
			}
		},
		{
			id: 'meter',
			diff: {
				en: 'A progress bar shows how far a task has gone; a meter shows a measurement within a known range, such as disk usage.',
				ja: 'プログレスバーは作業の進み具合を示し、メーターはディスク使用量のように決まった範囲の中の測定値を示します。'
			}
		},
		{
			id: 'stepper',
			diff: {
				en: 'A progress bar shows progress within one task; a stepper shows which step of a multi-page procedure the user is on.',
				ja: 'プログレスバーは1つの作業の進み具合を示し、ステップナビゲーションは複数画面にまたがる手続きのどの段階にいるかを示します。'
			}
		}
	],
	sources: [
		{
			label: 'MDN: <progress>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MUI: Progress',
			url: 'https://mui.com/material-ui/react-progress/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Carbon Design System: Progress bar',
			url: 'https://carbondesignsystem.com/components/progress-bar/usage/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「プログレスインジケーター」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/progress-indicator/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: progress-indicator',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/progress-indicator',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
