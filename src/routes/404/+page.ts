import { definePageMetaTags } from 'svelte-meta-tags';

// GitHub Pages はルートの 404.html だけを見るので、404/index.html ではなく 404.html を出力する
export const trailingSlash = 'never';

export const load = () => definePageMetaTags({ title: '404', robots: 'noindex' });
