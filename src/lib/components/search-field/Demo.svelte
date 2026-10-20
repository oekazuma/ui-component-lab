<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Search the site', button: 'Search', result: (q: string) => `Searched for “${q}”` },
		ja: { label: 'サイト内検索', button: '検索', result: (q: string) => `「${q}」で検索しました` }
	};

	const uid = $props.id();
	let value = $state('');
	let searched = $state('');
</script>

<!-- <search> が検索のランドマークになる。type="search" は Esc で入力を消せる（ブラウザによる） -->
<search class="demo">
	<form
		onsubmit={(e) => {
			e.preventDefault();
			searched = value.trim();
		}}
	>
		<label for="{uid}-input">{text[lang].label}</label>
		<div class="row">
			<input id="{uid}-input" type="search" bind:value />
			<button type="submit" class="btn btn-primary">{text[lang].button}</button>
		</div>
	</form>
	<p aria-live="polite">{searched ? text[lang].result(searched) : ''}</p>
</search>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 20rem);
	}

	form {
		display: grid;
		gap: 0.25rem;
	}

	label {
		font-size: 0.875rem;
	}

	.row {
		display: flex;
		gap: 0.25rem;
	}

	input {
		flex: 1;
		min-width: 0;
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	p {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
