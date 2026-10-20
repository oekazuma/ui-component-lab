import { defineParams } from '@sveltejs/kit/params';

// このファイルはビルド時に Node が直接読み込むため、#lib からは import しない（src/lib/types.ts の langs と揃える）
export const params = defineParams({
	lang: (param): 'en' | 'ja' | undefined => (param === 'en' || param === 'ja' ? param : undefined)
});
