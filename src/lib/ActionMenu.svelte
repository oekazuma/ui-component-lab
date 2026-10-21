<script lang="ts">
	import { tick, type Snippet } from 'svelte';

	// Menu、Split button、Context menu のデモで共有する、APG「Menu Button」パターンのメニュー
	let {
		items,
		onselect,
		trigger,
		label,
		class: className
	}: {
		/** null は区切り線。危険な操作をほかの項目から離すのに使う */
		items: (string | null)[];
		onselect: (item: string) => void;
		/** ボタンの中身 */
		trigger: Snippet;
		/** 中身がアイコンだけのときのアクセシブルな名前 */
		label?: string;
		class?: string;
	} = $props();

	const uid = $props.id();
	let open = $state(false);
	let button: HTMLButtonElement;
	let menu: HTMLUListElement;
	let wrap: HTMLDivElement;
	// コンテキストメニューとして開いたときの位置（.menu-wrap からの px）と、閉じたときにフォーカスを戻す要素
	let at = $state<{ left: number; top: number }>();
	let returnTo: HTMLElement | undefined;

	const menuItems = () => [...menu.querySelectorAll<HTMLElement>('[role="menuitem"]')];

	async function show(index: number, from?: HTMLElement, position?: { left: number; top: number }) {
		at = position;
		returnTo = from;
		open = true;
		await tick();
		menuItems().at(index)?.focus();
	}

	/** 同じメニューを、画面上の (x, y) にコンテキストメニューとして開く。閉じると from へフォーカスを戻す */
	export async function openAt(x: number, y: number, from: HTMLElement) {
		const r = wrap.getBoundingClientRect();
		await show(0, from, { left: x - r.left, top: y - r.top });
		// 画面の右端で開くと横にはみ出すので、はみ出した分だけ左へ寄せる
		const over = menu.getBoundingClientRect().right - document.documentElement.clientWidth;
		if (over > 0 && at) at.left -= over + 8;
	}

	function close() {
		open = false;
		(returnTo ?? button).focus();
	}

	function onButtonKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			show(e.key === 'ArrowDown' ? 0 : -1);
		} else if (e.key === 'Escape' && open) {
			e.preventDefault();
			open = false;
		}
	}

	// 開いている間だけ、メニューの外を押したら閉じる（45 個のデモが同じページにあるので常設しない）
	$effect(() => {
		if (!open) return;
		const onpointerdown = (e: PointerEvent) => {
			if (!wrap.contains(e.target as Node)) open = false;
		};
		document.addEventListener('pointerdown', onpointerdown);
		return () => document.removeEventListener('pointerdown', onpointerdown);
	});

	function onMenuKeydown(e: KeyboardEvent) {
		const els = menuItems();
		const i = els.indexOf(document.activeElement as HTMLElement);
		const target = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: -1 }[e.key];
		if (target !== undefined) {
			e.preventDefault();
			els.at(target % els.length)?.focus();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			close();
		} else if (e.key === 'Tab') {
			// preventDefault しない: フォーカスはそのまま次へ移す
			open = false;
		}
	}
</script>

<div
	bind:this={wrap}
	class="menu-wrap"
	onfocusout={(e) => {
		// Tab で外の要素へ移ったら閉じる。Safari はクリックでボタンにフォーカスしないため relatedTarget が null になる。null では閉じず、外側のクリックは上の pointerdown で扱う
		if (e.relatedTarget && !wrap.contains(e.relatedTarget as Node)) open = false;
	}}
>
	<button
		bind:this={button}
		id="{uid}-button"
		type="button"
		class={['btn', className]}
		aria-haspopup="menu"
		aria-expanded={open}
		aria-controls="{uid}-menu"
		aria-label={label}
		onclick={() => (open ? (open = false) : show(0))}
		onkeydown={onButtonKeydown}
	>
		{@render trigger()}
	</button>
	<!-- APG Menu Button: メニューの名前は開くボタンから取る -->
	<ul
		bind:this={menu}
		id="{uid}-menu"
		role="menu"
		aria-labelledby="{uid}-button"
		hidden={!open}
		style:left={at && `${at.left}px`}
		style:right={at && 'auto'}
		style:top={at && `${at.top}px`}
		style:margin={at && '0'}
		onkeydown={onMenuKeydown}
	>
		{#each items as item, i (item ?? `separator-${i}`)}
			{#if item === null}
				<li role="separator"></li>
			{:else}
				<li role="none">
					<button
						type="button"
						role="menuitem"
						tabindex="-1"
						onclick={() => {
							onselect(item);
							close();
						}}
					>
						{item}
					</button>
				</li>
			{/if}
		{/each}
	</ul>
</div>

<style>
	.menu-wrap {
		position: relative;
		display: inline-flex;
	}

	[role='menu'] {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 1;
		min-width: 100%;
		margin: 0.25rem 0 0;
		padding: 0.25rem 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
		list-style: none;
	}

	[role='menuitem'] {
		display: block;
		width: 100%;
		padding: 0.3em 0.9em;
		border: 0;
		background: none;
		text-align: left;
		white-space: nowrap;
		cursor: pointer;
	}

	[role='separator'] {
		margin: 0.25rem 0;
		border-top: 1px solid var(--color-border);
	}

	[role='menuitem']:hover,
	[role='menuitem']:focus-visible {
		background: var(--color-surface);
	}
</style>
