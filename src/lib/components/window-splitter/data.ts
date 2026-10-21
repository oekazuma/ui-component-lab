import type { ComponentData } from '#lib/types.js';

export default {
	id: 'window-splitter',
	category: 'action',
	names: { en: 'Window splitter', ja: 'ウィンドウスプリッター' },
	aliases: [{ name: 'Splitter', source: 'Ant Design', url: 'https://ant.design/components/splitter' }],
	summary: {
		en: 'A movable divider between two panes that changes how much room each pane gets.',
		ja: '2 つのペインの間にある動かせる区切り。動かすと、それぞれのペインの広さが変わる。'
	},
	appearance: {
		en: 'A thin line between two side-by-side panes, often with a small grip in the middle. The pointer turns into a double arrow over it.',
		ja: '横に並んだ 2 つのペインの間の細い線で、中央に小さなつまみがあることが多い。ポインターを重ねると左右の矢印の形に変わる。'
	},
	behavior: [
		{
			en: 'The splitter has `role="separator"` and can take focus. `aria-valuenow` gives its position, from `aria-valuemin` (the primary pane at its smallest) to `aria-valuemax` (the primary pane at its largest).',
			ja: '区切りには `role="separator"` を付け、フォーカスできるようにする。位置は `aria-valuenow` で伝え、`aria-valuemin`（主ペインがいちばん狭いとき）から `aria-valuemax`（主ペインがいちばん広いとき）の間の値にする。'
		},
		{
			en: 'The pane whose size the splitter controls is the primary pane. The splitter has the same name as that pane and points to it with `aria-controls`. “Primary” only means the controlled pane, not the more important one.',
			ja: '区切りが大きさを決めるペインを主ペインと呼ぶ。区切りには主ペインと同じ名前を付け、`aria-controls` で主ペインを指す。「主」は大きさを決める側という意味で、内容の重要さとは関係ない。'
		},
		{
			en: 'A splitter between side-by-side panes is a vertical line, so it has `aria-orientation="vertical"` and moves with ← and →. A `separator` is horizontal unless this is set.',
			ja: '横に並んだペインの間の区切りは縦の線なので、`aria-orientation="vertical"` を付け、← と → で動かす。指定しなければ `separator` は横向きとして扱われる。'
		},
		{
			en: 'In this demo, the Contents pane is the primary pane, and its width is the value, as a percentage of the window from 0 (collapsed) to 80. The arrow keys move it by 10. Clicking or tapping the splitter without moving it collapses or restores the pane, like Enter.',
			ja: 'このデモでは、目次のペインが主ペインで、その幅をウィンドウに対する % で値にしている。0（畳んだ状態）から 80 まで動き、矢印キーでは 10 ずつ動く。区切りを動かさずにクリックやタップすると、Enter と同じく目次を畳む・戻す。'
		},
		{
			en: 'In this demo, F6 to move between panes, which the APG lists as optional, is left out.',
			ja: 'このデモでは、APG で任意とされている、F6 でペインの間を移る操作は省いている。'
		}
	],
	keyboard: [
		{
			key: 'Enter',
			action: {
				en: 'Collapses the primary pane. If it is collapsed, moves the splitter back to where it was.',
				ja: '主ペインを畳む。畳んでいるときは、区切りを元の位置へ戻す。'
			}
		},
		{
			key: '← / →',
			action: {
				en: 'Moves the splitter left / right, making the primary pane narrower / wider.',
				ja: '区切りを左・右へ動かし、主ペインを狭く・広くする。'
			}
		},
		{
			key: 'Home / End',
			action: {
				en: 'Gives the primary pane its smallest / largest size. In this demo, the smallest is collapsed.',
				ja: '主ペインをいちばん狭く・広くする。このデモでは、いちばん狭いと畳んだ状態になる。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Fixed splitter', ja: '固定のスプリッター' },
			description: {
				en: 'Switches between two positions only, such as open and collapsed. It has Enter but no arrow keys.',
				ja: '開いた状態と畳んだ状態のように、2 つの位置だけを切り替えるもの。Enter はあるが、矢印キーの操作はない。'
			}
		},
		{
			name: { en: 'Horizontal splitter', ja: '横向きのスプリッター' },
			description: {
				en: 'A horizontal line between panes stacked one above the other, moved with ↑ and ↓.',
				ja: '上下に重ねたペインの間の横線で、↑ と ↓ で動かすもの。'
			}
		}
	],
	usage: [
		{
			en: 'The APG has no working example of this pattern yet, and its review is not finished, so test it with assistive technologies before relying on it.',
			ja: 'APG にはこのパターンの動く例がまだなく、見直しも終わっていない。使う前に、支援技術で確かめる。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Letting the panes be resized only by dragging the splitter',
				ja: '区切りをドラッグしなければペインの大きさを変えられない作りにする'
			},
			harm: {
				en: 'People who cannot drag precisely, and people who use a trackball, head pointer, eye-gaze system or speech-controlled pointer, find dragging hard and error-prone.',
				ja: '正確にドラッグできない人や、トラックボール、ヘッドポインター、視線入力、音声で動かすポインターを使う人には、ドラッグが難しく、誤りやすい。'
			},
			instead: {
				en: 'Let the splitter take focus and move with the arrow keys and Enter, and give a single click or tap a job too, such as collapsing and restoring the pane or buttons with preset sizes.',
				ja: '区切りをフォーカスできるようにして矢印キーと Enter で動かせるようにし、1 回のクリックやタップでもできる操作を用意する。ペインを畳む・戻す、決まった大きさにするボタンなど。'
			}
		}
	],
	related: [
		{
			id: 'slider',
			diff: {
				en: 'A window splitter is moved to resize the two panes on either side of it; a slider picks a value that is used somewhere else.',
				ja: 'ウィンドウスプリッターは動かして両側のペインの大きさを変え、スライダーはほかの場所で使う値を選ぶ。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Window Splitter Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: ARIA: separator role',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/separator_role',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Ant Design: Splitter',
			url: 'https://ant.design/components/splitter',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Understanding Success Criterion 2.5.7: Dragging Movements (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
