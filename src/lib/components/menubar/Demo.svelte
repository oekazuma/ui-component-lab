<script lang="ts">
	import { tick } from 'svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// 「…」はダイアログを開く項目に付ける慣習（APG Menu and Menubar）
	const text = {
		en: {
			label: 'Text editor',
			menus: [
				['File', ['New', 'Open…', 'Save']],
				['Edit', ['Undo', 'Cut', 'Copy', 'Paste']],
				['View', ['Zoom in', 'Zoom out', 'Actual size']]
			] as [string, string[]][],
			chosen: 'Chosen:'
		},
		ja: {
			label: 'テキストエディター',
			menus: [
				['ファイル', ['新規作成', '開く…', '保存']],
				['編集', ['元に戻す', '切り取り', 'コピー', '貼り付け']],
				['表示', ['拡大', '縮小', '実際のサイズ']]
			] as [string, string[]][],
			chosen: '選んだ操作:'
		}
	};

	const uid = $props.id();
	// メニューバーの中で Tab で止まる項目（ロービングタブインデックス）
	let current = $state(0);
	let open = $state<number | null>(null);
	let chosen = $state('');
	let bar: HTMLUListElement;
	let barItems: HTMLButtonElement[] = $state([]);

	const count = () => text[lang].menus.length;
	// 開くサブメニューは常に 1 つなので、メニューバーの中から探せば足りる
	const menuItems = () => [...bar.querySelectorAll<HTMLElement>('[role="menu"] [role="menuitem"]')];

	function focusBar(i: number) {
		current = i;
		barItems[i].focus();
	}

	async function openMenu(i: number, at: number) {
		current = i;
		open = i;
		await tick();
		menuItems().at(at)?.focus();
	}

	function closeTo(i: number) {
		open = null;
		focusBar(i);
	}

	// WAI-ARIA APG Menu and Menubar: メニューバーでは ←→ で項目を移り、↓↑ でサブメニューを開く
	function onBarKeydown(e: KeyboardEvent, i: number) {
		const n = count();
		const move = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
		if (move !== undefined) focusBar(move);
		else if (e.key === 'ArrowDown') openMenu(i, 0);
		else if (e.key === 'ArrowUp') openMenu(i, -1);
		else return;
		e.preventDefault();
	}

	// サブメニューでは ↓↑ で項目を移り、←→ で隣のメニューバーの項目のサブメニューへ移る
	function onMenuKeydown(e: KeyboardEvent, i: number) {
		const els = menuItems();
		const k = els.indexOf(document.activeElement as HTMLElement);
		const n = count();
		const move = { ArrowDown: (k + 1) % els.length, ArrowUp: k - 1, Home: 0, End: -1 }[e.key];
		if (move !== undefined) els.at(move)?.focus();
		else if (e.key === 'ArrowRight') openMenu((i + 1) % n, 0);
		else if (e.key === 'ArrowLeft') openMenu((i - 1 + n) % n, 0);
		else if (e.key === 'Escape') closeTo(i);
		else if (e.key === 'Tab') {
			// preventDefault しない。先にメニューバーの項目へフォーカスを戻してから閉じ、Tab の既定の動きでメニューバーの外へ出す
			closeTo(i);
			return;
		} else return;
		e.preventDefault();
	}

	// 開いている間だけ、メニューバーの外を押したら閉じる
	$effect(() => {
		if (open === null) return;
		const onpointerdown = (e: PointerEvent) => {
			if (!bar.contains(e.target as Node)) open = null;
		};
		document.addEventListener('pointerdown', onpointerdown);
		return () => document.removeEventListener('pointerdown', onpointerdown);
	});
</script>

<div class="demo">
	<ul
		bind:this={bar}
		role="menubar"
		aria-label={text[lang].label}
		onfocusout={(e) => {
			// Safari はクリックでボタンにフォーカスしないため relatedTarget が null になる。null では閉じず、外側のクリックは上の pointerdown で扱う
			if (e.relatedTarget && !bar.contains(e.relatedTarget as Node)) open = null;
		}}
	>
		{#each text[lang].menus as [name, items], i (name)}
			<li role="none">
				<button
					bind:this={barItems[i]}
					id="{uid}-bar-{i}"
					type="button"
					role="menuitem"
					aria-haspopup="menu"
					aria-expanded={open === i}
					tabindex={current === i ? 0 : -1}
					onclick={() => (open === i ? (open = null) : openMenu(i, 0))}
					onkeydown={(e) => onBarKeydown(e, i)}
				>
					{name}
				</button>
				{#if open === i}
					<ul role="menu" aria-labelledby="{uid}-bar-{i}" onkeydown={(e) => onMenuKeydown(e, i)}>
						{#each items as item (item)}
							<li role="none">
								<button
									type="button"
									role="menuitem"
									tabindex="-1"
									onclick={() => {
										chosen = `${name} > ${item}`;
										closeTo(i);
									}}
								>
									{item}
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
	<p role="status">{chosen ? `${text[lang].chosen} ${chosen}` : ''}</p>
</div>

<style>
	/* 開いたサブメニューがデモの枠に収まる高さを取り、結果の表示はその下に置く */
	.demo {
		display: grid;
		align-content: space-between;
		gap: 0.5rem;
		width: min(100%, 22rem);
		min-height: 16rem;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	[role='menubar'] {
		display: flex;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	li {
		position: relative;
	}

	button {
		min-height: 2.75rem;
		padding: 0.3em 0.9em;
		border: 0;
		background: none;
		white-space: nowrap;
		cursor: pointer;
	}

	button:hover,
	[aria-expanded='true'] {
		background: var(--color-surface);
	}

	[role='menu'] {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 1;
		min-width: 100%;
		margin-top: 0.25rem;
		padding: 0.25rem 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
	}

	[role='menu'] button {
		display: block;
		width: 100%;
		text-align: left;
	}

	p {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
		text-align: center;
	}
</style>
