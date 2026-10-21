<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Breadcrumb',
			trail: [
				'Home',
				'Procedures',
				'Moving and address changes',
				'Notice of moving in',
				'How to give notice when you move in from another city, and what to bring'
			],
			would: (page: string) => `A real site would open “${page}”`
		},
		ja: {
			label: 'パンくずリスト',
			trail: [
				'ホーム',
				'手続き',
				'引越し・住所変更',
				'転入届',
				'ほかの市区町村から引っ越してきたときの転入届の出し方と必要なもの'
			],
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
						<!-- 今のページへのリンクは押しても何も起きないので、リンクにしない（DADS 実装、NN/g） -->
						<span aria-current="page">{page}</span>
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

	/* 項目を文中の文字のように流し、長い名前は項目の途中でも折り返す（DADS 実装） */
	ol {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: inline;
	}

	li + li::before {
		content: '/';
		margin: 0 0.5em;
		color: var(--color-muted);
	}


	p {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
