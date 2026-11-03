<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			site: 'Sample Library',
			label: 'Main',
			pages: [
				{ id: 'home', name: 'Home' },
				{ id: 'books', name: 'Books' },
				{ id: 'events', name: 'Events' },
				{ id: 'contact', name: 'Contact us' }
			],
			body: 'The content of this page appears here.',
			now: (page: string) => `Current page: ${page}`
		},
		ja: {
			site: 'サンプル図書館',
			label: 'メイン',
			pages: [
				{ id: 'home', name: 'ホーム' },
				{ id: 'books', name: '本を探す' },
				{ id: 'events', name: 'イベント' },
				{ id: 'contact', name: 'お問い合わせ' }
			],
			body: 'このページの内容がここに表示されます。',
			now: (page: string) => `現在のページ: ${page}`
		}
	};

	const uid = $props.id();
	let current = $state('home');
	// 見出しの変化は画面を見ていないと分からないので、選んだページを読み上げさせる。最初は空にして、選ぶまで読み上げない
	let announced = $state('');

	const currentName = $derived(text[lang].pages.find((page) => page.id === current)!.name);
</script>

<!-- デモなので移動はせず、今のページを切り替える（href は prerender の存在チェックを通すため枠を指す）。
	サイト名のリンクはホームへ戻るだけなので aria-current は付けず、ナビゲーションの「ホーム」と二重にしない -->
{#snippet link(id: string, name: string, mark: boolean)}
	<a
		href="#{uid}"
		aria-current={mark && id === current ? 'page' : undefined}
		onclick={(e) => {
			e.preventDefault();
			current = id;
			announced = text[lang].now(text[lang].pages.find((page) => page.id === id)!.name);
		}}>{name}</a
	>
{/snippet}

<!-- このデモはページの <main> の中にあるので、<header> は banner のランドマークにならない（サイト自身の banner が別にある）。
	role も aria-label も付けない。ランドマークにならない <header> には名前を付けられない -->
<div id={uid} class="demo">
	<header>
		<em class="site">{@render link('home', text[lang].site, false)}</em>
		<nav aria-label={text[lang].label}>
			<ul>
				{#each text[lang].pages as page (page.id)}
					<li>{@render link(page.id, page.name, true)}</li>
				{/each}
			</ul>
		</nav>
	</header>
	<div class="content">
		<h3>{currentName}</h3>
		<p>{text[lang].body}</p>
	</div>
	<p role="status">{announced}</p>
</div>

<style>
	.demo {
		width: min(100%, 36rem);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	/* 固定にしない。フォーカスが来た項目を覆うと、キーボードの利用者に見えなくなる（WCAG 2.4.11） */
	header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem 1.5rem;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--color-border);
		border-radius: var(--radius) var(--radius) 0 0;
		background: var(--color-surface);
	}

	/* ロゴは <h1> ではなく <em> にする（U.S. Web Design System）。斜体にはしない */
	.site {
		font-style: normal;
		font-weight: 700;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		display: inline-flex;
		align-items: center;
		min-height: 2.5rem;
		border-bottom: 3px solid transparent;
		color: var(--color-text);
	}

	/* 現在のページは色だけで示さない: 下線を太くし、太字にする */
	[aria-current='page'] {
		border-bottom-color: var(--color-accent);
		font-weight: 700;
	}

	.content {
		padding: 0 0.75rem 0.75rem;
	}

	h3 {
		margin: 0.75rem 0 0;
		font-size: 1rem;
	}

	p {
		margin: 0.25rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	[role='status'] {
		min-height: 1.6em;
		margin: 0;
		padding: 0 0.75rem 0.5rem;
	}
</style>
