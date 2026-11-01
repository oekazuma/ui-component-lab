<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { reload: 'Reload' },
		ja: { reload: '再読み込み' }
	};
</script>

<!-- 一覧のサムネイル専用の、読み込み中の静止した絵。デモは 1.5 秒で読み込み後の姿に変わり、一覧ではスケルトンが見えないため -->
<div class="demo" data-preview>
	<div class="profile">
		<span class="bone image"></span>
		<span class="bone avatar"></span>
		<span class="lines">
			<span class="bone line short"></span>
			<span class="bone line"></span>
		</span>
	</div>
	<span class="btn">{text[lang].reload}</span>
</div>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
		width: min(100%, 18rem);
	}

	.profile {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
	}

	.image {
		grid-column: 1 / -1;
		height: 5rem;
		border-radius: var(--radius);
	}

	.avatar {
		flex: none;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
	}

	.lines {
		display: grid;
		flex: 1;
		gap: 0.4rem;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.bone {
		background: linear-gradient(
				90deg,
				var(--color-border) 25%,
				color-mix(in srgb, var(--color-border), var(--color-surface)) 50%,
				var(--color-border) 75%
			)
			0 0 / 200% 100%;
	}

	.line {
		height: 0.75rem;
		border-radius: 4px;
	}

	.short {
		width: 50%;
	}
</style>
