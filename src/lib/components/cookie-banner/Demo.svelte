<script lang="ts">
	import { tick } from 'svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Cookies on Example Library',
			heading: 'Cookies on Example Library',
			essential: 'We use some essential cookies to make this site work.',
			optional: 'We would also like to use analytics cookies, so we can see how the site is used and improve it.',
			accept: 'Accept analytics cookies',
			reject: 'Reject analytics cookies',
			details: 'View cookies',
			accepted: 'You have accepted analytics cookies. You can change your cookie settings at any time.',
			rejected: 'You have rejected analytics cookies. You can change your cookie settings at any time.',
			hide: 'Hide cookie message',
			settings: 'Cookie settings',
			would: 'A real site would open the cookies page',
			wouldSettings: 'A real site would open the cookies page. Here, the banner asks again',
			hidden: 'The cookie message is hidden'
		},
		ja: {
			label: 'サンプル図書館の Cookie',
			heading: 'サンプル図書館の Cookie',
			essential: 'このサイトは、動作に必要な Cookie を使っています。',
			optional: 'あわせて、サイトの使われ方を調べて改善するために、分析用の Cookie も使いたいと考えています。',
			accept: '分析用 Cookie を受け入れる',
			reject: '分析用 Cookie を拒否する',
			details: 'Cookie の一覧を見る',
			accepted: '分析用 Cookie を受け入れました。Cookie の設定はいつでも変更できます。',
			rejected: '分析用 Cookie を拒否しました。Cookie の設定はいつでも変更できます。',
			hide: 'Cookie のメッセージを隠す',
			settings: 'Cookie の設定',
			would: '実際のサイトでは、Cookie のページへ移動します',
			wouldSettings: '実際のサイトでは、Cookie のページへ移動します。ここでは、バナーでもう一度尋ねます',
			hidden: 'Cookie のメッセージを隠しました'
		}
	};

	const uid = $props.id();
	let choice = $state<'ask' | 'accepted' | 'rejected' | 'hidden'>('ask');
	let note = $state<'' | 'details' | 'settings' | 'hidden'>('');
	// 同じ文を続けて出しても読み上げ直されるよう、押すたびに status の中身を作り直す
	let stamp = $state(0);
	function say(next: typeof note) {
		note = next;
		stamp++;
	}
	let confirmation = $state<HTMLElement>();
	let settings = $state<HTMLButtonElement>();

	// 押したボタンは質問ごと消えるので、確認の文へフォーカスを移す。移さないとフォーカスは body に落ちる
	async function choose(next: 'accepted' | 'rejected') {
		choice = next;
		note = '';
		await tick();
		confirmation?.focus();
	}

	// 隠すボタンも消えるので、常に残る「Cookie の設定」へフォーカスを移す
	async function hide() {
		choice = 'hidden';
		say('hidden');
		await tick();
		settings?.focus();
	}
</script>

<div class="demo">
	<!-- GOV.UK の Cookie banner: 名前を付けた region。確認の文には見出しがないので、見出しを参照せず aria-label にして、質問のときも確認のときも同じ名前にする -->
	{#if choice !== 'hidden'}
		<section id={uid} aria-label={text[lang].label}>
			{#if choice === 'ask'}
				<h3>{text[lang].heading}</h3>
				<p>{text[lang].essential}</p>
				<p>{text[lang].optional}</p>
				<div class="actions">
					<!-- 受け入れと拒否は同じ見た目・同じ大きさにし、違いはラベルだけにする -->
					<button type="button" class="btn" onclick={() => choose('accepted')}>{text[lang].accept}</button>
					<button type="button" class="btn" onclick={() => choose('rejected')}>{text[lang].reject}</button>
					<!-- デモなので移動はせず、行き先を表示する（href は prerender の存在チェックを通すため自身の section を指す） -->
					<a
						href="#{uid}"
						onclick={(e) => {
							e.preventDefault();
							say('details');
						}}>{text[lang].details}</a
					>
				</div>
			{:else}
				<!-- GOV.UK のクライアント側の実装: tabindex="-1" と role="alert" を付けた確認の文にフォーカスを移す -->
				<p role="alert" tabindex="-1" bind:this={confirmation}>
					{choice === 'accepted' ? text[lang].accepted : text[lang].rejected}
				</p>
				<div class="actions">
					<button type="button" class="btn" onclick={hide}>{text[lang].hide}</button>
				</div>
			{/if}
		</section>
	{/if}
	<div class="footer">
		<button
			type="button"
			class="btn"
			bind:this={settings}
			onclick={() => {
				choice = 'ask';
				say('settings');
			}}>{text[lang].settings}</button
		>
	</div>
	<p role="status">
		{#key stamp}<span>{{ '': '', details: text[lang].would, settings: text[lang].wouldSettings, hidden: text[lang].hidden }[note]}</span>{/key}
	</p>
</div>

<style>
	.demo {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.75rem;
		width: min(100%, 36rem);
	}

	/* ページの流れの中に置く。position: fixed にするとフォーカス中の要素を覆い隠すことがある（GOV.UK、WCAG 2.4.11） */
	section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.5rem;
		padding: 0.875rem 1rem;
		border: 1px solid var(--color-border);
		border-left: 6px solid var(--color-accent);
		background: var(--color-bg);
	}

	h3 {
		margin: 0;
		font-size: 1.125rem;
	}

	section p {
		margin: 0;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 0.75rem;
		padding-top: 0.25rem;
	}

	.footer {
		display: flex;
		justify-content: flex-end;
	}

	[role='status'] {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
		text-align: center;
	}
</style>
