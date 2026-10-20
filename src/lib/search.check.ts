// 表記ゆれ正規化の最小チェック: node src/lib/search.check.ts
import { normalize } from './search.ts';

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
console.log('ok');
