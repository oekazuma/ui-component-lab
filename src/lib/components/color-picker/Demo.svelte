<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Background color', value: 'Value:' },
		ja: { label: '背景色', value: '値:' }
	};

	const uid = $props.id();
	// 初期値とおすすめの色は、利用者が選ぶ色そのもののデータなので、--color-* のトークンにはできない
	let value = $state('#ff8800');
	let status = $state('');
	const presets = ['#e53935', '#43a047', '#1e88e5', '#8e24aa'];
</script>

<!-- ネイティブの <input type="color">。ピッカー（スペクトルなどのポップアップ）はページではなくブラウザが描き、見た目も中のキー操作もブラウザと OS で変わる。
	Enter / Space で開くのもブラウザ任せ。値は alpha と colorspace を付けない限り、常に小文字の #rrggbb（7文字）で、空にはならない。
	input は色を動かしている間も発火し続けるので、プレビューと文字は oninput で追従させる。文字を aria-live にしないのは、動かすたびに読み上げられるため。
	change はピッカーを閉じたときに 1 回だけ発火するので、読み上げ用の状態表示はそちらで更新する。
	色見本だけでは色を見分けにくい人に値が伝わらないので、値は文字でも出す（WCAG 1.4.1）。
	list の候補（datalist）をピッカーの先頭に出すかはブラウザしだいで、出さないブラウザもある -->
<div class="demo">
	<label for="{uid}-color">{text[lang].label}</label>
	<div class="row">
		<input id="{uid}-color" type="color" list="{uid}-presets" {value}
			oninput={(e) => (value = e.currentTarget.value)}
			onchange={(e) => (status = `${text[lang].label}: ${e.currentTarget.value}`)}
		/>
		<!-- 背景色は選んだ色そのものなのでトークンにできない。枠線は、背景に近い色でも輪郭が消えないようにする。
			forced-colors では背景色が上書きされてプレビューの意味がなくなるので、色を守る -->
		<span class="swatch" style:background-color={value} aria-hidden="true"></span>
		<p>{text[lang].value} {value}</p>
	</div>
	<p class="visually-hidden" role="status">{status}</p>
	<datalist id="{uid}-presets">
		{#each presets as preset (preset)}
			<option value={preset}></option>
		{/each}
	</datalist>
</div>

<style>
	.demo {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.25rem;
		width: min(100%, 18rem);
	}

	label {
		font-size: 0.875rem;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.swatch {
		width: 3rem;
		height: 2rem;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		forced-color-adjust: none;
	}

	p {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
