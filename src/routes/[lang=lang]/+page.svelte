<script lang="ts">
	import { componentPath, skillPath, systemsPath } from '#lib/paths.js';
	import { categoryNames, siteName, t } from '#lib/i18n.js';
	import { entries } from '#lib/registry.js';
	import { filter } from '#lib/filter.svelte.js';
	import { categories, type ComponentData } from '#lib/types.js';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	let lang = $derived(params.lang);
	let ui = $derived(t(lang));

	// 背の高いデモ（カルーセルなど）も枠に収まるよう、デモごとに縮める倍率を決める。
	// 上限を 3 分の 2 にするのは、中身の幅を枠の 1.5 倍で描いているため（それ以上大きいと横にはみ出す）
	function fit(inner: HTMLElement) {
		const thumb = inner.parentElement!;
		const observer = new ResizeObserver(() => {
			inner.style.scale = String(Math.min(2 / 3, (thumb.clientHeight - 16) / inner.offsetHeight));
		});
		observer.observe(inner);
		observer.observe(thumb);
		return () => observer.disconnect();
	}

	// 対応表では同じ呼び名をデザインシステムごとに並べるが、カードでは部品名と重なる呼び名や、同じ呼び名の繰り返しを出さない
	const cardAliases = (d: ComponentData) =>
		[...new Set(d.aliases.map((a) => a.name))].filter(
			(name) => name.toLowerCase() !== d.names.en.toLowerCase() && name !== d.names.ja
		);

	let shown = $derived(
		entries.filter(({ data }) => !filter.category || data.category === filter.category)
	);
</script>

<h1 class="visually-hidden">{siteName}</h1>
<p class="tagline">{ui.tagline}</p>
<ul class="pages">
	<li><a href={systemsPath(lang)}>{ui.systems}</a></li>
	<li>
		<a class="skill" href={skillPath(lang)}>
			<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
				<circle cx="11" cy="11" r="6" />
				<path d="m20 20-4.5-4.5M8.5 11l1.75 1.75L13.5 9.5" />
			</svg>{ui.skill}
		</a>
	</li>
</ul>

