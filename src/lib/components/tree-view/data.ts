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
		ja: 'ファイル管理のフォルダのように入れ子になったリストで、枝ごとに開閉できる部品です。'
	},
	appearance: {
		en: 'Items indented by level, with a triangle or folder icon on items that have children. Opening one shows its children indented below it. The open file is marked with a bar on its left and bold text.',
		ja: '階層ごとに字下げされた項目が並び、子を持つ項目には三角やフォルダのアイコンが付きます。開くと子の項目が一段下げて表示されます。開いているファイルは左の縦線と太字で示されます。'
	},
	behavior: [
		{
			en: 'Clicking a folder opens or closes it. Clicking a file opens it.',
			ja: 'フォルダをクリックすると開閉し、ファイルをクリックすると開きます。'
		},
		{
			en: 'The open file has `aria-current="true"`, so screen readers announce it as current. Only one item has it at a time.',
			ja: '開いているファイルには `aria-current="true"` を付け、スクリーンリーダーで「現在の項目」と読み上げられるようにします。付くのは常に1つだけです。'
		},
		{
			en: 'The whole tree is a single Tab stop; the arrow keys move between visible items.',
			ja: 'ツリー全体で Tab の止まる場所は1か所だけで、見えている項目の間は矢印キーで移ります。'
		},
		{
			en: 'In this demo, jumping by typing a name and * to open all siblings are left out. APG recommends typing to jump especially for trees with more than seven top-level items, and lists * as optional; this tree has three top-level items and few files, so the arrow keys reach every item quickly.',
			ja: 'このデモでは、名前の文字を打って移る操作と、* での一括展開を省いています。APG は最上位の項目が7つを超えるツリーでは特に文字入力での移動を勧め、* は任意としています。このツリーは最上位の項目が3つでファイルも少なく、矢印キーだけで素早くたどれます。'
		}
	],
	keyboard: [
		{ key: '↑ / ↓', action: { en: 'Moves to the previous or next visible item.', ja: '前後の見えている項目へ移ります。' } },
		{
			key: '→',
			action: {
				en: 'Opens a closed folder; on an open folder, moves to its first child.',
				ja: '閉じたフォルダを開きます。開いたフォルダでは最初の子へ移ります。'
			}
		},
		{
			key: '←',
			action: {
				en: 'Closes an open folder; on a child, moves to its parent.',
				ja: '開いたフォルダを閉じます。子の項目では親へ移ります。'
			}
		},
		{ key: 'Home / End', action: { en: 'Moves to the first or last visible item.', ja: '最初または最後の見えている項目へ移ります。' } },
		{
			key: 'Enter',
			action: {
				en: 'Opens a file and marks it as current, or opens or closes a folder.',
				ja: 'ファイルを開き、現在の項目にします。フォルダでは開閉します。'
			}
		}
	],
	usage: [
		{
			en: 'Use it for real hierarchies such as folders or categories. For a few sections of content, an accordion is simpler.',
			ja: 'フォルダや分類のような本当の階層に使います。内容のまとまりがいくつかあるだけなら、アコーディオンの方が簡単です。'
		}
	],
	related: [
		{
			id: 'accordion',
			diff: {
				en: 'A tree view opens nested items in several levels; an accordion opens sections of content in one level.',
				ja: 'ツリービューは入れ子の項目を何段にも開閉し、アコーディオンは内容のまとまりを1段で開閉します。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Tree View Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/treeview/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'WAI-ARIA APG: Navigation Treeview Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-navigation/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'Carbon Design System: Tree view',
			url: 'https://carbondesignsystem.com/building-blocks/core/components/tree-view',
			checkedAt: '2026-10-20'
		}
	]
} satisfies ComponentData;
