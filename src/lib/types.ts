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
	/** 使い分けや注意点。根拠にした資料は sources に載せる */
	usage?: Text[];
	/** 避けたい使い方。根拠にした資料は sources に載せる */
	misuse?: {
		/** どういう使い方か */
		pattern: Text;
		/** 誰がどう困るか。出典に書かれている内容に限る */
		harm: Text;
		/** 代わりにどうするか */
		instead: Text;
		/** 利用者をだまして望まない選択に誘導するもの（ディセプティブパターン）なら true */
		deceptive?: true;
	}[];
	/** 似ているが違う部品。diff に違いを一文で書く */
	related?: { id: string; diff: Text }[];
	sources: { label: string; url: string; checkedAt: string }[];
}
