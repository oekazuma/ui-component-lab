import { definePageMetaTags } from 'svelte-meta-tags';
import { t } from '#lib/i18n.js';
import { langs } from '#lib/types.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => langs.map((lang) => ({ lang }));

export const load: PageLoad = ({ data, params }) => ({
	...data,
	...definePageMetaTags({ title: t(params.lang).systems, description: t(params.lang).systemsLead })
});
