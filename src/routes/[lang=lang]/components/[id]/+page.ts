import { error } from '@sveltejs/kit';
import { entries as components, getEntry } from '#lib/registry.js';
import { langs } from '#lib/types.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	langs.flatMap((lang) => components.map(({ data }) => ({ lang, id: data.id })));

export const load: PageLoad = ({ params }) => {
	const entry = getEntry(params.id);
	if (!entry) error(404);
	return { entry };
};
