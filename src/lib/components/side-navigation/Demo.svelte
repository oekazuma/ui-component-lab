<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	type Page = { id: string; name: string };
	type Group = { id: string; name: string; children: Page[] };
	const text: Record<Lang, { label: string; items: (Page | Group)[]; content: string; contains: string }> = {
		en: {
			label: 'Account settings',
			items: [
				{ id: 'profile', name: 'Profile' },
				{ id: 'security', name: 'Security' },
				{
					id: 'billing',
					name: 'Billing',
					children: [
						{ id: 'invoices', name: 'Invoices' },
						{ id: 'payment', name: 'Payment methods' },
						{ id: 'plan', name: 'Plan' }
					]
				},
				{ id: 'notifications', name: 'Notifications' }
			],
			content: 'The content of this page appears here.',
			contains: '(contains the current page)'
		},
		ja: {
			label: 'アカウント設定',
			items: [
				{ id: 'profile', name: 'プロフィール' },
				{ id: 'security', name: 'セキュリティ' },
				{
					id: 'billing',
					name: 'お支払い',
					children: [
						{ id: 'invoices', name: '請求書' },
						{ id: 'payment', name: '支払い方法' },
						{ id: 'plan', name: 'プラン' }
					]
				},
				{ id: 'notifications', name: '通知' }
			],
			content: 'このページの内容がここに表示されます。',
			contains: '（今のページを含む）'
		}
	};

	const uid = $props.id();
	let current = $state('profile');
	// 一覧ページのサムネイルでも階層が見えるよう、開いて始める
	let open = $state(true);

	const pages = $derived(text[lang].items.flatMap((item) => ('children' in item ? item.children : [item])));
	// 閉じていて、今のページがこの中にある項目
	const onPath = (group: Group) => !open && group.children.some((c) => c.id === current);
	const currentName = $derived(pages.find((page) => page.id === current)!.name);
</script>

{#snippet link(page: Page)}
	<!-- デモなので移動はせず、今のページと右の内容を切り替える（href は prerender の存在チェックを通すため nav を指す） -->
	<a
		href="#{uid}"
		aria-current={page.id === current ? 'page' : undefined}
		onclick={(e) => {
			e.preventDefault();
			current = page.id;
		}}>{page.name}</a
	>
{/snippet}

<!-- APG Disclosure Navigation: menu のロールは使わず、入れ子の ul と、開閉ボタン（aria-expanded）とリンクで作る。
	ボタンの開閉は <button> の既定の Enter / Space に任せ、矢印キーの処理は足さない（Tab で移る） -->
<div class="demo">
	<nav id={uid} aria-label={text[lang].label}>
		<ul>
			{#each text[lang].items as item (item.id)}
				<li>
					{#if 'children' in item}
						<button
							type="button"
							aria-expanded={open}
							aria-controls="{uid}-sub"
							class:on-path={onPath(item)}
							onclick={() => (open = !open)}
						>
							<!-- 太字だけでは読み上げに伝わらないので、名前の先頭の項目名はそのままに、見えない文字を後ろへ足す -->
							<span>{item.name}{#if onPath(item)}<span class="visually-hidden">{text[lang].contains}</span>{/if}</span><span class="chevron" aria-hidden="true"></span>
						</button>
						<ul id="{uid}-sub" hidden={!open}>
							{#each item.children as child (child.id)}
								<li>{@render link(child)}</li>
							{/each}
						</ul>
					{:else}
						{@render link(item)}
					{/if}
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
	.demo {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 1.5rem;
		width: min(100%, 40rem);
		align-items: flex-start;
	}

	nav {
		flex: 1 1 11rem;
		padding: 0.25rem 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* 現在のページは色だけで示さない: 左の線と太字を足す（Primer NavList、WCAG 1.4.1） */
	a,
	button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		min-height: 2.5rem;
		padding: 0.25rem 0.75rem;
		border: 0;
		border-left: 4px solid transparent;
		border-radius: 0;
		background: none;
		color: var(--color-text);
		font: inherit;
		text-align: left;
		text-decoration: none;
		cursor: pointer;
	}

	a:hover,
	button:hover {
		background: var(--color-surface);
	}

	ul ul a {
		padding-left: 1.75rem;
	}

	[aria-current='page'] {
		border-left-color: var(--color-accent);
		background: var(--color-surface);
		font-weight: 700;
	}

	/* 閉じていても、今のページがこの中にあると分かるようにする */
	.on-path {
		font-weight: 700;
	}

	.chevron {
		width: 0.45em;
		height: 0.45em;
		border-right: 2px solid currentcolor;
		border-bottom: 2px solid currentcolor;
		rotate: 45deg;
		translate: 0 -0.15em;
	}

	[aria-expanded='true'] .chevron {
		rotate: 225deg;
		translate: 0 0.1em;
	}

	.content {
		flex: 2 1 12rem;
		padding: 0 1rem 1rem;
		border: 1px dashed var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	h3 {
		margin: 0.75rem 0 0;
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
