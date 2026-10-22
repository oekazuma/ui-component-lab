<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			body: 'Bring one document that shows who you are when you come to the counter.',
			title: 'Examples of ID documents',
			items: ['Driver’s licence', 'Passport', 'My Number Card']
		},
		ja: {
			body: '窓口に来るときは、本人であることが分かる書類を1つ持ってきてください。',
			title: '本人確認書類の例',
			items: ['運転免許証', 'パスポート', 'マイナンバーカード']
		}
	};
</script>

<!-- 読み上げで割り込む必要のない補足なので、live region にはせず、ページの内容として順に読ませる -->
<div class="demo">
	<p>{text[lang].body}</p>
	<div class="callout">
		<!-- ページの見出しの構成に項目を増やさないよう、タイトルは見出しにしない -->
		<p class="title">{text[lang].title}</p>
		<ul>
			{#each text[lang].items as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.75rem;
		width: min(100%, 24rem);
	}

	p {
		margin: 0;
	}

	.callout {
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.title {
		font-weight: 700;
	}

	ul {
		margin: 0.25rem 0 0;
		padding-left: 1.25rem;
	}
</style>
