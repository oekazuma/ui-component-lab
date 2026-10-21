<script lang="ts">
	import { tick } from 'svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const link = 'https://example.com/s/8f3k';
	// ボタンのないトーストを出しておく時間。MUI Snackbar の例（6 秒）や Bootstrap の既定（5 秒）に近い長さ
	const hideAfter = 5000;
	const text = {
		en: {
			share: (copied: boolean) => `Share link: ${link}${copied ? ' (copied)' : ''}`,
			copy: 'Copy link',
			copied: 'Link copied',
			button: 'Archive message',
			inbox: (n: number) => `${n} message${n === 1 ? '' : 's'} in the inbox`,
			toast: 'Message archived',
			undo: 'Undo',
			close: 'Close'
		},
		ja: {
			share: (copied: boolean) => `共有リンク：${link}${copied ? '（コピー済み）' : ''}`,
			copy: 'リンクをコピー',
			copied: 'リンクをコピーしました',
			button: 'メッセージをアーカイブ',
			inbox: (n: number) => `受信トレイ：${n}件`,
			toast: 'メッセージをアーカイブしました',
			undo: '元に戻す',
			close: '閉じる'
		}
	};

	let inbox = $state(3);
	let copied = $state(false);
	// 出した回数。トーストの文を要素ごと作り直すキーと、自動で消すタイマーを掛け直すきっかけに使う
	let shown = $state(0);
	let open = $state<'copy' | 'archive' | null>(null);
	let hovered = $state(false);
	let archiveButton: HTMLButtonElement;
	let toast: HTMLDivElement;

	function show(kind: 'copy' | 'archive') {
		shown++;
		open = kind;
		// 消したトーストの上にポインターがあったまま次を出すと、pointerleave が来ないことがある
		hovered = false;
	}

	function archive() {
		if (!inbox) return;
		inbox--;
		show('archive');
	}

	// ボタンのないトーストだけを自動で消す。ポインターを乗せている間は止め、離したら最初から数え直す（WCAG 2.2.1、MUI Snackbar）
	$effect(() => {
		if (open !== 'copy' || hovered) return;
		void shown;
		const timer = setTimeout(() => (open = null), hideAfter);
		return () => clearTimeout(timer);
	});

	// 押したボタンが消えるとフォーカスが行き場を失うので、トーストの中にあったときはアーカイブのボタンへ戻す
	async function dismiss() {
		const hadFocus = toast.contains(document.activeElement);
		open = null;
		await tick();
		if (hadFocus) archiveButton.focus();
	}
</script>

<!-- ボタンを含むトーストは、キーボードの利用者が間に合わないことがあるので自動では消さない。
	トーストはフォーカスを受けないので window で Esc を受ける。他の部品が処理済みの Esc と IME 変換中の Esc は無視する -->
<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && open && !e.defaultPrevented && !e.isComposing) dismiss();
	}}
/>

<!-- トーストが消えても結果を確かめられるよう、コピーしたことと受信トレイの件数はページの中にも出す -->
<div class="demo">
	<div class="item">
		<p>{text[lang].share(copied)}</p>
		<!-- このデモでは実際にはクリップボードに書き込まない（権限の確認が出るブラウザがあるため） -->
		<button
			type="button"
			class="btn"
			onclick={() => {
				copied = true;
				show('copy');
			}}
		>
			{text[lang].copy}
		</button>
	</div>
	<div class="item">
		<p>{text[lang].inbox(inbox)}</p>
		<!-- 0 件で disabled にすると押した直後にフォーカスが外れるので、aria-disabled にして押しても何もしない -->
		<button type="button" class="btn" bind:this={archiveButton} aria-disabled={!inbox} onclick={archive}>
			{text[lang].button}
		</button>
	</div>
</div>

<!-- ポインターの出入りはタイマーを止めるためだけに見ていて、操作できる部品ではないので role を付けない -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="region"
	class:open={!!open}
	bind:this={toast}
	onpointerenter={() => (hovered = true)}
	onpointerleave={() => (hovered = false)}
>
	<!-- ライブリージョンは最初から置き、文だけを入れる。ボタンまで読み上げないよう、ボタンはリージョンの外に置く -->
	<p role="status">
		<!-- 同じ文を入れ直しても読み上げられないため、押すたびに要素ごと作り直す -->
		{#key shown}
			{#if open}<span>{open === 'copy' ? text[lang].copied : text[lang].toast}</span>{/if}
		{/key}
	</p>
	{#if open === 'archive'}
		<button
			type="button"
			class="btn undo"
			onclick={() => {
				inbox++;
				dismiss();
			}}
		>
			{text[lang].undo}
		</button>
		<button type="button" class="btn close" aria-label={text[lang].close} onclick={dismiss}>
			<span aria-hidden="true">×</span>
		</button>
	{/if}
</div>

<style>
	.demo {
		display: grid;
		gap: 1rem;
	}

	.item {
		display: grid;
		justify-items: center;
		gap: 0.5rem;
		text-align: center;
	}

	.demo p {
		margin: 0;
		overflow-wrap: anywhere;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	[aria-disabled='true'] {
		color: var(--color-muted);
		cursor: not-allowed;
	}

	.region {
		position: fixed;
		bottom: 1.5rem;
		left: 50%;
		z-index: 10;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		/* left: 50% のままだと幅が画面の半分までに縮むので、中身の幅にしてから画面幅で抑える */
		width: max-content;
		max-width: calc(100vw - 2rem);
		translate: -50% 0;
	}

	.region.open {
		padding: 0.25rem 0.25rem 0.25rem 1.2rem;
		border-radius: var(--radius);
		background: var(--color-text);
		color: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
		animation: rise 0.2s ease-out;
	}

	.region p {
		margin: 0 0.5rem 0 0;
	}

	.region .btn {
		border: 0;
		background: none;
		color: inherit;
	}

	.region .btn:hover {
		background: color-mix(in srgb, var(--color-bg) 15%, transparent);
	}

	.undo {
		font-weight: 700;
		white-space: nowrap;
	}

	.close {
		font-size: 1.25rem;
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: -50% 0.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.region.open {
			animation: none;
		}
	}
</style>
