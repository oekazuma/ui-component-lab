<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			summary: 'Where can I find my order number?',
			body: 'It is in the confirmation email, next to the order date.'
		},
		ja: {
			summary: '注文番号はどこで確認できますか？',
			body: '確認メールの注文日の横に記載しています。'
		}
	};
</script>

<!-- ネイティブの <details> が開閉・キー操作・スクリーンリーダーへの状態通知を持つ -->
<details>
	<summary>{text[lang].summary}</summary>
	<p>{text[lang].body}</p>
</details>

<style>
	details {
		width: min(100%, 20rem);
	}

	summary {
		color: var(--color-accent);
		cursor: pointer;
	}

	p {
		margin: 0.5rem 0 0;
		padding-left: 0.75rem;
		border-left: 4px solid var(--color-border);
		font-size: 0.9375rem;
	}
</style>
