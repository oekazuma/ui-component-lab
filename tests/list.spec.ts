import { expect, test } from '@playwright/test';

test('list: clicking the text under a demo opens the component page', async ({ page }) => {
	await page.goto('ja/');
	await page.waitForLoadState('networkidle');
	// 説明文はリンクの ::after に覆われている。利用者と同じく、その位置を押して上の層のリンクに届くかを見る
	const box = await page.getByText('縦に並んだ見出しごとに').boundingBox();
	await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
	await expect(page).toHaveURL(/\/ja\/components\/accordion\/$/);
});

test('list: the card link is named after the component', async ({ page }) => {
	await page.goto('en/');
	await expect(page.getByRole('link', { name: 'Accordion', exact: true })).toBeVisible();
	await expect(page.getByRole('link', { name: /^Details/ })).toHaveCount(0);
});

test('detail: key labels are not smaller than 14px', async ({ page }) => {
	await page.goto('en/components/tabs/');
	const size = await page.locator('kbd').first().evaluate((k) => parseFloat(getComputedStyle(k).fontSize));
	expect(size).toBeGreaterThanOrEqual(14);
});

test('list: category chips stay on one scrollable row on phones', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('ja/');
	const tops = await page.locator('.chip').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().top));
	expect(new Set(tops).size).toBe(1);
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('systems: links to other sites say so', async ({ page }) => {
	await page.goto('ja/systems/');
	await expect(page.getByRole('link', { name: /外部サイト/ }).first()).toBeVisible();
	await expect(page.getByRole('link', { name: 'タブ', exact: true }).first()).toBeVisible();
});

test('detail: a table of contents links to the sections on wide screens', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	const toc = page.getByRole('navigation', { name: 'このページの内容' });
	await expect(toc.getByRole('link', { name: '避けたい使い方' })).toHaveAttribute('href', '#misuse');
	await page.setViewportSize({ width: 375, height: 812 });
	await expect(toc).toBeHidden();
});
