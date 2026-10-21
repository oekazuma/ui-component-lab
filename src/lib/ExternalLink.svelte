<script lang="ts">
	let { href, text, label }: { href: string; text: string; label: string } = $props();

	// 矢印だけが次の行に落ちないよう、最後の 1 文字と矢印を折り返さないまとまりにする。
	// 改行を禁じる文字（U+2060）を挟む方法は、Chrome では画像の前で効かない
	let chars = $derived(Array.from(text));
	let head = $derived(chars.slice(0, -1).join(''));
	let tail = $derived(chars.at(-1));
</script>

<!-- 同じタブで開く。行き先が外部サイトであることだけを、矢印と読み上げ用の文で伝える -->
<a {href}
	>{head}<span class="tail"
		>{tail}<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
			<path d="M4.5 2.5h5v5M9.5 2.5 3 9" />
		</svg></span
	><span class="visually-hidden">{label}</span></a
>

<style>
	.tail {
		white-space: nowrap;
	}

	svg {
		margin-left: 0.2em;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
	}
</style>
