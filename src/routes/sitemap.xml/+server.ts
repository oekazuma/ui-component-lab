import { componentPath, homePath, skillPath, systemsPath } from '#lib/paths.js';
import { entries } from '#lib/registry.js';
import { langs } from '#lib/types.js';
import type { RequestHandler } from './$types';

export const prerender = true;

// GitHub Pages ではホスト直下の robots.txt を置けないため、この sitemap は Search Console から登録する
export const GET: RequestHandler = ({ url }) => {
	const paths = langs.flatMap((lang) => [
		homePath(lang),
		systemsPath(lang),
		skillPath(lang),
		...entries.map(({ data }) => componentPath(lang, data.id))
	]);
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `<url><loc>${url.origin}${p}</loc></url>`).join('\n')}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
