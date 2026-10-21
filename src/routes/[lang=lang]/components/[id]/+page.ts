import { error } from '@sveltejs/kit';
import { entries as components, getEntry } from '#lib/registry.js';
import { stripComments } from '#lib/strip-comments.js';
import { langs } from '#lib/types.js';
import type { EntryGenerator, PageLoad } from './$types';

// デモのソースはページごとの遅延チャンクにして、一覧ページの読み込みに含めない
const sources = import.meta.glob<string>('/src/lib/components/*/Demo.svelte', {
	query: '?raw',
	import: 'default'
});

export const entries: EntryGenerator = () =>
	langs.flatMap((lang) => components.map(({ data }) => ({ lang, id: data.id })));

export const load: PageLoad = async ({ params }) => {
	const entry = getEntry(params.id);
	if (!entry) error(404);
	const source = stripComments(await sources[`/src/lib/components/${params.id}/Demo.svelte`]());
	return { entry, source };
};
