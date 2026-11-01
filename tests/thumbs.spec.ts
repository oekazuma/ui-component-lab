import { existsSync, readdirSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

const card = (page: Page, en: string) => page.locator('li', { has: page.getByRole('link', { name: new RegExp(`^${en} [^A-Za-z]`) }) });

// 開いて使う部品は、閉じたままではサムネイルにきっかけのボタンしか写らない。一覧では開いた状態の絵を見せる。
// 手で並べると部品を足したときにずれるので、Thumb.svelte の有無から集める
const opened = readdirSync(new URL('../src/lib/components/', import.meta.url)).filter((id) =>
	existsSync(new URL(`../src/lib/components/${id}/Thumb.svelte`, import.meta.url))
);

test('thumbs: components that open show their opened state in the list', async ({ page }) => {
	await page.goto('ja/');
	expect(opened.length).toBeGreaterThan(0);
	for (const id of opened) {
		const card = page.locator('li.card', { has: page.locator(`a[href$="/components/${id}/"]`) });
		await expect(card.locator('.thumb [data-preview]'), id).toBeVisible();
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
			const name = thumb.closest('li')!.querySelector('.body h2')!.textContent!.trim();
			// 文字のある要素がないと Math.min が Infinity を返し、確かめずに通ってしまう
			if (!text.length) return [name];
			const left = Math.min(...text.map((e) => e.getBoundingClientRect().left));
			return left - box.left < 8 ? [name] : [];
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
