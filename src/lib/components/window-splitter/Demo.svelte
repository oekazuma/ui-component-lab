<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			contents: 'Contents',
			chapters: ['1. Getting started', '2. Signing in', '3. Changing settings', '4. Getting help'],
			title: '2. Signing in',
			body: 'Enter the email address you registered with, then the code we send to it. The code is valid for 10 minutes.'
		},
		ja: {
			contents: '目次',
			chapters: ['1. はじめに', '2. ログインする', '3. 設定を変える', '4. 困ったときは'],
			title: '2. ログインする',
			body: '登録したメールアドレスを入力し、そのアドレスに届いた確認コードを入力します。確認コードの有効期限は10分です。'
		}
	};

	const uid = $props.id();
	// 目次の幅（ウィンドウの幅に対する %）。0 は目次を畳んだ状態
	const max = 80;
	const step = 10;
	let value = $state(30);
	// Enter で畳んだあとに戻す位置
	let restore = $state(30);
	let win: HTMLDivElement;
	let drag: { x: number; moved: boolean } | null = null;

	function move(to: number) {
		value = Math.min(max, Math.max(0, Math.round(to)));
		if (value > 0) restore = value;
	}

	function toggle() {
		value = value > 0 ? 0 : restore;
	}

	// WAI-ARIA APG Window Splitter（可変の縦のスプリッター）: ← → で動かし、Enter で目次を畳む・戻す。
	// APG で任意とされている、F6 でペインを移る操作は省く
	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') move(value - step);
		else if (e.key === 'ArrowRight') move(value + step);
		else if (e.key === 'Home') move(0);
		else if (e.key === 'End') move(max);
		else if (e.key === 'Enter') toggle();
		else return;
		e.preventDefault();
	}

	// ポインターは区切り自身が捕まえるので、document にリスナーを付けずにドラッグを追える
	function onpointerdown(e: PointerEvent) {
		if (e.button !== 0) return;
		e.preventDefault();
		(e.currentTarget as HTMLElement).focus();
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		drag = { x: e.clientX, moved: false };
	}

	function onpointermove(e: PointerEvent) {
		if (!drag) return;
		if (Math.abs(e.clientX - drag.x) > 3) drag.moved = true;
		if (!drag.moved) return;
		const r = win.getBoundingClientRect();
		move(((e.clientX - r.left) / r.width) * 100);
	}

	// ドラッグできない人のために、動かさずに押しただけなら Enter と同じく畳む・戻す（WCAG 2.5.7）
	function onpointerup() {
		if (drag && !drag.moved) toggle();
		drag = null;
	}
</script>

<div bind:this={win} class="window">
	<section id="{uid}-primary" class="primary" style:width="{value}%" hidden={value === 0} aria-labelledby="{uid}-contents">
		<h3 id="{uid}-contents">{text[lang].contents}</h3>
		<ul>
			{#each text[lang].chapters as chapter (chapter)}
				<li>{chapter}</li>
			{/each}
		</ul>
	</section>
	<!-- 名前は大きさを変える側のペイン（目次）と同じにする（APG Window Splitter） -->
	<!-- separator はフォーカスできると操作部品になる（ARIA 1.1）が、Svelte の検査は常に構造の役割とみなすため -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
	<div
		class="splitter"
		role="separator"
		tabindex="0"
		aria-orientation="vertical"
		aria-labelledby="{uid}-contents"
		aria-controls="{uid}-primary"
		aria-valuemin={0}
		aria-valuemax={max}
		aria-valuenow={value}
		style:left="clamp(0.75rem, {value}%, calc(100% - 0.75rem))"
		{onkeydown}
		{onpointerdown}
		{onpointermove}
		{onpointerup}
		onpointercancel={() => (drag = null)}
	></div>
	<section class="secondary" aria-labelledby="{uid}-title">
		<h3 id="{uid}-title">{text[lang].title}</h3>
		<p>{text[lang].body}</p>
	</section>
</div>

<style>
	.window {
		position: relative;
		display: flex;
		width: min(100%, 32rem);
		height: 13rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		overflow: hidden;
	}

	section {
		min-width: 0;
		padding: 0.75rem;
		overflow: hidden;
	}

	.primary {
		flex: none;
		border-right: 1px solid var(--color-border);
		background: var(--color-surface);
	}

	.secondary {
		flex: 1;
	}

	h3 {
		margin: 0 0 0.5rem;
		font-size: 0.9375rem;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 0.875rem;
	}

	/* 狭くした目次では、項目を折り返さずに末尾を「…」で切る */
	li {
		padding: 0.15rem 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	p {
		margin: 0;
		font-size: 0.875rem;
	}

	/* 押せる幅は 24px とり、ペインの境目に重ねる。見た目は中央のつまみで示す */
	.splitter {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1.5rem;
		translate: -50% 0;
		touch-action: none;
		cursor: col-resize;
	}

	.splitter::after {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0.375rem;
		height: 2.5rem;
		border: 1px solid var(--color-muted);
		border-radius: 999px;
		background: var(--color-bg);
		content: '';
		translate: -50% -50%;
	}

	.splitter:hover::after {
		background: var(--color-surface);
	}
</style>
