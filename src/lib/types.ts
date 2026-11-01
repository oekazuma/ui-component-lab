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
	/** 検索だけに使う、普段の呼び名（例: 「プルダウン」）。出典のある呼び名ではないので、画面にも components.json にも出さない */
	searchTerms?: string[];
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

/** improve-ui-components スキルが読む components.json の形。形を変えるときは version を上げ、スキルも合わせる */
export interface ComponentsJson {
	version: 1;
	site: { name: string; url: string };
	categories: { id: Category; names: Text }[];
	components: (ComponentData & { urls: Record<Lang, string> })[];
}
