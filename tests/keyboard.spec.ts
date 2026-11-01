import { expect, test } from '@playwright/test';
import { openDemo } from './open-demo.ts';

test('tabs: arrow keys, End and Home move focus and selection', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tabs/');
	const profile = demo.getByRole('tab', { name: 'Profile' });
	const notifications = demo.getByRole('tab', { name: 'Notifications' });
	const security = demo.getByRole('tab', { name: 'Security' });

	await profile.focus();
	await page.keyboard.press('ArrowRight');
	await expect(notifications).toBeFocused();
	await expect(notifications).toHaveAttribute('aria-selected', 'true');

	await page.keyboard.press('End');
	await expect(security).toBeFocused();
	await expect(security).toHaveAttribute('aria-selected', 'true');

	await page.keyboard.press('Home');
	await expect(profile).toBeFocused();
	await expect(profile).toHaveAttribute('aria-selected', 'true');

	// 端では反対の端へ回る
	await page.keyboard.press('ArrowLeft');
	await expect(security).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(profile).toBeFocused();
});

test('menu: Shift+Tab from an item closes the menu and returns to the button', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/menu/');
	const trigger = demo.getByRole('button', { name: 'Actions' });

	await trigger.focus();
	await page.keyboard.press('Enter');
	await expect(demo.getByRole('menuitem', { name: 'Rename' })).toBeFocused();

	await page.keyboard.press('Shift+Tab');
	await expect(trigger).toBeFocused();
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('menu: clicking an item reports it and closes the menu', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/menu/');

	await demo.getByRole('button', { name: 'Actions' }).click();
	await demo.getByRole('menuitem', { name: 'Duplicate' }).click();

	await expect(demo.locator('[role="status"]')).toHaveText('Chosen: Duplicate');
	await expect(demo.locator('[role="menu"]').first()).toBeHidden();
});

test('tooltip: Escape hides a hover-opened tooltip', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tooltip/');
	const tooltip = demo.locator('[role="tooltip"]');

	await demo.getByRole('button', { name: 'Copy link' }).hover();
	await expect(tooltip).toHaveClass(/visible/);

	await page.keyboard.press('Escape');
	await expect(tooltip).not.toHaveClass(/visible/);
});

test('combobox: Escape with no matching option clears the input', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/combobox/');
	const input = demo.getByRole('combobox');

	await input.fill('zzz');
	await expect(input).toHaveAttribute('aria-expanded', 'false');

	await page.keyboard.press('Escape');
	await expect(input).toHaveValue('');
	await expect(input).toHaveAttribute('aria-expanded', 'false');
});

test('language switch: updates <html lang> and resets the demo state', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/menu/');

	await demo.getByRole('button', { name: 'Actions' }).click();
	await demo.getByRole('menuitem', { name: 'Rename' }).click();
	await expect(demo.locator('[role="status"]')).toHaveText('Chosen: Rename');

	await page.getByRole('button', { name: /Language/ }).click();
	await page.locator('a[hreflang="ja"]').click();
	await page.waitForURL(/\/ja\/components\/menu\/$/);

	await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
	await expect(page.getByRole('group', { name: /^デモ:/ }).locator('[role="status"]')).toHaveText('');
});

test('tooltip: Escape hides a focus-opened tooltip and focus stays on the button', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tooltip/');
	const button = demo.getByRole('button', { name: 'Copy link' });
	const tooltip = demo.locator('[role="tooltip"]');

	await button.focus();
	await expect(tooltip).toHaveClass(/visible/);

	await page.keyboard.press('Escape');
	await expect(tooltip).not.toHaveClass(/visible/);
	await expect(button).toBeFocused();
});

// Playwright では IME の変換を再現できないため、変換中を示す isComposing を付けた keydown を送る
test('combobox: arrow keys and Enter during IME composition are left to the IME', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/combobox/');
	const input = demo.getByRole('combobox');

	await input.fill('ap');
	await expect(input).toHaveAttribute('aria-expanded', 'true');

	await input.dispatchEvent('keydown', { key: 'ArrowDown', isComposing: true, bubbles: true });
	await expect(input).not.toHaveAttribute('aria-activedescendant');
	await input.dispatchEvent('keydown', { key: 'Escape', isComposing: true, bubbles: true });
	await expect(input).toHaveAttribute('aria-expanded', 'true');

	await page.keyboard.press('ArrowDown');
	await expect(input).toHaveAttribute('aria-activedescendant', /option-0$/);
	await input.dispatchEvent('keydown', { key: 'Enter', isComposing: true, bubbles: true });
	await expect(input).toHaveValue('ap');
	await expect(input).toHaveAttribute('aria-expanded', 'true');
});

