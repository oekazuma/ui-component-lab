import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { componentIds } from './component-ids';

const shortcut = process.platform === 'darwin' ? 'Meta+k' : 'Control+k';

test('search: the shortcut opens the search, and Enter opens the chosen component', async ({ page }) => {
	await page.goto('ja/components/tabs/');
	await page.waitForLoadState('networkidle');
	await page.keyboard.press(shortcut);
	const dialog = page.getByRole('dialog', { name: '名前で検索' });
	await expect(dialog).toBeVisible();
	const input = dialog.getByRole('combobox');
	await expect(input).toBeFocused();
	await input.fill('snack');
	const option = dialog.getByRole('option').first();
	await expect(option).toContainText('トースト');
	await expect(option).toContainText('Snackbar');
	await page.keyboard.press('Enter');
	await page.waitForURL(/\/ja\/components\/toast\/$/);
	await expect(dialog).toBeHidden();
});

test('search: the header button opens it, arrows move, Escape closes back to the button', async ({ page }) => {
	await page.goto('en/');
	await page.waitForLoadState('networkidle');
	const button = page.getByRole('banner').getByRole('button', { name: /Search by name/ });
	await button.click();
	const dialog = page.getByRole('dialog', { name: 'Search by name' });
	const input = dialog.getByRole('combobox');
	await expect(dialog.getByRole('option')).toHaveCount(componentIds.length);
	await page.keyboard.press('ArrowDown');
	const second = dialog.getByRole('option').nth(1);
	await expect(input).toHaveAttribute('aria-activedescendant', (await second.getAttribute('id'))!);
	await expect(second).toHaveAttribute('aria-selected', 'true');
	await page.keyboard.press('Escape');
	await expect(dialog).toBeHidden();
	await expect(button).toBeFocused();
});

test('search: clicking a result opens it, and no match says so', async ({ page }) => {
	await page.goto('en/');
	await page.waitForLoadState('networkidle');
	await page.keyboard.press(shortcut);
	const dialog = page.getByRole('dialog', { name: 'Search by name' });
	await dialog.getByRole('combobox').fill('zzzz');
	await expect(dialog).toContainText('No components match.');
	await dialog.getByRole('combobox').fill('modal');
	await dialog.getByRole('option', { name: /Modal/ }).first().click();
	await page.waitForURL(/\/en\/components\/modal\/$/);
});

test('search: no axe violations while open', async ({ page }) => {
	await page.goto('ja/');
	await page.waitForLoadState('networkidle');
	await page.keyboard.press(shortcut);
	await page.getByRole('dialog').getByRole('combobox').fill('タブ');
	const { violations } = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
		.analyze();
	expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
});

// Playwright では IME の変換を再現できないため、変換中を示す isComposing を付けた keydown を送る
test('search: arrow keys and Enter during IME composition are left to the IME', async ({ page }) => {
	await page.goto('ja/');
	await page.waitForLoadState('networkidle');
	await page.keyboard.press(shortcut);
	const dialog = page.getByRole('dialog', { name: '名前で検索' });
	const input = dialog.getByRole('combobox');
	await input.fill('めにゅー');
	const active = await input.getAttribute('aria-activedescendant');

	await input.dispatchEvent('keydown', { key: 'ArrowDown', isComposing: true, bubbles: true });
	await expect(input).toHaveAttribute('aria-activedescendant', active!);
	await input.dispatchEvent('keydown', { key: 'Enter', isComposing: true, bubbles: true });
	await expect(dialog).toBeVisible();
	await input.dispatchEvent('keydown', { key: 'Enter', keyCode: 229, bubbles: true });
	await expect(dialog).toBeVisible();
	await expect(page).toHaveURL(/\/ja\/$/);
});
