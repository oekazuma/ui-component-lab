<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Notifications', unread: (n: number) => `Notifications, ${n} unread` },
		ja: { label: '通知', unread: (n: number) => `通知 ${n}件の未読` }
	};

	let count = $state(3);
</script>

<!-- 件数はボタンの名前に含め、バッジ自体は見た目だけにする -->
<button
	type="button"
	class="btn"
	aria-label={count ? text[lang].unread(count) : text[lang].label}
	onclick={() => (count = 0)}
>
	<span aria-hidden="true">🔔</span>
	{text[lang].label}
	{#if count}
		<span class="badge" aria-hidden="true">{count}</span>
	{/if}
</button>

<style>
	.btn {
		position: relative;
	}

	.badge {
		position: absolute;
		top: -0.5rem;
		right: -0.5rem;
		min-width: 1.25rem;
		height: 1.25rem;
		padding: 0 0.3rem;
		border-radius: 999px;
		background: var(--color-danger);
		color: #fff;
		font-size: 0.875rem;
		font-weight: 700;
		line-height: 1.25rem;
		text-align: center;
	}
</style>
