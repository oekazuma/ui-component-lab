// 表記ゆれ正規化の最小チェック: node src/lib/search.check.ts
import { matchedAlias, normalize, type SearchItem } from './search.ts';

for (const [input, expected] of [
	['ﾓｰﾀﾞﾙ', 'もだる'],
	['もーだる', 'もだる'],
	['DROP DOWN', 'dropdown'],
	['date-picker', 'datepicker'],
	['トグル・ボタン', 'とぐるぼたん'],
	['ＴＯＧＧＬＥ', 'toggle']
]) {
	if (normalize(input) !== expected) throw new Error(`${input} -> ${normalize(input)}`);
}

// 名前で一致したときは別名を返さず、別名でだけ一致したときにその別名を返す
const toast = {
	id: 'toast',
	names: { en: 'Toast', ja: 'トースト' },
	category: 'feedback',
	aliases: [{ name: 'Snackbar' }]
} satisfies SearchItem;
for (const [query, expected] of [
	['snack', 'Snackbar'],
	['トースト', undefined],
	['toast', undefined],
	['', undefined],
	['zzz', undefined]
] as const) {
	if (matchedAlias(toast, query) !== expected) throw new Error(`matchedAlias(${query}) -> ${matchedAlias(toast, query)}`);
}
console.log('ok');
