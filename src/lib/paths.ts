import { resolve } from '$app/paths';
import type { Lang } from './types';

// resolve() は末尾スラッシュを付けないため、trailingSlash: 'always' の正規 URL に揃える
export const homePath = (lang: Lang) => `${resolve('/[lang=lang]', { lang })}/`;

export const systemsPath = (lang: Lang) => `${resolve('/[lang=lang]/systems', { lang })}/`;

export const componentPath = (lang: Lang, id: string) =>
	`${resolve('/[lang=lang]/components/[id]', { lang, id })}/`;
