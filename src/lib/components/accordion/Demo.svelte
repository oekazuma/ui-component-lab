<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// 見出しは中身を要約した質問の形にする（DADS アコーディオン）
	const text = {
		en: {
			shipping: ['How long does shipping take?', 'Orders ship within 2 business days.'],
			returns: ['Can I return an item?', 'Returns are accepted within 30 days of delivery.', 'Request a return'],
			payment: ['How can I pay?', 'You can use any of these:', ['Credit card', 'Bank transfer', 'Convenience store payment']]
		},
		ja: {
			shipping: ['発送までどのくらいかかりますか？', 'ご注文から2営業日以内に発送します。'],
			returns: ['返品はできますか？', 'お届けから30日以内であれば返品できます。', '返品を申し込む'],
			payment: ['どの支払い方法が使えますか？', '次の方法が使えます。', ['クレジットカード', '銀行振込', 'コンビニ払い']]
		}
	} as const;

	const uid = $props.id();
	// 先頭だけを開いておくと、ほかの項目も同じように畳まれていて開けることが伝わる（DADS アコーディオン）
	let open = $state([true, false, false]);
	let t = $derived(text[lang]);
	let sections = $derived([t.shipping[0], t.returns[0], t.payment[0]]);
</script>

<div class="accordion">
	{#each sections as title, i (title)}
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
		<!-- デモなのでリンクは移動しない（href は prerender の存在チェックを通すため自身を指す） -->
		<div role="region" id="{uid}-panel-{i}" aria-labelledby="{uid}-header-{i}" hidden={!open[i]}>
			{#if i === 0}
				<p>{t.shipping[1]}</p>
			{:else if i === 1}
				<p>{t.returns[1]}</p>
				<p><a href="#{uid}-panel-1" onclick={(e) => e.preventDefault()}>{t.returns[2]}</a></p>
			{:else}
				<p>{t.payment[1]}</p>
				<ul>
					{#each t.payment[2] as method (method)}
						<li>{method}</li>
					{/each}
				</ul>
			{/if}
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

	p,
	ul {
		margin: 0;
	}

	p + p,
	p + ul {
		margin-top: 0.25rem;
	}

	ul {
		padding-left: 1.25rem;
	}
</style>
