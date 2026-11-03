<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// 日付はビルドのたびに変わらないよう、Date から作らず固定の値にする
	const events = [
		{ at: '2026-11-01', state: 'done' },
		{ at: '2026-11-02', state: 'done' },
		{ at: '2026-11-04', state: 'problem' },
		{ at: '2026-11-05', state: 'scheduled' }
	] as const;

	const text = {
		en: {
			title: 'Order history',
			order: 'Oldest first',
			states: { done: 'Done', problem: 'Needs attention', scheduled: 'Scheduled' },
			dates: ['Nov 1, 2026', 'Nov 2, 2026', 'Nov 4, 2026', 'Nov 5, 2026'],
			items: [
				['Order placed', 'We received your order.'],
				['Shipped', 'The parcel left the Osaka warehouse.'],
				['Delivery attempt failed', 'No one was home. A notice was left in the mailbox.'],
				['Redelivery', 'Planned for the evening.']
			]
		},
		ja: {
			title: '注文の履歴',
			order: '古い順',
			states: { done: '完了', problem: '要対応', scheduled: '予定' },
			dates: ['2026年11月1日', '2026年11月2日', '2026年11月4日', '2026年11月5日'],
			items: [
				['注文を受け付けました', 'ご注文を受け付けました。'],
				['発送しました', '大阪の倉庫から荷物を出しました。'],
				['配達できませんでした', 'ご不在でした。不在票をポストに入れました。'],
				['再配達', '夕方に配達する予定です。']
			]
		}
	};

	const uid = $props.id();
</script>

<!-- 線と丸は飾りなので、丸は aria-hidden で読み上げから外し、線は疑似要素にして DOM に出さない。
	丸はどれも同じ見た目にして、状態は各項目の文字（完了・要対応・予定）だけで伝える。
	list-style: none の <ol> は Safari でリストとして扱われなくなるので role="list" を付ける -->
<div class="demo">
	<h3 id="{uid}-title">{text[lang].title}</h3>
	<p class="order">{text[lang].order}</p>
	<ol role="list" aria-labelledby="{uid}-title">
		{#each events as { at, state }, i (at)}
			<li class={state}>
				<span class="marker" aria-hidden="true"></span>
				<p class="date"><time datetime={at}>{text[lang].dates[i]}</time></p>
				<p class="title">{text[lang].items[i][0]} <span class="state">{text[lang].states[state]}</span></p>
				<p class="note">{text[lang].items[i][1]}</p>
			</li>
		{/each}
	</ol>
</div>

<style>
	.demo {
		width: min(100%, 28rem);
	}

	h3 {
		margin: 0;
		font-size: 1rem;
	}

	p {
		margin: 0;
		overflow-wrap: anywhere;
	}

	.order {
		margin-bottom: 0.75rem;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	ol {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		position: relative;
		padding: 0 0 1.25rem 1.75rem;
	}

	/* 次の丸の上端までつなぐ。最後の項目には線を引かない */
	li:not(:last-child)::before {
		content: '';
		position: absolute;
		top: 1.2rem;
		bottom: -0.3rem;
		left: 0.375rem;
		width: 2px;
		background: var(--color-border);
	}

	.marker {
		position: absolute;
		top: 0.2rem;
		left: 0;
		box-sizing: border-box;
		width: 0.875rem;
		height: 0.875rem;
		border: 2px solid var(--color-accent);
		border-radius: 50%;
		background: var(--color-accent);
	}

	.date {
		color: var(--color-muted);
		font-size: 0.8125rem;
	}

	.title {
		font-weight: 700;
	}

	.state {
		display: inline-block;
		margin-left: 0.25rem;
		padding: 0 0.4rem;
		border: 1px solid currentColor;
		border-radius: var(--radius);
		font-size: 0.75rem;
		font-weight: 400;
	}

	.done .state {
		background: var(--color-success-surface);
		color: var(--color-success-on-surface);
	}

	.problem .state {
		background: var(--color-danger-surface);
		color: var(--color-danger-on-surface);
	}

	.scheduled .state {
		color: var(--color-muted);
	}

	.note {
		font-size: 0.875rem;
	}
</style>
