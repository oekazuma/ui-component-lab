import { langs } from '#lib/types.js';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => langs.map((lang) => ({ lang }));