test('carousel: arrow keys, End and Home on the slide numbers move focus and show the slide', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/carousel/');
	const tab = (n: number) => demo.getByRole('tab', { name: `Slide ${n}` });
	const shown = demo.getByRole('tabpanel');

	await tab(1).focus();
	await page.keyboard.press('ArrowRight');
	await expect(tab(2)).toBeFocused();
	await expect(tab(2)).toHaveAttribute('aria-selected', 'true');
	await expect(tab(2)).toHaveAttribute('tabindex', '0');
	await expect(tab(1)).toHaveAttribute('tabindex', '-1');
	await expect(shown).toHaveAttribute('id', (await tab(2).getAttribute('aria-controls'))!);

	await page.keyboard.press('End');
	await expect(tab(4)).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(tab(1)).toBeFocused();
	await page.keyboard.press('ArrowLeft');
	await expect(tab(4)).toBeFocused();
	await page.keyboard.press('Home');
	await expect(tab(1)).toBeFocused();
	await expect(tab(1)).toHaveAttribute('aria-selected', 'true');
	await expect(demo).toContainText('1 / 4');
});

test('carousel: previous and next keep focus on the button and wrap around', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/carousel/');
	const next = demo.getByRole('button', { name: 'Next slide' });
	const prev = demo.getByRole('button', { name: 'Previous slide' });

	await next.focus();
	await page.keyboard.press('Enter');
	await expect(next).toBeFocused();
	await expect(demo).toContainText('2 / 4');
	await expect(demo.getByRole('tab', { name: 'Slide 2' })).toHaveAttribute('aria-selected', 'true');

	await prev.focus();
	await page.keyboard.press('Space');
	await page.keyboard.press('Space');
	await expect(prev).toBeFocused();
	await expect(demo).toContainText('4 / 4');
	await expect(demo.locator('[aria-live="polite"]').getByRole('tabpanel')).toHaveCount(1);
});

test('toolbar: arrow keys move across both groups and wrap; Space chooses one alignment', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/toolbar/');
	const underline = demo.getByRole('button', { name: 'Underline' });
	const left = demo.getByRole('radio', { name: 'Align left' });
	const center = demo.getByRole('radio', { name: 'Align center' });
	const right = demo.getByRole('radio', { name: 'Align right' });
	const bold = demo.getByRole('button', { name: 'Bold' });
	await expect(demo.getByRole('radiogroup', { name: 'Text alignment' })).toBeVisible();
	await expect(left).toHaveAttribute('aria-checked', 'true');

	await underline.focus();
	await page.keyboard.press('ArrowRight');
	await expect(left).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(center).toBeFocused();
	await expect(center).toHaveAttribute('aria-checked', 'false');
	await page.keyboard.press('Space');
	await expect(center).toHaveAttribute('aria-checked', 'true');
	await expect(left).toHaveAttribute('aria-checked', 'false');

	await page.keyboard.press('End');
	await expect(right).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(bold).toBeFocused();
	await page.keyboard.press('ArrowLeft');
	await expect(right).toBeFocused();
	await page.keyboard.press('Home');
	await expect(bold).toBeFocused();
	await expect(bold).toHaveAttribute('tabindex', '0');
	await expect(demo.locator('[role="toolbar"] [tabindex="0"]')).toHaveCount(1);
});

test('menu: arrow keys wrap at both ends and skip the separator before the destructive item', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/menu/');
	const trigger = demo.getByRole('button', { name: 'Actions' });
	const menu = demo.getByRole('menu', { name: 'Actions' });
	const item = (name: string) => menu.getByRole('menuitem', { name });

	await trigger.focus();
	await page.keyboard.press('ArrowUp');
	await expect(item('Move to trash')).toBeFocused();
	await expect(menu.getByRole('separator')).toHaveCount(1);
	await page.keyboard.press('ArrowDown');
	await expect(item('Rename')).toBeFocused();
	await page.keyboard.press('ArrowUp');
	await expect(item('Move to trash')).toBeFocused();
	await page.keyboard.press('ArrowUp');
	await expect(item('Duplicate')).toBeFocused();
});

