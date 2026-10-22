import { expect, test, type Locator, type Page } from '@playwright/test';
import { openDemo } from './open-demo';

// モーダルなデモが画面全体に出ると、どのデモの動きなのかが分かりにくい。デモの枠の中に出す
const demos = [
	{ path: 'en/components/drawer/', open: 'Filters', role: 'dialog', name: 'Filters', clickToClose: true },
	{ path: 'en/components/hamburger-menu/', open: 'Menu', role: 'dialog', name: 'Menu', clickToClose: true },
	{ path: 'en/components/modal/', open: 'Show receipt number', role: 'dialog', name: 'Your receipt number', clickToClose: false },
	{ path: 'en/components/alert-dialog/', open: 'Discard note…', role: 'alertdialog', name: 'Discard this note?', clickToClose: false },
	{ path: 'en/components/command-palette/', open: 'Commands…', role: 'dialog', name: 'Commands', clickToClose: false }
] as const;

async function openInFrame(page: Page, d: (typeof demos)[number]): Promise<[Locator, Locator]> {
	const demo = await openDemo(page, d.path);
	const button = demo.getByRole('button', { name: d.open, exact: true });
	await button.click();
	const dialog = page.getByRole(d.role, { name: d.name });
	await expect(dialog).toBeVisible();
	return [demo, button];
}

for (const d of demos) {
	test(`${d.name}: opens inside the demo frame`, async ({ page }) => {
		const [demo] = await openInFrame(page, d);
		const frame = (await demo.boundingBox())!;
		const box = (await page.getByRole(d.role, { name: d.name }).boundingBox())!;
		expect(box.x).toBeGreaterThanOrEqual(frame.x - 1);
		expect(box.y).toBeGreaterThanOrEqual(frame.y - 1);
		expect(box.x + box.width).toBeLessThanOrEqual(frame.x + frame.width + 1);
		expect(box.y + box.height).toBeLessThanOrEqual(frame.y + frame.height + 1);
	});
}

for (const d of demos.filter((d) => d.clickToClose)) {
	test(`${d.name}: clicking the dimmed part of the frame closes it`, async ({ page }) => {
		const [demo, button] = await openInFrame(page, d);
		const frame = (await demo.boundingBox())!;
		await page.mouse.click(frame.x + 12, frame.y + frame.height / 2);
		await expect(page.getByRole(d.role, { name: d.name })).toBeHidden();
		await expect(button).toBeFocused();
	});
}
