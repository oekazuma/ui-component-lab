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
		en: 'Shows a set of slides one at a time, with buttons to choose a slide or move to the previous or next one.',
		ja: '複数のスライドを1枚ずつ表示し、ボタンでスライドを選んだり前後へ切り替えたりする部品です。'
	},
	appearance: {
		en: 'A heading above a wide panel showing one slide. Below it are numbered buttons with the current one highlighted, previous and next arrow buttons with the position as text, such as "1 / 4", and an All slides toggle that lists the rest.',
		ja: '見出しの下に、1枚のスライドを表示する横長の枠があります。その下に、表示中のものが強調された番号のボタンと、「1 / 4」のように今の位置を文字で示す前後の矢印のボタン、残りのスライドを一覧にする「すべてのスライド」が並びます。'
	},
	behavior: [
		{
			en: 'Pressing a numbered button shows that slide. The numbered buttons are tabs (`role="tab"` in a `tablist`), and `aria-selected` marks the slide being shown.',
			ja: '番号のボタンを押すと、そのスライドが表示されます。番号のボタンはタブ（`tablist` の中の `role="tab"`）で、表示中のスライドを `aria-selected` で示します。'
		},
		{
			en: 'Only the selected numbered button is in the Tab order; the arrow keys move between them and show each slide as focus moves (automatic activation).',
			ja: 'Tab キーで止まる番号のボタンは選択中のものだけで、矢印キーで移ると同時にそのスライドが表示されます（自動アクティベーション）。'
		},
		{
			en: 'The previous and next buttons wrap around from the last slide to the first. Focus stays on the button, and the new slide is announced through a live region (`aria-live="polite"`).',
			ja: '前後のボタンは最後のスライドから最初に戻ります。フォーカスはボタンに残り、新しいスライドはライブリージョン（`aria-live="polite"`）で読み上げられます。'
		},
		{
			en: 'The carousel is a region named by its visible heading (`aria-labelledby`), and each slide takes its name from its own heading.',
			ja: 'カルーセルは見えている見出しを名前にした領域（`aria-labelledby`）で、各スライドの名前もスライドの見出しから取ります。'
		},
		{
			en: 'All slides is a `<details>` element that lists the other slides, starting from the one after the slide being shown.',
			ja: '「すべてのスライド」は `<details>` 要素で、表示中のスライドの次から順に、ほかのスライドを一覧にします。'
		},
		{
			en: 'In this demo, which is the container type, slides use text instead of images, the Learn more links do not navigate, and the numbered buttons and the previous and next buttons are shown together at every width.',
			ja: 'このデモはコンテナタイプで、スライドを画像ではなく文字で作り、「詳しく見る」のリンクは移動しません。番号のボタンと前後のボタンは、どの幅でも両方を表示します。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves through the link in the slide, the selected numbered button, the previous and next buttons, and All slides.',
				ja: 'スライドのリンク、選択中の番号のボタン、前後のボタン、「すべてのスライド」の順に移動します。'
			}
		},
		{
			key: 'Enter / Space',
			action: {
				en: 'On the previous or next button, shows that slide and keeps focus on the button. On All slides, opens or closes the list.',
				ja: '前後のボタンでは、前または次のスライドを表示し、フォーカスはボタンに残ります。「すべてのスライド」では一覧を開閉します。'
			}
		},
		{
			key: '← / →',
			action: {
				en: 'On the numbered buttons, moves to the previous / next number and shows its slide. Wraps around at either end.',
				ja: '番号のボタンで、前・次の番号へ移り、そのスライドを表示します。端では反対の端へ戻ります。'
			}
		},
		{
			key: 'Home / End',
			action: {
				en: 'On the numbered buttons, moves to the first / last number and shows its slide.',
				ja: '番号のボタンで、最初・最後の番号へ移り、そのスライドを表示します。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Key visual type', ja: '打ち出しタイプ' },
			description: {
				en: 'The Digital Agency Design System (DADS) divides carousels into this key visual type and the container type. The key visual type is placed at the top of a page to show what the site is about, and is used only when the page `<title>` can serve as its heading.',
				ja: 'デジタル庁デザインシステム（DADS）は、カルーセルをこの打ち出しタイプとコンテナタイプに分けています。打ち出しタイプはページの最上部に置き、ウェブサイトの主題を示すものです。ページの `<title>` 要素が見出しの役目を果たせる場合だけに使います。'
			}
		},
		{
			name: { en: 'Container type', ja: 'コンテナタイプ' },
			description: {
				en: 'Groups content on one topic, such as news, with a heading placed before it.',
				ja: '「新着情報」のような1つの話題のまとまりに使い、前に見出しを置くものです。'
			}
		},
		{
			name: { en: 'Multiple and single', ja: 'マルチとシングル' },
			description: {
				en: 'In DADS, a multiple carousel has 2 to 6 slides. A single one has only one slide and no controls for switching, and is used only for the key visual type. Nielsen Norman Group suggests 5 slides or fewer, since people are unlikely to engage with more.',
				ja: 'DADS では、マルチはスライドを2〜6枚にします。シングルはスライドが1枚だけで切り替えの操作部品を出さず、打ち出しタイプだけで使います。Nielsen Norman Group は、それより多いと見てもらいにくいとして5枚以下を勧めています。'
			}
		},
		{
			name: { en: 'Standard size', ja: '標準サイズ' },
			description: {
				en: 'The standard size. Beside the slide, a next area shows a small version of the next slide as a Next slide button. Numbered buttons below show the position.',
				ja: '標準の大きさで、スライドの横に次のスライドの縮小画像を「次のスライド」ボタンとして示す領域を置きます。下の番号のボタンで位置を示します。'
			}
		},
		{
			name: { en: 'Narrow size', ja: '幅狭サイズ' },
			description: {
				en: 'The counterpart of the standard size for narrow content areas, down to 320 px. There is no next area; previous and next buttons with the position as text, such as "1 / 4", take its place.',
				ja: '標準サイズに対して、コンテンツ領域が狭いとき（320px まで）の型です。次のスライドを示す領域はなく、代わりに「1 / 4」のような位置の表示と前後のボタンを置きます。'
			}
		},
		{
			name: { en: 'Auto-rotating', ja: '自動再生' },
			description: {
				en: 'Changes slides on a timer, with a stop/start button placed first inside the carousel. The Digital Agency Design System carousel does not rotate automatically.',
				ja: '一定時間ごとにスライドが切り替わるものです。停止・再開のボタンをカルーセル内の最初に置きます。デジタル庁デザインシステムのカルーセルは自動では切り替わりません。'
			}
		}
	],
	usage: [
		{
			en: 'Keep the text on each slide short and explain the details on the linked page.',
			ja: 'スライドの文字は短くし、詳しいことはリンク先で説明します。'
		}
	],
	misuse: [
		{
			pattern: { en: 'Advancing slides automatically', ja: 'スライドを自動で切り替える' },
			harm: {
				en: 'Continuous motion pulls attention away from the rest of the page. People with cognitive or attention disabilities, and people who read slowly or have trouble following moving content, can find the page hard or impossible to use.',
				ja: '動き続ける表示に気を取られ、ページのほかの部分に注意が向かなくなります。認知障害や注意欠如のある人、読むのに時間がかかる人、動くものを目で追いにくい人には、ページが使いにくくなったり使えなくなったりします。'
			},
			instead: {
				en: 'Let users change slides themselves. If slides must rotate, provide a button that stops rotation, and pause while focus or the pointer is on the carousel.',
				ja: 'スライドは利用者の操作で切り替えます。どうしても自動で切り替えるなら、止めるボタンを置き、フォーカスやマウスがカルーセル上にある間は止めます。'
			}
		},
		{
			pattern: { en: 'Putting must-read information only in a carousel', ja: '必ず読んでほしい情報をカルーセルにだけ載せる' },
			harm: {
				en: 'Many people scroll past a carousel, so slides after the first often go unseen. Someone who sees only one slide can get the wrong idea about the organization.',
				ja: 'カルーセルを読み飛ばす人が多く、2枚目以降のスライドは見られないことが多いです。1枚しか見なかった人は、その組織について誤った印象を持つことがあります。'
			},
			instead: {
				en: 'Also place important information elsewhere on the page or in the site navigation, or use a single static image instead of a carousel.',
				ja: '大事な情報はページのほかの場所やサイトのナビゲーションにも置きます。または、カルーセルをやめて1枚の固定した画像にします。'
			}
		},
		{
			pattern: { en: 'Using small dots as the only way to pick a slide', ja: 'スライドを選ぶ手段を小さな点だけにする' },
			harm: {
				en: 'People cannot tell what a dot will show before selecting it, and dots are easy to miss, especially on mobile.',
				ja: '点を押すと何が出るのかを前もって知ることができません。点は特にスマートフォンで見落としやすいです。'
			},
			instead: {
				en: 'Use previous and next buttons, or give each slide a control that names or shows its content, such as a label or thumbnail. Numbers show the position but not the content, so also offer a list of all slides. Make the controls large enough to read and select.',
				ja: '前後のボタンで切り替えるか、スライドごとにラベルやサムネイルなど中身が分かる操作部品を付けます。番号は位置を示すだけで中身は分からないので、すべてのスライドの一覧も用意します。操作部品は読めて押せる大きさにします。'
			}
		}
	],
	related: [
		{
			id: 'tabs',
			diff: {
				en: 'A carousel picks slides by number or steps through them with previous and next buttons; tabs let the user jump to any panel by its name.',
				ja: 'カルーセルは番号でスライドを選ぶか前後のボタンで順に切り替え、タブは名前の付いたパネルへ直接切り替えます。'
			}
		},
		{
			id: 'pagination',
			diff: {
				en: 'A carousel shows one slide of a small set in place; pagination moves through pages of a long list.',
				ja: 'カルーセルは少数のスライドをその場で1枚ずつ見せ、ページネーションは長い一覧のページを移動します。'
			}
		}
	],
	sources: [
		{
			label: 'Nielsen Norman Group: Carousel Usability: Designing an Effective UI for Websites with Content Overload',
			url: 'https://www.nngroup.com/articles/designing-effective-carousels/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		},
		{
			label: 'WAI-ARIA APG: Carousel (Slide Show or Image Rotator) Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'WAI-ARIA APG: Auto-Rotating Image Carousel with Tabs for Slide Control Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-2-tablist/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Understanding Success Criterion 2.2.2: Pause, Stop, Hide (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html',
			checkedAt: '2026-10-21'
		},
		{
			label: 'W3C WAI Tutorials: Carousels: Animations',
			url: 'https://www.w3.org/WAI/tutorials/carousels/animations/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「カルーセル（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/carousel/usage/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「カルーセル」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/carousel/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「カルーセル（アクセシビリティ）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/carousel/accessibility/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: carousel',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/carousel',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