test('tree view: arrow keys reach a file in the third level and the opened file is marked current', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/tree-view/');
	const item = (name: string) => demo.getByRole('treeitem', { name, exact: true });

	await item('Documents').focus();
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('ArrowRight');
	await expect(item('2026')).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await page.keyboard.press('ArrowRight');
	await expect(item('report.pdf')).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(item('report.pdf')).toHaveAttribute('aria-current', 'true');

	await page.keyboard.press('ArrowLeft');
	await expect(item('2026')).toBeFocused();
	await item('budget.xlsx').click();
	await expect(demo.locator('[aria-current]')).toHaveCount(1);
	await expect(item('budget.xlsx')).toHaveAttribute('aria-current', 'true');
});

test('menubar: arrow keys move along the bar, open a submenu and move to the next submenu', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/menubar/');
	const bar = (name: string) => demo.getByRole('menubar').getByRole('menuitem', { name, exact: true });
	const menu = (name: string) => demo.getByRole('menu', { name });

	await bar('File').focus();
	await page.keyboard.press('ArrowLeft');
	await expect(bar('View')).toBeFocused();
	await expect(bar('View')).toHaveAttribute('tabindex', '0');
	await expect(bar('File')).toHaveAttribute('tabindex', '-1');
	await page.keyboard.press('Home');
	await expect(bar('File')).toBeFocused();
	await page.keyboard.press('End');
	await expect(bar('View')).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(bar('File')).toBeFocused();

	await page.keyboard.press('ArrowDown');
	await expect(bar('File')).toHaveAttribute('aria-expanded', 'true');
	await expect(menu('File').getByRole('menuitem', { name: 'New' })).toBeFocused();
	await page.keyboard.press('ArrowUp');
	await expect(menu('File').getByRole('menuitem', { name: 'Save' })).toBeFocused();

	await page.keyboard.press('ArrowRight');
	await expect(bar('File')).toHaveAttribute('aria-expanded', 'false');
	await expect(menu('Edit').getByRole('menuitem', { name: 'Undo' })).toBeFocused();
	await page.keyboard.press('ArrowLeft');
	await expect(menu('File').getByRole('menuitem', { name: 'New' })).toBeFocused();

	await page.keyboard.press('Escape');
	await expect(bar('File')).toBeFocused();
	await expect(bar('File')).toHaveAttribute('aria-expanded', 'false');

	await page.keyboard.press('ArrowUp');
	await expect(menu('File').getByRole('menuitem', { name: 'Save' })).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(bar('File')).toBeFocused();
	await expect(demo.locator('[role="status"]')).toHaveText('Chosen: File > Save');
	await expect(demo.getByRole('menu')).toHaveCount(0);
});

test('menubar: Tab from a submenu closes it and leaves the menubar', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/menubar/');
	const edit = demo.getByRole('menubar').getByRole('menuitem', { name: 'Edit', exact: true });

	await edit.click();
	await expect(demo.getByRole('menu', { name: 'Edit' }).getByRole('menuitem', { name: 'Undo' })).toBeFocused();
	await page.keyboard.press('Tab');
	await expect(edit).toHaveAttribute('aria-expanded', 'false');
	await expect(demo.getByRole('menubar')).not.toContainText('Undo');
	expect(await demo.getByRole('menubar').evaluate((el) => el.contains(document.activeElement))).toBe(false);
});

test('mega menu: Escape closes the panel and returns focus to its button', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/mega-menu/');
	const living = demo.getByRole('button', { name: 'Living' });

	await living.focus();
	await page.keyboard.press('Enter');
	await expect(living).toHaveAttribute('aria-expanded', 'false');
	await page.keyboard.press('Space');
	await expect(living).toHaveAttribute('aria-expanded', 'true');
	await page.keyboard.press('Tab');
	await expect(demo.getByRole('link', { name: 'All about living' })).toBeFocused();
	await page.keyboard.press('Escape');
	await expect(living).toBeFocused();
	await expect(living).toHaveAttribute('aria-expanded', 'false');
	await expect(demo.getByRole('link', { name: 'Tax' })).toBeHidden();
});

test('mega menu: moving focus out of the navigation closes the panel', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/mega-menu/');
	const health = demo.getByRole('button', { name: 'Health' });

	await health.click();
	await demo.getByRole('link', { name: 'Emergency care' }).focus();
	await page.keyboard.press('Tab');
	await expect(health).toHaveAttribute('aria-expanded', 'false');
});

