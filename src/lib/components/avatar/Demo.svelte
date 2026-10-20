<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { people: ['Aiko Tanaka', 'Ben Carter', 'Chen Wei'], more: (n: number) => `and ${n} more`, group: 'Project members' },
		ja: { people: ['田中 愛子', 'ベン・カーター', 'チェン・ウェイ'], more: (n: number) => `ほか${n}人`, group: 'プロジェクトのメンバー' }
	};
	const colors = ['#1f5fd1', '#7a3fb3', '#0f7a55'];
	const hidden = 2;
</script>

<!-- 頭文字の丸は見た目だけにし、名前は visually-hidden の文で伝える -->
<ul class="group" aria-label={text[lang].group}>
	{#each text[lang].people as person, i (person)}
		<li>
			<span class="avatar" style:background={colors[i]} aria-hidden="true">{person.at(0)}</span>
			<span class="visually-hidden">{person}</span>
		</li>
	{/each}
	<li>
		<span class="avatar more" aria-hidden="true">+{hidden}</span>
		<span class="visually-hidden">{text[lang].more(hidden)}</span>
	</li>
</ul>

<style>
	.group {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li + li {
		margin-left: -0.5rem;
	}

	.avatar {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border: 2px solid var(--color-bg);
		border-radius: 50%;
		color: #fff;
		font-weight: 700;
	}

	.more {
		background: var(--color-border);
		color: var(--color-text);
		font-size: 0.875rem;
	}
</style>
