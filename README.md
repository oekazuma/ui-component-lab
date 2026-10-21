<p align="center">
	<img src="src/lib/assets/logo.svg" alt="" width="80" height="80">
</p>

<h1 align="center">UI Component Lab</h1>

<p align="center">What’s that UI called? Learn the name and the behavior by trying it.<br>English and Japanese.</p>

<p align="center"><a href="https://oekazuma.github.io/ui-component-lab/">oekazuma.github.io/ui-component-lab</a></p>

## Development

```sh
pnpm install
pnpm dev
```

## Adding a component

Create `src/lib/components/<id>/` with two files. They are registered automatically.

- `data.ts`: `export default { ... } satisfies ComponentData` (see `src/lib/types.ts`). Required fields are `id` (same as the directory name), `category`, `names`, `aliases`, `summary`, `appearance`, `behavior`, `keyboard` and `sources`; `variations`, `usage` and `related` are optional. Every text has both `en` and `ja`.
- `Demo.svelte`: a minimal interactive demo that takes a `lang` prop.

Then run `pnpm check` and `pnpm build`. The conventions (related links, source labels, key notation, demo rules) are in [CLAUDE.md](CLAUDE.md).

## License

[MIT](LICENSE)