test('language selector: opens with Enter, a language changes the demo page, and Escape returns focus', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/language-selector/');
	const button = demo.getByRole('button', { name: 'Language', exact: true });
	const japanese = demo.getByRole('link', { name: '日本語' });

	// 閉じている一覧は hidden なので、役割ではなく属性で探す
	await expect(demo.locator('a[lang="en"]')).toHaveAttribute('aria-current', 'true');
	await button.focus();
	await page.keyboard.press('Enter');
	await expect(button).toHaveAttribute('aria-expanded', 'true');
	await page.keyboard.press('Tab');
	await expect(japanese).toBeFocused();
	await expect(japanese).toHaveAttribute('lang', 'ja');
	await page.keyboard.press('Enter');
	await expect(button).toBeFocused();
	await expect(button).toHaveAttribute('aria-expanded', 'false');
	await expect(demo.locator('.content')).toHaveAttribute('lang', 'ja');
	await expect(demo.locator('a[lang="ja"]')).toHaveAttribute('aria-current', 'true');

	await page.keyboard.press('Space');
	await page.keyboard.press('Tab');
	await page.keyboard.press('Escape');
	await expect(button).toBeFocused();
	await expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('data grid: one Tab stop, arrow keys stop at the edges, Home / End and Ctrl + Home / End jump', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/data-grid/');
	const grid = demo.getByRole('grid', { name: 'Tasks' });
	const cell = (row: number, col: number) => grid.locator('tbody tr').nth(row).locator('td').nth(col);
	const done = (row: number) => cell(row, 2).getByRole('checkbox');

	await expect(grid.locator('[tabindex="0"]')).toHaveCount(1);
	await cell(0, 0).focus();
	await page.keyboard.press('ArrowLeft');
	await expect(cell(0, 0)).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(cell(0, 1)).toBeFocused();
	await expect(cell(0, 1)).toHaveAttribute('tabindex', '0');
	await expect(cell(0, 0)).toHaveAttribute('tabindex', '-1');
	await page.keyboard.press('ArrowUp');
	await expect(cell(0, 1)).toBeFocused();

	// チェックボックスのある列ではセルではなくチェックボックスにフォーカスし、Space で切り替える
	await page.keyboard.press('End');
	await expect(done(0)).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(done(0)).toBeFocused();
	await page.keyboard.press('Space');
	await expect(done(0)).toBeChecked();
	await page.keyboard.press('ArrowDown');
	await expect(done(1)).toBeFocused();
	await page.keyboard.press('Home');
	await expect(cell(1, 0)).toBeFocused();

	await page.keyboard.press('Control+End');
	await expect(done(4)).toBeFocused();
	await page.keyboard.press('ArrowDown');
	await expect(done(4)).toBeFocused();
	await page.keyboard.press('Control+Home');
	await expect(cell(0, 0)).toBeFocused();
	await expect(grid.locator('[tabindex="0"]')).toHaveCount(1);
});

test('feed: Page Down / Page Up move by article, the last one loads more, and Ctrl + End / Ctrl + Home leave the feed', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/feed/');
	const feed = demo.getByRole('feed', { name: 'Neighborhood news' });
	const articles = feed.getByRole('article');
	await expect(articles).toHaveCount(3);
	await expect(articles.first()).toHaveAttribute('aria-posinset', '1');
	await expect(articles.first()).toHaveAttribute('aria-setsize', '3');

	await articles.first().focus();
	await page.keyboard.press('PageDown');
	await expect(articles.nth(1)).toBeFocused();
	await page.keyboard.press('PageUp');
	await expect(articles.first()).toBeFocused();

	// 最後の記事へ移ると続きを読み込む。読み込みの間は aria-busy を付ける
	await page.keyboard.press('PageDown');
	await page.keyboard.press('PageDown');
	await expect(feed).toHaveAttribute('aria-busy', 'true');
	await expect(articles).toHaveCount(6);
	await expect(feed).toHaveAttribute('aria-busy', 'false');
	await expect(articles.nth(5)).toHaveAttribute('aria-setsize', '6');
	await page.keyboard.press('PageDown');
	await expect(articles.nth(3)).toBeFocused();

	await page.keyboard.press('Control+End');
	await expect(demo.getByRole('button', { name: /^↺/ })).toBeFocused();
	await articles.nth(1).focus();
	await page.keyboard.press('Control+Home');
	expect(await feed.evaluate((el) => !el.contains(document.activeElement) && !!(el.compareDocumentPosition(document.activeElement!) & Node.DOCUMENT_POSITION_PRECEDING))).toBe(true);
});

