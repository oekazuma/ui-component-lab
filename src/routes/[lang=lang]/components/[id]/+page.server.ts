import { error } from '@sveltejs/kit';
import { components, getComponent } from '#lib/server/components.js';
import { langs } from '#lib/types.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () =>
	langs.flatMap((lang) => components.map(({ id }) => ({ lang, id })));

export const load: PageServerLoad = ({ params }) => {
	const data = getComponent(params.id);
	if (!data) error(404);
	// 関連部品はリンクの文字に名前だけを使う
	const related = (data.related ?? []).flatMap((r) => {
		const other = getComponent(r.id);
		return other ? [{ ...r, names: other.names }] : [];
	});
	return { data, related };
};
