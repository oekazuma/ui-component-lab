<script lang="ts">
	import { asset } from '$app/paths';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			people: ['Aiko Tanaka', 'Ben Carter', 'Chen Wei'],
			more: (n: number) => `and ${n} more`,
			group: 'Project members',
			posted: 'posted 2 hours ago'
		},
		ja: {
			people: ['田中 愛子', 'ベン・カーター', 'チェン・ウェイ'],
			more: (n: number) => `ほか${n}人`,
			group: 'プロジェクトのメンバー',
			posted: '2時間前に投稿'
		}
	};
	// 2 人目は読み込めない画像の例。存在しないパスだとブラウザのコンソールに 404 が出るので、
	// 通信せずに読み込みに失敗する空の data URL を使う
	const photos = [asset('avatar-photo.svg'), 'data:,', null];
	const backgrounds = ['accent', 'text', 'muted'];
	const hidden = 2;
	let failed = $state(photos.map(() => false));
</script>

<div class="demo">
	<!-- 名前がほかに見えていないので、写真には名前を代替テキストとして付ける。頭文字の丸は見た目だけにし、名前は visually-hidden の文で伝える -->
	<ul class="group" aria-label={text[lang].group}>
		{#each text[lang].people as person, i (person)}
			<li>
				{#if photos[i] && !failed[i]}
					<img class="avatar" src={photos[i]} alt={person} width="44" height="44" onerror={() => (failed[i] = true)} />
				{:else}
					<span class="avatar initial {backgrounds[i]}" aria-hidden="true">{person.at(0)}</span>
					<span class="visually-hidden">{person}</span>
				{/if}
			</li>
		{/each}
		<li>
			<span class="avatar more" aria-hidden="true">+{hidden}</span>
			<span class="visually-hidden">{text[lang].more(hidden)}</span>
		</li>
	</ul>

	<!-- すぐ隣に名前があるので、写真は飾りとして alt を空にする。同じ名前が 2 回読み上げられるのを防ぐ -->
	<p class="byline">
		<img class="avatar small" src={photos[0]} alt="" width="32" height="32" />
		<span><strong>{text[lang].people[0]}</strong> · {text[lang].posted}</span>
	</p>
</div>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 1rem;
	}

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
		font-weight: 700;
	}

	.accent {
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	.text {
		background: var(--color-text);
		color: var(--color-bg);
	}

	/* --color-bg は --color-muted の上で 7.0:1（ダークでは 7.7:1） */
	.muted {
		background: var(--color-muted);
		color: var(--color-bg);
	}

	.more {
		background: var(--color-border);
		color: var(--color-text);
		font-size: 0.875rem;
	}

	.byline {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		font-size: 0.875rem;
	}

	.small {
		width: 2rem;
		height: 2rem;
		border: 0;
	}
</style>
