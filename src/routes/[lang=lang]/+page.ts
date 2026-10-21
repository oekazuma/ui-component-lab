import { definePageMetaTags } from 'svelte-meta-tags';
import { siteName, t } from '#lib/i18n.js';
import { langs } from '#lib/types.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => langs.map((lang) => ({ lang }));

export const load: PageLoad = ({ params }) =>
	definePageMetaTags({ title: siteName, titleTemplate: '%s', description: t(params.lang).tagline });
