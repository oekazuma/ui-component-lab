<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Storage used', add: 'Add 10 GB', remove: 'Delete 10 GB', of: 'of 100 GB' },
		ja: { label: 'ストレージ使用量', add: '10GB 追加', remove: '10GB 削除', of: '/ 100GB' }
	};

	const uid = $props.id();
	let used = $state(40);
</script>

<!-- <meter> は範囲の中の現在値を示す。low / high を超えるとブラウザが色を黄や赤に変える -->
<div class="demo">
	<label for="{uid}-meter">{text[lang].label}</label>
	<meter id="{uid}-meter" min="0" max="100" low="70" high="90" optimum="0" value={used}>{used}%</meter>
	<p>{used}GB {text[lang].of}</p>
	<div class="buttons">
		<button type="button" class="btn" onclick={() => (used = Math.max(0, used - 10))}>
			{text[lang].remove}
		</button>
		<button type="button" class="btn" onclick={() => (used = Math.min(100, used + 10))}>
			{text[lang].add}
		</button>
	</div>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 18rem);
	}

	label {
		font-size: 0.875rem;
	}

	meter {
		width: 100%;
		height: 1.25rem;
	}

	p {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
</style>
