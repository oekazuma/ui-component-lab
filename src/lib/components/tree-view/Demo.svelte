<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	type Node = { name: string; children?: Node[] };
	const text: Record<Lang, { label: string; opened: (name: string) => string; tree: Node[] }> = {
		en: {
			label: 'Files',
			opened: (name) => `Opened ${name}`,
			tree: [
				{ name: 'Documents', children: [{ name: 'report.pdf' }, { name: 'budget.xlsx' }] },
				{ name: 'Pictures', children: [{ name: 'cat.png' }, { name: 'trip.jpg' }] },
				{ name: 'readme.txt' }
			]
		},
		ja: {
			label: 'ファイル',
			opened: (name) => `${name} を開きました`,
			tree: [
				{ name: '書類', children: [{ name: '報告書.pdf' }, { name: '予算.xlsx' }] },
				{ name: '写真', children: [{ name: 'ねこ.png' }, { name: '旅行.jpg' }] },
				{ name: 'はじめに.txt' }
			]
		}
	};

	/** key は "0" や "0-1" のような位置の並び */
	const expanded = new SvelteSet<string>();
	let focused = $state('0');
	let opened = $state('');
	const els: Record<string, HTMLElement> = {};

	// 画面に見えている項目を上から順に並べたもの。↑↓ の移動先はここから選ぶ
	let visible = $derived.by(() => {
		const out: { key: string; parent: string; node: Node }[] = [];
		const walk = (nodes: Node[], parent: string) =>
			nodes.forEach((node, i) => {
				const key = parent ? `${parent}-${i}` : `${i}`;
				out.push({ key, parent, node });
				if (node.children && expanded.has(key)) walk(node.children, key);
			});
		walk(text[lang].tree, '');
		return out;
	});

	function focus(key: string | undefined) {
		if (!key) return;
		focused = key;
		els[key].focus();
	}

	function activate(key: string, node: Node) {
		if (!node.children) opened = text[lang].opened(node.name);
		else if (expanded.has(key)) expanded.delete(key);
		else expanded.add(key);
	}

	// WAI-ARIA APG Tree View のキー操作（文字入力での移動と * は省略）
	function onkeydown(e: KeyboardEvent) {
		const i = visible.findIndex((v) => v.key === focused);
		const { key, parent, node } = visible[i];
		const isOpen = expanded.has(key);
		switch (e.key) {
			case 'ArrowDown':
				focus(visible[i + 1]?.key);
				break;
			case 'ArrowUp':
				focus(visible[i - 1]?.key);
				break;
			case 'Home':
				focus(visible[0].key);
				break;
			case 'End':
				focus(visible.at(-1)?.key);
				break;
			case 'ArrowRight':
				if (node.children && !isOpen) expanded.add(key);
				else if (node.children) focus(visible[i + 1].key);
				break;
			case 'ArrowLeft':
				if (node.children && isOpen) expanded.delete(key);
				else focus(parent);
				break;
			case 'Enter':
				activate(key, node);
				break;
			default:
				return;
		}
		e.preventDefault();
	}
</script>

{#snippet branch(nodes: Node[], parent: string)}
	{#each nodes as node, i (node.name)}
		{@const key = parent ? `${parent}-${i}` : `${i}`}
		<!-- 選択の状態を持たない木なので aria-selected は付けない（ARIA 1.2 の treeitem では必須ではない） -->
		<!-- svelte-ignore a11y_role_has_required_aria_props -->
		<li
			bind:this={els[key]}
			role="treeitem"
			aria-expanded={node.children ? expanded.has(key) : undefined}
			tabindex={focused === key ? 0 : -1}
		>
			<!-- キーボードでは tree 全体の keydown で操作するため、ここはマウス用のクリックだけを持つ -->
			<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
			<span
				class="row"
				onclick={() => {
					focus(key);
					activate(key, node);
				}}
			>
				<span class="icon" aria-hidden="true">
					{node.children ? (expanded.has(key) ? '▾ 📂' : '▸ 📁') : '📄'}
				</span>
				{node.name}
			</span>
			{#if node.children && expanded.has(key)}
				<ul role="group">
					{@render branch(node.children, key)}
				</ul>
			{/if}
		</li>
	{/each}
{/snippet}

<div class="demo">
	<ul role="tree" aria-label={text[lang].label} {onkeydown}>
		{@render branch(text[lang].tree, '')}
	</ul>
	<p aria-live="polite">{opened}</p>
</div>

<style>
	.demo {
		width: min(100%, 16rem);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	[role='group'] {
		padding-left: 1.5rem;
	}

	.row {
		display: block;
		padding: 0.15em 0.4em;
		border-radius: var(--radius);
		cursor: pointer;
	}

	/* li は子の項目まで包むため、フォーカスの枠は行の部分だけに出す */
	[role='treeitem']:focus-visible {
		outline: none;
		box-shadow: none;
	}

	[role='treeitem']:focus-visible > .row {
		outline: 2px solid var(--color-focus-outer);
		outline-offset: 2px;
		box-shadow: 0 0 0 2px var(--color-focus-inner);
	}

	.row:hover {
		background: var(--color-bg);
	}

	.icon {
		display: inline-block;
		min-width: 2.25em;
	}

	p {
		min-height: 1.6em;
		margin: 0.5rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
