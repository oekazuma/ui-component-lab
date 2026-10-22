import type { ComponentData } from '#lib/types.js';

export default {
	id: 'tooltip',
	category: 'overlay',
	names: { en: 'Tooltip', ja: 'ツールチップ' },
	aliases: [],
	summary: {
		en: 'A short note that appears near an element while it is hovered or focused.',
		ja: '要素にマウスを乗せたりフォーカスしたりしている間だけ、近くに出る短い説明。'
	},
	appearance: {
		en: 'A small dark label, often with a little arrow, just above or below the element it describes.',
		ja: '説明する要素のすぐ上か下に出る、小さな暗い色のラベル。小さな矢印が付くことが多い。'
	},
	behavior: [
		{
			en: 'Appears after a short delay on hover or keyboard focus. It stays while the pointer is over the element or the tooltip, or while the element has focus, and disappears once neither is true.',
			ja: 'マウスを乗せるかキーボードでフォーカスすると少し遅れて表示される。ポインターが要素かツールチップの上にある間と、要素にフォーカスがある間は表示し続け、どちらも終わると消える。'
		},
		{
			en: 'In this demo, the gap between the button and the tooltip also counts as part of the button, so the pointer can move onto the tooltip without it disappearing.',
			ja: 'このデモでは、ボタンとツールチップの間の隙間もボタンの一部として扱い、ポインターをツールチップへ動かしても消えないようにしている。'
		},
		{
			en: 'It never receives focus, so it should not contain links or buttons.',
			ja: 'ツールチップ自体はフォーカスを受けないため、リンクやボタンを入れてはいけない。'
		},
		{
			en: 'The element points to the tooltip with `aria-describedby`, so screen readers read it as a description.',
			ja: '要素から `aria-describedby` でツールチップを参照し、スクリーンリーダーに説明として読ませる。'
		},
		{
			en: 'The APG Tooltip pattern is still marked as work in progress.',
			ja: 'APG の Tooltip パターンはまだ作業中と明記されている。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Focusing the element shows the tooltip.', ja: '要素にフォーカスするとツールチップが出る。' } },
		{
			key: 'Esc',
			action: {
				en: 'Hides the tooltip without moving focus or the pointer.',
				ja: 'フォーカスやポインターを動かさずに、ツールチップを消す。'
			}
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Putting information needed to finish a task only in a tooltip',
				ja: '作業を終えるのに必要な情報を、ツールチップにだけ書く'
			},
			harm: {
				en: 'Tooltips usually do not appear on touchscreens, mouse-only ones cannot be reached by keyboard, and they are hard to notice, so people may never find the information. They also have to remember it after it disappears.',
				ja: 'タッチ画面ではふつう表示されず、マウスでしか出ないものはキーボードで使う人に届かない。目印がなく気づきにくいため、情報に行き着けないこともある。また、消えたあとは内容を覚えておく必要がある。'
			},
			instead: {
				en: 'Show information such as input requirements on the page itself, and label icons with visible text. Use a tooltip only for supplementary hints.',
				ja: '入力の条件など作業に必要な情報はページに直接書き、アイコンには見える文字のラベルを付ける。ツールチップは補足のヒントにだけ使う。'
			}
		},
		{
			pattern: {
				en: 'Making a tooltip that cannot be dismissed, vanishes when the pointer moves onto it, or disappears on a timer',
				ja: '消す手段がない、ポインターを乗せると消える、時間で消えるツールチップにする'
			},
			harm: {
				en: 'People using screen magnification cannot see what the tooltip covers, people with a large pointer cannot read text hidden under it, and people with low vision or cognitive disabilities may lose the text before they finish reading.',
				ja: '画面を拡大して使う人は、ツールチップが覆った部分を見られない。大きなポインターを使う人は、ポインターの下に隠れた文字を読めない。弱視や認知障害のある人は、読み終える前に文字が消えてしまうことがある。'
			},
			instead: {
				en: 'Let Esc hide the tooltip without moving the pointer or focus, keep it open while the pointer is over the tooltip itself, and keep it visible until the pointer or focus leaves.',
				ja: 'ポインターやフォーカスを動かさずに Esc で消せるようにする。ツールチップ自体にポインターを乗せても消さず、ポインターやフォーカスが離れるまで表示し続ける。'
			}
		}
	],
	related: [
		{
			id: 'popover',
			diff: {
				en: 'A tooltip shows on hover or focus and holds only text; a popover opens on click and can contain buttons and links.',
				ja: 'ツールチップはホバーやフォーカスで出て文字だけを持ち、ポップオーバーはクリックで開いてボタンやリンクも入れられる。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Tooltip Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Nielsen Norman Group: Tooltip Guidelines',
			url: 'https://www.nngroup.com/articles/tooltip-guidelines/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Understanding Success Criterion 1.4.13: Content on Hover or Focus (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
