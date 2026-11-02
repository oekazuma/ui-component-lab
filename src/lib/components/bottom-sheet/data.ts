import type { ComponentData } from '#lib/types.js';

export default {
	id: 'bottom-sheet',
	category: 'overlay',
	names: { en: 'Bottom sheet', ja: 'ボトムシート' },
	aliases: [
		{ name: 'Sheet', source: 'React Aria', url: 'https://react-aria.adobe.com/Sheet' }
	],
	searchTerms: ['ハーフモーダル', '下から出るパネル'],
	summary: {
		en: 'A panel anchored to the bottom edge of the screen that shows secondary content, mainly on phones.',
		ja: '画面の下端に固定して、補助的な内容を見せるパネルです。おもにスマートフォンで使います。'
	},
	appearance: {
		en: 'A panel along the bottom edge, as wide as the screen on a phone. Material Design 3 rounds its top corners, and it often has a small handle bar at the top. A modal one dims the page behind it. This demo is a store-details sheet with a handle button, a title, a Close button and two lines of text; the handle button makes it taller.',
		ja: '画面の下端に沿ったパネルで、スマートフォンでは画面の幅いっぱいになります。Material Design 3 では上の角を丸くし、上端に小さな持ち手の印を付けることがよくあります。モーダルのものは、後ろのページを暗くします。このデモは店舗の詳細を見せるシートで、持ち手のボタン、タイトル、「閉じる」ボタン、2行の文字があり、持ち手のボタンで高さが変わります。'
	},
	behavior: [
		{
			en: 'There are two kinds. A modal bottom sheet appears in front of the app, disables everything else, and stays until the person confirms, dismisses it or finishes a required action. A standard bottom sheet sits alongside the screen’s main UI, so people can see and use both at the same time.',
			ja: '2種類あります。モーダルのボトムシートはアプリの前に出て、ほかの機能をすべて使えなくし、確定するか閉じるか、必要な操作を終えるまで残ります。標準のボトムシートは画面の主な部分と並んで置かれ、両方を同時に見て使えます。'
		},
		{
			en: 'It can rest at more than one height. Material Design 3 caps the starting height of a modal bottom sheet at 50% of the screen so the top actions are within reach, and a taller one can be pulled to full screen and scrolled inside. Apple’s sheets can rest at a medium detent, about half of the fully expanded height, and at a large detent.',
			ja: '高さを複数にでき、その高さで止まります。Material Design 3 は、上のほうの操作に手が届くよう、モーダルのボトムシートの最初の高さを画面の50%までにしています。内容が多いときは全画面まで引き上げて、中でスクロールします。Apple のシートは、全開の高さの半分ほどの medium と、全開の large の2つの高さで止まれます。'
		},
		{
			en: 'The handle changes the height. Material Design 3 says it can be dragged or selected, and selecting it should step through the preset heights or close the sheet. Apple says people can drag the grabber or tap it to cycle through the detents.',
			ja: '持ち手で高さを変えます。Material Design 3 は、持ち手をドラッグしても選んでもよく、選ぶと決まった高さを順に切り替えるか、シートを閉じるのがよいとしています。Apple は、グラバーをドラッグするかタップして、高さを順に切り替えられるとしています。'
		},
		{
			en: 'A modal one closes when the person picks an item or action in it, taps the scrim, swipes the sheet down, or uses a close control inside a full-screen sheet. Tapping the scrim should always close it. Apple says people expect to swipe down to dismiss a sheet, and to be asked to confirm with an action sheet if they have unsaved changes.',
			ja: 'モーダルのものは、中の項目や操作を選ぶ、スクリムをタップする、シートを下にスワイプする、全画面のシートで閉じる操作を使う、のいずれかで閉じます。スクリムをタップしたときは、必ず閉じます。Apple は、シートは下にスワイプして閉じると利用者が期待しているとし、保存していない変更があるときは、アクションシートで確認するよう案内しています。'
		},
		{
			en: 'On the web, a modal one is a modal dialog. The WAI-ARIA Authoring Practices say the content outside it is inert, focus moves into it when it opens, Tab stays inside it, Esc closes it, and focus returns to the element that opened it. They strongly recommend a visible close button.',
			ja: 'ウェブでは、モーダルのものはモーダルダイアログです。WAI-ARIA オーサリング プラクティスは、外側の内容は操作できなくなり、開くとフォーカスが中に移り、Tab キーは中にとどまり、Esc で閉じ、フォーカスは開いた要素に戻るとしています。見える閉じるボタンを置くことも強く勧めています。'
		},
		{
			en: 'In this demo, the sheet is a native modal `<dialog>`. To make the movement easy to see, it comes up from the bottom edge of the demo frame and dims only the frame. On a real page, it comes up from the bottom of the screen and dims the whole page.',
			ja: 'このデモでは、シートをネイティブのモーダル `<dialog>` で作っています。動きが分かりやすいよう、デモの枠の下端から出して、枠の中だけを暗くします。実際のページでは、画面の下端から出て、ページ全体を暗くします。'
		},
		{
			en: 'In this demo, the handle is a button that switches between about half of the frame and the full frame, and its `aria-expanded` tells which one it is in. The sheet cannot be dragged and does not close on a swipe down, so every change of height and every way to close it works with a single tap or click. It starts at about half each time it opens.',
			ja: 'このデモでは、持ち手はボタンで、枠の半分ほどの高さと枠いっぱいの高さを切り替え、今どちらかは `aria-expanded` で伝えます。シートはドラッグできず、下へのスワイプでも閉じません。高さの変更も閉じる操作も、1回のタップかクリックでできます。開くたびに、半分ほどの高さから始まります。'
		},
		{
			en: 'In this demo, the Close button, Esc, and a click on the dimmed part of the frame or anywhere outside the frame all close it, and focus returns to the button that opened it. The slide and the change of height are skipped when the system asks for reduced motion.',
			ja: 'このデモでは、「閉じる」ボタン、Esc、枠の中の暗い部分や枠の外のクリックのどれでも閉じ、フォーカスは開いたボタンに戻ります。システムが動きを減らす設定のときは、すべり出る動きと高さの変化を省きます。'
		}
	],
	keyboard: [
		{
			key: 'Enter / Space',
			action: {
				en: 'On the button that opens the sheet, opens it. On the handle, switches between the heights; Material Design 3 describes the same keys for its handle.',
				ja: 'シートを開くボタンでは、シートを開きます。持ち手では、高さを切り替えます。Material Design 3 の持ち手でも、同じキーを挙げています。'
			}
		},
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between the controls in the sheet; in a modal one, focus does not go to the page behind. In this demo the handle is the first stop.',
				ja: 'シートの中の操作できる要素の間を移動します。モーダルのものでは、後ろのページには移りません。このデモでは、持ち手が最初の停止位置です。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes a modal sheet and returns focus to the control that opened it.',
				ja: 'モーダルのシートを閉じ、開いたきっかけの要素にフォーカスを戻します。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Modal bottom sheet', ja: 'モーダルのボトムシート' },
			description: {
				en: 'Appears in front of the app with a scrim and blocks the rest of it. Material Design 3 uses it as an alternative to inline menus or simple dialogs on mobile, and says modal bottom sheets are for mobile apps only.',
				ja: 'アプリの前にスクリムを敷いて出て、そのほかの部分を操作できなくします。Material Design 3 は、スマートフォンでインラインのメニューや簡単なダイアログの代わりに使うものとし、モーダルのボトムシートはモバイルアプリだけで使うとしています。'
			}
		},
		{
			name: { en: 'Standard bottom sheet', ja: '標準のボトムシート' },
			description: {
				en: 'Stays beside the main UI so both can be used together, for example an audio player beside an album list. On iOS and iPadOS, Apple’s nonmodal sheet works the same way; its example is the Notes format sheet.',
				ja: '主な部分と並べて置き、両方を一緒に使えます。たとえば、アルバムの一覧と並べる音楽プレーヤーです。Apple の iOS と iPadOS の非モーダルなシートも同じ働きで、例として「メモ」の書式のシートを挙げています。'
			}
		},
		{
			name: { en: 'Half and full height', ja: '半分の高さと全面の高さ' },
			description: {
				en: 'Material Design 3 lets a sheet go from a preview height to full-screen height, with a collapse icon in an app bar on a full-height standard sheet. Apple’s medium and large detents are the same idea; specifying only medium keeps a sheet from expanding to full height.',
				ja: 'Material Design 3 では、シートはプレビューの高さから全画面の高さまで動かせ、全画面の高さの標準のシートには、アプリバーに元の位置へ戻す折りたたみのアイコンを置きます。Apple の medium と large の2つの高さも同じ考え方で、medium だけを指定すると、全開の高さまで広がりません。'
			}
		},
		{
			name: { en: 'Drawer on the bottom edge', ja: '下端に付けるドロワー' },
			description: {
				en: 'Web libraries put a drawer or sheet on the bottom edge: MUI sets `anchor="bottom"` on a Drawer, Bootstrap adds `.offcanvas-bottom` to an offcanvas, and React Aria’s Sheet takes `position="bottom"`, which it describes as a mobile sheet.',
				ja: 'ウェブのライブラリは、ドロワーやシートを下端に付けて作ります。MUI は Drawer に `anchor="bottom"` を、Bootstrap はオフキャンバスに `.offcanvas-bottom` を指定し、React Aria の Sheet は `position="bottom"` を指定でき、これをモバイル向けのシートとしています。'
			}
		},
		{
			name: { en: 'Side sheet on large screens', ja: '大きな画面ではサイドシート' },
			description: {
				en: 'Material Design 3 gives a bottom sheet a default maximum width on medium and expanded screens, and says that on expanded screens such as desktops it can be swapped for a side sheet with similar content.',
				ja: 'Material Design 3 は、中くらいの画面と大きな画面では、ボトムシートに既定の最大幅を持たせるとしています。デスクトップのような大きな画面では、同じような内容のサイドシートに替えてもよいとしています。'
			}
		}
	],
	usage: [
		{
			en: 'Use it for supplementary content and actions on a mobile screen, such as menu items in a list or grid, actions, or extra information. Material Design 3 says the content should be additional or secondary, not the app’s main content, and that it can be dismissed so people can get back to the main content.',
			ja: 'スマートフォンの画面で、補助的な内容や操作を見せるときに使います。たとえば、リストやグリッドのメニュー項目、操作、追加の情報です。Material Design 3 は、内容は追加のものや副次的なもので、アプリの主な内容ではないとし、閉じて主な内容に戻れるとしています。'
		},
		{
			en: 'Choose the kind by how the sheet relates to the screen. Use a standard sheet for content that complements the screen, such as a music player beside an album list. Use a modal one as an alternative to an inline menu or a simple dialog on mobile, especially for a long list of actions or items that need longer descriptions and icons; its blocking behavior helps people focus on their choices. Apple’s sheets are for a scoped task closely related to the current context, and it suggests alternatives such as a full-screen view for complex or prolonged flows. On larger screens, Material Design 3 suggests a non-transient surface such as a floating sheet for more complex tasks and flows.',
			ja: '画面との関係で種類を選びます。アルバムの一覧と並べる音楽プレーヤーのように、画面の内容を補う場合は標準のシートを使います。スマートフォンでインラインのメニューや簡単なダイアログの代わりにするときは、特に長い操作の一覧や、長い説明とアイコンが要る項目の場合に、モーダルを使います。ふさぐ動きが、選択肢に集中する助けになります。Apple のシートは、今の文脈と深く関わる範囲の限られた作業のためのもので、複雑で長い流れには全画面の表示などの別の方法を勧めています。Material Design 3 は、大きな画面では、より複雑な作業や流れには、フローティングシートのような消えない面を勧めています。'
		},
		{
			en: 'Check where each source’s guidance applies. Material Design 3 lists bottom sheets as available for Flutter, Android Views and Jetpack Compose and unavailable for the Web. Apple’s page covers more than a bottom panel: on macOS a sheet is a card floating on its parent window, for iPadOS apps it prefers page or form sheets that centre the content on a dimmed background, and for visionOS it says to avoid a sheet that emerges from the bottom edge of a window. The resizable sheet with detents and a grabber is in its iOS and iPadOS section, where its advice on the medium detent is written for iPhone apps. So that guidance on heights and gestures is written for apps, not for websites.',
			ja: '資料ごとに、指針が当てはまる範囲を確かめます。Material Design 3 は、ボトムシートを Flutter、Android Views、Jetpack Compose 向けには提供し、Web 向けには提供していないとしています。Apple のページが扱うのは下端のパネルだけではありません。macOS ではシートは親のウインドウの上に浮かぶカードで、iPadOS のアプリでは内容を暗くした背景の中央に置くページシートかフォームシートを勧め、visionOS ではウインドウの下端から出るシートを避けるよう案内しています。高さを変えられて持ち手のあるシートは iOS と iPadOS の節にあり、medium の高さについての助言は iPhone のアプリ向けに書かれています。そのため、その高さや操作についての指針は、ウェブサイトではなくアプリ向けのものです。'
		},
		{
			en: 'On the web, the libraries in the sources build a bottom sheet from their edge panels: MUI’s Drawer takes `anchor="bottom"`, Bootstrap’s offcanvas takes `.offcanvas-bottom` and is described as conceptually a modal dialog, and React Aria’s Sheet takes `position="bottom"`. The Digital Agency Design System’s drawer overview mentions the top, bottom, left and right edges as places it opens from, but its usage page provides only full-surface and right and left overlay patterns, and says a drawer is always modal.',
			ja: 'ウェブでは、資料にあるライブラリは、端に付けるパネルでボトムシートを作ります。MUI の Drawer は `anchor="bottom"`、Bootstrap のオフキャンバスは `.offcanvas-bottom`、React Aria の Sheet は `position="bottom"` を指定します。Bootstrap は、オフキャンバスを概念としてはモーダルダイアログだとしています。デジタル庁デザインシステムのドロワーの概要は、上下左右の端から開くと触れていますが、使い方のページが用意している展開パターンは、全面と右・左のオーバーレイだけで、ドロワーは必ずモーダルだとしています。'
		},
		{
			en: 'Add a handle only if it works without dragging. Material Design 3 makes the top 48dp of the sheet the target when the handle is present, lets the handle take focus, and says to label only the drag handle, whose role is button. Apple asks for a grabber on a resizable sheet because it also works with VoiceOver.',
			ja: '持ち手は、ドラッグしなくても使えるときだけ付けます。Material Design 3 は、持ち手があるとき、シートの上の48dpを操作の的とし、持ち手にフォーカスできるようにし、ラベルを付けるのは持ち手だけで、その役割はボタンだとしています。Apple は、高さを変えられるシートにグラバーを付けるよう勧めています。VoiceOver でも使えるためです。'
		},
		{
			en: 'Give every way of leaving the sheet a plain alternative to the swipe. Include a visible control that closes it, because the WAI-ARIA Authoring Practices strongly recommend one, and MDN asks for a way to close that also works on devices without a physical keyboard. Apple still asks to support swiping down, and says that if a sheet has a Done button it should be paired with Cancel or Back.',
			ja: '閉じる方法には、スワイプのほかに、ふつうの操作を用意します。見える閉じる操作を置きます。WAI-ARIA オーサリング プラクティスが強く勧めているうえ、MDN も、物理的なキーボードがない端末でも使える閉じる方法を求めているためです。Apple は、下へのスワイプも使えるようにするよう求め、「完了」ボタンを付けるなら「キャンセル」か「戻る」と組み合わせるよう案内しています。'
		},
		{
			en: 'Keep the content clear of the browser’s own UI and the on-screen keyboard. React Aria’s Sheet exposes `--sheet-scroll-padding-y`, the amount of the sheet covered by browser UI or the software keyboard, to add as padding to the scrolling content.',
			ja: 'ブラウザー自体の UI や画面のキーボードで内容が隠れないようにします。React Aria の Sheet は、ブラウザーの UI やソフトウェアキーボードで隠れるシートの量を `--sheet-scroll-padding-y` で渡していて、スクロールする内容のパディングに足せます。'
		},
		{
			en: 'Apple has a separate component, the action sheet, which it describes as a modal view that presents choices related to an action people initiate. Its page does not say where on the screen it appears, so this site does not treat it as the same thing as a bottom sheet. Apple tells people to use an action sheet, rather than a menu, for choices related to an action on iOS and iPadOS, and to confirm a swipe-down dismissal when there are unsaved changes.',
			ja: 'Apple には、別の部品としてアクションシートがあり、利用者が始めた操作に関する選択肢を示すモーダルな表示だとしています。そのページは画面のどこに出るかを書いていないので、このサイトではボトムシートと同じものとは扱いません。Apple は、iOS と iPadOS では、操作に関する選択肢にはメニューではなくアクションシートを使うこと、保存していない変更があるときの下へのスワイプには、アクションシートで確認することを案内しています。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Letting the sheet be resized or dismissed only by dragging or swiping',
				ja: 'シートの高さの変更や、閉じる操作を、ドラッグやスワイプだけにする'
			},
			harm: {
				en: 'Some people cannot press and hold while moving a pointer precisely, and people who use a trackball, head pointer, eye-gaze system or speech-controlled mouse emulator find dragging cumbersome and error-prone. WCAG also says the alternative cannot rest only on a swipe or flick.',
				ja: '押したままポインターを正確に動かせない人がいます。トラックボール、ヘッドポインター、視線入力、音声で操作するマウスエミュレーターを使う人にとって、ドラッグは扱いにくく、間違えやすい操作です。WCAG は、代わりの操作がスワイプやフリックだけでは足りないとも述べています。'
			},
			instead: {
				en: 'Make the handle a button that steps through the preset heights, label it, and add a visible close control, as Material Design 3 asks, so the sheet can change height and close with a single tap or click.',
				ja: 'Material Design 3 が求めるように、持ち手を決まった高さを順に切り替えるボタンにしてラベルを付け、見える閉じる操作も置いて、1回のタップかクリックで高さを変えて閉じられるようにします。'
			}
		},
		{
			pattern: {
				en: 'Opening a second sheet from a sheet, so that closing it lands back on the first',
				ja: 'シートの中から別のシートを開き、閉じると最初のシートに戻るようにする'
			},
			harm: {
				en: 'People expect to return to the parent view when they close a sheet, and if closing one takes them back to another sheet they can lose track of where they are in the app.',
				ja: 'シートを閉じると親の画面に戻ると利用者は期待しています。閉じたら別のシートに戻ると、アプリの中で今どこにいるのか分からなくなることがあります。'
			},
			instead: {
				en: 'Show one sheet at a time. Close the first before showing the next, and show the first again after the second is dismissed if that is needed.',
				ja: '同時に出すシートは1つにします。次のシートを出す前に最初のシートを閉じ、必要なら2つ目を閉じたあとで最初のシートをもう一度出します。'
			}
		},
		{
			pattern: {
				en: 'Making a Done button the only way out of a sheet',
				ja: '「完了」ボタンを、シートから出る唯一の方法にする'
			},
			harm: {
				en: 'Relying only on Done suggests that completing the task is the only way to leave the sheet, which can feel restrictive or misleading.',
				ja: '「完了」だけに頼ると、作業を終えることがシートから出る唯一の方法だと受け取られ、窮屈に感じたり、誤解したりすることがあります。'
			},
			instead: {
				en: 'Pair Done with a Cancel button that leaves without confirming or saving, or with a Back button for a previous step, as Apple advises.',
				ja: 'Apple の案内のとおり、「完了」には、確定や保存をせずに出る「キャンセル」か、前の手順に戻る「戻る」を組み合わせます。'
			}
		}
	],
	related: [
		{
			id: 'drawer',
			diff: {
				en: 'A bottom sheet is anchored to the bottom edge, mainly on phones; a drawer usually runs along a side edge, and for apps Material Design 3 swaps a bottom sheet for a side sheet on expanded screens.',
				ja: 'ボトムシートは画面の下端に固定され、おもにスマートフォンで使います。ドロワーはたいてい側面の端に沿って出ます。Material Design 3 は、アプリの大きな画面では、ボトムシートをサイドシートに替えてよいとしています。'
			}
		},
		{
			id: 'modal',
			diff: {
				en: 'A bottom sheet is anchored to the bottom edge, mainly on phones, and for apps Material Design 3 has a standard kind that leaves the main UI usable beside it; a modal dialog sits in the middle and blocks the page.',
				ja: 'ボトムシートは画面の下端に固定され、おもにスマートフォンで使います。Material Design 3 は、アプリ向けに、主な部分を並べて操作できる標準の種類を挙げています。モーダルダイアログは中央に出て、ページを操作できなくします。'
			}
		},
		{
			id: 'popover',
			diff: {
				en: 'A bottom sheet is anchored to the bottom edge of the screen and a modal one dims the page; a popover opens next to the button that opened it and leaves the page usable.',
				ja: 'ボトムシートは画面の下端に固定され、モーダルのものはページを暗くします。ポップオーバーは開いたボタンの隣に出て、ページを操作できます。'
			}
		},
		{
			id: 'menu',
			diff: {
				en: 'A bottom sheet can hold menu items, other actions or supplementary content at the bottom of the screen; a menu is a list of actions that opens from a button.',
				ja: 'ボトムシートは画面の下端に、メニュー項目、そのほかの操作、補助的な内容を入れられます。メニューはボタンから開く操作の一覧です。'
			}
		}
	],
	sources: [
		{
			label: 'Material Design 3: Bottom sheets',
			url: 'https://m3.material.io/components/bottom-sheets/overview',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Material Design 3: Bottom sheets (guidelines)',
			url: 'https://m3.material.io/components/bottom-sheets/guidelines',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Material Design 3: Bottom sheets (accessibility)',
			url: 'https://m3.material.io/components/bottom-sheets/accessibility',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Apple Human Interface Guidelines: Sheets',
			url: 'https://developer.apple.com/design/human-interface-guidelines/sheets',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Apple Human Interface Guidelines: Action sheets',
			url: 'https://developer.apple.com/design/human-interface-guidelines/action-sheets',
			checkedAt: '2026-11-02'
		},
		{
			label: 'React Aria: Sheet',
			url: 'https://react-aria.adobe.com/Sheet',
			checkedAt: '2026-11-02'
		},
		{
			label: 'MUI: Drawer',
			url: 'https://mui.com/material-ui/react-drawer/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Bootstrap: Offcanvas',
			url: 'https://getbootstrap.com/docs/5.3/components/offcanvas/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ドロワー」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/drawer/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'デジタル庁デザインシステムウェブサイト「ドロワー（使い方）」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/drawer/usage/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'WAI-ARIA APG: Dialog (Modal) Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Understanding Success Criterion 2.5.7: Dragging Movements (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html',
			checkedAt: '2026-11-02'
		},
		{
			label: 'MDN: <dialog>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog',
			checkedAt: '2026-11-02'
		}
	]
} satisfies ComponentData;
