<script lang="ts">
	import type { Snippet } from 'svelte';
	import { siteName } from './i18n';
	import logo from './assets/logo.svg';

	let { home, children }: { home: string; children: Snippet } = $props();
</script>

<header>
	<a class="site-name" href={home}>
		<img src={logo} alt="" width="28" height="28" />{siteName}
	</a>
	{@render children()}
</header>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem 1rem;
		max-width: 72rem;
		margin: 0 auto;
		padding: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.site-name {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: inherit;
		font-weight: 700;
		text-decoration: none;
	}
</style>
