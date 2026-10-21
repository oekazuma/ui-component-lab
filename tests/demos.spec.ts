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

test('spinner: fills the loading screen, then shows the comments', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/spinner/');
	await demo.getByRole('button', { name: /comments/ }).click();
	await expect(demo.locator('.spinner')).toBeVisible();
	await expect(demo.getByRole('listitem')).toHaveCount(3);
	await expect(demo.locator('.spinner')).toHaveCount(0);
});

test('spinner: stops spinning with the reduce-motion setting', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	const demo = await openDemo(page, 'en/components/spinner/');
	await demo.getByRole('button', { name: /comments/ }).click();
	await expect(demo.locator('.spinner')).toHaveCSS('animation-name', 'none');
});

test('alert: names the type in words and replaces the message on every press', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/alert/');
	const save = demo.getByRole('button', { name: 'Save' });
	const alert = demo.getByRole('alert');

	await save.click();
	await expect(alert).toHaveText(/^\s*Error: Could not save/);
	// 同じ文のままだとスクリーンリーダーは読み直さないので、押すたびに中身の要素を作り直していることを見る
	await alert.locator('p').evaluate((p) => (p.dataset.mark = 'old'));
	await save.click();
	await expect(alert.locator('p')).toHaveCount(1);
	await expect(alert.locator('p[data-mark]')).toHaveCount(0);
});
