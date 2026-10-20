<script lang="ts">
	import { onMount } from 'svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { reload: 'Reload', name: 'Aiko Tanaka', bio: 'Designer in Osaka. Likes coffee and typography.' },
		ja: { reload: '再読み込み', name: '田中 愛子', bio: '大阪のデザイナー。コーヒーと文字組みが好き。' }
	};

	let loading = $state(true);
	let timer: ReturnType<typeof setTimeout>;

	function load() {
		loading = true;
		clearTimeout(timer);
		timer = setTimeout(() => (loading = false), 1500);
	}

	onMount(() => {
		load();
		return () => clearTimeout(timer);
	});
</script>

<div class="demo">
	<!-- 読み込み中は aria-busy にし、灰色の図形は支援技術から隠す -->
	<div class="profile" aria-busy={loading}>
		{#if loading}
			<span class="bone avatar" aria-hidden="true"></span>
			<span class="lines" aria-hidden="true">
				<span class="bone line short"></span>
				<span class="bone line"></span>
			</span>
		{:else}
			<span class="avatar filled" aria-hidden="true">{text[lang].name.at(0)}</span>
			<span class="lines">
				<strong>{text[lang].name}</strong>
				<span>{text[lang].bio}</span>
			</span>
		{/if}
	</div>
	<button type="button" class="btn" onclick={load}>{text[lang].reload}</button>
</div>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
		width: min(100%, 18rem);
	}

	.profile {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		min-height: 3.5rem;
	}

	.avatar {
		flex: none;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
	}

	.filled {
		display: grid;
		place-items: center;
		background: var(--color-accent);
		color: var(--color-accent-text);
		font-weight: 700;
	}

	.lines {
		display: grid;
		flex: 1;
		gap: 0.4rem;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.bone {
		background: linear-gradient(90deg, #e3e6eb 25%, #eef0f3 50%, #e3e6eb 75%) 0 0 / 200% 100%;
		animation: shimmer 1.2s linear infinite;
	}

	.line {
		height: 0.75rem;
		border-radius: 4px;
	}

	.short {
		width: 50%;
	}

	@keyframes shimmer {
		to {
			background-position: -200% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.bone {
			animation: none;
		}
	}
</style>