test('range slider: each thumb stops at the other, and the limits move with it', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/range-slider/');
	const low = demo.getByRole('slider', { name: 'Minimum price' });
	const high = demo.getByRole('slider', { name: 'Maximum price' });
	await expect(low).toHaveAttribute('aria-valuenow', '100');
	await expect(low).toHaveAttribute('aria-valuetext', '$100');
	await expect(low).toHaveAttribute('aria-valuemax', '300');

	await low.focus();
	await page.keyboard.press('ArrowRight');
	await expect(low).toHaveAttribute('aria-valuenow', '110');
	await expect(high).toHaveAttribute('aria-valuemin', '110');
	await page.keyboard.press('ArrowDown');
	await expect(low).toHaveAttribute('aria-valuenow', '100');
	await page.keyboard.press('End');
	await expect(low).toHaveAttribute('aria-valuenow', '300');
	await page.keyboard.press('ArrowUp');
	await expect(low).toHaveAttribute('aria-valuenow', '300');

	// 重なっても Tab の順は変わらない
	await page.keyboard.press('Tab');
	await expect(high).toBeFocused();
	await page.keyboard.press('PageUp');
	await expect(high).toHaveAttribute('aria-valuenow', '400');
	await expect(low).toHaveAttribute('aria-valuemax', '400');
	await page.keyboard.press('Home');
	await expect(high).toHaveAttribute('aria-valuenow', '300');
	await page.keyboard.press('End');
	await expect(high).toHaveAttribute('aria-valuenow', '500');
	await page.keyboard.press('Shift+Tab');
	await page.keyboard.press('PageDown');
	await page.keyboard.press('Home');
	await expect(low).toHaveAttribute('aria-valuenow', '0');
});

test('window splitter: arrow keys resize the contents pane, Enter collapses and restores it', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/window-splitter/');
	const splitter = demo.getByRole('separator', { name: 'Contents' });
	const pane = demo.locator(`#${await splitter.getAttribute('aria-controls')}`);
	await expect(splitter).toHaveAttribute('aria-orientation', 'vertical');
	await expect(splitter).toHaveAttribute('aria-valuenow', '30');

	await splitter.focus();
	const before = (await pane.boundingBox())!.width;
	await page.keyboard.press('ArrowRight');
	await expect(splitter).toHaveAttribute('aria-valuenow', '40');
	expect((await pane.boundingBox())!.width).toBeGreaterThan(before);
	await page.keyboard.press('ArrowLeft');
	await expect(splitter).toHaveAttribute('aria-valuenow', '30');

	await page.keyboard.press('End');
	await expect(splitter).toHaveAttribute('aria-valuenow', '80');
	await page.keyboard.press('Enter');
	await expect(splitter).toHaveAttribute('aria-valuenow', '0');
	await expect(pane).toBeHidden();
	await page.keyboard.press('Enter');
	await expect(splitter).toHaveAttribute('aria-valuenow', '80');
	await expect(pane).toBeVisible();

	await page.keyboard.press('Home');
	await expect(splitter).toHaveAttribute('aria-valuenow', '0');
	await page.keyboard.press('ArrowRight');
	await expect(splitter).toHaveAttribute('aria-valuenow', '10');
	await expect(splitter).toBeFocused();
});

test('command palette: the button opens it, typing narrows the commands, arrows move, and Enter runs one', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/command-palette/');
	const button = demo.getByRole('button', { name: 'Commands' });
	const dialog = page.getByRole('dialog', { name: 'Commands' });
	const input = dialog.getByRole('combobox');

	await button.click();
	await expect(input).toBeFocused();
	await input.fill('save');
	await expect(dialog.getByRole('option')).toHaveText(['Save', 'Save as…']);
	await expect(dialog.getByRole('option', { name: 'Save', exact: true })).toHaveAttribute('aria-selected', 'true');
	await page.keyboard.press('ArrowDown');
	const saveAs = dialog.getByRole('option', { name: 'Save as…' });
	await expect(input).toHaveAttribute('aria-activedescendant', (await saveAs.getAttribute('id'))!);
	await page.keyboard.press('ArrowDown');
	await expect(dialog.getByRole('option', { name: 'Save', exact: true })).toHaveAttribute('aria-selected', 'true');
	await page.keyboard.press('ArrowUp');
	await page.keyboard.press('Enter');

	await expect(dialog).toBeHidden();
	await expect(button).toBeFocused();
	await expect(demo.getByRole('status')).toHaveText('Ran: Save as…');
});

