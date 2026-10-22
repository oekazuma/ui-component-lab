<script lang="ts">
	import { t } from './i18n';
	import { skillPath, systemsPath } from './paths';
	import type { Lang } from './types';

	let { lang }: { lang: Lang } = $props();
	let ui = $derived(t(lang));

	const repo = 'https://github.com/oekazuma/ui-component-lab';
</script>

<footer>
	<div class="text">
		<p>{ui.sourcesNote}</p>
		<ul class="pages">
			<li><a href={systemsPath(lang)}>{ui.systems}</a></li>
			<li><a href={skillPath(lang)}>{ui.skill}</a></li>
		</ul>
	</div>
	<!-- アイコンだけのリンク。名前は読み上げ用の文で、見える人にはマウスを乗せたときの説明（title）で伝える -->
	<ul class="icons">
		<li>
			<a href={repo} title={ui.repository}>
				<svg viewBox="0 0 16 16" width="22" height="22" aria-hidden="true" class="filled">
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
					/>
				</svg>
				<span class="visually-hidden">{ui.repository}{ui.external}</span>
			</a>
		</li>
		<li>
			<a href="{repo}/blob/main/LICENSE" title={ui.license}>
				<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
					<path d="M12 3v18M8 21h8M4 7h16M7 7l-3 6a3 3 0 0 0 6 0L7 7ZM17 7l-3 6a3 3 0 0 0 6 0l-3-6Z" />
				</svg>
				<span class="visually-hidden">{ui.license}{ui.external}</span>
			</a>
		</li>
	</ul>
</footer>

<style>
	footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem 2rem;
		max-width: 72rem;
		margin: 0 auto;
		padding: 1.5rem 1rem 3rem;
		border-top: 1px solid var(--color-border);
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	p {
		margin: 0 0 0.25rem;
	}

	.pages {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.icons {
		display: flex;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* 指で押しやすいよう、アイコンの周りも押せる範囲にする */
	.icons a {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 999px;
		color: var(--color-muted);
	}

	.icons a:hover {
		background: var(--color-surface);
		color: var(--color-text);
	}

	svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.75;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	svg.filled {
		fill: currentColor;
		stroke: none;
	}
</style>
