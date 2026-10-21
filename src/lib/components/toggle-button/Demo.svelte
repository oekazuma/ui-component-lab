<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Mute', on: 'Sound is off', off: 'Sound is on' },
		ja: { label: 'ミュート', on: '音声オフ', off: '音声オン' }
	};

	let pressed = $state(false);
</script>

<!-- ラベルは固定し、押されているかどうかは aria-pressed で伝える -->
<div class="demo">
	<button type="button" class="btn" aria-pressed={pressed} onclick={() => (pressed = !pressed)}>
		<span aria-hidden="true">{pressed ? '🔇' : '🔈'}</span>
		{text[lang].label}
	</button>
	<p>{pressed ? text[lang].on : text[lang].off}</p>
</div>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 0.5rem;
	}

	[aria-pressed='true'] {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	[aria-pressed='true']:hover {
		background: var(--color-accent-hover);
	}

	p {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
