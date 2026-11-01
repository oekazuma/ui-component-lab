import { categoryNames, siteName } from '#lib/i18n.js';
import { resolve } from '$app/paths';
import { componentPath } from '#lib/paths.js';
import { components } from '#lib/server/components.js';
import { categories, langs, type ComponentsJson } from '#lib/types.js';
import type { RequestHandler } from './$types';

export const prerender = true;

// improve-ui-components スキルが実行のたびに読む。スキルは指摘や計画に Lab のページを添えるので、詳細ページは絶対 URL にする
export const GET: RequestHandler = ({ url }) => {
	const body = {
		version: 1,
		site: { name: siteName, url: `${url.origin}${resolve('/')}`.replace(/\/?$/, '/') },
		categories: categories.map((id) => ({ id, names: categoryNames[id] })),
		components: components.map((data) => ({
			...data,
			urls: Object.fromEntries(langs.map((lang) => [lang, `${url.origin}${componentPath(lang, data.id)}`])) as Record<
				(typeof langs)[number],
				string
			>
		}))
	} satisfies ComponentsJson;
	return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } });
};
