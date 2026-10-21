<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// 言語名と中身は、どの言語のページでもその言語で書く。読めない言語のページからでも自分の言語を見つけられるようにする
	const languages = [
		{ code: 'ja', name: '日本語', heading: 'サンプル市へようこそ', body: 'ごみの出し方や引っ越しの手続きを案内します。' },
		{ code: 'en', name: 'English', heading: 'Welcome to Sample City', body: 'Find out how to put out your rubbish and register your move.' },
		{ code: 'zh-CN', name: '简体中文', heading: '欢迎来到样本市', body: '介绍垃圾的分类方法和搬家的手续。' },
		{ code: 'ko', name: '한국어', heading: '샘플시에 오신 것을 환영합니다', body: '쓰레기 배출 방법과 이사 절차를 안내합니다.' }
	];

	const text = { en: { logo: 'Sample City' }, ja: { logo: 'サンプル市' } };

	const uid = $props.id();
	// 最初はサイトと同じ言語で始める。言語を切り替えると DemoFrame がデモを作り直すので、初期値だけ読めば足りる
	// svelte-ignore state_referenced_locally
	let current = $state(lang === 'ja' ? 0 : 1);
	let open = $state(false);
	let wrap: HTMLElement;
	let button: HTMLButtonElement;

	function close() {
		open = false;
		button.focus();
	}

	// 開いている間だけ、一覧の外を押したら閉じる。最初は閉じているので、一覧ページのサムネイル（inert）では付かない
	$effect(() => {
		if (!open) return;
		const onpointerdown = (e: PointerEvent) => {
			if (!wrap.contains(e.target as Node)) open = false;
		};
		document.addEventListener('pointerdown', onpointerdown);
		return () => document.removeEventListener('pointerdown', onpointerdown);
	});
</script>

<!-- APG Disclosure Navigation と DADS 実装 language-selector: 開閉ボタン（aria-expanded）と、各言語のページへのリンクの一覧。
	項目はページへのリンクなので role="menu" は使わない。開閉は <button> の既定の Enter / Space に任せ、Esc で閉じる処理だけを足す -->
<div class="page">
	<div class="header">
		<span class="logo">{text[lang].logo}</span>
		<!-- Esc は開閉ボタンと一覧のリンクのどこにフォーカスがあっても受けたいので、まとめて受ける -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			bind:this={wrap}
			class="selector"
			onkeydown={(e) => {
				if (e.key !== 'Escape' || !open) return;
				e.preventDefault();
				close();
			}}
			onfocusout={(e) => {
				// Safari はクリックでボタンにフォーカスしないため relatedTarget が null になる。null では閉じず、外側のクリックは上の pointerdown で扱う
				if (e.relatedTarget && !wrap.contains(e.relatedTarget as Node)) open = false;
			}}
		>
			<!-- 今の言語が読めない人にも分かるよう、ラベルは常に英語の「Language」にし、地球のアイコンを添える（DADS） -->
			<button
				bind:this={button}
				type="button"
				class="btn"
				aria-expanded={open}
				aria-controls="{uid}-list"
				onclick={() => (open = !open)}
			>
				<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
					<circle cx="12" cy="12" r="9" />
					<path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
				</svg>
				<span lang="en">Language</span>
				<svg class="chevron" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" /></svg>
			</button>
			<ul id="{uid}-list" hidden={!open}>
				{#each languages as l, i (l.code)}
					<li>
						<!-- デモなので移動はせず、枠の中のページの言語を切り替える（href は prerender の存在チェックを通すため本文を指す） -->
						<a
							href="#{uid}-content"
							lang={l.code}
							hreflang={l.code}
							aria-current={i === current ? 'true' : undefined}
							onclick={(e) => {
								e.preventDefault();
								current = i;
								close();
							}}
						>
							<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" /></svg>
							{l.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div id="{uid}-content" class="content" lang={languages[current].code}>
		<p class="heading">{languages[current].heading}</p>
		<p>{languages[current].body}</p>
	</div>
</div>

<style>
	.page {
		width: min(100%, 26rem);
		min-height: 16rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.25rem 0.5rem 0.25rem 0.75rem;
		border-bottom: 1px solid var(--color-border);
	}

	.logo {
		font-weight: 700;
	}

	.selector {
		position: relative;
	}

	.btn {
		border-color: transparent;
	}

	svg {
		flex-shrink: 0;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.75;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	[aria-expanded='true'] .chevron {
		rotate: 180deg;
	}

	ul {
		position: absolute;
		top: calc(100% + 0.25rem);
		right: 0;
		z-index: 1;
		min-width: 10rem;
		margin: 0;
		padding: 0.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
		list-style: none;
	}

	a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 2.75rem;
		padding: 0 0.75rem;
		border-radius: calc(var(--radius) - 2px);
		color: var(--color-text);
		text-decoration: none;
	}

	a:hover {
		background: var(--color-surface);
	}

	/* 今の言語には太字とチェックの印を付ける。印のない項目も同じ位置から文字が始まるよう、印は透明にして場所を取る */
	a:not([aria-current]) svg {
		visibility: hidden;
	}

	[aria-current] {
		font-weight: 700;
	}

	.content {
		padding: 0.75rem;
	}

	.content p {
		margin: 0;
	}

	.heading {
		font-size: 1.125rem;
		font-weight: 700;
	}
</style>
