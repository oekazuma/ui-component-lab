import type { ComponentData } from '#lib/types.js';

export default {
	id: 'carousel',
	category: 'disclosure',
	names: { en: 'Carousel', ja: 'カルーセル' },
	aliases: [
		{ name: 'Slide show', source: 'WAI-ARIA APG', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/' },
		{ name: 'Image rotator', source: 'WAI-ARIA APG', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/' }
	],
	summary: {
		en: 'Shows a set of slides one at a time, with buttons to move to the previous or next one.',
		ja: '複数のスライドを1枚ずつ表示し、ボタンで前後のスライドへ切り替える部品。'
	},
	appearance: {
		en: 'A wide panel showing one image or card, with arrow buttons at the sides and small dots below that show which slide is visible.',
		ja: '1枚の画像やカードを表示する横長の枠で、左右に矢印のボタン、下に今どのスライドかを示す小さな点が並ぶ。'
	},
	behavior: [
		{
			en: 'The previous and next buttons switch slides; this demo wraps around from the last slide to the first.',
			ja: '前後のボタンでスライドが切り替わる。このデモは最後のスライドから最初に戻る。'
		},
		{
			en: 'Switching slides does not move focus off the button, and the new slide is announced through a live region.',
			ja: '切り替えてもフォーカスはボタンに残り、新しいスライドはライブリージョンで読み上げられる。'
		},
		{
			en: 'If slides rotate automatically, there must be a button to stop rotation, and rotation stops while the carousel has focus or the mouse is over it.',
			ja: '自動で切り替わる場合は止めるボタンが必要で、フォーカスやマウスがカルーセル上にある間は切り替えを止める。'
		}
	],
	keyboard: [
		{
			key: 'Tab',
			action: { en: 'Moves between the carousel buttons.', ja: 'カルーセルのボタン間を移動する。' }
		},
		{
			key: 'Enter / Space',
			action: {
				en: 'Shows the previous or next slide, keeping focus on the button.',
				ja: '前または次のスライドを表示する。フォーカスはボタンに残る。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Auto-rotating', ja: '自動再生' },
			description: {
				en: 'Changes slides on a timer, with a stop/start button placed first inside the carousel.',
				ja: '一定時間ごとにスライドが切り替わるもの。停止・再開のボタンをカルーセル内の最初に置く。'
			}
		},
		{
			name: { en: 'Tabbed', ja: 'タブ付き' },
			description: {
				en: 'The dots are tabs that jump to a specific slide and follow the Tabs keyboard pattern.',
				ja: '下の点がタブになっていて、特定のスライドへ直接移動できるもの。キー操作はタブと同じ。'
			}
		}
	],
	usage: [
		{
			en: 'Keep one topic per carousel.',
			ja: '1つのカルーセルには1つの話題だけを入れる。'
		}
	],
	misuse: [
		{
			pattern: { en: 'Advancing slides automatically', ja: 'スライドを自動で切り替える' },
			harm: {
				en: 'Continuous motion pulls attention away from the rest of the page. People with cognitive or attention disabilities, and people who read slowly or have trouble following moving content, can find the page hard or impossible to use.',
				ja: '動き続ける表示に注意を奪われ、ページのほかの部分を読めなくなる。認知障害や注意欠如のある人、読むのに時間がかかる人、動くものを目で追いにくい人には、ページが使いにくくなったり使えなくなったりする。'
			},
			instead: {
				en: 'Let users change slides themselves. If slides must rotate, provide a button that stops rotation, and pause while focus or the pointer is on the carousel.',
				ja: 'スライドは利用者の操作で切り替える。どうしても自動で切り替えるなら、止めるボタンを置き、フォーカスやマウスがカルーセル上にある間は止める。'
			}
		},
		{
			pattern: { en: 'Putting must-read information only in a carousel', ja: '必ず読んでほしい情報をカルーセルにだけ載せる' },
			harm: {
				en: 'Many people scroll past a carousel, so slides after the first often go unseen. Someone who sees only one slide can get the wrong idea about the organization.',
				ja: 'カルーセルを読み飛ばす人が多く、2枚目以降のスライドは見られないことが多い。1枚しか見なかった人は、その組織について誤った印象を持つことがある。'
			},
			instead: {
				en: 'Also place important information elsewhere on the page or in the site navigation, or use a single static image instead of a carousel.',
				ja: '大事な情報はページのほかの場所やサイトのナビゲーションにも置く。または、カルーセルをやめて1枚の固定した画像にする。'
			}
		},
		{
			pattern: { en: 'Using small dots as the only way to pick a slide', ja: 'スライドを選ぶ手段を小さな点だけにする' },
			harm: {
				en: 'People cannot tell what a dot will show before selecting it, and dots are easy to miss, especially on mobile.',
				ja: '点を押すと何が出るのかを前もって知ることができない。点は特にスマートフォンで見落としやすい。'
			},
			instead: {
				en: 'Use previous and next buttons, or give each slide a control that names or shows its content, such as a label or thumbnail. Make the controls large enough to read and select.',
				ja: '前後のボタンで切り替えるか、スライドごとにラベルやサムネイルなど中身が分かる操作部品を付ける。操作部品は読めて押せる大きさにする。'
			}
		}
	],
	related: [
		{
			id: 'tabs',
			diff: {
				en: 'A carousel steps through slides in order with previous and next buttons; tabs let the user jump to any panel by its name.',
				ja: 'カルーセルは前後のボタンで順に切り替え、タブは名前の付いたパネルへ直接切り替える。'
			}
		},
		{
			id: 'pagination',
			diff: {
				en: 'A carousel shows one slide of a small set in place; pagination moves through pages of a long list.',
				ja: 'カルーセルは少数のスライドをその場で1枚ずつ見せ、ページネーションは長い一覧のページを移動する。'
			}
		}
	],
	sources: [
		{
			label: 'Nielsen Norman Group: Carousel Usability: Designing an Effective UI for Websites with Content Overload',
			url: 'https://www.nngroup.com/articles/designing-effective-carousels/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		},
		{
			label: 'WAI-ARIA APG: Carousel (Slide Show or Image Rotator) Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Understanding Success Criterion 2.2.2: Pause, Stop, Hide (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「カルーセル（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/carousel/usage/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「カルーセル」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/carousel/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
