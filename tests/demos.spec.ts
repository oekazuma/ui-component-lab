import { expect, test } from '@playwright/test';
import { componentIds } from './component-ids';
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

// DADS ボタンのアクセシビリティ: ターゲットサイズは 44 × 44 CSS px 以上。
// 一覧ページのデモは縮めたサムネイルなので、詳細ページで測る
for (const id of componentIds) {
	test(`buttons: every demo button is at least 44 × 44 px: ${id}`, async ({ page }) => {
		await page.goto(`en/components/${id}/`);
		const small = await page.locator('main .btn, main [role="toolbar"] button').evaluateAll((els) =>
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

test('breadcrumb: five levels, the current page is plain text, and its long name wraps on phones', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 800 });
	const demo = await openDemo(page, 'en/components/breadcrumb/');
	const nav = demo.getByRole('navigation', { name: 'Breadcrumb' });
	await expect(nav.getByRole('listitem')).toHaveCount(5);
	await expect(nav.getByRole('link')).toHaveCount(4);
	const current = nav.locator('[aria-current="page"]');
	await expect(current).toHaveJSProperty('tagName', 'SPAN');
	expect(await current.evaluate((el) => el.getClientRects().length)).toBeGreaterThan(1);
	expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

test('toast: with Undo and Close it stays until dismissed, and every press is announced again', async ({ page }) => {
	await page.clock.install();
	const demo = await openDemo(page, 'en/components/toast/');
	const archive = demo.getByRole('button', { name: 'Archive message' });
	const status = demo.getByRole('status');

	await archive.click();
	await expect(status).toHaveText('Message archived');
	await expect(demo.getByText('2 messages in the inbox')).toBeVisible();
	await page.clock.fastForward(10_000);
	await expect(demo.getByRole('button', { name: 'Undo' })).toBeVisible();

	// 同じ文のままだとスクリーンリーダーは読み直さないので、押すたびに中身の要素を作り直していることを見る
	await status.locator('span').evaluate((s) => (s.dataset.mark = 'old'));
	await archive.click();
	await expect(status.locator('span')).toHaveCount(1);
	await expect(status.locator('span[data-mark]')).toHaveCount(0);
	await expect(demo.getByText('1 message in the inbox')).toBeVisible();

	await demo.getByRole('button', { name: 'Undo' }).click();
	await expect(demo.getByText('2 messages in the inbox')).toBeVisible();
	await expect(status).toHaveText('');
	await expect(archive).toBeFocused();

	await archive.click();
	await demo.getByRole('button', { name: 'Close' }).click();
	await expect(demo.getByRole('button', { name: 'Undo' })).toHaveCount(0);
	await expect(archive).toBeFocused();
	await expect(demo.getByText('1 message in the inbox')).toBeVisible();
});

test('progress bar: starts indeterminate, can be canceled, and names itself after the result', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/progress-bar/');
	const start = demo.getByRole('button', { name: 'Start upload' });
	const cancel = demo.getByRole('button', { name: 'Cancel' });
	const status = demo.getByRole('status');

	await start.click();
	await expect(demo.getByRole('progressbar', { name: 'Uploading photo.jpg' })).not.toHaveAttribute('value');
	await expect(status).toHaveText('Upload started');
	await expect(start).toHaveAttribute('aria-disabled', 'true');
	await expect(demo.getByRole('progressbar')).toHaveAttribute('value', /^[1-9]/);
	await cancel.click();
	await expect(status).toHaveText('Upload canceled');
	await expect(demo.getByRole('progressbar', { name: 'Upload of photo.jpg canceled' })).toBeVisible();
	await expect(cancel).toHaveAttribute('aria-disabled', 'true');

	await start.click();
	await expect(demo.getByRole('progressbar', { name: 'Uploaded photo.jpg' })).toHaveAttribute('value', '100', { timeout: 10_000 });
	await expect(status).toHaveText('Upload complete');
	await expect(start).not.toHaveAttribute('aria-disabled', 'true');
});

test('skeleton: tells assistive technology when loading starts and ends, with a placeholder for the image', async ({ page }) => {
	await page.clock.install();
	const demo = await openDemo(page, 'en/components/skeleton/');
	const status = demo.getByRole('status');
	await demo.getByRole('button', { name: 'Reload' }).click();
	await expect(status).toHaveText('Loading profile…');
	await expect(demo.locator('.bone.image')).toBeVisible();
	await page.clock.fastForward(2000);
	await expect(status).toHaveText('Profile loaded');
	await expect(demo.locator('.bone')).toHaveCount(0);
	await expect(demo.getByText('Aiko Tanaka')).toBeVisible();
});

test('badge: icon-only buttons carry the count in their names, cap it at 99+, and use a dot', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/badge/');
	const messages = demo.getByRole('button', { name: 'Messages, 99+ unread' });
	await expect(messages).toContainText('99+');
	const downloads = demo.getByRole('button', { name: 'Downloads, new' });
	await expect(downloads.locator('.badge')).toHaveText('');
	await expect(downloads.locator('.badge')).toBeVisible();
	await expect(demo.getByRole('button', { name: 'Notifications, 3 unread' })).toContainText('3');

	await messages.click();
	await expect(demo.getByRole('button', { name: 'Messages', exact: true })).not.toContainText('99+');
	await downloads.click();
	await expect(demo.getByRole('button', { name: 'Downloads', exact: true }).locator('.badge')).toHaveCount(0);
});

test('tag: display-only chip labels next to selectable tags that toggle aria-pressed', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tag/');
	const notices = demo.getByRole('list', { name: 'Notices' });
	await expect(notices.getByRole('listitem')).toHaveText([/Childcare subsidy\s*Open/, /Bicycle parking permit\s*Closed/]);
	await expect(notices.getByRole('button')).toHaveCount(0);

	const topics = demo.getByRole('group', { name: 'Topics' });
	const health = topics.getByRole('button', { name: 'Health' });
	await expect(health).toHaveAttribute('aria-pressed', 'false');
	await health.click();
	await expect(health).toHaveAttribute('aria-pressed', 'true');
	await health.press('Space');
	await expect(health).toHaveAttribute('aria-pressed', 'false');
});

