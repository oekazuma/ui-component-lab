<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Time zone',
			selected: 'Selected:',
			options: ['Auckland', 'Bangkok', 'Berlin', 'Cairo', 'Chicago', 'London', 'Mumbai', 'New York', 'Sydney', 'Tokyo']
		},
		ja: {
			label: 'タイムゾーン',
			selected: '選択中:',
			options: ['オークランド', 'カイロ', 'シカゴ', 'シドニー', 'ニューヨーク', 'バンコク', 'ベルリン', 'ムンバイ', 'ロンドン', '東京']
		}
	};

	const uid = $props.id();
	let value = $state('');
</script>

<!-- size 属性を付けた <select> は開閉しないリストになり、role="listbox" として扱われる -->
<div class="demo">
	<label for="{uid}-list">{text[lang].label}</label>
	<select id="{uid}-list" size="5" bind:value>
		{#each text[lang].options as option (option)}
			<option>{option}</option>
		{/each}
	</select>
	<p aria-live="polite">{value ? `${text[lang].selected} ${value}` : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 14rem);
	}

	label {
		font-size: 0.875rem;
	}

	select {
		padding: 0.25rem 0;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	option {
		padding: 0.2em 0.5em;
	}

	p {
		min-height: 1.6em;
		margin: 0.25rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
