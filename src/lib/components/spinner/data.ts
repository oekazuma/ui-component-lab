import type { ComponentData } from '#lib/types.js';

export default {
	id: 'spinner',
	category: 'feedback',
	names: { en: 'Spinner', ja: 'スピナー' },
	aliases: [{ name: 'Loading', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/loading/usage/' }],
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
			en: 'With the reduce-motion setting, this demo spins more slowly.',
			ja: '「視差効果を減らす」などの設定が有効なとき、このデモは回転を遅くする。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. The demo’s load button uses Enter / Space.',
				ja: 'なし。デモの読み込みボタンは Enter / Space で押せる。'
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
		}
	]
} satisfies ComponentData;