test('card: cards in a grid with linked headings and category labels, and an ad card marked as such', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/card/');
	const cards = demo.getByRole('article');
	await expect(cards).toHaveCount(3);
	for (const card of await cards.all()) await expect(card.getByRole('heading').getByRole('link')).toBeVisible();
	await expect(cards.nth(0)).toContainText('Travel');
	const ad = demo.getByRole('article', { name: /Autumn hotel sale/ });
	await expect(ad.getByText('Ad', { exact: true })).toBeVisible();
	await expect(ad).toHaveCSS('border-style', 'dashed');
	const [a, b] = await Promise.all([cards.nth(0).boundingBox(), cards.nth(1).boundingBox()]);
	expect(a!.y).toBe(b!.y);

	await page.setViewportSize({ width: 375, height: 800 });
	expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

test('description list: each row has a Change link named after its row, and fits a phone screen', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 800 });
	const demo = await openDemo(page, 'en/components/description-list/');
	// 見えている文字は「Change」だけで、どの行かは読み上げ用の隠れた文字で補う
	for (const name of ['Change name', 'Change date of birth', 'Change email', 'Change address'])
		await expect(demo.getByRole('link', { name, exact: true })).toHaveText(name);
	await expect(demo.locator('dd.actions a .visually-hidden')).toHaveCount(4);
	expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

test('table: price and storage both sort, and aria-sort moves to the one sorted column', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/table/');
	const table = demo.getByRole('table', { name: /Plan prices.*sortable/ });
	const plans = table.locator('tbody th');
	const sorted = table.locator('th[aria-sort]');
	await expect(sorted).toHaveCount(0);

	const price = table.getByRole('button', { name: 'Price / month' });
	const storage = table.getByRole('button', { name: 'Storage' });
	await expect(storage).toHaveCSS('text-decoration-line', 'underline');

	await price.click();
	await expect(sorted).toHaveCount(1);
	await expect(table.getByRole('columnheader', { name: 'Price / month' })).toHaveAttribute('aria-sort', 'ascending');
	await expect(plans).toHaveText(['Free', 'Personal', 'Photo', 'Team']);

	await storage.click();
	await expect(sorted).toHaveCount(1);
	await expect(table.getByRole('columnheader', { name: 'Storage' })).toHaveAttribute('aria-sort', 'ascending');
	await expect(plans).toHaveText(['Free', 'Personal', 'Team', 'Photo']);
	await storage.click();
	await expect(table.getByRole('columnheader', { name: 'Storage' })).toHaveAttribute('aria-sort', 'descending');
	await expect(plans).toHaveText(['Photo', 'Team', 'Personal', 'Free']);
});

