import type { ComponentData } from '#lib/types.js';

export default {
	id: 'spinner',
	category: 'feedback',
	names: { en: 'Spinner', ja: 'スピナー' },
	aliases: [
		{ name: 'Loading', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/loading/usage/' },
		{ name: 'プログレスインジケーター', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/progress-indicator/' }
	],
	summary: {
		en: 'A small rotating shape that shows something is loading, without saying how long it will take.',
		ja: '読み込み中であることを示す、回転する小さな図形。終わるまでの時間は示さない。'
	},
	appearance: {
		en: 'A ring with one colored section, or a circle of dots, that keeps spinning.',
		ja: '一部だけ色の付いた輪や、点を丸く並べたものが回り続ける。'
	},
	behavior: [
		{
			en: 'Shown while waiting for data and removed when loading finishes.',
			ja: 'データを待っている間だけ表示し、読み込みが終わると消す。'
		},
		{
			en: 'The spinning shape is decorative; a text such as “Loading…” in a status region tells screen reader users what is happening.',
			ja: '回る図形は飾りで、何が起きているかは status の領域に入れた「読み込み中…」などの文でスクリーンリーダー利用者に伝える。'
		},
		{
			en: 'In this demo, the box stands for a whole screen. The spinner fills it while the page loads, and the comments appear once loading finishes.',
			ja: 'このデモでは、枠を1つの画面に見立てている。ページの読み込み中は枠全体にスピナーを出し、読み込みが終わるとコメントを表示する。'
		},
		{
			en: 'With the reduce-motion setting, which the page reads through `prefers-reduced-motion`, this demo stops the spinning. The DADS example does the same. The “Loading…” text still tells the user what is happening.',
			ja: '「視差効果を減らす」などの設定が有効なとき、このデモは `prefers-reduced-motion` でそれを読み取り、回転を止める。DADS の実装例も同じ。処理中であることは「読み込み中…」の文で伝わる。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. The demo’s button that opens the comments page uses Enter / Space.',
				ja: 'なし。デモのコメントのページを開くボタンは Enter / Space で押せる。'
			}
		}
	],
	usage: [
		{
			en: 'Systems differ on loading inside part of the screen. Because a part that keeps moving draws the eye away from the rest of the page, DADS keeps animated indicators for whole-screen loading and uses a static indicator, such as its hourglass type, for a small area. Carbon shows its small loading indicator next to the related action for loading inside one element.',
			ja: '画面の一部の読み込みの扱いは資料によって分かれる。動き続ける部分に目を奪われ、画面のほかの部分に集中できなくなるため、DADS は動く表示を画面全体の読み込みに限り、一部の領域には砂時計タイプのような動かない表示を使う。Carbon は1つの要素の中の読み込みに、小さな読み込み表示を操作の横に出す。'
		},
		{
			en: 'Continuous movement is especially distracting for some people with cognitive disabilities or attention deficits.',
			ja: '認知障害や注意の障害がある人には、動き続けるものが特に妨げになる。'
		}
	],
	related: [
		{
			id: 'progress-bar',
			diff: {
				en: 'A spinner only shows that something is happening; a progress bar shows how far along it is.',
				ja: 'スピナーは処理中であることだけを示し、プログレスバーは進み具合を示す。'
			}
		},
		{
			id: 'skeleton',
			diff: {
				en: 'A spinner is one shape for any wait; a skeleton previews the layout of the content that is loading.',
				ja: 'スピナーはどの待ち時間にも使う1つの図形で、スケルトンは読み込み中の内容のレイアウトを先に見せる。'
			}
		}
	],
	sources: [
		{
			label: 'Carbon Design System: Loading',
			url: 'https://carbondesignsystem.com/components/loading/usage/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: ARIA: status role',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: prefers-reduced-motion',
			url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Understanding Success Criterion 2.2.2: Pause, Stop, Hide (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「プログレスインジケーター」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/progress-indicator/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'デジタル庁デザインシステム HTML 実装例: progress-indicator',
			url: 'https://github.com/digital-go-jp/design-system-example-components-html/tree/main/src/components/progress-indicator',
			checkedAt: '2026-10-21'
		},
		{
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
