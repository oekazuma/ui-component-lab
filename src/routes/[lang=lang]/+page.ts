import { definePageMetaTags } from 'svelte-meta-tags';
import { loadThumb } from '#lib/demos.js';
import { siteName, t } from '#lib/i18n.js';
import { langs } from '#lib/types.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => langs.map((lang) => ({ lang }));

// 一覧はすべてのサムネイルを最初から描くので、全部読み込んでから表示する（部品ごとのチャンクを並行して読む）
export const load: PageLoad = async ({ data, params }) => {
	const thumbs = Object.fromEntries(
		await Promise.all(data.cards.map(async ({ id }) => [id, await loadThumb(id)] as const))
	);
	return {
		...data,
		thumbs,
		...definePageMetaTags({ title: siteName, titleTemplate: '%s', description: t(params.lang).tagline })
	};
};
