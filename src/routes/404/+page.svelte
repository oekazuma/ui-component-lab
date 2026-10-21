<script lang="ts">
	import { resolve } from '$app/paths';
	import { homePath } from '#lib/paths.js';
	import SiteHeader from '#lib/SiteHeader.svelte';
	import ThemeToggle from '#lib/ThemeToggle.svelte';

	// ルートはブラウザの言語設定を見て /en/ か /ja/ へ案内する（src/routes/+page.svelte）
	const root = resolve('/').replace(/\/?$/, '/');
</script>

<SiteHeader home={root}>
	<ThemeToggle label="Dark mode / ダークモード" />
</SiteHeader>

<main>
	<h1>404</h1>
	<p>Page not found.<br /><span lang="ja">ページが見つかりません。</span></p>
	<ul>
		<li><a href={homePath('en')} hreflang="en">All components (English)</a></li>
		<li><a href={homePath('ja')} hreflang="ja" lang="ja">コンポーネント一覧（日本語）</a></li>
	</ul>
</main>

<style>
	main {
		max-width: 72rem;
		margin: 0 auto;
		padding: 2rem 1rem 4rem;
	}
</style>
