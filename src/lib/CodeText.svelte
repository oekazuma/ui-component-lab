<script lang="ts">
	let { text }: { text: string } = $props();

	// data.ts の文では `…` で囲んだ部分をコードとして書く。` で分けると奇数番目が囲まれた部分になる
	let parts = $derived(text.split('`'));
</script>

{#each parts as part, i (i)}{#if i % 2}<code>{part}</code>{:else}{part}{/if}{/each}
