import type { ComponentData } from '#lib/types.js';

export default {
	id: 'range-slider',
	category: 'input',
	names: { en: 'Range slider', ja: '範囲スライダー' },
	aliases: [
		{ name: 'Range slider', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/slider/usage/' },
		{ name: 'Range slider', source: 'MUI', url: 'https://mui.com/material-ui/react-slider/' },
		{ name: 'Slider (Multi-Thumb)', source: 'WAI-ARIA APG', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/' }
	],
	summary: {
		en: 'A slider with two knobs on one track that picks the lowest and highest values of a range.',
		ja: '1本の溝に2つのつまみがあり、範囲の下限と上限を選ぶスライダー。'
	},
	appearance: {
		en: 'A horizontal line with two round knobs. The part of the line between the knobs is filled with the accent color, and the chosen range is often written above it.',
		ja: '横線の上に丸いつまみが2つある。つまみの間の線はアクセントカラーで塗られ、選んだ範囲が上に書かれることが多い。'
	},
	behavior: [
		{
			en: 'Each knob is a separate `slider` that is in the Tab order and has the keys of a single slider. The Tab order stays the same wherever the knobs are.',
			ja: 'つまみはそれぞれ独立した `slider` で、Tab キーの順に入り、1つのスライダーと同じキー操作を持つ。つまみがどこにあっても、Tab キーの順は変わらない。'
		},
		{
			en: 'The knobs cannot pass each other. The lower knob’s `aria-valuemax` is the upper knob’s value, the upper knob’s `aria-valuemin` is the lower knob’s value, and both are updated whenever a knob moves.',
			ja: 'つまみは互いを追い越せない。下のつまみの `aria-valuemax` は上のつまみの値、上のつまみの `aria-valuemin` は下のつまみの値にし、つまみが動くたびに更新する。'
		},
		{
			en: 'Each knob has its own name, such as “Minimum price”, and `aria-valuetext` adds the unit to the number that is read out.',
			ja: 'つまみには「最低価格」のようにそれぞれ名前を付け、`aria-valuetext` で読み上げる数値に単位を添える。'
		},
		{
			en: 'In this demo, clicking or tapping the track moves the nearer knob to that point, and keeping the pointer down drags it. Page Up and Page Down move 10 steps, as in the APG example.',
			ja: 'このデモでは、溝をクリックやタップすると近いほうのつまみがそこへ動き、押したまま動かすとドラッグになる。APG の例と同じく、Page Up と Page Down は10刻み動かす。'
		},
		{
			en: 'In this demo, the range written above the track and the numbers at its ends are hidden from screen readers with `aria-hidden`, because each knob already announces its value.',
			ja: 'このデモでは、溝の上に書いた範囲と両端の数字を、`aria-hidden` で読み上げから外している。値はつまみがそれぞれ読み上げるため。'
		}
	],
	keyboard: [
		{
			key: '→ / ↑',
			action: { en: 'Increases the focused knob by one step.', ja: 'フォーカスしたつまみの値を1刻み増やす。' }
		},
		{
			key: '← / ↓',
			action: { en: 'Decreases the focused knob by one step.', ja: 'フォーカスしたつまみの値を1刻み減らす。' }
		},
		{
			key: 'Page Up / Page Down',
			action: { en: 'Increases / decreases the focused knob by 10 steps.', ja: 'フォーカスしたつまみの値を10刻み増やす・減らす。' }
		},
		{
			key: 'Home / End',
			action: {
				en: 'Moves the focused knob to its lowest / highest allowed value. For the lower knob the highest is the upper knob’s value, and for the upper knob the lowest is the lower knob’s value.',
				ja: 'フォーカスしたつまみを、動ける範囲の最小・最大の値にする。下のつまみの最大は上のつまみの値、上のつまみの最小は下のつまみの値になる。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: { en: 'Moves between the two knobs, lower first.', ja: '2つのつまみの間を移る。下のつまみが先。' }
		}
	],
	usage: [
		{
			en: 'Use it to pick a range of numbers, such as a price range in search filters. For a range of dates, use a date picker.',
			ja: '検索の絞り込みの価格帯のように、数値の範囲を選ぶときに使う。日付の範囲には、日付ピッカーを使う。'
		},
		{
			en: 'The Carbon Design System pairs the range slider with two number inputs, so the exact minimum and maximum can also be typed.',
			ja: 'Carbon Design System は、範囲スライダーに2つの数値入力を添え、正確な最小値と最大値を入力することもできるようにしている。'
		},
		{
			en: 'Some touch-based assistive technologies cannot operate sliders yet, so test on touch devices before relying on one.',
			ja: 'タッチ操作の支援技術には、まだスライダーを操作できないものがある。使う前にタッチ端末で確かめる。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Letting the two knobs move only by dragging',
				ja: '2つのつまみをドラッグでしか動かせない作りにする'
			},
			harm: {
				en: 'People who cannot drag precisely, and people who use a trackball, head pointer, eye-gaze system or speech-controlled pointer, find dragging hard and error-prone.',
				ja: '正確にドラッグできない人や、トラックボール、ヘッドポインター、視線入力、音声で動かすポインターを使う人には、ドラッグが難しく、誤りやすい。'
			},
			instead: {
				en: 'Let a click or tap on the track move the nearer knob, and let each knob move with the arrow keys. Number inputs next to the slider also let people set exact values without dragging.',
				ja: '溝をクリックやタップすると近いほうのつまみが動くようにし、それぞれのつまみを矢印キーでも動かせるようにする。スライダーの横に数値入力を置けば、ドラッグせずに正確な値も入れられる。'
			}
		}
	],
	related: [
		{
			id: 'slider',
			diff: {
				en: 'A range slider has two knobs that pick the lowest and highest values; a slider has one knob that picks a single value.',
				ja: '範囲スライダーは2つのつまみで下限と上限を選び、スライダーは1つのつまみで1つの値を選ぶ。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Slider (Multi-Thumb) Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'WAI-ARIA APG: Horizontal Multi-Thumb Slider Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/examples/slider-multithumb/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'WAI-ARIA APG: Slider Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Carbon Design System: Slider',
			url: 'https://carbondesignsystem.com/components/slider/usage/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MUI: Slider',
			url: 'https://mui.com/material-ui/react-slider/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Understanding Success Criterion 2.5.7: Dragging Movements (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
