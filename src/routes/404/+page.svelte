<script lang="ts">
	import { homePath } from '#lib/paths.js';
	import { siteName } from '#lib/i18n.js';
</script>

<svelte:head>
	<title>404 | {siteName}</title>
</svelte:head>

<main>
	<h1>404</h1>
	<p>Page not found.<br /><span lang="ja">ページが見つかりません。</span></p>
	<ul>
		<li><a href={homePath('en')} hreflang="en">English</a></li>
		<li><a href={homePath('ja')} hreflang="ja">日本語</a></li>
	</ul>
</main>

<style>
	main {
		max-width: 40rem;
		margin: 4rem auto;
		padding: 0 1rem;
	}
</style>
