<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Breadcrumb',
			trail: ['Home', 'Shoes', 'Running shoes'],
			would: (page: string) => `A real site would open “${page}”`
		},
		ja: {
			label: 'パンくずリスト',
			trail: ['ホーム', '靴', 'ランニングシューズ'],
			would: (page: string) => `実際のサイトでは「${page}」へ移動します`
		}
	};

	const uid = $props.id();
	let clicked = $state('');
</script>

<div class="demo">
	<nav id={uid} aria-label={text[lang].label}>
		<ol>
			{#each text[lang].trail as page, i (page)}
				<li>
					{#if i < text[lang].trail.length - 1}
						<!-- デモなので移動はせず、行き先を表示する（href は prerender の存在チェックを通すため自身の nav を指す） -->
						<a
							href="#{uid}"
							onclick={(e) => {
								e.preventDefault();
								clicked = page;
							}}>{page}</a
						>
					{:else}
						<a href="#{uid}" aria-current="page" onclick={(e) => e.preventDefault()}>{page}</a>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>
	<p role="status">{clicked ? text[lang].would(clicked) : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
	}

	ol {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li + li::before {
		content: '/';
		margin: 0 0.5em;
		color: var(--color-muted);
	}

	[aria-current='page'] {
		color: inherit;
		text-decoration: none;
	}

	p {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
