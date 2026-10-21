import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('source: shows the demo code without comments', async ({ page }) => {
	await page.goto('en/components/tabs/');
	await page.waitForLoadState('networkidle');
	await page.getByText('Show Demo.svelte').click();
	const code = page.locator('details pre');
	await expect(code).toBeVisible();
	await expect(code).toContainText('role="tablist"');
	await expect(code).not.toContainText('自動アクティベーション');

	const { violations } = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
		.analyze();
	expect(violations.map((v) => v.id)).toEqual([]);
});
