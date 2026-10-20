<script lang="ts">
	import { componentPath } from '#lib/paths.js';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { before: 'To run an action instead of moving to a page, use a ', link: 'button', after: '.' },
		ja: { before: 'ページを移動せずに操作を実行するときは', link: 'ボタン', after: 'を使います。' }
	};
</script>

<!-- ネイティブの <a href> が移動・新しいタブで開く・履歴を受け持つ。リンク先はこのサイトのボタンのページ -->
<p>
	{text[lang].before}<a href={componentPath(lang, 'button')}>{text[lang].link}</a>{text[lang].after}
</p>

<style>
	p {
		max-width: 20rem;
		margin: 0;
	}
</style>
