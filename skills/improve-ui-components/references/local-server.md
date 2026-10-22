# Checking on the local development server

The user gives live URLs because that is easy. When this repository is the source of those pages, check on the local development server instead: there you can operate value-changing components freely, and nothing reaches real users or real data. The live site is then used only to confirm that the local page matches what is deployed.

## 1. Is this repository the source of the page?

Look for at least two of these:

- A route or page file for the URL path (for example `src/routes/<path>/+page.svelte`, `app/<path>/page.tsx`, `pages/<path>.vue`, a `<path>.html` file).
- The live host name in the configuration (`package.json` `homepage`, `astro.config.*` `site`, `svelte.config.*` / `vite.config.*` `paths`, `next.config.*` `basePath` or `assetPrefix`, deployment config such as `vercel.json`, `netlify.toml`, a GitHub Pages workflow, a `CNAME` file).
- Visible text from the live page (headings, button labels) appearing in the source.

If you cannot confirm it, treat the repository as unrelated: do not start a server, audit the live site under the observe-only rules, and say so in the final report.

## 2. Find how to start it

- Look for the development command in `package.json` `scripts` (`dev`, `start`, `serve`), a `Makefile`, `README` or `CONTRIBUTING`. Use the repository's own command and package manager (the lockfile tells you: `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`, `bun.lock`).
- If the project declares dependencies that are not installed (for example `package.json` lists dependencies and `node_modules` is missing) or the command needs environment variables, a database or other services, **ask the user** before doing anything. Do not install, do not create `.env` files.
- Start it in the background and wait until it answers. Note the local origin (for example `http://localhost:5173`).

## 3. Map the URLs

Replace the live origin with the local origin and adjust for a base path when the site is served under one (for example `https://example.github.io/app/pricing/` → `http://localhost:5173/app/pricing/`). Open each mapped page and compare it with the live page: the same main heading and the same components (for a static page, compare the served HTML). If they differ in a way that matters (a different version, a missing feature flag), audit the live site for that page instead and say why.

## 4. Pages that need data or a login locally

If the local page needs seed data or a local account to show the component, ask the user how they usually get there. Do not create accounts or data on your own.

## 5. Stop it

Stop every server you started before the final report, and say in the report which pages were checked locally and which on the live site.
