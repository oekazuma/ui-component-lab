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
			<!-- 虫眼鏡は飾りで、欄の名前はラベルが持つので読み上げから外す。形は DADS 実装例の検索アイコン -->
			<span class="field">
				<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
					<path
						d="m21 20.5-6-6a7.4 7.4 0 0 0 1.9-5A7.4 7.4 0 0 0 9.5 2 7.5 7.5 0 1 0 14 15.5l6 6 1-1ZM3.5 9.5a6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6Z"
						fill="currentcolor"
					/>
				</svg>
				<input id="{uid}-input" type="search" bind:value />
			</span>
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

	.field {
		position: relative;
		display: flex;
		flex: 1;
		min-width: 0;
	}

	svg {
		position: absolute;
		top: 50%;
		left: 0.6rem;
		color: var(--color-muted);
		translate: 0 -50%;
		pointer-events: none;
	}

	input {
		flex: 1;
		min-width: 0;
		padding: 0.4em 0.5em 0.4em 2.2rem;
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