test('command palette: Escape closes it without running anything, and no match says so', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/command-palette/');
	const button = demo.getByRole('button', { name: 'Commands' });
	const dialog = page.getByRole('dialog', { name: 'Commands' });

	await button.focus();
	await page.keyboard.press('Enter');
	await dialog.getByRole('combobox').fill('zzz');
	await expect(dialog).toContainText('No matching commands');
	await page.keyboard.press('Enter');
	await page.keyboard.press('Escape');
	await expect(dialog).toBeHidden();
	await expect(button).toBeFocused();
	await expect(demo.getByRole('status')).toHaveText('');
});

test('context menu: right-click opens it at the pointer, and Escape returns focus to the file', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/context-menu/');
	const file = demo.getByRole('button', { name: 'report.pdf', exact: true });
	const box = (await file.boundingBox())!;

	await file.click({ button: 'right', position: { x: 20, y: 10 } });
	const menu = demo.getByRole('menu', { name: 'More options for report.pdf' });
	await expect(demo.getByRole('menuitem', { name: 'Download' })).toBeFocused();
	const m = (await menu.boundingBox())!;
	expect(Math.abs(m.x - (box.x + 20))).toBeLessThan(2);
	expect(Math.abs(m.y - (box.y + 10))).toBeLessThan(2);

	await page.keyboard.press('Escape');
	await expect(menu).toBeHidden();
	await expect(file).toBeFocused();
});

test('context menu: Shift + F10 opens it on the focused file, arrows move, and Enter runs an item', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/context-menu/');
	const file = demo.getByRole('button', { name: 'photo.jpg', exact: true });

	await file.focus();
	await page.keyboard.press('Shift+F10');
	await expect(demo.getByRole('menuitem', { name: 'Download' })).toBeFocused();
	await page.keyboard.press('ArrowUp');
	await expect(demo.getByRole('menuitem', { name: 'Delete' })).toBeFocused();
	await page.keyboard.press('ArrowDown');
	await page.keyboard.press('ArrowDown');
	await page.keyboard.press('Enter');
	await expect(demo.getByRole('status')).toHaveText('Chosen: Share (photo.jpg)');
	await expect(file).toBeFocused();
	await expect(demo.getByRole('menu')).toHaveCount(0);
});

test('context menu: the same actions are on a visible ⋯ button', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/context-menu/');
	await demo.getByRole('button', { name: 'More options for report.pdf' }).click();
	await expect(demo.getByRole('menuitem')).toHaveText(['Download', 'Share', 'Delete']);
});

test('stepper: Enter on a finished step goes to it and moves focus to its heading', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/stepper/');
	await demo.getByRole('button', { name: 'Next' }).click();
	const applicant = demo.getByRole('button', { name: /^Applicant/ });
	await applicant.focus();
	await page.keyboard.press('Enter');
	await expect(demo.getByText('Step 1 of 4: Applicant')).toBeFocused();
});

test('mega menu: Enter on a link shows where it goes, closes the panel and returns focus to its button', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/mega-menu/');
	const living = demo.getByRole('button', { name: 'Living' });
	const link = demo.getByRole('link', { name: 'All about living' });
	await link.focus();
	await page.keyboard.press('Enter');
	await expect(living).toBeFocused();
	await expect(living).toHaveAttribute('aria-expanded', 'false');
	await expect(demo.getByRole('status')).toContainText('All about living');
});

test('back to top: Home with focus on the button scrolls to the start and keeps focus in the box', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/back-to-top/');
	const article = demo.getByRole('region', { name: 'Article' });
	const button = demo.getByRole('button', { name: 'Back to top', exact: true });
	await button.focus();
	await page.keyboard.press('Home');
	await expect(button).toBeHidden();
	await expect(article).toBeFocused();
});

test('checkbox: the terms checkbox is already marked invalid when Apply moves focus to it', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/checkbox/');
	const terms = demo.getByRole('checkbox', { name: 'I agree to the terms of use' });
	await terms.evaluate((el) =>
		el.addEventListener('focus', () => (el.dataset.invalidOnFocus = String(el.getAttribute('aria-invalid'))), { once: true })
	);
	await demo.getByRole('button', { name: 'Apply' }).click();
	await expect(terms).toBeFocused();
	await expect(terms).toHaveAttribute('data-invalid-on-focus', 'true');
});
