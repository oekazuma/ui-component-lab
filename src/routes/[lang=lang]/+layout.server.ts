import { components } from '#lib/server/components.js';
import type { SearchItem } from '#lib/search.js';
import type { LayoutServerLoad } from './$types';

// ヘッダーの検索は全ページにあるので、全データではなく名前と別名と検索だけの語を渡す
export const load: LayoutServerLoad = () => ({
	searchItems: components.map(
		({ id, names, category, aliases, searchTerms }): SearchItem => ({
			id,
			names,
			category,
			searchTerms,
			aliases: aliases.map(({ name }) => ({ name }))
		})
	)
});
