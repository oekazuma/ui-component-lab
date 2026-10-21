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
