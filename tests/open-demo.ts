import type { Page } from '@playwright/test';

// 詳細ページを開き、デモを囲む DemoFrame（role="group"）を返す。
// 事前描画された HTML は水和（hydration）前だとイベントが効かないので、読み込みの完了を待ってから操作する
export async function openDemo(page: Page, path: string, name: RegExp = /^Demo:/) {
	await page.goto(path);
	await page.waitForLoadState('networkidle');
	return page.getByRole('group', { name });
}
