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
		ja: 'アップロードなどの作業がどこまで進んだかを、伸びていく棒で示す部品。'
	},
	appearance: {
		en: 'A thin horizontal track that fills with color from left to right, often with a percentage or label nearby.',
		ja: '細い横長の溝が左から右へ色で埋まっていく。近くに割合やラベルが表示されることが多い。'
	},
	behavior: [
		{
			en: 'The filled part grows as the task progresses and reaches the end when it finishes.',
			ja: '作業が進むと塗られた部分が伸び、終わると端まで届く。'
		},
		{
			en: 'It is not interactive; the user only watches it.',
			ja: '操作する部品ではなく、見るだけのもの。'
		},
		{
			en: 'This demo uses the native <progress> element with a <label>. Only the completion is announced, to avoid reading out every step.',
			ja: 'このデモはネイティブの <progress> 要素と <label> を使っている。途中の割合をすべて読み上げないよう、完了だけを知らせる。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. The demo’s start button uses Enter / Space.',
				ja: 'なし。デモの開始ボタンは Enter / Space で押せる。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Indeterminate', ja: '不確定' },
			description: {
				en: 'Shows that work is ongoing without knowing how long it will take, often as a moving stripe. Made by leaving out the value attribute.',
				ja: '終わるまでの時間が分からないときに、動く帯などで作業中であることだけを示すもの。value 属性を省くとこの状態になる。'
			}
		}
	],
	usage: [
		{
			en: 'Do not use it to show progress through the steps of a form. Use a stepper for that.',
			ja: 'フォームの手順の進み具合を示すのには使わない。それにはステップナビゲーションを使う。'
		}
	],
	related: [
		{
			id: 'spinner',
			diff: {
				en: 'A progress bar shows how far along a task is; a spinner only shows that something is happening.',
				ja: 'プログレスバーは作業の進み具合を示し、スピナーは処理中であることだけを示す。'
			}
		},
		{
			id: 'meter',
			diff: {
				en: 'A progress bar shows how far a task has gone; a meter shows a measurement within a known range, such as disk usage.',
				ja: 'プログレスバーは作業の進み具合を示し、メーターはディスク使用量のように決まった範囲の中の測定値を示す。'
			}
		},
		{
			id: 'stepper',
			diff: {
				en: 'A progress bar shows progress within one task; a stepper shows which step of a multi-page procedure the user is on.',
				ja: 'プログレスバーは1つの作業の進み具合を示し、ステップナビゲーションは複数画面にまたがる手続きのどの段階にいるかを示す。'
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
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「プログレスインジケーター」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/progress-indicator/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
