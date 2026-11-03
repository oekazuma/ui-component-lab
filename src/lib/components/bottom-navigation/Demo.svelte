<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// 24px の枠に収まる線画のアイコン。名前はラベルが受け持つので、アイコンは読み上げない
	const icons: Record<string, string> = {
		home: 'M3 11 12 3l9 8M5 9.5V21h5v-6h4v6h5V9.5',
		search: 'M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM16 16l5 5',
		chat: 'M4 5h16v11H9l-5 4Z',
		user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 21c0-4 4-6 8-6s8 2 8 6'
	};
	const text = {
		en: {
			label: 'Main',
			items: [
				{ id: 'home', name: 'Home' },
				{ id: 'search', name: 'Search' },
				{ id: 'chat', name: 'Chat' },
				{ id: 'user', name: 'User' }
			],
			content: 'The content of this section appears here.'
		},
		ja: {
			label: 'メイン',
			items: [
				{ id: 'home', name: 'ホーム' },
				{ id: 'search', name: '検索' },
				{ id: 'chat', name: 'チャット' },
				{ id: 'user', name: 'ユーザー' }
			],
			content: 'この区分の内容がここに表示されます。'
		}
	};

	const uid = $props.id();
	let current = $state('home');
	const currentName = $derived(text[lang].items.find((item) => item.id === current)!.name);
</script>

<!-- DADS が挙げる問題（DOM の最後に置くとキーボードでも読み上げでも届きにくい）を避けるため、
	<nav> は内容より前に置き、CSS の grid で下に描く。見た目の位置と DOM の順序は別なので、Tab は先にバーへ届く -->
<div class="phone">
	<nav id={uid} aria-label={text[lang].label}>
		<ul>
			{#each text[lang].items as item (item.id)}
				<li>
					<!-- デモなので移動はせず、今の項目と内容を切り替える（href は prerender の存在チェックを通すため nav を指す） -->
					<a
						href="#{uid}"
						aria-current={item.id === current ? 'page' : undefined}
						onclick={(e) => {
							e.preventDefault();
							current = item.id;
						}}
					>
						<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d={icons[item.id]} /></svg>
						{item.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="content">
		<h3>{currentName}</h3>
		<p>{text[lang].content}</p>
		<!-- 内容の代わりのダミーの帯。読み上げには要らない -->
		<span class="bar" aria-hidden="true"></span>
		<span class="bar short" aria-hidden="true"></span>
	</div>
</div>

<style>
	/* バーを画面ではなくこの枠の下に固定するため、position: fixed は使わず grid の下の行に置く */
	.phone {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: 1fr auto;
		width: min(100%, 20rem);
		min-height: 22rem;
		border: 2px solid var(--color-border);
		border-radius: 1.5rem;
		background: var(--color-bg);
	}

	nav {
		grid-row: 2;
		border-top: 1px solid var(--color-border);
		border-radius: 0 0 1.25rem 1.25rem;
		background: var(--color-surface);
	}

	ul {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(0, 1fr);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.125rem;
		min-height: 3.5rem;
		padding: 0.25rem;
		border-top: 3px solid transparent;
		color: var(--color-text);
		font-size: 0.75rem;
		overflow-wrap: anywhere;
		text-decoration: none;
	}

	a:hover {
		background: var(--color-border);
	}

	/* 現在の項目は色だけで示さない: 上の線・太字・塗りつぶした背景を足す（Material Design 3 は塗りつぶしたアイコンとインジケーター） */
	[aria-current='page'] {
		border-top-color: var(--color-accent);
		background: var(--color-bg);
		font-weight: 700;
	}

	svg {
		fill: none;
		stroke: currentcolor;
		stroke-width: 1.75;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.content {
		grid-row: 1;
		padding: 0 1rem 1rem;
	}

	h3 {
		margin: 1rem 0 0;
		font-size: 1.125rem;
	}

	p {
		margin: 0.25rem 0 0.75rem;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.bar {
		display: block;
		height: 0.5rem;
		margin-top: 0.5rem;
		border-radius: 0.25rem;
		background: var(--color-surface);
	}

	.short {
		width: 60%;
	}
</style>
