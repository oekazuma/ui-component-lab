<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Notifications', on: 'On', off: 'Off' },
		ja: { label: '通知', on: 'オン', off: 'オフ' }
	};

	let checked = $state(false);
</script>

<!-- ネイティブのチェックボックスに role="switch" を付けると、Space での切替とオン・オフの読み上げを引き継げる -->
<label>
	<span>{text[lang].label}</span>
	<input type="checkbox" role="switch" bind:checked />
	<span class="state" aria-hidden="true">{checked ? text[lang].on : text[lang].off}</span>
</label>

<style>
	label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	input {
		appearance: none;
		position: relative;
		width: 2.75rem;
		height: 1.5rem;
		margin: 0;
		border: 1px solid var(--color-muted);
		border-radius: 999px;
		background: var(--color-surface);
		cursor: pointer;
		transition: background-color 0.15s;
	}

	input::before {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: calc(1.5rem - 6px);
		height: calc(1.5rem - 6px);
		border-radius: 50%;
		background: var(--color-muted);
		transition: translate 0.15s;
	}

	input:checked {
		border-color: var(--color-accent);
		background: var(--color-accent);
	}

	input:checked::before {
		background: var(--color-accent-text);
		translate: 1.25rem 0;
	}

	.state {
		min-width: 2.5em;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	@media (prefers-reduced-motion: reduce) {
		input,
		input::before {
			transition: none;
		}
	}
</style>
