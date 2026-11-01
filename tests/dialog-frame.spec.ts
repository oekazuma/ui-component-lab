import { expect, test, type Locator, type Page } from '@playwright/test';
import { demos } from './modal-demos';
import { openDemo } from './open-demo';

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

for (const d of demos) {
	test(`${d.name}: focus moves to a control inside it when it opens`, async ({ page }) => {
		await openInFrame(page, d);
		const dialog = page.getByRole(d.role, { name: d.name });
		const focused = await dialog.evaluate((el) => {
			const a = document.activeElement;
			return a && el.contains(a) ? a.tagName : null;
		});
		expect(['BUTTON', 'INPUT']).toContain(focused);
	});
}

for (const d of demos) {
	test(`${d.name}: its content fits inside the demo frame`, async ({ page }) => {
		await openInFrame(page, d);
		const overflow = await page.getByRole(d.role, { name: d.name }).evaluate((el) => {
			const box = el.getBoundingClientRect();
			return [...el.querySelectorAll('*')].filter((c) => c.getBoundingClientRect().bottom > box.bottom + 1).map((c) => c.tagName);
		});
		expect(overflow).toEqual([]);
	});
}
