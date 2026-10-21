import type { ComponentData } from '#lib/types.js';

export default {
	id: 'skeleton',
	category: 'feedback',
	names: { en: 'Skeleton', ja: 'スケルトン' },
	aliases: [],
	summary: {
		en: 'Gray placeholder shapes that show the layout of content while it loads.',
		ja: '読み込み中の内容のレイアウトを、灰色の図形で先に見せる仮の表示。'
	},
	appearance: {
		en: 'Light gray circles and bars where images and lines of text will appear, often with a soft shimmer moving across them.',
		ja: '画像や文字が入る場所に薄い灰色の丸や棒が並び、光が横に流れるような動きが付くことが多い。'
	},
	behavior: [
		{
			en: 'Replaced by the real content when loading finishes.',
			ja: '読み込みが終わると、本物の内容に置き換わる。'
		},
		{
			en: 'Because the layout appears right away, the page feels faster and does not jump when the content arrives.',
			ja: 'レイアウトがすぐに出るので待ち時間が短く感じられ、内容が届いたときに画面がずれにくい。'
		},
		{
			en: 'The gray shapes are hidden from assistive technology, and the area is marked `aria-busy` while loading.',
			ja: '灰色の図形は支援技術から隠し、読み込み中の領域には `aria-busy` を付ける。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. The demo’s reload button uses Enter / Space.',
				ja: 'なし。デモの再読み込みボタンは Enter / Space で押せる。'
			}
		}
	],
	related: [
		{
			id: 'spinner',
			diff: {
				en: 'A skeleton previews the layout of the content; a spinner is one shape that only shows something is loading.',
				ja: 'スケルトンは内容のレイアウトを先に見せ、スピナーは読み込み中であることだけを1つの図形で示す。'
			}
		}
	],
	sources: [
		{
			label: 'MUI: Skeleton',
			url: 'https://mui.com/material-ui/react-skeleton/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Carbon Design System: Loading',
			url: 'https://carbondesignsystem.com/components/loading/usage/',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
