import type { ComponentData } from '#lib/types.js';

export default {
	id: 'tree-view',
	category: 'navigation',
	names: { en: 'Tree view', ja: 'ツリービュー' },
	aliases: [
		{ name: 'Tree view', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/building-blocks/core/components/tree-view' },
		{ name: 'Tree', source: 'Ant Design', url: 'https://ant.design/components/tree' }
	],
	summary: {
		en: 'A nested list, like folders in a file manager, whose branches can be opened and closed.',
		ja: 'ファイル管理のフォルダのように入れ子になったリストで、枝ごとに開閉できる部品。'
	},
	appearance: {
		en: 'Items indented by level, with a triangle or folder icon on items that have children. Opening one shows its children indented below it.',
		ja: '階層ごとに字下げされた項目が並び、子を持つ項目には三角やフォルダのアイコンが付く。開くと子の項目が一段下げて表示される。'
	},
	behavior: [
		{
			en: 'Clicking a folder opens or closes it. Clicking a file opens it.',
			ja: 'フォルダをクリックすると開閉し、ファイルをクリックすると開く。'
		},
		{
			en: 'The whole tree is a single Tab stop; the arrow keys move between visible items.',
			ja: 'ツリー全体で Tab の止まる場所は1か所だけで、見えている項目の間は矢印キーで移る。'
		},
		{
			en: 'This demo leaves out two APG keys: jumping by typing and * to open all siblings.',
			ja: 'このデモでは APG にある、文字入力での移動と * での一括展開を省いている。'
		}
	],
	keyboard: [
		{ key: '↑ / ↓', action: { en: 'Moves to the previous or next visible item.', ja: '前後の見えている項目へ移る。' } },
		{
			key: '→',
			action: {
				en: 'Opens a closed folder; on an open folder, moves to its first child.',
				ja: '閉じたフォルダを開く。開いたフォルダでは最初の子へ移る。'
			}
		},
		{
			key: '←',
			action: {
				en: 'Closes an open folder; on a child, moves to its parent.',
				ja: '開いたフォルダを閉じる。子の項目では親へ移る。'
			}
		},
		{ key: 'Home / End', action: { en: 'Moves to the first or last visible item.', ja: '最初または最後の見えている項目へ移る。' } },
		{ key: 'Enter', action: { en: 'Opens a file, or opens or closes a folder.', ja: 'ファイルを開く。フォルダでは開閉する。' } }
	],
	usage: [
		{
			en: 'Use it for real hierarchies such as folders or categories. For a few sections of content, an accordion is simpler.',
			ja: 'フォルダや分類のような本当の階層に使う。内容のまとまりがいくつかあるだけなら、アコーディオンの方が簡単。'
		}
	],
	related: [
		{
			id: 'accordion',
			diff: {
				en: 'A tree view opens nested items in several levels; an accordion opens sections of content in one level.',
				ja: 'ツリービューは入れ子の項目を何段にも開閉し、アコーディオンは内容のまとまりを1段で開閉する。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Tree View Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/treeview/',
			checkedAt: '2026-10-20'
		},
		{
			label: 'Carbon Design System: Tree view',
			url: 'https://carbondesignsystem.com/building-blocks/core/components/tree-view',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
