import { expect, test } from '@playwright/test';

test('skill: the list page links to the guide above the category chips', async ({ page }) => {
	await page.goto('ja/');
	const link = page.getByRole('main').getByRole('link', { name: /AIエージェントで自分のサイトのUIを点検する/ });
	await expect(link).toHaveAttribute('href', '/ui-component-lab/ja/skill/');
	// カテゴリより先に目に入るよう、DOM の順でもカテゴリの前に置く
	const before = await link.evaluate((a) => {
		const chips = document.querySelector('fieldset')!;
		return !!(a.compareDocumentPosition(chips) & Node.DOCUMENT_POSITION_FOLLOWING);
	});
	expect(before).toBe(true);
});

test('skill: the footer links to the guide', async ({ page }) => {
	await page.goto('en/components/tabs/');
	await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Audit your site’s UI with an AI agent' })).toHaveAttribute(
		'href',
		'/ui-component-lab/en/skill/'
	);
});

test('skill: the guide shows how to install and try it, and what it never does on live sites', async ({ page }) => {
	await page.goto('ja/skill/');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('AIエージェントで自分のサイトのUIを点検する');
	await expect(page).toHaveTitle(/AIエージェントで自分のサイトのUIを点検する/);
	await expect(page.locator('pre code', { hasText: 'npx skills add oekazuma/ui-component-lab' })).toBeVisible();
	await expect(page.locator('pre code', { hasText: '/improve-ui-components http://localhost:5173/signup' })).toBeVisible();
	await expect(page.getByRole('heading', { level: 2, name: '本番のサイトでは操作しない' })).toBeVisible();
	for (const id of ['select', 'checkbox', 'menu'])
		await expect(page.getByRole('main').locator(`a[href="/ui-component-lab/ja/components/${id}/"]`)).toBeVisible();
	await expect(page.getByRole('link', { name: /スキルのソース.*外部サイト/ })).toHaveAttribute(
		'href',
		'https://github.com/oekazuma/ui-component-lab/tree/main/skills/improve-ui-components'
	);
});

test('skill: no horizontal scroll on phones in Japanese', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('ja/skill/');
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