test('list: each item title is a link, like a DADS resource list', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/list/');
	const items = demo.getByRole('listitem');
	await expect(items).toHaveCount(3);
	for (const item of await items.all()) await expect(item.getByRole('link')).toHaveCount(1);
	await expect(items.first().getByRole('link')).toHaveText('Meeting notes');
	await page.goto('ja/components/list/');
	await expect(page.getByRole('region', { name: '別名' }).getByText('リソースリスト')).toBeVisible();
});

test('avatar: a photo, a photo that fails and falls back to the initial, and a decorative one next to a name, with no console noise', async ({ page }) => {
	const noise: string[] = [];
	page.on('console', (m) => ['error', 'warning'].includes(m.type()) && noise.push(m.text()));
	page.on('response', (r) => r.status() >= 400 && noise.push(`${r.status()} ${r.url()}`));
	const demo = await openDemo(page, 'en/components/avatar/');

	const members = demo.getByRole('list', { name: 'Project members' });
	const photo = members.getByRole('img', { name: 'Aiko Tanaka' });
	await expect(photo).toBeVisible();
	expect(await photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
	const fallback = members.getByRole('listitem').nth(1);
	await expect(fallback.locator('img')).toHaveCount(0);
	await expect(fallback).toHaveText(/B\s*Ben Carter/);
	await expect(fallback.locator('.avatar')).toHaveAttribute('aria-hidden', 'true');

	const byline = demo.locator('.byline');
	await expect(byline).toContainText('Aiko Tanaka');
	await expect(byline.locator('img')).toHaveAttribute('alt', '');
	expect(noise).toEqual([]);
});

test('divider: sections are split by borders, <hr> marks a change of topic in text, and inset lines sit inside the padding', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/divider/');
	const box = demo.locator('.demo');
	const hr = box.locator('hr');
	await expect(hr).toHaveCount(1);
	await expect(box.locator('section hr + p')).toHaveCount(1);
	await expect(box.locator('section + section')).toHaveCSS('border-top-style', 'solid');

	const outer = (await box.boundingBox())!;
	const full = (await box.locator('section + section').boundingBox())!;
	const inset = (await box.locator('.inset li + li').first().boundingBox())!;
	expect(Math.round(full.width)).toBe(Math.round(outer.width - 2));
	expect(inset.x).toBeGreaterThan(full.x + 8);
	expect(inset.width).toBeLessThan(full.width - 16);
});

test('text field: marked required, not cut off at the limit, and errors on submit say what to fix', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/text-field/');
	const input = demo.getByRole('textbox', { name: 'Display name (required)' });
	const save = demo.getByRole('button', { name: 'Save' });
	await expect(input).not.toHaveAttribute('maxlength');

	await save.click();
	await expect(input).toBeFocused();
	await expect(input).toHaveAttribute('aria-invalid', 'true');
	await expect(input).toHaveAccessibleDescription(/^Enter a display name\. Shown on your profile/);

	await input.fill('a'.repeat(23));
	await expect(input).toHaveValue('a'.repeat(23));
	await save.click();
	await expect(input).toHaveAccessibleDescription(/^Display name must be 20 characters or less \(you entered 23\)\./);

	await input.fill('Aiko');
	await expect(input).not.toHaveAttribute('aria-invalid', 'true');
	await save.click();
	await expect(demo.getByRole('status')).toHaveText('Saved');
});

