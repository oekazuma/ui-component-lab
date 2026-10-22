import { definePageMetaTags } from 'svelte-meta-tags';
import { t } from '#lib/i18n.js';
import { langs } from '#lib/types.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => langs.map((lang) => ({ lang }));

export const load: PageLoad = ({ params }) =>
	definePageMetaTags({ title: t(params.lang).skill, description: t(params.lang).skillLead });
