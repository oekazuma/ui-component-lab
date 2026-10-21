import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { componentIds } from './component-ids';

// 一覧ページのデモは操作できないサムネイル（inert）で検査の対象から外れるので、全部品の詳細ページを回す
for (const path of ['en/', 'ja/', 'en/systems/', 'ja/systems/', ...componentIds.map((id) => `ja/components/${id}/`)]) {
	test(`no axe violations: ${path}`, async ({ page }) => {
		await page.goto(path);
		const { violations } = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
	});
}

for (const id of componentIds) {
	test(`no axe violations in dark mode: en/components/${id}/`, async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto(`en/components/${id}/`);
		const { violations } = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
	});
}
