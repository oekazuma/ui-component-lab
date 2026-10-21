<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Application steps',
			steps: ['Applicant', 'Address', 'Documents (optional)', 'Review'],
			done: 'completed',
			skipped: 'Skipped',
			back: 'Back',
			next: 'Next',
			submit: 'Submit',
			heading: (n: number, name: string) => `Step ${n} of 4: ${name}`,
			optional: 'Nothing is attached, so Next skips this step.',
			progress: (reached: number) => `4 steps in total; reached step ${reached}`,
			submitted: 'Your application has been submitted.'
		},
		ja: {
			label: '申請の手順',
			steps: ['申請者情報', '住所', '添付書類（任意）', '確認'],
			done: '完了',
			skipped: 'スキップ',
			back: '戻る',
			next: '次へ',
			submit: '申請する',
			heading: (n: number, name: string) => `ステップ ${n}/4: ${name}`,
			optional: '書類を添付していないので、「次へ」でこの段階をスキップします。',
			progress: (reached: number) => `全4ステップ中、${reached}ステップ目まで到達済み`,
			submitted: '申請を受け付けました。'
		}
	};
	const last = text.en.steps.length - 1;
	// 添付書類の段階。このデモには添付の操作がないので、先へ進むと必ずスキップ扱いになる
	const optional = 2;

	let current = $state(0);
	let furthest = $state(0);
	let submitted = $state(false);
	const status: ('done' | 'skipped' | undefined)[] = $state([]);

	function next() {
		status[current] = current === optional ? 'skipped' : 'done';
		current++;
		furthest = Math.max(furthest, current);
	}

	function submit() {
		status[last] = 'done';
		submitted = true;
	}
</script>

<!-- 一度たどり着いた段階は、番号の部分をボタンにして戻れるようにする（DADS 実装 step-navigation）。
	端で「戻る」を disabled にするとフォーカスが失われるため、aria-disabled にとどめる -->
<div class="demo">
	<p class="visually-hidden">{text[lang].progress(furthest + 1)}</p>
	<ol aria-label={text[lang].label}>
		{#each text[lang].steps as name, i (name)}
			<li
				class={status[i]}
				aria-current={i === current && !submitted ? 'step' : undefined}
			>
				{#snippet header()}
					<span class="num" aria-hidden="true">{status[i] === 'done' ? '✓' : i + 1}</span>
					<span class="name">{name}</span>
					{#if status[i] === 'done'}<span class="visually-hidden">（{text[lang].done}）</span>{/if}
					{#if status[i] === 'skipped'}<span class="note">{text[lang].skipped}</span>{/if}
				{/snippet}
				{#if i <= furthest && i !== current && !submitted}
					<button type="button" class="header" onclick={() => (current = i)}>{@render header()}</button>
				{:else}
					<span class="header">{@render header()}</span>
				{/if}
			</li>
		{/each}
	</ol>
	{#if submitted}
		<p class="heading" tabindex="-1" {@attach (el) => el.focus()}>{text[lang].submitted}</p>
	{:else}
		<div class="status" aria-live="polite">
			<p class="heading">{text[lang].heading(current + 1, text[lang].steps[current])}</p>
			{#if current === optional}<p class="hint">{text[lang].optional}</p>{/if}
		</div>
		<div class="buttons">
			<button type="button" class="btn" aria-disabled={current === 0} onclick={() => current > 0 && current--}>
				{text[lang].back}
			</button>
			<!-- 最後の段階でも同じボタンのまま文言を変え、押した直後のフォーカスを保つ -->
			<button type="button" class="btn btn-primary" onclick={current === last ? submit : next}>
				{current === last ? text[lang].submit : text[lang].next}
			</button>
		</div>
	{/if}
</div>

<style>
	.demo {
		display: grid;
		gap: 0.75rem;
		width: min(100%, 28rem);
	}

	ol {
		display: flex;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		flex: 1;
		min-width: 0;
		color: var(--color-muted);
		font-size: 0.8125rem;
		text-align: center;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		width: 100%;
		min-height: 44px;
		padding: 0.25rem 0;
		border: 0;
		border-radius: var(--radius);
		background: none;
		color: inherit;
		font: inherit;
		overflow-wrap: anywhere;
	}

	button.header {
		cursor: pointer;
	}

	button.header .name {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	button.header:hover {
		background: var(--color-bg);
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

	.skipped {
		color: var(--color-text);
	}

	.skipped .num {
		border-style: dashed;
	}

	.note {
		color: var(--color-muted);
		font-size: 0.75rem;
	}

	[aria-current='step'] {
		color: var(--color-accent);
		font-weight: 700;
	}

	p {
		margin: 0;
	}

	.status {
		display: grid;
		gap: 0.25rem;
	}

	.heading {
		font-weight: 700;
	}

	.hint {
		color: var(--color-muted);
		font-size: 0.875rem;
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
