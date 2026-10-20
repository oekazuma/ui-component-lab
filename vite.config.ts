import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			paths: {
				// GitHub Pages のプロジェクトサイト（https://oekazuma.github.io/ui-component-lab/）
				base: '/ui-component-lab',
				// 404.html は任意の階層の URL で返されるため、相対パスだと _app/ を解決できない
				relative: false
			}
		})
	]
});
