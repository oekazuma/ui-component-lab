<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			sections: [
				['Account', 'Name, email and password.'],
				['Notifications', 'Choose which emails you receive.']
			],
			links: ['Help', 'Terms', 'Privacy']
		},
		ja: {
			sections: [
				['アカウント', '名前、メールアドレス、パスワード。'],
				['通知', '受け取るメールを選びます。']
			],
			links: ['ヘルプ', '利用規約', 'プライバシー']
		}
	};

	const uid = $props.id();
</script>

<!-- 話題の区切りには <hr>（role="separator"）を使う。リンクの間の縦線は飾りなので読み上げさせない。
	デモなのでリンクは移動しない（href は prerender の存在チェックを通すため自身を指す） -->
<div class="demo" id={uid}>
	{#each text[lang].sections as [title, body], i (title)}
		{#if i > 0}<hr />{/if}
		<section>
			<h3>{title}</h3>
			<p>{body}</p>
		</section>
	{/each}
	<hr />
	<p class="links">
		{#each text[lang].links as link, i (link)}
			{#if i > 0}<span class="vr" aria-hidden="true"></span>{/if}
			<a href="#{uid}" onclick={(e) => e.preventDefault()}>{link}</a>
		{/each}
	</p>
</div>

<style>
	.demo {
		width: min(100%, 20rem);
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	h3 {
		margin: 0;
		font-size: 1rem;
	}

	p {
		margin: 0.25rem 0;
		font-size: 0.875rem;
	}

	hr {
		margin: 1rem 0;
		border: 0;
		border-top: 1px solid var(--color-border);
	}

	.links {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.vr {
		align-self: stretch;
		border-left: 1px solid var(--color-border);
	}
</style>
