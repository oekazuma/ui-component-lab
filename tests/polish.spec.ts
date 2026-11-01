import { expect, test } from '@playwright/test';

test('systems: the index lists design systems in name order, not by how many names they have', async ({ page }) => {
	await page.goto('ja/systems/');
	const names = await page.getByRole('navigation', { name: 'デザインシステムの一覧' }).getByRole('link').allTextContents();
	// リンクが 1 つもなくても [] と [] で通ってしまう
	expect(names.length).toBeGreaterThan(1);
	expect(names).toEqual(names.toSorted((a, b) => a.localeCompare(b, 'ja')));
});

test('detail: behavior and keyboard come before variations', async ({ page }) => {
	await page.goto('ja/components/tabs/');
	const headings = await page.locator('main h2').allTextContents();
	expect(headings.indexOf('キーボード操作')).toBeLessThan(headings.indexOf('バリエーション'));
	expect(headings.indexOf('挙動')).toBeLessThan(headings.indexOf('バリエーション'));
});

test('detail: code inside full-width brackets sits close to the brackets', async ({ page }) => {
	await page.goto('ja/components/tabs/');
	const gaps = await page
		.getByRole('region', { name: '使い分け・注意点' })
		.locator('code', { hasText: 'role="tab"' })
		.evaluate((code) => {
			const edge = (node: Node, at: number) => {
				const range = document.createRange();
				range.setStart(node, at);
				range.setEnd(node, at + 1);
				return range.getBoundingClientRect();
			};
			// Svelte は要素の間に目印のコメントを挟むので、文字のある隣の節を探す
			const text = (step: (n: Node) => Node | null) => {
				let n = step(code);
				while (n && !(n.nodeType === Node.TEXT_NODE && n.textContent)) n = step(n);
				return n!;
			};
			const before = text((n) => n.previousSibling);
			const after = text((n) => n.nextSibling);
			const inner = code.firstChild!;
			return {
				open: edge(inner, 0).left - edge(before, before.textContent!.length - 1).right,
				close: edge(after, 0).left - edge(inner, inner.textContent!.length - 1).right
			};
		});
	// 括弧とコードの文字の間に、背景の余白の分のすき間が空かないようにする
	expect(gaps.open).toBeLessThan(2);
	expect(gaps.close).toBeLessThan(2);
});
