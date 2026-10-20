<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			title: 'Weekend in Kyoto',
			meta: '2 days · from $240',
			body: 'Temples in the morning, tea houses in the afternoon.',
			save: 'Save'
		},
		ja: {
			title: '週末の京都',
			meta: '2日間・36,000円から',
			body: '午前は寺社めぐり、午後は茶屋でひと休み。',
			save: '保存'
		}
	};

	const uid = $props.id();
	let saved = $state(false);
</script>

<!-- 1つの話題をまとめた article。中にボタンがあるため、カード全体をリンクやボタンにはしない -->
<article aria-labelledby="{uid}-title">
	<div class="media" aria-hidden="true"></div>
	<div class="content">
		<h3 id="{uid}-title">{text[lang].title}</h3>
		<p class="meta">{text[lang].meta}</p>
		<p>{text[lang].body}</p>
		<div class="actions">
			<button type="button" class="btn" aria-pressed={saved} onclick={() => (saved = !saved)}>
				<span aria-hidden="true">{saved ? '★' : '☆'}</span>
				{text[lang].save}
			</button>
		</div>
	</div>
</article>

<style>
	article {
		width: min(100%, 16rem);
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.08);
	}

	.media {
		height: 4.5rem;
		background: linear-gradient(135deg, #f3e2cf, #d8e8d4);
	}

	.content {
		padding: 0.75rem;
	}

	h3 {
		margin: 0;
		font-size: 1rem;
	}

	p {
		margin: 0.25rem 0 0;
		font-size: 0.875rem;
	}

	.meta {
		color: var(--color-muted);
		font-size: 0.8125rem;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-top: 0.75rem;
	}
</style>
