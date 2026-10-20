import type { ComponentData } from './types';

/**
 * 表記ゆれを吸収して比較用の文字列にする。
 * 全角・半角（NFKC）、大文字小文字、カタカナとひらがな、空白・区切り記号・長音の有無を同一視する。
 */
export const normalize = (s: string) =>
	s
		.normalize('NFKC')
		.toLowerCase()
		.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
		.replace(/[\s\-_・ー]/g, '');

// ponytail: 部分一致のみ。typo 許容が要るほど件数が増えたら Fuse.js を検討する
export const matches = (data: ComponentData, query: string) => {
	const q = normalize(query);
	return [data.id, data.names.en, data.names.ja, ...data.aliases.map((a) => a.name)].some((s) =>
		normalize(s).includes(q)
	);
};
