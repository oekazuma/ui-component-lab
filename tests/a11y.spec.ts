import { expect, test, type Locator, type Page } from '@playwright/test';
import { expectNoAxeViolations } from './axe';
import { componentIds } from './component-ids';
import { demos } from './modal-demos';
import { openDemo } from './open-demo';

// 一覧ページのデモは操作できないサムネイル（inert）で検査の対象から外れるので、全部品の詳細ページを回す
for (const path of ['en/', 'ja/', 'en/systems/', 'ja/systems/', 'en/skill/', 'ja/skill/', ...componentIds.map((id) => `ja/components/${id}/`)]) {
	test(`no axe violations: ${path}`, async ({ page }) => {
		await page.goto(path);
		await expectNoAxeViolations(page);
	});
}

for (const id of componentIds) {
	test(`no axe violations in dark mode: en/components/${id}/`, async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto(`en/components/${id}/`);
		await expectNoAxeViolations(page);
	});
}

// 開いた状態に出る誤り（名前のないリスト、コントラストなど）は、閉じた初期状態の検査では見つからない
const popups: { path: string; open: (demo: Locator, page: Page) => Promise<void> }[] = [
	...demos.map((d) => ({
		path: d.path,
		open: async (demo: Locator, page: Page) => {
			await demo.getByRole('button', { name: d.open, exact: true }).click();
			await expect(page.getByRole(d.role, { name: d.name })).toBeVisible();
		}
	})),
	{
		path: 'en/components/menu/',
		open: async (demo) => {
			await demo.getByRole('button', { name: 'Actions' }).click();
			await expect(demo.getByRole('menuitem', { name: 'Rename' })).toBeFocused();
		}
	},
	{
		path: 'en/components/combobox/',
		open: async (demo) => {
			const input = demo.getByRole('combobox');
			await input.fill('a');
			await expect(input).toHaveAttribute('aria-expanded', 'true');
		}
	},
	{
		path: 'en/components/popover/',
		open: async (demo) => {
			await demo.getByRole('button', { name: 'About shipping' }).click();
			await expect(demo.getByRole('dialog', { name: 'How shipping is calculated' })).toBeVisible();
		}
	},
	{
		path: 'en/components/tooltip/',
		open: async (demo) => {
			await demo.getByRole('button', { name: 'Copy link' }).focus();
			await expect(demo.locator('[role="tooltip"]')).toBeVisible();
		}
	},
	{
		path: 'en/components/context-menu/',
		open: async (demo, page) => {
			await demo.getByRole('button', { name: 'report.pdf', exact: true }).focus();
			await page.keyboard.press('Shift+F10');
			await expect(demo.getByRole('menuitem', { name: 'Download' })).toBeFocused();
		}
	},
	{
		path: 'en/components/menubar/',
		open: async (demo, page) => {
			await demo.getByRole('menubar').getByRole('menuitem', { name: 'File', exact: true }).focus();
			await page.keyboard.press('ArrowDown');
			await expect(demo.getByRole('menu', { name: 'File' }).getByRole('menuitem', { name: 'New' })).toBeFocused();
		}
	}
];

for (const scheme of ['light', 'dark'] as const)
	for (const p of popups)
		test(`no axe violations with the popup open (${scheme}): ${p.path}`, async ({ page }) => {
			await page.emulateMedia({ colorScheme: scheme });
			const demo = await openDemo(page, p.path);
			await p.open(demo, page);
			await expectNoAxeViolations(page);
		});
