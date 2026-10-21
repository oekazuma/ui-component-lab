<script lang="ts">
	import type { Snippet } from 'svelte';

	let { href, label, children }: { href: string; label: string; children: Snippet } = $props();
</script>

<!-- 同じタブで開く。行き先が外部サイトであることだけを、矢印と読み上げ用の文で伝える -->
<a {href}
	>{@render children()}<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
		<path d="M4.5 2.5h5v5M9.5 2.5 3 9" />
	</svg><span class="visually-hidden">{label}</span></a
>

<style>
	svg {
		margin-left: 0.2em;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
	}
</style>
