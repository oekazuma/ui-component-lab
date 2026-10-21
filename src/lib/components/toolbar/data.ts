import type { ComponentData } from '#lib/types.js';

export default {
	id: 'toolbar',
	category: 'action',
	names: { en: 'Toolbar', ja: 'ツールバー' },
	aliases: [
		{ name: 'Toolbar', source: 'React Aria', url: 'https://react-aria.adobe.com/Toolbar' },
		{ name: '<toolbar> (proposal)', source: 'Open UI', url: 'https://open-ui.org/components/toolbar.explainer/' }
	],
	summary: {
		en: 'A row of related controls, such as text formatting buttons, grouped together.',
		ja: '文字の書式ボタンのように、関係する操作部品を1列にまとめたもの。'
	},
	appearance: {
		en: 'A strip of small icon buttons, sometimes with dividers between groups. Pressed buttons stay highlighted.',
		ja: '小さなアイコンのボタンが帯状に並び、グループの間に区切り線が入ることもある。押した状態のボタンは色が変わったままになる。'
	},
	behavior: [
		{
			en: 'The whole toolbar is a single Tab stop. Inside it, the arrow keys move between buttons.',
			ja: 'ツールバー全体で Tab の止まる場所は1か所だけで、中のボタンの間は矢印キーで移る。'
		},
		{
			en: 'When the user tabs back in, focus returns to the last focused button (roving tabindex).',
			ja: 'Tab で戻ってくると、最後にフォーカスしていたボタンに戻る（ロービング tabindex）。'
		},
		{
			en: 'This demo’s buttons are toggle buttons that use aria-pressed.',
			ja: 'このデモのボタンは aria-pressed を使ったトグルボタン。'
		}
	],
	keyboard: [
		{ key: 'Tab', action: { en: 'Moves focus into or out of the toolbar.', ja: 'ツールバーへ、またはツールバーから移動する。' } },
		{ key: '← / →', action: { en: 'Moves to the previous or next button (wraps around).', ja: '前後のボタンへ移る（端から反対の端へ回る）。' } },
		{ key: 'Home / End', action: { en: 'Moves to the first or last button.', ja: '最初または最後のボタンへ移る。' } },
		{ key: 'Enter / Space', action: { en: 'Presses the focused button.', ja: 'フォーカス中のボタンを押す。' } }
	],
	usage: [
		{
			en: 'Group controls as a toolbar only when there are three or more of them.',
			ja: 'ツールバーとしてまとめるのは、操作部品が3つ以上あるときだけにする。'
		},
		{
			en: 'Give the toolbar a label with aria-label so its purpose is announced.',
			ja: 'aria-label でツールバーに名前を付け、何のための操作群か読み上げられるようにする。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Placing a Delete button right next to frequently used buttons',
				ja: '「削除」ボタンを、よく使うボタンのすぐ隣に置く'
			},
			harm: {
				en: 'People mistake it for the neighboring button and press Delete by accident, which can lose their data.',
				ja: '隣のボタンと取り違えて「削除」を誤って押し、データを失うことがある。'
			},
			instead: {
				en: 'Put space or a divider between Delete and the other buttons, or move it to a separate group at the end of the toolbar.',
				ja: '「削除」とほかのボタンの間に余白や区切り線を入れるか、ツールバーの端の別のグループに分けて置く。'
			}
		}
	],
	related: [
		{
			id: 'menu',
			diff: {
				en: 'A toolbar keeps a group of controls visible in a row; a menu hides actions in a list that opens on demand.',
				ja: 'ツールバーは操作部品を1列に並べて常に見せ、メニューは操作を開いたリストにしまう。'
			}
		},
		{
			id: 'toggle-button',
			diff: {
				en: 'A toolbar groups several buttons and moves between them with arrow keys; a toggle button is a single on/off button that can sit inside one.',
				ja: 'ツールバーは複数のボタンをまとめて矢印キーで行き来させる。トグルボタンはオンとオフを切り替える1つのボタンで、ツールバーの中に置くこともある。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Toolbar Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Open UI: Toolbar Element (Explainer)',
			url: 'https://open-ui.org/components/toolbar.explainer/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'デジタル庁「ユーザビリティ導入ガイドブック」（DS-671.1）',
			url: 'https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/91365885/20251016_introduction_to_usability.pdf',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
