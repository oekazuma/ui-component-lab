<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			site: 'Sample City',
			open: 'Menu',
			close: 'Close',
			title: 'Menu',
			links: ['Home', 'News', 'Services', 'Contact'],
			went: 'Going to:'
		},
		ja: {
			site: 'サンプル市',
			open: 'メニュー',
			close: '閉じる',
			title: 'メニュー',
			links: ['ホーム', 'お知らせ', '手続き', 'お問い合わせ'],
			went: '移動先:'
		}
	};

	const uid = $props.id();
	let dialog: HTMLDialogElement;
	let went = $state('');
</script>

<!-- DADS のドロワーの実装例と同じく、開くボタンと、ドロワーの中の閉じるボタンを別々に置く。
	モーダルの <dialog> が背景の操作無効化・Esc で閉じる・開いたボタンへのフォーカス復帰を受け持つ -->
<div class="demo">
	<div class="header">
		<span class="site">{text[lang].site}</span>
		<button type="button" class="btn hamburger" onclick={() => dialog.showModal()}>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" /></svg>
			{text[lang].open}
		</button>
	</div>
	<p role="status">{went ? `${text[lang].went} ${went}` : ''}</p>
</div>

<!-- 枠の中の暗い部分は <dialog> 自身なので closedby では閉じない。そこを押したときも閉じる。キーボードでは Esc で閉じられる -->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	class="in-frame"
	closedby="any"
	aria-labelledby="{uid}-title"
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div class="panel">
		<h2 id="{uid}-title" class="visually-hidden">{text[lang].title}</h2>
		<form method="dialog" class="head">
			<button class="btn hamburger">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.4 19 5 17.6 10.6 12 5 6.4 6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4Z" /></svg>
				{text[lang].close}
			</button>
		</form>
		<nav aria-labelledby="{uid}-title">
			<ul>
				{#each text[lang].links as link (link)}
					<li>
						<!-- デモなので移動はせず、行き先を表示する（href は prerender の存在チェックを通すため見出しを指す） -->
						<a
							href="#{uid}-title"
							onclick={(e) => {
								e.preventDefault();
								went = link;
								dialog.close();
							}}>{link}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</dialog>

<style>
	/* 開いたメニューのリンクが並びきるだけの高さを枠に確保する */
	.demo {
		display: grid;
		align-content: center;
		gap: 0.5rem;
		width: min(100%, 20rem);
		min-height: 17rem;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.25rem 0.25rem 0.25rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.site {
		font-weight: 700;
	}

	.hamburger {
		border-color: transparent;
		background: transparent;
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;
		fill: currentcolor;
	}

	p {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
		text-align: center;
	}

	/* 枠の右端から出るパネル（枠に重ねる仕組みは app.css の .in-frame） */
	.panel {
		justify-self: end;
		width: min(calc(100% - 3rem), 18rem);
		height: 100%;
		padding: 0.5rem 1rem 1rem;
		border-left: 1px solid var(--color-border);
		background: var(--color-bg);
		color: var(--color-text);
		animation: slide-in 0.2s ease-out;
	}

	@keyframes slide-in {
		from {
			translate: 100% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.panel {
			animation: none;
		}
	}

	.head {
		display: flex;
		justify-content: flex-end;
	}

	ul {
		margin: 0.5rem 0 0;
		padding: 0;
		list-style: none;
	}

	li + li {
		border-top: 1px solid var(--color-border);
	}

	a {
		display: block;
		padding: 0.75rem 0.25rem;
	}
</style>
