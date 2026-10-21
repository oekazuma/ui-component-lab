import { expect, test } from '@playwright/test';
import { openDemo } from './open-demo.ts';

test('radio: starts with nothing chosen; Tab reaches the first option and Space chooses it', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/radio/');
	const radios = demo.getByRole('radio');
	for (const radio of await radios.all()) await expect(radio).not.toBeChecked();

	// グループの直前に Tab の起点を置く
	await demo.locator('fieldset').evaluate((el) => {
		const start = document.createElement('button');
		el.before(start);
		start.focus();
	});
	await page.keyboard.press('Tab');
	await expect(radios.first()).toBeFocused();
	await page.keyboard.press('Space');
	await expect(radios.first()).toBeChecked();
});

test('tooltip: stays open while the pointer crosses the gap onto the tooltip', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tooltip/');
	const button = demo.getByRole('button', { name: 'Copy link' });
	const tooltip = demo.locator('[role="tooltip"]');

	await button.hover();
	await expect(tooltip).toBeVisible();
	const b = (await button.boundingBox())!;
	const t = (await tooltip.boundingBox())!;
	const x = b.x + b.width / 2;
	await page.mouse.move(x, (t.y + t.height + b.y) / 2, { steps: 5 });
	await expect(tooltip).toHaveClass(/visible/);
	await page.mouse.move(x, t.y + t.height / 2, { steps: 5 });
	await expect(tooltip).toHaveClass(/visible/);
});

test('tooltip: stays open while the button has focus, even after the pointer leaves', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tooltip/');
	const button = demo.getByRole('button', { name: 'Copy link' });
	const tooltip = demo.locator('[role="tooltip"]');

	await button.focus();
	await button.hover();
	await page.mouse.move(0, 0, { steps: 5 });
	await expect(tooltip).toHaveClass(/visible/);
});

test('spinner: fills the loading screen, then shows the comments', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/spinner/');
	await demo.getByRole('button', { name: /comments/ }).click();
	await expect(demo.locator('.spinner')).toBeVisible();
	await expect(demo.getByRole('listitem')).toHaveCount(3);
	await expect(demo.locator('.spinner')).toHaveCount(0);
});

test('spinner: stops spinning with the reduce-motion setting', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	const demo = await openDemo(page, 'en/components/spinner/');
	await demo.getByRole('button', { name: /comments/ }).click();
	await expect(demo.locator('.spinner')).toHaveCSS('animation-name', 'none');
});

test('alert: names the type in words and replaces the message on every press', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/alert/');
	const save = demo.getByRole('button', { name: 'Save' });
	const alert = demo.getByRole('alert');

	await save.click();
	await expect(alert).toHaveText(/^\s*Error: Could not save/);
	// 同じ文のままだとスクリーンリーダーは読み直さないので、押すたびに中身の要素を作り直していることを見る
	await alert.locator('p').evaluate((p) => (p.dataset.mark = 'old'));
	await save.click();
	await expect(alert.locator('p')).toHaveCount(1);
	await expect(alert.locator('p[data-mark]')).toHaveCount(0);
});

test('meter: describes the amount in words and says when it is almost full', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/meter/');
	const meter = demo.getByRole('meter');
	await expect(meter).toHaveAccessibleDescription(/^40 GB of 100 GB$/);

	const add = demo.getByRole('button', { name: 'Add 10 GB' });
	for (let i = 0; i < 4; i++) await add.click();
	await expect(meter).toHaveAccessibleDescription('80 GB of 100 GB Almost full');
	await expect(demo.getByText('Almost full')).toBeVisible();
});

test('number input: an out-of-range value gets an error message tied to the field', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/number-input/');
	const input = demo.getByRole('spinbutton', { name: 'Quantity' });

	await input.fill('11');
	await expect(input).toHaveAttribute('aria-invalid', 'true');
	await expect(input).toHaveAccessibleDescription(/1 to 10.*Enter a whole number from 1 to 10/);

	await input.fill('5');
	await expect(input).not.toHaveAttribute('aria-invalid', 'true');
	await expect(demo.getByText('Enter a whole number')).toHaveCount(0);
});

// DADS ボタンのアクセシビリティ: ターゲットサイズは 44 × 44 CSS px 以上
for (const path of ['en/', 'ja/']) {
	test(`buttons: every demo button is at least 44 × 44 px: ${path}`, async ({ page }) => {
		await page.goto(path);
		const small = await page.locator('.btn, [role="toolbar"] button').evaluateAll((els) =>
			els
				.filter((el) => el.getClientRects().length > 0)
				.map((el) => ({ text: el.textContent!.trim(), ...el.getBoundingClientRect().toJSON() }))
				.filter((r) => r.width < 44 || r.height < 44)
				.map((r) => `${r.text}: ${Math.round(r.width)} × ${Math.round(r.height)}`)
		);
		expect(small).toEqual([]);
	});
}

