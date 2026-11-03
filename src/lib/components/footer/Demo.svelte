<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Site information',
			links: ['Privacy', 'Accessibility', 'Cookies', 'Terms and conditions'],
			body: 'The content of the page ends here.',
			copyright: '© 2026 Sample Library',
			would: (page: string) => `A real site would open “${page}”`
		},
		ja: {
			label: 'サイト情報',
			links: ['プライバシー', 'アクセシビリティ', 'Cookie', '利用規約'],
			body: 'ページの内容はここまでです。',
			copyright: '© 2026 サンプル図書館',
			would: (page: string) => `実際のサイトでは「${page}」へ移動します`
		}
	};

	const uid = $props.id();
	let clicked = $state('');
</script>

<div id={uid} class="demo">
	<div class="page">
		<p class="content">{text[lang].body}</p>
		<!-- このデモはページの <main> の中にあるので、<footer> は contentinfo のランドマークにならない（サイト自身の contentinfo が別にある）。
			role も aria-label も付けない。ランドマークにならない <footer> には名前を付けられない -->
		<footer>
			<nav aria-label={text[lang].label}>
				<ul>
					{#each text[lang].links as name (name)}
						<li>
							<!-- デモなので移動はせず、行き先を表示する（href は prerender の存在チェックを通すため枠を指す） -->
							<a
								href="#{uid}"
								onclick={(e) => {
									e.preventDefault();
									clicked = name;
								}}>{name}</a
							>
						</li>
					{/each}
				</ul>
			</nav>
			<p><small>{text[lang].copyright}</small></p>
		</footer>
	</div>
	<p role="status">{clicked ? text[lang].would(clicked) : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
		width: min(100%, 36rem);
	}

	.page {
		display: flex;
		flex-direction: column;
		min-height: 9rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.content {
		flex: 1;
		margin: 0;
		padding: 0.75rem;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	/* 固定にしない。フォーカスが来た項目を覆うと、キーボードの利用者に見えなくなる（WCAG 2.4.11） */
	footer {
		padding: 0.5rem 0.75rem;
		border-top: 1px solid var(--color-border);
		border-radius: 0 0 var(--radius) var(--radius);
		background: var(--color-surface);
		font-size: 0.875rem;
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
		color: var(--color-text);
	}

	footer p {
		margin: 0;
		color: var(--color-muted);
	}

	[role='status'] {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
