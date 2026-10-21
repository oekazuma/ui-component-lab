import { expect, test } from '@playwright/test';

test('footer: links to the systems index, the repository and the license', async ({ page }) => {
	await page.goto('ja/components/tabs/');
	const footer = page.getByRole('contentinfo');
	await expect(footer.getByRole('link', { name: 'デザインシステムごとの名前の対応表' })).toBeVisible();
	// GitHub とライセンスはアイコンだけのリンク。読み上げ用の名前と、マウスを乗せたときの説明があることを見る
	for (const name of [/GitHub.*外部サイト/, /MIT.*外部サイト/]) {
		const link = footer.getByRole('link', { name });
		await expect(link).toBeVisible();
		await expect(link.locator('svg')).toBeVisible();
		await expect(link).toHaveAttribute('title', /.+/);
	}
	await expect(footer).toContainText('出典');
});

test('skip link: the first Tab reaches it and it moves focus to the main content', async ({ page }) => {
	await page.goto('ja/');
	await page.waitForLoadState('networkidle');
	await page.keyboard.press('Tab');
	const skip = page.getByRole('link', { name: '本文へ移動' });
	await expect(skip).toBeFocused();
	await expect(skip).toBeVisible();
	await page.keyboard.press('Enter');
	await expect(page.locator('main')).toBeFocused();
});

test('toc: phones get a collapsible table of contents under the demo', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('ja/components/carousel/');
	await page.locator('.toc-mobile summary').click();
	await expect(page.locator('.toc-mobile').getByRole('link', { name: '避けたい使い方' })).toBeVisible();
});

test('toc: marks the section being read', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => document.getElementById('misuse')!.scrollIntoView({ block: 'start' }));
	const toc = page.getByRole('navigation', { name: 'このページの内容' });
	await expect(toc.getByRole('link', { name: '避けたい使い方' })).toHaveAttribute('aria-current', 'location');
	await expect(toc.locator('[aria-current]')).toHaveCount(1);
});

test('toc: marks the last section once the page is scrolled to the end', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
	const toc = page.getByRole('navigation', { name: 'このページの内容' });
	await expect(toc.getByRole('link', { name: '出典' })).toHaveAttribute('aria-current', 'location');
	await expect(toc.locator('[aria-current]')).toHaveCount(1);
});

test('systems: the page title says it is a table of names', async ({ page }) => {
	await page.goto('en/systems/');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Component names across design systems');
	await expect(page).toHaveTitle(/Component names across design systems/);
});
