<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Text formatting', sample: 'The quick brown fox jumps over the lazy dog.' },
		ja: { label: '文字の書式', sample: 'いろはにほへと ちりぬるを わかよたれそ つねならむ' }
	};
	const tools = [
		{ key: 'bold', label: { en: 'Bold', ja: '太字' }, icon: 'B' },
		{ key: 'italic', label: { en: 'Italic', ja: '斜体' }, icon: 'I' },
		{ key: 'underline', label: { en: 'Underline', ja: '下線' }, icon: 'U' }
	] as const;

	let pressed = $state({ bold: false, italic: false, underline: false });
	let focused = $state(0);
	let buttons: HTMLButtonElement[] = $state([]);

	// WAI-ARIA APG Toolbar: Tab で入るのは1か所だけ（ロービング tabindex）。中の移動は ← → で行う
	function onkeydown(e: KeyboardEvent) {
		const count = tools.length;
		const next = {
			ArrowRight: (focused + 1) % count,
			ArrowLeft: (focused - 1 + count) % count,
			Home: 0,
			End: count - 1
		}[e.key];
		if (next === undefined) return;
		e.preventDefault();
		focused = next;
		buttons[next].focus();
	}
</script>

<div class="demo">
	<!-- フォーカスを受けるのは中のボタンなので、toolbar 自体には tabindex を付けない -->
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div role="toolbar" aria-label={text[lang].label} {onkeydown}>
		{#each tools as tool, i (tool.key)}
			<button
				bind:this={buttons[i]}
				type="button"
				class="btn {tool.key}"
				aria-pressed={pressed[tool.key]}
				tabindex={focused === i ? 0 : -1}
				onclick={() => {
					focused = i;
					pressed[tool.key] = !pressed[tool.key];
				}}
			>
				<span aria-hidden="true">{tool.icon}</span>
				<span class="visually-hidden">{tool.label[lang]}</span>
			</button>
		{/each}
	</div>
	<p class:bold={pressed.bold} class:italic={pressed.italic} class:underline={pressed.underline}>
		{text[lang].sample}
	</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
		width: min(100%, 22rem);
	}

	[role='toolbar'] {
		display: flex;
		gap: 0.25rem;
		padding: 0.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	[role='toolbar'] .btn {
		justify-content: center;
		width: 2.25rem;
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

	[aria-pressed='true'] {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	[aria-pressed='true']:hover {
		background: #194fae;
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
