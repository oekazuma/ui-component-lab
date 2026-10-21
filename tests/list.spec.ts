import { expect, test } from '@playwright/test';

test('list: clicking the text under a demo opens the component page', async ({ page }) => {
	await page.goto('ja/');
	await page.waitForLoadState('networkidle');
	// 説明文はリンクの ::after に覆われている。利用者と同じく、その位置を押して上の層のリンクに届くかを見る
	const box = await page.getByText('縦に並んだ見出しごとに').boundingBox();
	await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
	await expect(page).toHaveURL(/\/ja\/components\/accordion\/$/);
});

test('list: the card link is named after the component', async ({ page }) => {
	await page.goto('en/');
	await expect(page.getByRole('link', { name: 'Accordion', exact: true })).toBeVisible();
	await expect(page.getByRole('link', { name: /^Details/ })).toHaveCount(0);
});

test('detail: key labels are not smaller than 14px', async ({ page }) => {
	await page.goto('en/components/tabs/');
	const size = await page.locator('main kbd').first().evaluate((k) => parseFloat(getComputedStyle(k).fontSize));
	expect(size).toBeGreaterThanOrEqual(14);
});

test('list: category chips stay on one scrollable row on phones', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('ja/');
	const tops = await page.locator('.chip').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().top));
	expect(new Set(tops).size).toBe(1);
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('systems: links to other sites say so', async ({ page }) => {
	await page.goto('ja/systems/');
	await expect(page.getByRole('link', { name: /外部サイト/ }).first()).toBeVisible();
	await expect(page.getByRole('link', { name: 'タブ', exact: true }).first()).toBeVisible();
});

test('detail: a table of contents links to the sections on wide screens', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	const toc = page.getByRole('navigation', { name: 'このページの内容' });
	await expect(toc.getByRole('link', { name: '避けたい使い方' })).toHaveAttribute('href', '#misuse');
	await page.setViewportSize({ width: 375, height: 812 });
	await expect(toc).toBeHidden();
});

test('detail: code in descriptions is shown as code', async ({ page }) => {
	await page.goto('en/components/alert-dialog/');
	await expect(page.getByRole('region', { name: 'Behavior' }).locator('code', { hasText: 'role="alertdialog"' })).toBeVisible();
});

test('detail: alias and source links say they open another site', async ({ page }) => {
	await page.goto('en/components/tabs/');
	await expect(page.getByRole('region', { name: 'Also known as' }).getByRole('link', { name: /opens another site/ }).first()).toBeVisible();
	await expect(page.getByRole('region', { name: 'Sources' }).getByRole('link', { name: /opens another site/ }).first()).toBeVisible();
});

test('ja: lines break between phrases, and dates do not wrap', async ({ page }) => {
	await page.goto('ja/components/tabs/');
	expect(await page.evaluate(() => getComputedStyle(document.body).wordBreak)).toBe('auto-phrase');
	expect(await page.locator('.checked').first().evaluate((e) => getComputedStyle(e).whiteSpace)).toBe('nowrap');
});

test('list: thumbnails are not interactive, share one height, and the whole card opens the page', async ({ page }) => {
	await page.goto('ja/');
	await page.waitForLoadState('networkidle');
	const cards = page.locator('.grid > li');
	const count = await cards.count();
	await expect(page.locator('.grid .thumb[inert]')).toHaveCount(count);
	const heights = await page.locator('.grid .thumb').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().height)));
	expect(new Set(heights).size).toBe(1);
	// 縮めた中身がどれも枠の内側に収まる（カルーセルのように背の高いデモも含む）
	const overflowing = await page.locator('.grid .thumb').evaluateAll((thumbs) =>
		thumbs
			.filter((t) => {
				const outer = t.getBoundingClientRect();
				const inner = t.firstElementChild!.getBoundingClientRect();
				return inner.top < outer.top - 1 || inner.bottom > outer.bottom + 1 || inner.left < outer.left - 1 || inner.right > outer.right + 1;
			})
			.map((t) => t.closest('li')!.querySelector('h2')!.textContent!.trim())
	);
	expect(overflowing).toEqual([]);
	// カードの中で Tab が止まるのはリンク 1 つだけ
	const stops = await page.locator('.grid').evaluate((grid) =>
		[...grid.querySelectorAll<HTMLElement>('a, button, input, select, textarea, summary, [tabindex]')].filter(
			(e) => !e.closest('[inert]') && e.tabIndex >= 0
		).length
	);
	expect(stops).toBe(count);
	const box = await cards.first().locator('.thumb').boundingBox();
	await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
	await expect(page).toHaveURL(/\/ja\/components\/accordion\/$/);
});

test('list: a card leaves out aliases that repeat the component name or each other', async ({ page }) => {
	await page.goto('en/');
	const card = page.locator('li', { has: page.getByRole('link', { name: 'Range slider', exact: true }) });
	await expect(card.locator('.aliases')).toHaveText('Also known as: Slider (Multi-Thumb)');
});
