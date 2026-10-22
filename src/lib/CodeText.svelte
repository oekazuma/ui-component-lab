<script lang="ts">
	let { text }: { text: string } = $props();

	// data.ts の文では `…` で囲んだ部分をコードとして書く。` で分けると奇数番目が囲まれた部分になる
	let parts = $derived(text.split('`'));

	// 全角の括弧や句読点の隣では、コードの背景の余白がすき間に見えて間延びするので、その側の余白をなくす
	const opensBefore = (s: string | undefined) => /[（「『【［]$/.test(s ?? '');
	const closesAfter = (s: string | undefined) => /^[）」』】］、。]/.test(s ?? '');
</script>

{#each parts as part, i (i)}{#if i % 2}<code class:open={opensBefore(parts[i - 1])} class:close={closesAfter(parts[i + 1])}
			>{part}</code
		>{:else}{part}{/if}{/each}

<style>
	.open {
		padding-left: 0;
	}

	.close {
		padding-right: 0;
	}
</style>
