<script lang="ts">
	import { homePath } from '#lib/paths.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { filter } from '#lib/filter.svelte.js';
	import { siteName, t } from '#lib/i18n.js';
	import logo from '#lib/assets/logo.svg';
	import type { LayoutProps } from './$types';

	let { children, params }: LayoutProps = $props();

	let other = $derived(params.lang === 'en' ? 'ja' : 'en');
	// 同じページの別言語版。pathname は base を含むのでそのまま使える
	let otherHref = $derived(page.url.pathname.replace(`/${params.lang}/`, `/${other}/`));
	// <html lang> は prerender 時に hooks.server.ts が入れる。言語切替はクライアント側の遷移なので、ここで追従させる
	$effect(() => {
		document.documentElement.lang = params.lang;
	});

	// 結果は一覧ページにしか出ないので、ほかのページで打ち始めたら一覧へ移る。
	// reset: false でフォーカスを検索欄に残す（スクロールも残るので先頭へは自分で戻す）
	const toList = () => {
		const home = homePath(params.lang);
		if (page.url.pathname !== home) goto(home, { reset: false }).then(() => scrollTo(0, 0));
	};
</script>

<header>
	<a class="site-name" href={homePath(params.lang)}>
		<img src={logo} alt="" width="28" height="28" />{siteName}
	</a>
	<search>
		<label>
			<span class="visually-hidden">{t(params.lang).search}</span>
			<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
				<circle cx="11" cy="11" r="7" />
				<path d="m20 20-4-4" />
			</svg>
			<input
				type="search"
				autocomplete="off"
				placeholder={t(params.lang).search}
				bind:value={filter.query}
				oninput={toList}
			/>
		</label>
	</search>
	<a href={otherHref} hreflang={other} lang={other}>{t(params.lang).switchLang}</a>
</header>

<main>
	{@render children()}
</main>

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

	search {
		flex: 0 1 24rem;
	}

	label {
		position: relative;
		display: block;
	}

	svg {
		position: absolute;
		top: 50%;
		left: 0.75rem;
		translate: 0 -50%;
		fill: none;
		stroke: var(--color-muted);
		stroke-width: 2;
		stroke-linecap: round;
		pointer-events: none;
	}

	input {
		width: 100%;
		padding: 0.4em 0.75em 0.4em 2.25rem;
		border: 1px solid var(--color-muted);
		border-radius: 999px;
		background: var(--color-surface);
	}

	input::placeholder {
		color: var(--color-muted);
	}

	/* 狭い画面ではロゴと言語切替を 1 行目に残し、検索欄を 2 行目に全幅で置く */
	@media (max-width: 40rem) {
		search {
			flex-basis: 100%;
			order: 1;
		}
	}

	main {
		max-width: 72rem;
		margin: 0 auto;
		padding: 1.5rem 1rem 4rem;
	}
</style>
