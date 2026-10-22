import { expect, test } from '@playwright/test';
import { openDemo } from './open-demo';

// ドロワーやハンバーガーメニューが画面全体から出ると、どのデモの動きなのかが分かりにくい。デモの枠の中に出す
for (const { path, open, name } of [
	{ path: 'en/components/drawer/', open: 'Filters', name: 'Filters' },
	{ path: 'en/components/hamburger-menu/', open: 'Menu', name: 'Menu' }
]) {
	test(`${name}: opens inside the demo frame, and clicking the dimmed part of the frame closes it`, async ({ page }) => {
		const demo = await openDemo(page, path);
		const button = demo.getByRole('button', { name: open, exact: true });
		await button.click();
		const dialog = page.getByRole('dialog', { name });
		await expect(dialog).toBeVisible();

		const frame = (await demo.boundingBox())!;
		const box = (await dialog.boundingBox())!;
		expect(box.x).toBeGreaterThanOrEqual(frame.x - 1);
		expect(box.y).toBeGreaterThanOrEqual(frame.y - 1);
		expect(box.x + box.width).toBeLessThanOrEqual(frame.x + frame.width + 1);
		expect(box.y + box.height).toBeLessThanOrEqual(frame.y + frame.height + 1);

		await page.mouse.click(frame.x + 12, frame.y + frame.height / 2);
		await expect(dialog).toBeHidden();
		await expect(button).toBeFocused();
	});
}
