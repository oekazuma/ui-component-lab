<script lang="ts">
	import ExternalLink from './ExternalLink.svelte';
	import { t } from './i18n';
	import { systemsPath } from './paths';
	import type { Lang } from './types';

	let { lang }: { lang: Lang } = $props();
	let ui = $derived(t(lang));

	const repo = 'https://github.com/oekazuma/ui-component-lab';
</script>

<footer>
	<p>{ui.sourcesNote}</p>
	<ul>
		<li><a href={systemsPath(lang)}>{ui.systems}</a></li>
		<li><ExternalLink href={repo} label={ui.external}>{ui.repository}</ExternalLink></li>
		<li><ExternalLink href="{repo}/blob/main/LICENSE" label={ui.external}>{ui.license}</ExternalLink></li>
	</ul>
</footer>

<style>
	footer {
		max-width: 72rem;
		margin: 0 auto;
		padding: 1.5rem 1rem 3rem;
		border-top: 1px solid var(--color-border);
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	p {
		margin: 0 0 0.75rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
