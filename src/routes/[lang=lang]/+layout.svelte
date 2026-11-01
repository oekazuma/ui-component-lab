<script lang="ts">
	import { homePath } from '#lib/paths.js';
	import { t } from '#lib/i18n.js';
	import LangSwitcher from '#lib/LangSwitcher.svelte';
	import SearchPalette from '#lib/SearchPalette.svelte';
	import SiteFooter from '#lib/SiteFooter.svelte';
	import SiteHeader from '#lib/SiteHeader.svelte';
	import ThemeToggle from '#lib/ThemeToggle.svelte';
	import type { LayoutProps } from './$types';

	let { children, params, data }: LayoutProps = $props();

	// <html lang> は prerender 時に hooks.server.ts が入れる。言語切替はクライアント側の遷移なので、ここで追従させる
	$effect(() => {
		document.documentElement.lang = params.lang;
	});
</script>

<!-- ヘッダーには検索・テーマ・言語のボタンが並ぶので、本文へ先に移る手段を置く -->
<a class="skip" href="#main">{t(params.lang).skipToContent}</a>

<SiteHeader home={homePath(params.lang)}>
	<search>
		<SearchPalette lang={params.lang} items={data.searchItems} />
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
