<script lang="ts">
	import { homePath } from '#lib/paths.js';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { siteName, t } from '#lib/i18n.js';
	import logo from '#lib/assets/logo.svg';
	import { langs } from '#lib/types.js';
	import type { LayoutProps } from './$types';

	let { children, params }: LayoutProps = $props();

	let other = $derived(params.lang === 'en' ? 'ja' : 'en');
	// 同じページの別言語版。pathname は base を含むのでそのまま使える
	let otherHref = $derived(page.url.pathname.replace(`/${params.lang}/`, `/${other}/`));
	// 検索エンジンに英日の対応を伝える。絶対 URL が必要なので prerender 時の origin（vite.config.ts の paths.origin）を使う
	let hrefIn = $derived(
		(l: string) => page.url.origin + page.url.pathname.replace(`/${params.lang}/`, `/${l}/`)
	);
	let root = $derived(`${page.url.origin}${resolve('/')}`.replace(/\/?$/, '/'));
	// <html lang> は prerender 時に hooks.server.ts が入れる。言語切替はクライアント側の遷移なので、ここで追従させる
	$effect(() => {
		document.documentElement.lang = params.lang;
	});
</script>

<svelte:head>
	<link rel="canonical" href={hrefIn(params.lang)} />
	{#each langs as l (l)}
		<link rel="alternate" hreflang={l} href={hrefIn(l)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={root} />
</svelte:head>

<header>
	<a class="site-name" href={homePath(params.lang)}>
		<img src={logo} alt="" width="28" height="28" />{siteName}
	</a>
	<a href={otherHref} hreflang={other} lang={other}>{t(params.lang).switchLang}</a>
</header>

<main>
	{@render children()}
</main>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: 72rem;
		margin: 0 auto;
		padding: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.site-name {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: inherit;
		font-weight: 700;
		text-decoration: none;
	}

	main {
		max-width: 72rem;
		margin: 0 auto;
		padding: 1.5rem 1rem 4rem;
	}
</style>
