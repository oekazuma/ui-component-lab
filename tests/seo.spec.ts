import { expect, test } from '@playwright/test';
import { componentIds } from './component-ids';

const origin = 'https://oekazuma.github.io/ui-component-lab/';

test('seo: the sitemap lists every page once per language with absolute URLs', async ({ request }) => {
	const xml = await (await request.get('sitemap.xml')).text();
	const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
	// 一覧、systems、skill と全部品の詳細ページが en と ja で 1 つずつ。ページを増やしたら 3 を合わせる
	expect(locs).toHaveLength(2 * (3 + componentIds.length));
	expect(new Set(locs).size).toBe(locs.length);
	for (const loc of locs) {
		expect(loc.startsWith(origin)).toBe(true);
		expect(loc.endsWith('/')).toBe(true);
	}
});

test('seo: a detail page has an absolute canonical and hreflang alternates', async ({ page }) => {
	await page.goto('ja/components/modal/');
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}ja/components/modal/`);
	const alt = (hreflang: string) => page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`);
	await expect(alt('en')).toHaveAttribute('href', `${origin}en/components/modal/`);
	await expect(alt('ja')).toHaveAttribute('href', `${origin}ja/components/modal/`);
	await expect(alt('x-default')).toHaveAttribute('href', origin);
});

test('seo: 404.html is noindex and loads its assets by absolute path', async ({ request }) => {
	const html = await (await request.get('404.html')).text();
	expect(html).toContain('noindex');
	expect(html).toContain('/ui-component-lab/_app/');
});

test('seo: the root sends Japanese browsers to /ja/ and others to /en/', async ({ browser }) => {
	const baseURL = test.info().project.use.baseURL!;
	for (const [locale, lang] of [['ja-JP', 'ja'], ['en-US', 'en']]) {
		const context = await browser.newContext({ locale, baseURL });
		const page = await context.newPage();
		await page.goto('');
		await page.waitForURL(`**/ui-component-lab/${lang}/`);
		await context.close();
	}
});
