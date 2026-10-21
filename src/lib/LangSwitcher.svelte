<script lang="ts">
	import { page } from '$app/state';
	import { langs, type Lang } from './types';

	let { lang, label }: { lang: Lang; label: string } = $props();

	const names: Record<Lang, string> = { en: 'English', ja: '日本語' };
	const uid = $props.id();
	let open = $state(false);
	let wrap: HTMLDivElement;
	let button: HTMLButtonElement;

	// 同じページの別言語版。pathname は base を含むのでそのまま使える
	const hrefIn = (l: Lang) => page.url.pathname.replace(`/${lang}/`, `/${l}/`);

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			open = false;
			button.focus();
		}
	}

	// 開いている間だけ、一覧の外を押したら閉じる
	$effect(() => {
		if (!open) return;
		const onpointerdown = (e: PointerEvent) => {
			if (!wrap.contains(e.target as Node)) open = false;
		};
		document.addEventListener('pointerdown', onpointerdown);
		return () => document.removeEventListener('pointerdown', onpointerdown);
	});
</script>

<!-- WAI-ARIA APG の Disclosure Navigation。項目はページへのリンクなので role="menu" は使わない。
	一覧は閉じても HTML に残し（hidden）、prerender のクロールがもう一方の言語のページを辿れるようにする -->
<div
	bind:this={wrap}
	class="wrap"
	onfocusout={(e) => {
		if (!wrap.contains(e.relatedTarget as Node)) open = false;
	}}
>
	<button
		bind:this={button}
		type="button"
		aria-expanded={open}
		aria-controls="{uid}-list"
		onclick={() => (open = !open)}
		{onkeydown}
	>
		<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
			<circle cx="12" cy="12" r="9" />
			<path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
		</svg>
		<span class="visually-hidden">{label}:</span>
		<span class="current">{names[lang]}</span>
		<svg class="chevron" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
			<path d="M3 4.5 6 7.5 9 4.5" />
		</svg>
	</button>
	<ul id="{uid}-list" hidden={!open}>
		{#each langs as l (l)}
			<li>
				<a
					href={hrefIn(l)}
					hreflang={l}
					lang={l}
					aria-current={l === lang ? 'true' : undefined}
					onclick={() => (open = false)}
					{onkeydown}
				>
					{names[l]}
					{#if l === lang}
						<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" /></svg>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.wrap {
		position: relative;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		height: 2.25rem;
		padding: 0 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-bg);
		color: var(--color-text);
		font-size: 0.9375rem;
		cursor: pointer;
	}

	button:hover {
		background: var(--color-surface);
	}

	svg {
		flex-shrink: 0;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.75;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	/* 狭い画面では言語名まで出すとロゴと同じ行に収まらないので、見た目だけ隠す（読み上げには残す） */
	@media (max-width: 40rem) {
		.current {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
		}
	}

	[aria-expanded='true'] .chevron {
		rotate: 180deg;
	}

	ul {
		position: absolute;
		top: calc(100% + 0.375rem);
		right: 0;
		z-index: 10;
		min-width: 9rem;
		margin: 0;
		padding: 0.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
		list-style: none;
	}

	a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.4rem 0.75rem;
		border-radius: calc(var(--radius) - 2px);
		color: var(--color-text);
		text-decoration: none;
	}

	a:hover {
		background: var(--color-surface);
	}

	[aria-current] {
		font-weight: 700;
	}
</style>
