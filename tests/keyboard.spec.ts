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

	// 端では反対の端へ回る
	await page.keyboard.press('ArrowLeft');
	await expect(security).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(profile).toBeFocused();
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
	await expect(demo.locator('[role="menu"]').first()).toBeHidden();
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

test('tooltip: Escape hides a focus-opened tooltip and focus stays on the button', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tooltip/');
	const button = demo.getByRole('button', { name: 'Copy link' });
	const tooltip = demo.locator('[role="tooltip"]');

	await button.focus();
	await expect(tooltip).toHaveClass(/visible/);

	await page.keyboard.press('Escape');
	await expect(tooltip).not.toHaveClass(/visible/);
	await expect(button).toBeFocused();
});

// Playwright では IME の変換を再現できないため、変換中を示す isComposing を付けた keydown を送る
test('combobox: arrow keys and Enter during IME composition are left to the IME', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/combobox/');
	const input = demo.getByRole('combobox');

	await input.fill('ap');
	await expect(input).toHaveAttribute('aria-expanded', 'true');

	await input.dispatchEvent('keydown', { key: 'ArrowDown', isComposing: true, bubbles: true });
	await expect(input).not.toHaveAttribute('aria-activedescendant');
	await input.dispatchEvent('keydown', { key: 'Escape', isComposing: true, bubbles: true });
	await expect(input).toHaveAttribute('aria-expanded', 'true');

	await page.keyboard.press('ArrowDown');
	await expect(input).toHaveAttribute('aria-activedescendant', /option-0$/);
	await input.dispatchEvent('keydown', { key: 'Enter', isComposing: true, bubbles: true });
	await expect(input).toHaveValue('ap');
	await expect(input).toHaveAttribute('aria-expanded', 'true');
});

test('carousel: arrow keys, End and Home on the slide numbers move focus and show the slide', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/carousel/');
	const tab = (n: number) => demo.getByRole('tab', { name: `Slide ${n}` });
	const shown = demo.getByRole('tabpanel');

	await tab(1).focus();
	await page.keyboard.press('ArrowRight');
	await expect(tab(2)).toBeFocused();
	await expect(tab(2)).toHaveAttribute('aria-selected', 'true');
	await expect(tab(2)).toHaveAttribute('tabindex', '0');
	await expect(tab(1)).toHaveAttribute('tabindex', '-1');
	await expect(shown).toHaveAttribute('id', (await tab(2).getAttribute('aria-controls'))!);

	await page.keyboard.press('End');
	await expect(tab(4)).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(tab(1)).toBeFocused();
	await page.keyboard.press('ArrowLeft');
	await expect(tab(4)).toBeFocused();
	await page.keyboard.press('Home');
	await expect(tab(1)).toBeFocused();
	await expect(tab(1)).toHaveAttribute('aria-selected', 'true');
	await expect(demo).toContainText('1 / 4');
});

test('carousel: previous and next keep focus on the button and wrap around', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/carousel/');
	const next = demo.getByRole('button', { name: 'Next slide' });
	const prev = demo.getByRole('button', { name: 'Previous slide' });

	await next.focus();
	await page.keyboard.press('Enter');
	await expect(next).toBeFocused();
	await expect(demo).toContainText('2 / 4');
	await expect(demo.getByRole('tab', { name: 'Slide 2' })).toHaveAttribute('aria-selected', 'true');

	await prev.focus();
	await page.keyboard.press('Space');
	await page.keyboard.press('Space');
	await expect(prev).toBeFocused();
	await expect(demo).toContainText('4 / 4');
	await expect(demo.locator('[aria-live="polite"]').getByRole('tabpanel')).toHaveCount(1);
});

test('toolbar: arrow keys move across both groups and wrap; Space chooses one alignment', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/toolbar/');
	const underline = demo.getByRole('button', { name: 'Underline' });
	const left = demo.getByRole('radio', { name: 'Align left' });
	const center = demo.getByRole('radio', { name: 'Align center' });
	const right = demo.getByRole('radio', { name: 'Align right' });
	const bold = demo.getByRole('button', { name: 'Bold' });
	await expect(demo.getByRole('radiogroup', { name: 'Text alignment' })).toBeVisible();
	await expect(left).toHaveAttribute('aria-checked', 'true');

	await underline.focus();
	await page.keyboard.press('ArrowRight');
	await expect(left).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(center).toBeFocused();
	await expect(center).toHaveAttribute('aria-checked', 'false');
	await page.keyboard.press('Space');
	await expect(center).toHaveAttribute('aria-checked', 'true');
	await expect(left).toHaveAttribute('aria-checked', 'false');

	await page.keyboard.press('End');
	await expect(right).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(bold).toBeFocused();
	await page.keyboard.press('ArrowLeft');
	await expect(right).toBeFocused();
	await page.keyboard.press('Home');
	await expect(bold).toBeFocused();
	await expect(bold).toHaveAttribute('tabindex', '0');
	await expect(demo.locator('[role="toolbar"] [tabindex="0"]')).toHaveCount(1);
});

test('menu: arrow keys wrap at both ends and skip the separator before the destructive item', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/menu/');
	const trigger = demo.getByRole('button', { name: 'Actions' });
	const menu = demo.getByRole('menu', { name: 'Actions' });
	const item = (name: string) => menu.getByRole('menuitem', { name });

	await trigger.focus();
	await page.keyboard.press('ArrowUp');
	await expect(item('Move to trash')).toBeFocused();
	await expect(menu.getByRole('separator')).toHaveCount(1);
	await page.keyboard.press('ArrowDown');
	await expect(item('Rename')).toBeFocused();
	await page.keyboard.press('ArrowUp');
	await expect(item('Move to trash')).toBeFocused();
	await page.keyboard.press('ArrowUp');
	await expect(item('Duplicate')).toBeFocused();
});

test('tree view: arrow keys reach a file in the third level and the opened file is marked current', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tree-view/');
	const item = (name: string) => demo.getByRole('treeitem', { name, exact: true });

	await item('Documents').focus();
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('ArrowRight');
	await expect(item('2026')).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('ArrowRight');
	await expect(item('report.pdf')).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(item('report.pdf')).toHaveAttribute('aria-current', 'true');

	await page.keyboard.press('ArrowLeft');
	await expect(item('2026')).toBeFocused();
	await item('budget.xlsx').click();
	await expect(demo.locator('[aria-current]')).toHaveCount(1);
	await expect(item('budget.xlsx')).toHaveAttribute('aria-current', 'true');
});