test('textarea: the counter warns past the limit, and submitting then gives an error with the count', async ({ page }) => {
	const demo = await openDemo(page, 'ja/components/textarea/', /^デモ:/);
	const box = demo.getByRole('textbox', { name: 'ご意見（200文字以内）' });
	const send = demo.getByRole('button', { name: '送信' });

	await box.fill('あ'.repeat(201));
	await expect(box).toHaveValue('あ'.repeat(201));
	await expect(demo.getByText('1文字超えています')).toBeVisible();
	await expect(box).not.toHaveAttribute('aria-invalid', 'true');

	await send.click();
	await expect(box).toBeFocused();
	await expect(box).toHaveAttribute('aria-invalid', 'true');
	await expect(box).toHaveAccessibleDescription(/^＊入力できる文字数を超えています。（入力文字数201文字）/);

	await box.fill('よかったです');
	await expect(box).not.toHaveAttribute('aria-invalid', 'true');
	await send.click();
	await expect(demo.getByRole('status')).toHaveText('送信しました');

	await page.goto('en/components/textarea/');
	await page.waitForLoadState('networkidle');
	await page.getByRole('textbox', { name: /^Feedback/ }).fill('a'.repeat(199));
	await expect(page.getByText('1 character left')).toBeVisible();
});

test('toast: a message-only toast hides itself after 5 seconds, but not while the pointer is on it', async ({ page }) => {
	await page.clock.install();
	const demo = await openDemo(page, 'en/components/toast/');
	const status = demo.getByRole('status');
	const toast = demo.locator('.region');

	await demo.getByRole('button', { name: 'Copy link' }).click();
	await expect(status).toHaveText('Link copied');
	await expect(toast.getByRole('button')).toHaveCount(0);
	// トーストが消えても、コピーしたことはページの中で確かめられる
	await expect(demo.getByText('Share link: https://example.com/s/8f3k (copied)')).toBeVisible();

	await toast.hover();
	await page.clock.fastForward(10_000);
	await expect(status).toHaveText('Link copied');
	await page.mouse.move(0, 0);
	await page.clock.fastForward(4000);
	await expect(status).toHaveText('Link copied');
	await page.clock.fastForward(1500);
	await expect(status).toHaveText('');
	await expect(demo.getByText('Share link: https://example.com/s/8f3k (copied)')).toBeVisible();
});

test('checkbox: a single terms checkbox starts unchecked and gives an error tied to it when left unchecked', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/checkbox/');
	const terms = demo.getByRole('checkbox', { name: 'I agree to the terms of use' });
	const apply = demo.getByRole('button', { name: 'Apply' });
	await expect(terms).not.toBeChecked();

	await apply.click();
	await expect(terms).toBeFocused();
	await expect(terms).toHaveAttribute('aria-invalid', 'true');
	await expect(terms).toHaveAccessibleDescription('Select if you agree to the terms of use.');

	await page.keyboard.press('Space');
	await expect(terms).not.toHaveAttribute('aria-invalid', 'true');
	await apply.click();
	await expect(demo.getByRole('status')).toHaveText('Application sent');
	// トッピングのグループはそのまま残る
	await expect(demo.getByRole('group', { name: 'Toppings' }).getByRole('checkbox')).toHaveCount(4);
});

test('date picker: min is set to today in the browser, with a hint on the year and an example', async ({ page }) => {
	// ビルドした日付が HTML に残らないよう、min はブラウザで入れる
	const html = await (await page.request.get('en/components/date-picker/')).text();
	expect(html).not.toMatch(/min="\d{4}-/);

	const demo = await openDemo(page, 'en/components/date-picker/');
	const input = demo.getByLabel('Check-in date');
	const today = await page.evaluate(() => {
		const d = new Date();
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
	});
	await expect(input).toHaveAttribute('min', today);
	await expect(input).toHaveAccessibleDescription(/Western calendar.*For example, October 21, 2026/);

	await input.fill('2020-01-01');
	await expect(input).toHaveAttribute('aria-invalid', 'true');
	await expect(input).toHaveAccessibleDescription(/^Choose today or a later date\./);
	await input.fill(today);
	await expect(input).not.toHaveAttribute('aria-invalid', 'true');
});

test('slider: shows the minimum and maximum under the ends of the track', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/slider/');
	const r = (await demo.getByRole('slider', { name: 'Volume' }).boundingBox())!;
	// 値の範囲は slider の役割が読み上げるので、見た目だけの文字にする
	const lo = demo.locator('[aria-hidden="true"]').getByText('0', { exact: true });
	const hi = demo.locator('[aria-hidden="true"]').getByText('100', { exact: true });
	const l = (await lo.boundingBox())!;
	const h = (await hi.boundingBox())!;
	expect(Math.abs(l.x - r.x)).toBeLessThan(2);
	expect(Math.abs(h.x + h.width - (r.x + r.width))).toBeLessThan(2);
	expect(l.y).toBeGreaterThan(r.y + r.height / 2);
});

