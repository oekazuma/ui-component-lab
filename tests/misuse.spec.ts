import { expect, test } from '@playwright/test';

test('misuse: carousel shows the section with labels', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	const section = page.getByRole('region', { name: '避けたい使い方' });
	await expect(section).toBeVisible();
	await expect(section).toContainText('困ること');
	await expect(section).toContainText('代わりに');
});

test('misuse: section is absent without entries', async ({ page }) => {
	await page.goto('en/components/divider/');
	await expect(page.getByRole('heading', { name: 'Misuses to avoid' })).toHaveCount(0);
});

test('misuse: labels follow the language switch', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	await page.waitForLoadState('networkidle');
	await page.getByRole('link', { name: 'English' }).click();
	await expect(page.getByRole('heading', { name: 'Misuses to avoid' })).toBeVisible();
	await expect(page.getByRole('region', { name: 'Misuses to avoid' })).toContainText('Harm');
});