test('menu and split button: the menu takes its name from the button that opens it', async ({ page }) => {
	let demo = await openDemo(page, 'en/components/menu/');
	await demo.getByRole('button', { name: 'Actions' }).click();
	await expect(demo.getByRole('menu', { name: 'Actions' })).toBeVisible();

	demo = await openDemo(page, 'en/components/split-button/');
	await demo.getByRole('button', { name: 'More save options' }).click();
	await expect(demo.getByRole('menu', { name: 'More save options' })).toBeVisible();
});

test('file upload: dropped files are checked for type and size, with an error on each row', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/file-upload/');
	const dataTransfer = await page.evaluateHandle(() => {
		const dt = new DataTransfer();
		dt.items.add(new File(['memo'], 'notes.txt', { type: 'text/plain' }));
		dt.items.add(new File([new Uint8Array(11 * 1024 * 1024)], 'scan.pdf', { type: 'application/pdf' }));
		dt.items.add(new File([new Uint8Array(2048)], 'photo.PNG', { type: 'image/png' }));
		return dt;
	});
	await demo.locator('.drop').dispatchEvent('drop', { dataTransfer });

	const rows = demo.getByRole('listitem');
	await expect(rows).toHaveCount(3);
	await expect(rows.nth(0)).toContainText('Only PDF, PNG or JPEG files can be chosen.');
	await expect(rows.nth(1)).toContainText('scan.pdf (11 MB)');
	await expect(rows.nth(1)).toContainText('This file is larger than 10 MB.');
	await expect(rows.nth(2)).toHaveText(/^photo\.PNG \(2 KB\)\s*Remove/);
	await expect(demo.getByText('Some of the chosen files have errors.', { exact: false })).toBeVisible();
});

test('file upload: a file chosen with the button is also checked for size', async ({ page }) => {
	const demo = await openDemo(page, 'ja/components/file-upload/', /^デモ:/);
	await demo.locator('input[type="file"]').setInputFiles({
		name: 'scan.pdf',
		mimeType: 'application/pdf',
		buffer: Buffer.alloc(11 * 1024 * 1024)
	});
	const row = demo.getByRole('listitem');
	await expect(row).toContainText('scan.pdf（11MB）');
	await expect(row).toContainText('ファイルサイズが10MBを超えています。');
});

test('modal: a short notice with a single centered Close button that returns focus', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/modal/');
	const open = demo.getByRole('button', { name: 'Show receipt number' });
	await open.click();
	const dialog = page.getByRole('dialog', { name: 'Your receipt number' });
	await expect(dialog.getByRole('button')).toHaveCount(1);
	const close = dialog.getByRole('button', { name: 'Close' });
	await expect(close).toBeFocused();
	const d = (await dialog.boundingBox())!;
	const c = (await close.boundingBox())!;
	expect(Math.abs(c.x + c.width / 2 - (d.x + d.width / 2))).toBeLessThan(2);
	await page.keyboard.press('Enter');
	await expect(dialog).toBeHidden();
	await expect(open).toBeFocused();
});

test('alert dialog: Discard empties the note; Keep editing and Esc leave it', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/alert-dialog/');
	const note = demo.getByRole('textbox', { name: 'Note' });
	const open = demo.getByRole('button', { name: 'Discard note…' });
	const dialog = page.getByRole('alertdialog');
	await note.fill('Buy milk');

	await open.click();
	await expect(dialog.getByRole('button', { name: 'Keep editing' })).toBeFocused();
	await page.keyboard.press('Escape');
	await expect(note).toHaveValue('Buy milk');

	await open.click();
	await dialog.getByRole('button', { name: 'Keep editing' }).click();
	await expect(note).toHaveValue('Buy milk');

	await open.click();
	await dialog.getByRole('button', { name: 'Discard' }).click();
	await expect(note).toHaveValue('');
	await expect(open).toBeFocused();
	await expect(demo.locator('[role="status"]')).toHaveText('Discarded');
});

test('drawer: Apply sets the count on the button; a backdrop click closes without applying', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/drawer/');
	const drawer = page.getByRole('dialog', { name: 'Filters' });
	await demo.getByRole('button', { name: 'Filters' }).click();
	await drawer.getByLabel('In stock').check();
	await drawer.getByLabel('Free shipping').check();
	await drawer.getByRole('button', { name: 'Apply' }).click();
	await expect(drawer).toBeHidden();
	const open = demo.getByRole('button', { name: 'Filters (2)' });
	await expect(open).toBeFocused();

	await open.click();
	await drawer.getByLabel('On sale').check();
	const box = (await drawer.boundingBox())!;
	await page.mouse.click(box.x / 2, box.y + box.height / 2);
	await expect(drawer).toBeHidden();
	await expect(open).toBeVisible();
	await open.click();
	await expect(drawer.getByLabel('On sale')).not.toBeChecked();
	await expect(drawer.getByLabel('In stock')).toBeChecked();
});

