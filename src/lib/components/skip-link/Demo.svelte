<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			skip: 'Skip to main content',
			logo: 'Sample City',
			menu: 'Main menu',
			links: ['Living', 'Children', 'Health', 'Contact us'],
			heading: 'Moving in',
			body: 'Give notice within 14 days of the day you start living here.',
			more: 'Read the full guide',
			would: (page: string) => `A real site would open “${page}”`
		},
		ja: {
			skip: '本文へ移動',
			logo: 'サンプル市',
			menu: 'メインメニュー',
			links: ['くらし', '子育て', '健康', 'お問い合わせ'],
			heading: '転入の届け出',
			body: '住み始めた日から 14 日以内に届け出てください。',
			more: '手続きの案内を読む',
			would: (page: string) => `実際のサイトでは「${page}」へ移動します`
		}
	};

	const uid = $props.id();
	let main: HTMLElement;
	let clicked = $state('');
</script>

{#snippet link(name: string)}
	<!-- デモなので移動はせず、行き先を表示する（href は prerender の存在チェックを通すため本文を指す） -->
	<a
		href="#{uid}-main"
		onclick={(e) => {
			e.preventDefault();
			clicked = name;
		}}>{name}</a
	>
{/snippet}

<!-- 枠の中の小さなページ。スキップリンクはこのページの本文へ移り、サイトのスキップリンクや本文（#main）とは別に動く -->
<div class="demo">
	<div class="page">
		<!-- ブラウザの既定の移動はページ全体をスクロールさせ、URL も変えるので止め、フォーカスだけを本文へ移す -->
		<a
			class="skip"
			href="#{uid}-main"
			onclick={(e) => {
				e.preventDefault();
				main.focus();
			}}>{text[lang].skip}</a
		>
		<div class="header">
			<span class="logo">{text[lang].logo}</span>
			<nav aria-label={text[lang].menu}>
				<ul>
					{#each text[lang].links as name (name)}
						<li>{@render link(name)}</li>
					{/each}
				</ul>
			</nav>
		</div>
		<!-- 操作する要素ではないが、スキップリンクからフォーカスを受けて次の Tab をここから始めるため tabindex="-1" -->
		<div bind:this={main} id="{uid}-main" class="main" tabindex="-1">
			<h3>{text[lang].heading}</h3>
			<p>{text[lang].body}</p>
			<p>{@render link(text[lang].more)}</p>
		</div>
	</div>
	<p role="status">{clicked ? text[lang].would(clicked) : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
		width: min(100%, 28rem);
	}

	/* スキップリンクを枠の上へ隠すので、はみ出した部分は見せない */
	.page {
		position: relative;
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	/* display: none や hidden ではキーボードの順番から外れるので、画面の外へ動かして隠し、フォーカスで戻す（WebAIM） */
	.skip {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		z-index: 1;
		padding: 0.5rem 1rem;
		border-radius: var(--radius);
		background: var(--color-bg);
		translate: 0 -300%;
	}

	.skip:focus {
		translate: 0;
	}

	/* 一覧ページのサムネイル（inert）はフォーカスを受けないので、フォーカスが来たときの見た目で見せる */
	:global([inert]) .skip {
		translate: 0;
		outline: 2px solid var(--color-focus-outer);
		outline-offset: 2px;
		box-shadow: 0 0 0 2px var(--color-focus-inner);
	}

	.header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem 1rem;
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--color-border);
		background: var(--color-surface);
		font-size: 0.875rem;
	}

	.logo {
		font-weight: 700;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.main {
		padding: 0.75rem;
	}

	/* 読み始める位置を示すだけなので枠は出さない（サイトの main と同じ） */
	.main:focus {
		outline: none;
		box-shadow: none;
	}

	h3 {
		margin: 0;
		font-size: 1rem;
	}

	.main p {
		margin: 0.25rem 0 0;
		font-size: 0.9375rem;
	}

	[role='status'] {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
