<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: [
			['Name', 'Taro Yamada'],
			['Date of birth', 'April 1, 1990'],
			['Email', 'taro@example.com'],
			['Address', '1-2-3 Kasumigaseki, Chiyoda-ku, Tokyo']
		],
		ja: [
			['氏名', '山田 太郎'],
			['生年月日', '1990年4月1日'],
			['メールアドレス', 'taro@example.com'],
			['住所', '東京都千代田区霞が関1-2-3']
		]
	};
</script>

<!-- <dl> の dt（項目名）と dd（値）の組で書くと、スクリーンリーダーが組として扱える -->
<dl>
	{#each text[lang] as [term, value] (term)}
		<div>
			<dt>{term}</dt>
			<dd>{value}</dd>
		</div>
	{/each}
</dl>

<style>
	dl {
		width: min(100%, 24rem);
		margin: 0;
	}

	div {
		display: grid;
		grid-template-columns: 8rem 1fr;
		gap: 0.5rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	dt {
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	dd {
		margin: 0;
	}
</style>
