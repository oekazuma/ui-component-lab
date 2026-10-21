<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Time zone',
			selected: 'Selected:',
			cities: ['Chicago', 'New York', 'London', 'Berlin', 'Cairo', 'Mumbai', 'Bangkok', 'Tokyo', 'Sydney', 'Auckland']
		},
		ja: {
			label: 'タイムゾーン',
			selected: '選択中:',
			cities: ['シカゴ', 'ニューヨーク', 'ロンドン', 'ベルリン', 'カイロ', 'ムンバイ', 'バンコク', '東京', 'シドニー', 'オークランド']
		}
	};
	// OS の設定画面のように、UTC との時差（夏時間でないとき）の順に並べる。
	// 文字入力での移動は選択肢の先頭の文字で探すので、時差を先に書くと「(」で始まって効かなくなる。都市名を先に置く
	const offsets = ['−06:00', '−05:00', '±00:00', '+01:00', '+02:00', '+05:30', '+07:00', '+09:00', '+10:00', '+12:00'];
	let options = $derived(
		text[lang].cities.map((city, i) => (lang === 'ja' ? `${city}（UTC${offsets[i]}）` : `${city} (UTC${offsets[i]})`))
	);

	const uid = $props.id();
	let value = $state('');
</script>

<!-- size 属性を付けた <select> は開閉しないリストになり、role="listbox" として扱われる -->
<div class="demo">
	<label for="{uid}-list">{text[lang].label}</label>
	<select id="{uid}-list" size="5" bind:value>
		{#each options as option (option)}
			<option>{option}</option>
		{/each}
	</select>
	<p aria-live="polite">{value ? `${text[lang].selected} ${value}` : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 16rem);
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
