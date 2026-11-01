import { components } from '#lib/server/components.js';
import type { SearchItem } from '#lib/search.js';
import type { LayoutServerLoad } from './$types';

// ヘッダーの検索は全ページにあるので、全データではなく名前と別名だけを渡す
export const load: LayoutServerLoad = () => ({
	searchItems: components.map(
		({ id, names, category, aliases }): SearchItem => ({
			id,
			names,
			category,
			aliases: aliases.map(({ name }) => ({ name }))
		})
	)
});
