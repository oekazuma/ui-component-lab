import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('theme: the header button switches to dark mode and remembers it', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' });
	await page.goto('ja/');
	await page.waitForLoadState('networkidle');
	const button = page.getByRole('button', { name: 'ダークモード' });
	await expect(button).toHaveAttribute('aria-pressed', 'false');
	await button.click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await expect(button).toHaveAttribute('aria-pressed', 'true');
	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await expect(page.getByRole('button', { name: 'ダークモード' })).toHaveAttribute('aria-pressed', 'true');
});

test('theme: follows the OS setting until the user chooses', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'dark' });
	await page.goto('en/');
	await page.waitForLoadState('networkidle');
	await expect(page.getByRole('button', { name: 'Dark mode' })).toHaveAttribute('aria-pressed', 'true');
	const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
	expect(bg).not.toBe('rgb(255, 255, 255)');
});

for (const path of ['ja/', 'en/components/alert/', 'ja/components/badge/', 'en/components/alert-dialog/']) {
	test(`theme: no axe violations in dark mode: ${path}`, async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto(path);
		const { violations } = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
	});
}

test('404: has the site header with a way home and the theme button', async ({ page }) => {
	await page.goto('404');
	await expect(page.getByRole('banner').getByRole('link', { name: 'UI Component Lab' })).toBeVisible();
	await expect(page.getByRole('button', { name: /Dark mode/ })).toBeVisible();
});
