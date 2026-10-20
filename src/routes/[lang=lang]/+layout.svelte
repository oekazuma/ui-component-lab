<script lang="ts">
	import { homePath } from '#lib/paths.js';
	import { page } from '$app/state';
	import { siteName, t } from '#lib/i18n.js';
	import logo from '#lib/assets/logo.svg';
	import type { LayoutProps } from './$types';

	let { children, params }: LayoutProps = $props();

	let other = $derived(params.lang === 'en' ? 'ja' : 'en');
	// 同じページの別言語版。pathname は base を含むのでそのまま使える
	let otherHref = $derived(page.url.pathname.replace(`/${params.lang}/`, `/${other}/`));
</script>

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