test('popover: Tab goes through its link and out, and it stays open', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/popover/');
	const button = demo.getByRole('button', { name: 'About shipping' });
	const pop = page.getByRole('dialog', { name: 'How shipping is calculated' });
	await button.focus();
	await page.keyboard.press('Enter');
	await expect(pop).toBeVisible();
	await page.keyboard.press('Tab');
	await expect(pop.getByRole('link', { name: 'Shipping fees by region' })).toBeFocused();
	await page.keyboard.press('Tab');
	await expect(pop.getByRole('button', { name: 'Close' })).toBeFocused();
	await page.keyboard.press('Tab');
	expect(await pop.evaluate((el) => el.contains(document.activeElement))).toBe(false);
	await expect(pop).toBeVisible();
});

test('button: real labels from low to high priority, left to right, with an underlined text button', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/button/');
	const buttons = demo.locator('.row button');
	await expect(buttons).toHaveText(['Cancel', 'Save draft', 'Submit']);
	await expect(buttons.nth(0)).toHaveCSS('text-decoration-line', 'underline');
	await expect(buttons.nth(2)).toHaveClass(/btn-primary/);
	await buttons.nth(1).click();
	await expect(demo.getByRole('status')).toHaveText('“Save draft” was pressed');
});

test('menu: an icon-only overflow button opens a menu lined up with its right edge', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/menu/');
	const button = demo.getByRole('button', { name: 'More options for report.pdf' });
	await button.click();
	const menu = demo.getByRole('menu', { name: 'More options for report.pdf' });
	await expect(menu.getByRole('menuitem', { name: 'Download' })).toBeFocused();
	const b = (await button.boundingBox())!;
	const m = (await menu.boundingBox())!;
	expect(Math.abs(b.x + b.width - (m.x + m.width))).toBeLessThan(1);
});

test('split button: the menu lines up with the right edge of the button group', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/split-button/');
	await demo.getByRole('button', { name: 'More save options' }).click();
	const g = (await demo.getByRole('group', { name: 'Save' }).boundingBox())!;
	const m = (await demo.getByRole('menu').boundingBox())!;
	expect(Math.abs(g.x + g.width - (m.x + m.width))).toBeLessThan(1);
});

test('pagination: names the nav after the results and shortens far pages with an ellipsis', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/pagination/');
	const nav = demo.getByRole('navigation', { name: 'Search results' });
	const pages = nav.getByRole('button', { name: /^Page \d+$/ });
	await expect(pages).toHaveText(['1', '2', '10']);
	await expect(nav.getByText('…')).toHaveCount(1);

	await nav.getByRole('button', { name: 'Next' }).click();
	await nav.getByRole('button', { name: 'Next' }).click();
	await nav.getByRole('button', { name: 'Next' }).click();
	await nav.getByRole('button', { name: 'Next' }).click();
	await expect(pages).toHaveText(['1', '4', '5', '6', '10']);
	await expect(nav.getByText('…')).toHaveCount(2);
	await expect(nav.getByRole('button', { name: 'Page 5' })).toHaveAttribute('aria-current', 'page');
	await expect(demo.getByText('Showing results 41–50 of 100')).toBeVisible();
});

test('tabs: a switch in a panel keeps its state while another tab is shown', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tabs/');
	await demo.getByRole('tab', { name: 'Notifications' }).click();
	const email = demo.getByRole('switch', { name: 'Email notifications' });
	await email.check();
	await demo.getByRole('tab', { name: 'Security' }).click();
	await expect(email).toBeHidden();
	await demo.getByRole('tab', { name: 'Notifications' }).click();
	await expect(email).toBeChecked();
});

test('stepper: an optional step is shown as skipped, finished steps are buttons, and the last step submits', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/stepper/');
	const next = demo.getByRole('button', { name: 'Next' });
	const step = (name: string) => demo.getByRole('listitem').filter({ hasText: name });
	await next.click();
	await next.click();
	await next.click();
	await expect(step('Documents')).toContainText('Skipped');
	await expect(step('Review')).toHaveAttribute('aria-current', 'step');
	await expect(demo.getByText('4 steps in total; reached step 4')).toBeAttached();

	await demo.getByRole('button', { name: /^Applicant/ }).click();
	await expect(step('Applicant')).toHaveAttribute('aria-current', 'step');
	await expect(step('Documents')).toContainText('Skipped');
	await demo.getByRole('button', { name: /^Review/ }).click();

	await demo.getByRole('button', { name: 'Submit' }).click();
	const done = demo.getByText('Your application has been submitted.');
	await expect(done).toBeFocused();
	await expect(demo.getByRole('button', { name: /^Applicant/ })).toHaveCount(0);
});

test('link: a new-tab link says so, a file link gives its type and size, and hover thickens the underline', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/link/');
	const newTab = demo.getByRole('link', { name: /opens in a new tab$/ });
	await expect(newTab).toHaveAttribute('target', '_blank');
	await expect(demo.getByRole('link', { name: /\(PNG, 42 KB\)$/ })).toHaveAttribute('href', /og\.png$/);

	const button = demo.getByRole('link', { name: 'button' });
	await expect(button).toHaveCSS('text-decoration-thickness', '1px');
	await button.hover();
	await expect(button).toHaveCSS('text-decoration-thickness', '3px');
});
