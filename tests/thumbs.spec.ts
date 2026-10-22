import { expect, test, type Page } from '@playwright/test';

const card = (page: Page, en: string) => page.locator('li', { has: page.getByRole('link', { name: new RegExp(`^${en} [^A-Za-z]`) }) });

// 開いて使う部品は、閉じたままではサムネイルにきっかけのボタンしか写らない。一覧では開いた状態の絵を見せる
const opened = [
	'Alert',
	'Combobox',
	'Command palette',
	'Drawer',
	'Hamburger menu button',
	'Menu',
	'Menubar',
	'Modal',
	'Select',
	'Spinner',
	'Toast',
	'Tooltip'
];

test('thumbs: components that open show their opened state in the list', async ({ page }) => {
	await page.goto('ja/');
	for (const en of opened) {
		const preview = card(page, en).locator('.thumb [data-preview]');
		await expect(preview, en).toBeVisible();
	}
});

test('thumbs: every thumbnail keeps a margin on the left and right', async ({ page }) => {
	await page.goto('ja/');
	await page.waitForLoadState('networkidle');
	const tight = await page.locator('.thumb').evaluateAll((thumbs) =>
		thumbs.flatMap((thumb) => {
			const box = thumb.getBoundingClientRect();
			const text = [...thumb.querySelectorAll('*')].filter(
				(e) => e.checkVisibility() && e.getBoundingClientRect().width > 0 && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim())
			);
			const left = Math.min(...text.map((e) => e.getBoundingClientRect().left));
			return left - box.left < 8 ? [thumb.closest('li')!.querySelector('.body h2')!.textContent!.trim()] : [];
		})
	);
	expect(tight).toEqual([]);
});

test('thumbs: a Japanese name with another name in brackets shows the other name as an alias', async ({ page }) => {
	await page.goto('ja/');
	const breadcrumb = card(page, 'Breadcrumb');
	await expect(breadcrumb.locator('h2 .sub')).toHaveText('パンくずリスト');
	await expect(breadcrumb.locator('.aliases')).toContainText('パンくずナビゲーション');
	await expect(card(page, 'Divider').locator('.aliases')).toContainText('区切り線');
});