<div class="filters">
	<!-- 見た目はピルだが中身はネイティブのラジオボタン。矢印キーでの移動と、選択中の読み上げはブラウザに任せる -->
	<fieldset>
		<legend class="visually-hidden">{ui.category}</legend>
		<label class="chip">
			<input class="visually-hidden" type="radio" name="category" value="" bind:group={filter.category} />{ui.all}
		</label>
		{#each categories as c (c)}
			<label class="chip">
				<input class="visually-hidden" type="radio" name="category" value={c} bind:group={filter.category} />{categoryNames[c][lang]}
			</label>
		{/each}
	</fieldset>
	<!-- 件数は画面では見せないが、絞り込みの結果を読み上げで伝えるために残す -->
	<p class="count visually-hidden" aria-live="polite">{ui.count(shown.length)}</p>
</div>

<ul class="grid">
	{#each shown as { data, demo: Demo } (data.id)}
		<li class="card">
			<!-- 一覧のデモは見た目を見せるだけのサムネイル。inert で操作もフォーカスも読み上げも止め、試すのは詳細ページで行う。
				同じ大きさの枠に縮めて入れるので、中身の多いデモでもカードの並びが崩れない -->
			<div class="thumb" inert>
				<div class="thumb-inner" {@attach fit}>
					<Demo {lang} />
				</div>
			</div>
			<!-- サムネイルの中に操作できる部品がなくなったので、見出しのリンクを ::after でカード全体に広げる -->
			<div class="body">
				<h2>
					<a href={componentPath(lang, data.id)}>
						{data.names.en}
						{#if lang === 'ja'}<span class="sub">{data.names.ja}</span>{/if}
					</a>
				</h2>
				<p class="summary">{data.summary[lang]}</p>
				{#if cardAliases(data).length}
					<p class="aliases">
						{ui.aliases}: {cardAliases(data).join(lang === 'ja' ? '、' : ', ')}
					</p>
				{/if}
			</div>
		</li>
	{/each}
</ul>

<style>
	.tagline {
		margin: 0 0 1.5rem;
		color: var(--color-muted);
	}

	.pages {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 1.5rem;
		margin: -1rem 0 1.5rem;
		padding: 0;
		list-style: none;
	}

	/* カテゴリの上で見落とされないよう、枠で囲んでボタンに近い見た目にする */
	.skill {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.875rem;
		border: 1px solid var(--color-accent);
		border-radius: 999px;
		text-decoration: none;
	}

	.skill:hover {
		background: var(--color-surface);
	}

	.skill svg {
		flex: none;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.filters {
		display: grid;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	fieldset {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		border: 0;
	}

	/* 狭い画面で折り返すと 4 行になりカードが押し下げられるので、1 行にして横にスクロールさせる。
		フォーカスの線が切れないよう、上下左右に余白を取ってから負のマージンで位置を戻す */
	@media (max-width: 40rem) {
		/* fieldset は既定で中身の幅より縮まず、ページごと横にはみ出すため min-width を 0 にする */
		fieldset {
			min-width: 0;
			flex-wrap: nowrap;
			margin: -0.375rem -1rem;
			padding: 0.375rem 1rem;
			overflow-x: auto;
			scrollbar-width: none;
		}
	}

	/* 見えないラジオは絶対配置なので、ピルを基準にしてスクロールの枠の中に収める */
	.chip {
		position: relative;
		flex-shrink: 0;
		white-space: nowrap;
		padding: 0.25em 0.9em;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-bg);
		font-size: 0.9375rem;
		cursor: pointer;
	}

	.chip:hover {
		background: var(--color-surface);
	}

	.chip:has(:checked) {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	.chip:has(:checked):hover {
		background: var(--color-accent-hover);
	}

	/* ラジオ本体は 1px に縮めているので、フォーカスリングはピル側に出す（app.css の :focus-visible と同じ線） */
	.chip:has(:focus-visible) {
		outline: 2px solid var(--color-focus-outer);
		outline-offset: 2px;
		box-shadow: 0 0 0 2px var(--color-focus-inner);
	}

	.count {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
		gap: 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
	}

	.card:hover {
		border-color: var(--color-muted);
	}

	/* デモを 3 分の 2 に縮め、どれも同じ高さの枠に収める。はみ出す分は枠で切る */
	.thumb {
		position: relative;
		height: 10rem;
		overflow: hidden;
		border-bottom: 1px solid var(--color-border);
		background: var(--color-surface);
	}

	/* overflow: hidden の枠の中では、枠より背の高い中身を grid で中央に寄せられない（上端に寄る）。
		中心を枠の中心に合わせてから、その中心を基準に縮める */
	.thumb-inner {
		position: absolute;
		top: 50%;
		left: 50%;
		display: grid;
		place-items: center;
		width: 150%;
		translate: -50% -50%;
		scale: 0.667;
	}

	.body {
		display: grid;
		flex: 1;
		align-content: start;
		gap: 0.375rem;
		padding: 0.75rem 1rem 1rem;
	}

	.card:hover .body {
		background: var(--color-surface);
	}

	/* リンク自体は 1 行だけなので、フォーカスの線は押せる範囲全体に出す */
	.card:has(a:focus-visible) {
		outline: 2px solid var(--color-focus-outer);
		outline-offset: 2px;
		box-shadow: 0 0 0 2px var(--color-focus-inner);
	}

	h2 {
		margin: 0;
		font-size: 1.125rem;
	}

	h2 a {
		color: inherit;
		text-decoration: none;
	}

	h2 a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	h2 a:focus-visible {
		outline: none;
		box-shadow: none;
	}

	.card:hover h2 a {
		text-decoration: underline;
	}

	.sub {
		margin-left: 0.4em;
		color: var(--color-muted);
		font-size: 0.875rem;
		font-weight: 400;
	}

	.summary {
		margin: 0;
	}

	.aliases {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
