import { asset } from '$app/paths';
import { defineBaseMetaTags } from 'svelte-meta-tags';
import { siteName } from '#lib/i18n.js';
import type { LayoutLoad } from './$types';

export const prerender = true;
export const trailingSlash = 'always';

// 全ページ共通のメタタグ。各ページは +page.ts の definePageMetaTags で title と description だけを渡す
// OG 画像は絶対 URL が必要。prerender 時の url.origin は vite.config.ts の paths.origin
export const load: LayoutLoad = ({ url }) => {
	const image = new URL(asset('og.png'), url.origin).href;
	const alt = siteName;
	return defineBaseMetaTags({
		titleTemplate: `%s | ${siteName}`,
		openGraph: { type: 'website', siteName, images: [{ url: image, width: 1200, height: 630, alt }] },
		twitter: { cardType: 'summary_large_image', image, imageAlt: alt }
	});
};
