<script lang="ts">
	import { homePath } from '#lib/paths.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { filter } from '#lib/filter.svelte.js';
	import { t } from '#lib/i18n.js';
	import LangSwitcher from '#lib/LangSwitcher.svelte';
	import SiteFooter from '#lib/SiteFooter.svelte';
	import SiteHeader from '#lib/SiteHeader.svelte';
	import ThemeToggle from '#lib/ThemeToggle.svelte';
	import type { LayoutProps } from './$types';

	let { children, params }: LayoutProps = $props();

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

<!-- 一覧ページはデモごとに操作できる部品があり、ヘッダーの先へ進むまでに何度も Tab を押すので、先頭に飛ばす手段を置く -->
<a class="skip" href="#main">{t(params.lang).skipToContent}</a>

<SiteHeader home={homePath(params.lang)}>
	<search>
		<label>
			<span class="visually-hidden">{t(params.lang).search}</span>
			<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
				<circle cx="11" cy="11" r="7" />
				<path d="m20 20-4-4" />
			</svg>
			<input
				id="site-search"
				type="search"
				autocomplete="off"
				placeholder={t(params.lang).search}
				bind:value={filter.query}
				oninput={toList}
			/>
		</label>
	</search>
	<div class="actions">
		<ThemeToggle label={t(params.lang).darkMode} />
		<LangSwitcher lang={params.lang} label={t(params.lang).language} />
	</div>
</SiteHeader>

<main id="main" tabindex="-1">
	{@render children()}
</main>

<SiteFooter lang={params.lang} />

<style>
	.actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	search {
		flex: 0 1 24rem;
	}

	label {
		position: relative;
		display: block;
	}

	label svg {
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

	/* フォーカスが来たときだけ画面に出す */
	.skip {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		z-index: 1;
		padding: 0.5rem 1rem;
		border-radius: var(--radius);
		background: var(--color-bg);
		translate: 0 -200%;
	}

	.skip:focus {
		translate: 0;
	}

	/* スキップリンクで移ったときのフォーカス先。読み始める位置を示すだけなので枠は出さない */
	main:focus {
		outline: none;
		box-shadow: none;
	}

	main {
		max-width: 72rem;
		margin: 0 auto;
		padding: 1.5rem 1rem 4rem;
	}
</style>
