import type { ComponentData } from '#lib/types.js';

export default {
	id: 'slider',
	category: 'input',
	names: { en: 'Slider', ja: 'スライダー' },
	aliases: [
		{
			name: 'Range',
			source: 'HTML',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range'
		}
	],
	summary: {
		en: 'Picks a number within a range by dragging a knob along a track.',
		ja: 'つまみを溝に沿って動かし、範囲内の数値を選ぶ部品。'
	},
	appearance: {
		en: 'A horizontal line with a round knob. The part of the line before the knob is often filled with the accent color. The minimum and maximum values are often shown at the two ends.',
		ja: '横線の上に丸いつまみがある。つまみより手前の線はアクセントカラーで塗られることが多い。両端に最小値と最大値が書かれることも多い。'
	},
	behavior: [
		{
			en: 'Dragging the knob or clicking the track changes the value.',
			ja: 'つまみをドラッグするか、溝をクリックすると値が変わる。'
		},
		{
			en: 'Best when the exact number matters less than the rough position, such as volume or brightness.',
			ja: '音量や明るさのように、正確な数値より大まかな位置が大事なときに向いている。'
		},
		{
			en: 'The value moves in fixed steps; this demo uses steps of 5.',
			ja: '値は決まった刻みで変わる。このデモは5刻み。'
		},
		{
			en: 'In this demo, 0 and 100 under the ends of the track show the range. Screen readers already announce the range from the slider role, so these numbers are hidden from them with `aria-hidden`.',
			ja: 'このデモでは、溝の両端の下に 0 と 100 を出して範囲を示す。範囲はスクリーンリーダーが slider の役割から読み上げるので、この数字は `aria-hidden` で読み上げから外している。'
		}
	],
	keyboard: [
		{ key: '→ / ↑', action: { en: 'Increases the value by one step.', ja: '値を1刻み増やす。' } },
		{ key: '← / ↓', action: { en: 'Decreases the value by one step.', ja: '値を1刻み減らす。' } },
		{ key: 'Home', action: { en: 'Sets the minimum value.', ja: '最小値にする。' } },
		{ key: 'End', action: { en: 'Sets the maximum value.', ja: '最大値にする。' } },
		{
			key: 'Page Up / Page Down',
			action: {
				en: 'Changes the value by a larger amount (depends on the browser).',
				ja: '値を大きめに増減する（ブラウザによる）。'
			}
		}
	],
	usage: [
		{
			en: 'Show the minimum and maximum next to the ends of the track, so people can tell the range without trying the slider.',
			ja: '最小値と最大値を溝の両端に示し、動かしてみなくても範囲が分かるようにする。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Letting the value change only by dragging the thumb',
				ja: 'つまみのドラッグでしか値を変えられない作りにする'
			},
			harm: {
				en: 'People who cannot drag precisely, and people who use a trackball, head pointer, eye-gaze system or speech-controlled pointer, find dragging hard and error-prone.',
				ja: '正確にドラッグできない人や、トラックボール、ヘッドポインター、視線入力、音声で動かすポインターを使う人には、ドラッグが難しく、誤りやすい。'
			},
			instead: {
				en: 'Let people also set the value by clicking or tapping the track and with the arrow keys. A native `<input type="range">` already supports both.',
				ja: 'トラックのクリックやタップ、矢印キーでも値を変えられるようにする。ネイティブの `<input type="range">` はどちらにも対応している。'
			}
		}
	],
	related: [
		{
			id: 'number-input',
			diff: {
				en: 'A slider picks a rough position by dragging; a number input is better when the exact number matters.',
				ja: 'スライダーはつまみで大まかな位置を選び、数値入力は正確な数値が大事なときに向いている。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Slider Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'MDN: <input type="range">',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Carbon Design System: Slider',
			url: 'https://carbondesignsystem.com/components/slider/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Understanding Success Criterion 2.5.7: Dragging Movements (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