test('switch: turning it on shows the completed tasks right away', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/switch/');
	const sw = demo.getByRole('switch', { name: 'Show completed tasks' });
	const tasks = demo.getByRole('list', { name: 'Tasks' }).getByRole('listitem');
	await expect(sw).not.toBeChecked();
	await expect(tasks).toHaveCount(2);
	await sw.check();
	await expect(tasks).toHaveCount(4);
	await sw.press('Space');
	await expect(tasks).toHaveCount(2);
});

test('search field: a decorative magnifying glass sits at the start of the box, clear of the text', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/search-field/');
	const input = demo.getByRole('searchbox', { name: 'Search the site' });
	const icon = demo.locator('svg');
	await expect(icon).toHaveAttribute('aria-hidden', 'true');
	const i = (await input.boundingBox())!;
	const s = (await icon.boundingBox())!;
	expect(s.x).toBeGreaterThan(i.x);
	expect(s.y).toBeGreaterThan(i.y);
	expect(s.y + s.height).toBeLessThan(i.y + i.height);
	const padding = await input.evaluate((el) => parseFloat(getComputedStyle(el).paddingInlineStart));
	expect(i.x + padding).toBeGreaterThanOrEqual(s.x + s.width);
});

test('select: the Japanese options are in gojūon order', async ({ page }) => {
	const demo = await openDemo(page, 'ja/components/select/', /^デモ:/);
	await expect(demo.getByRole('combobox', { name: '国' }).locator('option:not([disabled])')).toHaveText([
		'インド',
		'オーストラリア',
		'カナダ',
		'ケニア',
		'ドイツ',
		'日本',
		'ブラジル',
		'フランス'
	]);
});

test('listbox: time zones with their UTC offsets, in offset order, still reachable by typing a letter', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/listbox/');
	const list = demo.getByRole('listbox', { name: 'Time zone' });
	const options = list.locator('option');
	await expect(options).toHaveCount(10);
	await expect(options.first()).toHaveText('Chicago (UTC−06:00)');
	await expect(options.last()).toHaveText('Auckland (UTC+12:00)');
	await list.focus();
	await page.keyboard.press('t');
	await expect(list).toHaveValue('Tokyo (UTC+09:00)');
});

test('combobox: the button opens every option, the typed part is marked, and no match is announced', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/combobox/');
	const input = demo.getByRole('combobox', { name: 'Fruit' });
	const toggle = demo.getByRole('button', { name: 'Fruit' });
	const options = demo.getByRole('option');
	const status = demo.getByRole('status');
	await expect(toggle).toHaveAttribute('tabindex', '-1');

	await toggle.click();
	await expect(input).toBeFocused();
	await expect(input).toHaveAttribute('aria-expanded', 'true');
	await expect(toggle).toHaveAttribute('aria-expanded', 'true');
	await expect(options).toHaveCount(10);
	await toggle.click();
	await expect(input).toHaveAttribute('aria-expanded', 'false');
	await expect(input).toBeFocused();

	await input.fill('ap');
	await expect(options).toHaveText(['Apple', 'Apricot']);
	await expect(options.locator('mark')).toHaveText(['Ap', 'Ap']);
	await expect(status).toHaveText('');

	await input.fill('zzz');
	await expect(input).toHaveAttribute('aria-expanded', 'false');
	await expect(status).toHaveText('No matching fruit');
	await expect(status).toBeVisible();
	await input.fill('');
	await expect(status).toHaveText('');
});
