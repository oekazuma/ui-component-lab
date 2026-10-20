<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Application steps',
			steps: ['Applicant', 'Address', 'Documents', 'Review'],
			done: 'completed',
			back: 'Back',
			next: 'Next',
			heading: (n: number, name: string) => `Step ${n} of 4: ${name}`
		},
		ja: {
			label: '申請の手順',
			steps: ['申請者情報', '住所', '書類', '確認'],
			done: '完了',
			back: '戻る',
			next: '次へ',
			heading: (n: number, name: string) => `ステップ ${n}/4: ${name}`
		}
	};

	let current = $state(0);
	const last = text.en.steps.length - 1;
</script>

<!-- ステップ表示そのものは操作できない。現在地は aria-current="step"、完了は文字で伝える。
	端で「戻る」「次へ」を disabled にするとフォーカスが失われるため、aria-disabled にとどめる -->
<div class="demo">
	<ol aria-label={text[lang].label}>
		{#each text[lang].steps as name, i (name)}
			<li class:done={i < current} aria-current={i === current ? 'step' : undefined}>
				<span class="num" aria-hidden="true">{i < current ? '✓' : i + 1}</span>
				{name}
				{#if i < current}<span class="visually-hidden">（{text[lang].done}）</span>{/if}
			</li>
		{/each}
	</ol>
	<p aria-live="polite">{text[lang].heading(current + 1, text[lang].steps[current])}</p>
	<div class="buttons">
		<button type="button" class="btn" aria-disabled={current === 0} onclick={() => current > 0 && current--}>
			{text[lang].back}
		</button>
		<button
			type="button"
			class="btn btn-primary"
			aria-disabled={current === last}
			onclick={() => current < last && current++}
		>
			{text[lang].next}
		</button>
	</div>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.75rem;
		width: min(100%, 28rem);
	}

	ol {
		display: flex;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		color: var(--color-muted);
		font-size: 0.8125rem;
		text-align: center;
	}

	.num {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 2px solid currentColor;
		border-radius: 50%;
		font-weight: 700;
	}

	.done {
		color: var(--color-text);
	}

	.done .num {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	[aria-current='step'] {
		color: var(--color-accent);
		font-weight: 700;
	}

	p {
		margin: 0;
		font-weight: 700;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
	}

	[aria-disabled='true'] {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
