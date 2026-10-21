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
			ja: '回る図形は飾りで、「読み込み中…」などの文を status の領域に入れてスクリーンリーダー利用者に伝える。'
		},
		{
			en: 'In this demo, the box stands for a whole screen. The spinner fills it while the page loads, and the comments appear once loading finishes.',
			ja: 'このデモでは、枠を1つの画面に見立てている。ページの読み込み中は枠全体にスピナーを出し、読み込みが終わるとコメントを表示する。'
		},
		{
			en: 'With the reduce-motion setting, this demo stops the spinning, as the DADS implementation does. The “Loading…” text still tells the user what is happening.',
			ja: '「視差効果を減らす」などの設定が有効なとき、このデモは DADS の実装と同じく回転を止める。処理中であることは「読み込み中…」の文で伝わる。'
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
	misuse: [
		{
			pattern: { en: 'Spinning while only part of the screen is loading', ja: '画面の一部の読み込み中に回し続ける' },
			harm: {
				en: 'A part of the screen that keeps moving draws the eye, and the user can no longer concentrate on the rest of the page.',
				ja: '動き続ける部分に目を奪われ、利用者が画面のほかの部分に集中できなくなる。'
			},
			instead: {
				en: 'Keep animated indicators for times when the whole screen is loading. For a small area, show a static indicator such as an hourglass icon with a “Loading…” label.',
				ja: '動く表示は画面全体が読み込み中のときに限る。一部の領域には、砂時計のアイコンと「読み込み中」の文のような動かない表示を使う。'
			}
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
			checkedAt: '2026-10-20'
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
		},
		{
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
