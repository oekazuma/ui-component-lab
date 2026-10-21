import type { Category, Lang } from './types';

export const siteName = 'UI Component Lab';

const ui = {
	en: {
		tagline: 'What’s that UI called? Learn the name and the behavior by trying it.',
		details: 'Details',
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
		related: 'Similar components',
		sources: 'Sources',
		checkedAt: 'Last checked',
		backToList: 'All components',
		switchLang: '日本語',
		demo: 'Demo',
		source: 'Source code',
		showSource: 'Show Demo.svelte',
		search: 'Search by name',
		category: 'Category',
		all: 'All',
		count: (n: number) => `${n} ${n === 1 ? 'component' : 'components'}`,
		noResults: 'No components match.',
		systems: 'Names by design system',
		systemsLead:
			'What each design system calls the components in this guide. Components with no other known name are not listed.',
		nameInSystem: 'Name in the system',
		componentHere: 'Component in this guide'
	},
	ja: {
		tagline: 'そのUI、なんて名前？ 呼び方と動きを、触って覚えよう。',
		details: '詳細を見る',
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
		related: '似た部品との違い',
		sources: '出典',
		checkedAt: '最終確認日',
		backToList: 'コンポーネント一覧',
		switchLang: 'English',
		demo: 'デモ',
		source: 'ソースコード',
		showSource: 'Demo.svelte を表示',
		search: '名前で検索',
		category: 'カテゴリ',
		all: 'すべて',
		count: (n: number) => `${n}件`,
		noResults: '該当するコンポーネントはありません。',
		systems: 'デザインシステム別の呼び名',
		systemsLead:
			'このサイトの部品を、各デザインシステムが何と呼んでいるかの一覧。ほかの呼び名が見つかっていない部品は載せていない。',
		nameInSystem: 'そのシステムでの呼び名',
		componentHere: 'このサイトでの部品'
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
