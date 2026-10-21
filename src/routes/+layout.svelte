<script lang="ts">
	import '../app.css';
	import logo from '#lib/assets/logo.svg';
	import { langs } from '#lib/types.js';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { MetaTags, deepMerge, type MetaTagsProps } from 'svelte-meta-tags';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	// 英日の対応（hreflang）と canonical は URL から決まるので、ページではなくここで足す。
	// 絶対 URL が必要なので prerender 時の origin（vite.config.ts の paths.origin）を使う
	let urlTags = $derived.by((): MetaTagsProps => {
		const lang = page.params.lang;
		if (!lang) return {};
		const hrefIn = (l: string) =>
			page.url.origin + page.url.pathname.replace(`/${lang}/`, `/${l}/`);
		return {
			canonical: hrefIn(lang),
			languageAlternates: [
				...langs.map((l) => ({ hrefLang: l, href: hrefIn(l) })),
				{ hrefLang: 'x-default', href: `${page.url.origin}${resolve('/')}`.replace(/\/?$/, '/') }
			],
			openGraph: { locale: lang === 'ja' ? 'ja_JP' : 'en_US' }
		};
	});
	let metaTags = $derived(deepMerge(deepMerge(data.baseMetaTags, urlTags), page.data.pageMetaTags));
</script>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

<MetaTags {...metaTags} />

{@render children()}
