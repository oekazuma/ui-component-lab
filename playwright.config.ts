import { defineConfig } from '@playwright/test';

// ビルド済みの build/ を vite preview で配信して確かめる（pnpm build を先に実行する）
export default defineConfig({
	testDir: 'tests',
	use: { baseURL: 'http://localhost:4180/ui-component-lab/' },
	webServer: {
		command: 'vite preview --port 4180 --strictPort',
		url: 'http://localhost:4180/ui-component-lab/en/',
		// 別のブランチの preview を誤って使い回さないよう、既存のサーバーは使わない
		reuseExistingServer: false
	}
});
