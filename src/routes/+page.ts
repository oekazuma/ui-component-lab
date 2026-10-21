import { definePageMetaTags } from 'svelte-meta-tags';
import { siteName } from '#lib/i18n.js';

export const load = () => definePageMetaTags({ title: siteName, titleTemplate: '%s' });
