export const langs = ['en', 'ja'] as const;
export type Lang = (typeof langs)[number];

/** 英日の両方を必須にして、片方だけの記述を型エラーにする */
export type Text = Record<Lang, string>;

export const categories = [
	'action',
	'input',
	'navigation',
	'disclosure',
	'overlay',
	'feedback',
	'data'
] as const;
export type Category = (typeof categories)[number];

export interface ComponentData {
	id: string;
	category: Category;
	names: Text;
	/** 他のデザインシステムでの呼び名。source にどの資料の呼び名かを書く */
	aliases: { name: string; source: string; url: string }[];
	summary: Text;
	appearance: Text;
	behavior: Text[];
	keyboard: { key: string; action: Text }[];
	variations?: { name: Text; description: Text }[];
	/** 似ているが違う部品。diff に違いを一文で書く */
	related?: { id: string; diff: Text }[];
	sources: { label: string; url: string; checkedAt: string }[];
}
