import { expect, test } from '@playwright/test';
import { openDemo } from './open-demo.ts';

test('radio: starts with nothing chosen; Tab reaches the first option and Space chooses it', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/radio/');
	const radios = demo.getByRole('radio');
	for (const radio of await radios.all()) await expect(radio).not.toBeChecked();

	// グループの直前に Tab の起点を置く
	await demo.locator('fieldset').evaluate((el) => {
		const start = document.createElement('button');
		el.before(start);
		start.focus();
	});
	await page.keyboard.press('Tab');
	await expect(radios.first()).toBeFocused();
	await page.keyboard.press('Space');
	await expect(radios.first()).toBeChecked();
});

test('tooltip: stays open while the pointer crosses the gap onto the tooltip', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tooltip/');
	const button = demo.getByRole('button', { name: 'Copy link' });
	const tooltip = demo.locator('[role="tooltip"]');

	await button.hover();
	await expect(tooltip).toBeVisible();
	const b = (await button.boundingBox())!;
	const t = (await tooltip.boundingBox())!;
	const x = b.x + b.width / 2;
	await page.mouse.move(x, (t.y + t.height + b.y) / 2, { steps: 5 });
	await expect(tooltip).toHaveClass(/visible/);
	await page.mouse.move(x, t.y + t.height / 2, { steps: 5 });
	await expect(tooltip).toHaveClass(/visible/);
});

test('tooltip: stays open while the button has focus, even after the pointer leaves', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tooltip/');
	const button = demo.getByRole('button', { name: 'Copy link' });
	const tooltip = demo.locator('[role="tooltip"]');

	await button.focus();
	await button.hover();
	await page.mouse.move(0, 0, { steps: 5 });
	await expect(tooltip).toHaveClass(/visible/);
});
