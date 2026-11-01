import { definePageMetaTags } from 'svelte-meta-tags';
import { loadDemo } from '#lib/demos.js';
import type { PageLoad } from './$types';

// デモは Svelte のコンポーネントで JSON にできないので、サーバーの load ではなくここで読み込む
export const load: PageLoad = async ({ data, params }) => ({
	...data,
	demo: await loadDemo(params.id),
	...definePageMetaTags({
		title: data.data.names[params.lang],
		description: data.data.summary[params.lang]
	})
});
