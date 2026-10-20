import type { Category, Lang } from './types';

export const siteName = 'UI Component Lab';

const ui = {
	en: {
		tagline: 'A field guide to UI components: names, looks, and behavior you can try in place.',
		details: 'Details',
		reset: 'Reset',
		aliases: 'Also known as',
		appearance: 'How to recognize it',
		behavior: 'Behavior',
		keyboard: 'Keyboard',
		key: 'Key',
		action: 'Action',
		variations: 'Variations',
		related: 'Similar components',
		sources: 'Sources',
		checkedAt: 'Last checked',
		backToList: 'All components',
		switchLang: '日本語',
		demo: 'Demo'
	},
	ja: {
		tagline: 'UIコンポーネントの名前・見た目・挙動を、その場で触って確かめられる図鑑です。',
		details: '詳細を見る',
		reset: 'リセット',
		aliases: '別名',
		appearance: '見分けるポイント',
		behavior: '挙動',
		keyboard: 'キーボード操作',
		key: 'キー',
		action: '動作',
		variations: 'バリエーション',
		related: '似た部品との違い',
		sources: '出典',
		checkedAt: '最終確認日',
		backToList: 'コンポーネント一覧',
		switchLang: 'English',
		demo: 'デモ'
	}
} satisfies Record<Lang, Record<string, string>>;

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
