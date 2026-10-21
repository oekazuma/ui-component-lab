import { expect, test } from '@playwright/test';

test('footer: links to the systems index, the repository and the license', async ({ page }) => {
	await page.goto('ja/components/tabs/');
	const footer = page.getByRole('contentinfo');
	await expect(footer.getByRole('link', { name: 'デザインシステムごとの名前の対応表' })).toBeVisible();
	// GitHub とライセンスはアイコンだけのリンク。読み上げ用の名前と、マウスを乗せたときの説明があることを見る
	for (const name of [/GitHub.*外部サイト/, /MIT.*外部サイト/]) {
		const link = footer.getByRole('link', { name });
		await expect(link).toBeVisible();
		await expect(link.locator('svg')).toBeVisible();
		await expect(link).toHaveAttribute('title', /.+/);
	}
	await expect(footer).toContainText('出典');
});

test('skip link: the first Tab reaches it and it moves focus to the main content', async ({ page }) => {
	await page.goto('ja/');
	await page.waitForLoadState('networkidle');
	await page.keyboard.press('Tab');
	// 一覧のスキップリンクのデモにも同じ名前のリンクがあるので、サイトのものを行き先で選ぶ
	const skip = page.locator('a[href="#main"]');
	await expect(skip).toBeFocused();
	await expect(skip).toBeVisible();
	await page.keyboard.press('Enter');
	await expect(page.locator('main')).toBeFocused();
});

test('toc: phones get a collapsible table of contents under the demo', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('ja/components/carousel/');
	await page.locator('.toc-mobile summary').click();
	await expect(page.locator('.toc-mobile').getByRole('link', { name: '避けたい使い方' })).toBeVisible();
});

test('toc: marks the section being read', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => document.getElementById('misuse')!.scrollIntoView({ block: 'start' }));
	const toc = page.getByRole('navigation', { name: 'このページの内容' });
	await expect(toc.getByRole('link', { name: '避けたい使い方' })).toHaveAttribute('aria-current', 'location');
	await expect(toc.locator('[aria-current]')).toHaveCount(1);
});

test('toc: marks the last section once the page is scrolled to the end', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
	const toc = page.getByRole('navigation', { name: 'このページの内容' });
	await expect(toc.getByRole('link', { name: '出典' })).toHaveAttribute('aria-current', 'location');
	await expect(toc.locator('[aria-current]')).toHaveCount(1);
});

test('systems: the page title says it is a table of names', async ({ page }) => {
	await page.goto('en/systems/');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Component names across design systems');
	await expect(page).toHaveTitle(/Component names across design systems/);
});

test('systems: no horizontal scroll on phones in Japanese', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('ja/systems/');
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test('systems: every table splits its columns the same way', async ({ page }) => {
	await page.goto('ja/systems/');
	const widths = await page.locator('thead th:first-child').evaluateAll((ths) => ths.map((th) => Math.round(th.getBoundingClientRect().width)));
	expect(new Set(widths).size).toBe(1);
});

test('systems: a list at the top jumps to each design system', async ({ page }) => {
	await page.goto('ja/systems/');
	const index = page.getByRole('navigation', { name: 'デザインシステムの一覧' });
	const first = index.getByRole('link').nth(1);
	const href = await first.getAttribute('href');
	expect(href).toMatch(/^#/);
	await expect(page.locator(href!)).toHaveCount(1);
});

test('external links: the arrow stays on the same line as the last character', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('ja/systems/');
	const apart = await page.locator('td a:has(svg)').evaluateAll((links) =>
		links.filter((a) => {
			const svg = a.querySelector('svg')!.getBoundingClientRect();
			const walker = document.createTreeWalker(a, NodeFilter.SHOW_TEXT);
			let last: Text | null = null;
			for (let n = walker.nextNode(); n; n = walker.nextNode()) if (n.textContent!.trim() && !n.parentElement!.closest('.visually-hidden')) last = n as Text;
			const range = document.createRange();
			range.setStart(last!, last!.length - 1);
			range.setEnd(last!, last!.length);
			const rects = range.getClientRects();
			return Math.abs(rects[rects.length - 1].bottom - svg.bottom) > 8;
		}).map((a) => a.textContent)
	);
	expect(apart).toEqual([]);
});

test('language: the header button opens a list of languages and switches', async ({ page }) => {
	await page.goto('ja/components/tabs/');
	await page.waitForLoadState('networkidle');
	const button = page.getByRole('button', { name: /言語/ });
	await expect(button).toHaveAttribute('aria-expanded', 'false');
	await expect(button).toContainText('日本語');
	await button.click();
	await expect(button).toHaveAttribute('aria-expanded', 'true');
	await expect(page.getByRole('link', { name: '日本語' })).toHaveAttribute('aria-current', 'true');
	await page.getByRole('link', { name: 'English' }).click();
	await page.waitForURL(/\/en\/components\/tabs\/$/);
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
	await expect(page.getByRole('button', { name: /Language/ })).toHaveAttribute('aria-expanded', 'false');
});

test('language: Escape closes the list and returns focus to the button', async ({ page }) => {
	await page.goto('en/');
	await page.waitForLoadState('networkidle');
	const button = page.getByRole('button', { name: /Language/ });
	await button.click();
	await page.getByRole('link', { name: '日本語' }).focus();
	await page.keyboard.press('Escape');
	await expect(button).toHaveAttribute('aria-expanded', 'false');
	await expect(button).toBeFocused();
	await expect(page.getByRole('link', { name: '日本語' })).toBeHidden();
});

test('language: on phones the switcher stays on the first header row with the logo', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('ja/');
	const logo = await page.getByRole('banner').getByRole('link', { name: 'UI Component Lab' }).boundingBox();
	const button = await page.getByRole('button', { name: /言語/ }).boundingBox();
	expect(Math.abs(logo!.y + logo!.height / 2 - (button!.y + button!.height / 2))).toBeLessThan(8);
});
