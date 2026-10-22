import type { Category, Lang } from './types';

export const siteName = 'UI Component Lab';

const ui = {
	en: {
		tagline: 'What’s that UI called? Learn the name and the behavior by trying it.',
		reset: 'Reset',
		aliases: 'Also known as',
		appearance: 'How to recognize it',
		behavior: 'Behavior',
		keyboard: 'Keyboard',
		key: 'Key',
		action: 'Action',
		variations: 'Variations',
		usage: 'Usage notes',
		misuse: 'Misuses to avoid',
		harm: 'Harm',
		instead: 'Instead',
		deceptive: 'Deceptive pattern',
		deceptiveNote:
			' (dark pattern): a design that tricks people into choices they did not intend. A design can fall into this even when its makers mean no harm.',
		toc: 'On this page',
		external: ' (opens another site)',
		darkMode: 'Dark mode',
		systemsIndex: 'Design systems',
		searchHint: '↑↓ to move, Enter to open, Esc to close',
		skipToContent: 'Skip to content',
		repository: 'Source on GitHub',
		license: 'MIT License',
		sourcesNote: 'Each page is written from the sources listed at its end.',
		related: 'Similar components',
		sources: 'Sources',
		checkedAt: 'Last checked',
		backToList: 'All components',
		language: 'Language',
		demo: 'Demo',
		search: 'Search by name',
		category: 'Category',
		all: 'All',
		count: (n: number) => `${n} ${n === 1 ? 'component' : 'components'}`,
		noResults: 'No components match.',
		systems: 'Component names across design systems',
		systemsLead:
			'What each design system calls the components in this guide. Components with no other known name are not listed.',
		nameInSystem: 'Name in the system',
		componentHere: 'Component in this guide',
		skill: 'Audit your site’s UI with an AI agent',
		skillLead:
			'An agent skill that checks the UI on your own pages against this guide, finds the wrong component, misuses and keyboard gaps, and writes plans to fix them.'
	},
	ja: {
		tagline: 'そのUI、なんて名前？ 呼び方と動きを、触って覚えましょう。',
		reset: 'リセット',
		aliases: '別名',
		appearance: '見分けるポイント',
		behavior: '挙動',
		keyboard: 'キーボード操作',
		key: 'キー',
		action: '動作',
		variations: 'バリエーション',
		usage: '使い分け・注意点',
		misuse: '避けたい使い方',
		harm: '困ること',
		instead: '代わりに',
		deceptive: 'ディセプティブパターン',
		deceptiveNote:
			'（ダークパターン）は、利用者をだまして、本人が望まない選択へ誘導する使い方です。作り手に悪意がなくても、結果として当てはまることがあります。',
		toc: 'このページの内容',
		external: '（外部サイト）',
		darkMode: 'ダークモード',
		systemsIndex: 'デザインシステムの一覧',
		searchHint: '↑↓ で移動、Enter で開く、Esc で閉じる',
		skipToContent: '本文へ移動',
		repository: 'GitHub のリポジトリ',
		license: 'MIT ライセンス',
		sourcesNote: '各ページの内容は、ページ末尾の出典をもとに作成しています。',
		related: '似た部品との違い',
		sources: '出典',
		checkedAt: '最終確認日',
		backToList: 'コンポーネント一覧',
		language: '言語',
		demo: 'デモ',
		search: '名前で検索',
		category: 'カテゴリ',
		all: 'すべて',
		count: (n: number) => `${n}件`,
		noResults: '該当するコンポーネントはありません。',
		systems: 'デザインシステムごとの名前の対応表',
		systemsLead:
			'このサイトの部品を、各デザインシステムが何と呼んでいるかの一覧です。ほかの呼び名が見つかっていない部品は載せていません。',
		nameInSystem: 'そのシステムでの呼び名',
		componentHere: 'このサイトでの部品',
		skill: 'AIエージェントで自分のサイトのUIを点検する',
		skillLead:
			'このサイトの知見をもとに、自分のサイトのページにあるUIをエージェントが点検するスキルです。部品の選び方、避けたい使い方、キー操作を確かめ、直し方を計画にまとめます。'
	}
} satisfies Record<Lang, Record<string, string | ((n: number) => string)>>;

export const categoryNames: Record<Category, Record<Lang, string>> = {
	action: { en: 'Action', ja: 'アクション' },
	input: { en: 'Input', ja: '入力' },
	navigation: { en: 'Navigation', ja: 'ナビゲーション' },
	disclosure: { en: 'Disclosure', ja: '開閉・切替' },
	overlay: { en: 'Overlay', ja: 'オーバーレイ' },
	feedback: { en: 'Feedback', ja: 'フィードバック' },
	data: { en: 'Data display', ja: 'データ表示' }
};

export const t = (lang: Lang) => ui[lang];
