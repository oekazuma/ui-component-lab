<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Text formatting', align: 'Text alignment', sample: 'The quick brown fox jumps over the lazy dog.' },
		ja: { label: '文字の書式', align: '文字の揃え', sample: 'いろはにほへと ちりぬるを わかよたれそ つねならむ' }
	};
	const styles = [
		{ key: 'bold', label: { en: 'Bold', ja: '太字' }, icon: 'B' },
		{ key: 'italic', label: { en: 'Italic', ja: '斜体' }, icon: 'I' },
		{ key: 'underline', label: { en: 'Underline', ja: '下線' }, icon: 'U' }
	] as const;
	// 線の長さで揃え方を描く。各行は [x の始まり, 幅]
	const aligns = [
		{ key: 'left', label: { en: 'Align left', ja: '左揃え' }, lines: [[3, 14], [3, 9], [3, 12]] },
		{ key: 'center', label: { en: 'Align center', ja: '中央揃え' }, lines: [[3, 14], [5.5, 9], [4, 12]] },
		{ key: 'right', label: { en: 'Align right', ja: '右揃え' }, lines: [[3, 14], [8, 9], [5, 12]] }
	] as const;

	let pressed = $state({ bold: false, italic: false, underline: false });
	let align = $state<(typeof aligns)[number]['key']>('left');
	let focused = $state('bold');
	let toolbar: HTMLDivElement;

	// WAI-ARIA APG Toolbar: Tab で入るのは1か所だけ（ロービング tabindex）。中の移動は ← → で、2つのグループをまたいで端で回る
	function onkeydown(e: KeyboardEvent) {
		const els = [...toolbar.querySelectorAll('button')];
		const i = els.indexOf(document.activeElement as HTMLButtonElement);
		const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: -1 }[e.key];
		if (next === undefined || i < 0) return;
		e.preventDefault();
		els.at(next % els.length)!.focus();
	}
</script>

<div class="demo">
	<!-- フォーカスを受けるのは中のボタンなので、toolbar 自体には tabindex を付けない -->
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div
		bind:this={toolbar}
		role="toolbar"
		aria-label={text[lang].label}
		{onkeydown}
		onfocusin={(e) => (focused = (e.target as HTMLElement).dataset.key ?? focused)}
	>
		{#each styles as tool (tool.key)}
			<button
				type="button"
				class="btn {tool.key}"
				data-key={tool.key}
				aria-pressed={pressed[tool.key]}
				tabindex={focused === tool.key ? 0 : -1}
				onclick={() => (pressed[tool.key] = !pressed[tool.key])}
			>
				<span aria-hidden="true">{tool.icon}</span>
				<span class="visually-hidden">{tool.label[lang]}</span>
			</button>
		{/each}
		<!-- APG Toolbar の例: 1つだけ選ぶ揃え方は radiogroup にする。矢印キーではフォーカスが移るだけで、Enter / Space で選ぶ -->
		<div role="radiogroup" aria-label={text[lang].align}>
			{#each aligns as a (a.key)}
				<button
					type="button"
					role="radio"
					class="btn"
					data-key={a.key}
					aria-checked={align === a.key}
					tabindex={focused === a.key ? 0 : -1}
					onclick={() => (align = a.key)}
				>
					<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
						{#each a.lines as [x, w], row (row)}
							<line x1={x} x2={x + w} y1={5 + row * 5} y2={5 + row * 5} />
						{/each}
					</svg>
					<span class="visually-hidden">{a.label[lang]}</span>
				</button>
			{/each}
		</div>
	</div>
	<p
		style:text-align={align}
		class:bold={pressed.bold}
		class:italic={pressed.italic}
		class:underline={pressed.underline}
	>
		{text[lang].sample}
	</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
		width: min(100%, 22rem);
	}

	/* 狭いカードでは2段に折り返す（APG Toolbar は複数行のツールバーも認めている） */
	[role='toolbar'] {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		padding: 0.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	[role='radiogroup'] {
		display: flex;
		gap: 0.25rem;
		padding-left: 0.25rem;
		border-left: 1px solid var(--color-border);
	}

	[role='toolbar'] .btn {
		width: 2.75rem;
		padding: 0.25em;
		font-family: Georgia, serif;
	}

	.btn.bold {
		font-weight: 700;
	}

	.btn.italic {
		font-style: italic;
	}

	.btn.underline {
		text-decoration: underline;
	}

	line {
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
	}

	[aria-pressed='true'],
	[aria-checked='true'] {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	[aria-pressed='true']:hover,
	[aria-checked='true']:hover {
		background: var(--color-accent-hover);
	}

	p {
		margin: 0;
	}

	p.bold {
		font-weight: 700;
	}

	p.italic {
		font-style: italic;
	}

	p.underline {
		text-decoration: underline;
	}
</style>
