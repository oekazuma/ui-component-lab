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

- `data.ts`: `export default { ... } satisfies ComponentData` (see `src/lib/types.ts`). Required fields are `id` (same as the directory name), `category`, `names`, `aliases`, `summary`, `appearance`, `behavior`, `keyboard` and `sources`; `variations`, `usage`, `misuse` and `related` are optional. Every text has both `en` and `ja`.
- `Demo.svelte`: a minimal interactive demo that takes a `lang` prop.

Then run `pnpm check` and `pnpm build`. The conventions (related links, source labels, key notation, demo rules) are in [CLAUDE.md](CLAUDE.md).

## Skill: improve-ui-components

An agent skill that audits the UI components on pages of your own site against this Lab, and writes improvement plans to `plans/` (or `advisor-plans/` when `plans/` is used for something else) for another agent (or you) to implement. Run it in the repository that holds the site's source.

```bash
npx skills add oekazuma/ui-component-lab
```

Then pass one or more page URLs. Local URLs from your running development server are the usual way, because the components can be operated there:

```text
/improve-ui-components http://localhost:5173/signup http://localhost:5173/settings
```

A live URL is fine for a quick look. When the repository is its source, the skill starts your development server and checks there instead:

```text
/improve-ui-components https://example.com/signup
```

- It checks only the pages you pass: which Lab component each UI is, whether it is the right choice (for example a select instead of 12 radio buttons), known misuses and deceptive patterns, and keyboard behavior. Each finding links the Lab page and its source.
- On local pages it operates the components, as long as everything the page sends stays on your machine. If the development server talks to a remote backend, it treats the page like the live site.
- On the live site it only reads, moves focus, and opens and closes menus and dialogs: it never submits, types, changes a value, or signs in.
- Signed-in pages are checked only in a browser you have signed in to and let the agent use.
- Add `--issues` to also file each plan as a GitHub issue (it asks first).
- The knowledge comes from [components.json](https://oekazuma.github.io/ui-component-lab/components.json), fetched on every run.

## License

[MIT](LICENSE)
