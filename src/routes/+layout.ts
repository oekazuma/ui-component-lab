import { defineBaseMetaTags } from 'svelte-meta-tags';
import { siteName } from '#lib/i18n.js';

export const prerender = true;
export const trailingSlash = 'always';

// 全ページ共通のメタタグ。各ページは +page.ts の definePageMetaTags で title と description だけを渡す
export const load = () =>
	defineBaseMetaTags({
		titleTemplate: `%s | ${siteName}`,
		openGraph: { type: 'website', siteName },
		twitter: { cardType: 'summary' }
	});
