import { components } from '#lib/server/components.js';
import type { PageServerLoad } from './$types';

// カードに出す分だけを渡す。本文（挙動やキー操作など）は詳細ページでだけ使う
export const load: PageServerLoad = () => ({
	cards: components.map(({ id, category, names, summary, aliases }) => ({
		id,
		category,
		names,
		summary,
		aliases: aliases.map(({ name }) => ({ name }))
	}))
});
