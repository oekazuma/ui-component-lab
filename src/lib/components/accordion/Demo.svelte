<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: [
			['Shipping', 'Orders ship within 2 business days.'],
			['Returns', 'Returns are accepted within 30 days.'],
			['Payment', 'Cards and bank transfer are accepted.']
		],
		ja: [
			['配送について', 'ご注文から2営業日以内に発送します。'],
			['返品について', '30日以内であれば返品できます。'],
			['お支払いについて', 'カードと銀行振込が使えます。']
		]
	};

	const uid = $props.id();
	let open = $state([false, false, false]);
</script>

<div class="accordion">
	{#each text[lang] as [title, body], i (title)}
		<h3>
			<button
				type="button"
				id="{uid}-header-{i}"
				aria-expanded={open[i]}
				aria-controls="{uid}-panel-{i}"
				onclick={() => (open[i] = !open[i])}
			>
				<span>{title}</span>
				<span class="icon" aria-hidden="true">{open[i] ? '−' : '+'}</span>
			</button>
		</h3>
		<div role="region" id="{uid}-panel-{i}" aria-labelledby="{uid}-header-{i}" hidden={!open[i]}>
			{body}
		</div>
	{/each}
</div>

<style>
	.accordion {
		width: min(100%, 22rem);
		border-top: 1px solid var(--color-border);
	}

	h3 {
		margin: 0;
		font-size: 1rem;
	}

	button {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0.5rem 0.25rem;
		border: 0;
		border-bottom: 1px solid var(--color-border);
		background: none;
		text-align: left;
		cursor: pointer;
	}

	.icon {
		color: var(--color-muted);
	}

	[role='region'] {
		padding: 0.5rem 0.25rem;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.9375rem;
	}
</style>
