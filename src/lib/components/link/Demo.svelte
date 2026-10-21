<script lang="ts">
	import { asset } from '$app/paths';
	import { componentPath } from '#lib/paths.js';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			before: 'To run an action instead of moving to a page, use a ',
			link: 'button',
			after: '.',
			guide: 'Digital Agency guidance on link text (in Japanese)',
			newTab: 'opens in a new tab',
			file: 'Preview image of this site (PNG, 42 KB)'
		},
		ja: {
			before: 'ページを移動せずに操作を実行するときは',
			link: 'ボタン',
			after: 'を使います。',
			guide: 'デジタル庁のリンクテキストの指針',
			newTab: '新しいタブで開きます',
			file: 'このサイトの紹介画像（PNG:42KB）'
		}
	};
</script>

<!-- ネイティブの <a href> が移動・新しいタブで開く・履歴を受け持つ -->
<div class="demo">
	<p>
		{text[lang].before}<a href={componentPath(lang, 'button')}>{text[lang].link}</a>{text[lang].after}
	</p>
	<ul>
		<li>
			<!-- 新しいタブで開くことを、代替テキスト付きのアイコンで伝える（DADS 実装 link） -->
			<a href="https://design.digital.go.jp/dads/foundations/link-text/" target="_blank" rel="noopener">
				{text[lang].guide}<svg viewBox="0 0 48 48" width="16" height="16" role="img" aria-label={text[lang].newTab}>
					<path d="M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" />
				</svg>
			</a>
		</li>
		<li>
			<!-- 開く前に重さが分かるよう、形式と大きさをリンクの文言に含める（DADS リンクテキスト） -->
			<a href={asset('og.png')}>{text[lang].file}</a>
		</li>
	</ul>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
		max-width: 20rem;
	}

	p,
	ul {
		margin: 0;
	}

	ul {
		padding-left: 1.25rem;
	}

	/* 太さや大きさは周りの文字を動かすので変えず、下線の太さと色でホバーを示す（DADS リンクテキスト） */
	a {
		text-decoration-thickness: 1px;
		text-underline-offset: 0.2em;
	}

	a:visited {
		color: var(--color-visited);
	}

	a:hover {
		color: var(--color-accent-hover);
		text-decoration-thickness: 3px;
	}

	svg {
		margin-left: 0.2em;
		vertical-align: -0.15em;
		fill: currentColor;
	}
</style>
