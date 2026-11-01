<script lang="ts">
	import { homePath } from '#lib/paths.js';
	import { siteName } from '#lib/i18n.js';
	import { onMount } from 'svelte';

	// ブラウザの言語設定を見て /ja/ か /en/ へ案内する。JS がなければ下のリンクから選ぶ
	onMount(() => {
		const lang = navigator.languages.some((l) => l.toLowerCase().startsWith('ja')) ? 'ja' : 'en';
		location.replace(homePath(lang));
	});
</script>

<main>
	<h1>{siteName}</h1>
	<ul>
		<li><a href={homePath('en')} hreflang="en">English</a></li>
		<li><a href={homePath('ja')} hreflang="ja" lang="ja">日本語</a></li>
	</ul>
</main>

<style>
	main {
		max-width: 40rem;
		margin: 4rem auto;
		padding: 0 1rem;
	}
</style>
