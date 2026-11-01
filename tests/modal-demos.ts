// 開いた状態を検査するテスト（dialog-frame と a11y）が共有する。spec ファイルから import すると、その spec のテストが二重に登録される
// モーダルなデモが画面全体に出ると、どのデモの動きなのかが分かりにくい。デモの枠の中に出す
export const demos = [
	{ path: 'en/components/drawer/', open: 'Filters', role: 'dialog', name: 'Filters', clickToClose: true },
	{ path: 'en/components/hamburger-menu/', open: 'Menu', role: 'dialog', name: 'Menu', clickToClose: true },
	{ path: 'en/components/modal/', open: 'Show receipt number', role: 'dialog', name: 'Your receipt number', clickToClose: false },
	{ path: 'en/components/alert-dialog/', open: 'Discard note…', role: 'alertdialog', name: 'Discard this note?', clickToClose: false },
	{ path: 'en/components/command-palette/', open: 'Commands…', role: 'dialog', name: 'Commands', clickToClose: false }
] as const;
