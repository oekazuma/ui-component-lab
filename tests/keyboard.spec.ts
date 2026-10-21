import { expect, test } from '@playwright/test';
import { openDemo } from './open-demo.ts';

test('tabs: arrow keys, End and Home move focus and selection', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tabs/');
	const profile = demo.getByRole('tab', { name: 'Profile' });
	const notifications = demo.getByRole('tab', { name: 'Notifications' });
	const security = demo.getByRole('tab', { name: 'Security' });

	await profile.focus();
	await page.keyboard.press('ArrowRight');
	await expect(notifications).toBeFocused();
	await expect(notifications).toHaveAttribute('aria-selected', 'true');

	await page.keyboard.press('End');
	await expect(security).toBeFocused();
	await expect(security).toHaveAttribute('aria-selected', 'true');

	await page.keyboard.press('Home');
	await expect(profile).toBeFocused();
	await expect(profile).toHaveAttribute('aria-selected', 'true');
});

test('menu: Shift+Tab from an item closes the menu and returns to the button', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/menu/');
	const trigger = demo.getByRole('button', { name: 'Actions' });

	await trigger.focus();
	await page.keyboard.press('Enter');
	await expect(demo.getByRole('menuitem', { name: 'Rename' })).toBeFocused();

	await page.keyboard.press('Shift+Tab');
	await expect(trigger).toBeFocused();
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('menu: clicking an item reports it and closes the menu', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/menu/');

	await demo.getByRole('button', { name: 'Actions' }).click();
	await demo.getByRole('menuitem', { name: 'Duplicate' }).click();

	await expect(demo.locator('[role="status"]')).toHaveText('Chosen: Duplicate');
	await expect(demo.locator('[role="menu"]')).toBeHidden();
});

test('tooltip: Escape hides a hover-opened tooltip', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tooltip/');
	const tooltip = demo.locator('[role="tooltip"]');

	await demo.getByRole('button', { name: 'Copy link' }).hover();
	await expect(tooltip).toHaveClass(/visible/);

	await page.keyboard.press('Escape');
	await expect(tooltip).not.toHaveClass(/visible/);
});

test('combobox: Escape with no matching option clears the input', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/combobox/');
	const input = demo.getByRole('combobox');

	await input.fill('zzz');
	await expect(input).toHaveAttribute('aria-expanded', 'false');

	await page.keyboard.press('Escape');
	await expect(input).toHaveValue('');
	await expect(input).toHaveAttribute('aria-expanded', 'false');
});

test('language switch: updates <html lang> and resets the demo state', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/menu/');

	await demo.getByRole('button', { name: 'Actions' }).click();
	await demo.getByRole('menuitem', { name: 'Rename' }).click();
	await expect(demo.locator('[role="status"]')).toHaveText('Chosen: Rename');

	await page.getByRole('button', { name: /Language/ }).click();
	await page.locator('a[hreflang="ja"]').click();
	await page.waitForURL(/\/ja\/components\/menu\/$/);

	await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
	await expect(page.getByRole('group', { name: /^デモ:/ }).locator('[role="status"]')).toHaveText('');
});
