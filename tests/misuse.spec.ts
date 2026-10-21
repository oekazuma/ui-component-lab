import { expect, test } from '@playwright/test';

test('misuse: carousel shows the section with labels', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	const section = page.getByRole('region', { name: '避けたい使い方' });
	await expect(section).toBeVisible();
	await expect(section).toContainText('困ること');
	await expect(section).toContainText('代わりに');
});

// divider には根拠のある項目が見つかっていない。項目を足したら、項目のない別の部品に替える
test('misuse: section is absent without entries', async ({ page }) => {
	await page.goto('en/components/divider/');
	await expect(page.getByRole('heading', { name: 'Misuses to avoid' })).toHaveCount(0);
});

test('misuse: labels follow the language switch', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	await page.waitForLoadState('networkidle');
	await page.getByRole('button', { name: /言語/ }).click();
	await page.getByRole('link', { name: 'English' }).click();
	await expect(page.getByRole('heading', { name: 'Misuses to avoid' })).toBeVisible();
	await expect(page.getByRole('region', { name: 'Misuses to avoid' })).toContainText('Harm');
});

test('misuse: usage section disappears once every note moved to misuse', async ({ page }) => {
	await page.goto('en/components/spinner/');
	await expect(page.getByRole('heading', { name: 'Misuses to avoid' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Usage notes' })).toHaveCount(0);
});

test('misuse: checkbox demo explains why it starts with a box checked', async ({ page }) => {
	await page.goto('ja/components/checkbox/');
	await expect(page.getByRole('region', { name: '挙動' })).toContainText('このデモでは');
});

test('misuse: each entry sets the avoided use and the alternative apart', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	const entry = page.locator('.misuse > li').first();
	const bg = (sel: string) => entry.locator(sel).evaluate((e) => getComputedStyle(e).backgroundColor);
	const [dont, harm, instead] = [await bg('h3'), await bg('.harm'), await bg('.instead')];
	expect(new Set([dont, harm, instead]).size).toBe(3);
	await expect(entry.locator('.instead dt')).toHaveText('代わりに');
});

test('misuse: the deceptive pattern label is filled and readable on the heading band', async ({ page }) => {
	await page.goto('ja/components/checkbox/');
	const badge = page.locator('.deceptive').first();
	const style = await badge.evaluate((e) => {
		const s = getComputedStyle(e);
		return { bg: s.backgroundColor, size: parseFloat(s.fontSize), band: getComputedStyle(e.closest('h3')!).backgroundColor };
	});
	expect(style.bg).not.toBe('rgba(0, 0, 0, 0)');
	expect(style.bg).not.toBe(style.band);
	expect(style.size).toBeGreaterThanOrEqual(13);
});

test('misuse: explains deceptive patterns only where the label appears', async ({ page }) => {
	await page.goto('ja/components/checkbox/');
	const section = page.getByRole('region', { name: '避けたい使い方' });
	await expect(section.locator('dfn')).toHaveText('ディセプティブパターン');
	await expect(section).toContainText('本人が望まない選択へ誘導する');
	await page.goto('ja/components/carousel/');
	await expect(page.getByRole('region', { name: '避けたい使い方' }).locator('dfn')).toHaveCount(0);
});
