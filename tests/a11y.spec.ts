import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// 一覧ページは全デモを描画するので、一覧2つと詳細2つで全デモの初期状態を見られる
for (const path of ['en/', 'ja/', 'en/components/tabs/', 'ja/components/modal/', 'ja/components/carousel/', 'en/systems/', 'ja/systems/']) {
	test(`no axe violations: ${path}`, async ({ page }) => {
		await page.goto(path);
		const { violations } = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
	});
}
