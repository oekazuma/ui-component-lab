import { components } from '#lib/server/components.js';
import type { PageServerLoad } from './$types';

// 対応表に要るのは名前と別名だけ
export const load: PageServerLoad = () => ({
	rows: components.map(({ id, names, aliases }) => ({ id, names, aliases }))
});
