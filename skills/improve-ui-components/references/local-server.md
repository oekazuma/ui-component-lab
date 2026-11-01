# Checking on the local development server

Check on a local development server whenever you can. The user may pass local URLs directly (a server they already run), or live URLs because that is easy; when this repository is the source of those live pages, start the local development server and check there instead: there you can operate value-changing components, as long as what they send stays on this machine (section 3). The live site is then used only to confirm that the local page matches what is deployed.

For a local URL the user passed, skip section 2: the server is theirs, so do not stop or restart it. Still check section 1, because plans depend on whether this repository is the page's source. Do not open the live site for it unless the user gives that URL. Sections 1, 3, 5 and 6 still apply.

## 1. Is this repository the source of the page?

Look for at least two of these:

- A route or page file for the URL path (for example `src/routes/<path>/+page.svelte`, `app/<path>/page.tsx`, `pages/<path>.vue`, a `<path>.html` file).
- The live host name in the configuration (`package.json` `homepage`, `astro.config.*` `site`, `svelte.config.*` / `vite.config.*` `paths`, `next.config.*` `basePath` or `assetPrefix`, deployment config such as `vercel.json`, `netlify.toml`, a GitHub Pages workflow, a `CNAME` file).
- Visible text from the live page (headings, button labels) appearing in the source.

If you cannot confirm it, treat the repository as unrelated: do not start a server, audit the live site under the observe-only rules, and say so in the final report.

## 2. Find how to start it

- Look for the development command in `package.json` `scripts` (`dev`, `start`, `serve`), a `Makefile`, `README` or `CONTRIBUTING`. Use the repository's own command and package manager (the lockfile tells you: `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`, `bun.lock`).
- If the project declares dependencies that are not installed (for example `package.json` lists dependencies and `node_modules` is missing) or the command needs environment variables, a database or other services, **ask the user** before doing anything. Do not install, do not create `.env` files.
- Before starting it, read the command and every script it runs first (for example `predev` in `package.json`). If they migrate or seed a database, push a schema or call a remote service, ask the user before running them.
- Start it in the background and wait until it answers. Note the local origin (for example `http://localhost:5173`).
- If it does not start (the port is taken, a service is missing), do not stop processes you did not start and do not change its configuration. Audit the live site observe-only and say why in the final report.

## 3. Is the backend local?

A development server often talks to a real backend: an API base URL, a hosted database or auth project (Firebase, Supabase and the like) set in `.env*` files or the configuration. Read those settings (names and host names only; never copy secret values). Operate value-changing components and press send, buy, delete, save or confirm only when every backend the page uses is confirmed local (`localhost`, a container on this machine, a mock, or no backend at all: a static server whose forms post back to itself, even if it rejects them). Watch the requests while you operate: if one goes to a host that is not local, stop operating that page. Besides `.env*`, read the development server's proxy and rewrite settings (for example Vite `server.proxy`, Next.js `rewrites`, `setupProxy.js`) and the server-side code the page calls (form actions, API routes, server actions): a proxy or a server-side call can reach a remote backend while the browser only sees `localhost`. For every backend on `localhost`, `127.0.0.1` or `[::1]`, including the page's own port, find the process that listens on it (for example `lsof -iTCP:<port> -sTCP:LISTEN -P -n`): an ssh, kubectl, cloud-sql-proxy, socat or ngrok listener, or one you cannot identify, is not local. A container on this machine is local only after you have read what it connects to (its compose `environment` or its own `.env`). If you cannot confirm any of this, treat the backend as not confirmed local. When your browser automation can block requests (for example Playwright `page.route`), block every request to a host that is not local before operating, instead of only watching. If any backend is remote, or you cannot tell, treat that page as the live site (SKILL.md Hard Rules 3 and 4) or ask the user.

## 4. Map the URLs

Replace the live origin with the local origin and adjust for a base path when the site is served under one (for example `https://example.github.io/app/pricing/` → `http://localhost:5173/app/pricing/`). Open each mapped page and compare it with the live page: the same main heading and the same components (for a static page, compare the served HTML). If they differ in a way that matters (a different version, a missing feature flag), audit the live site for that page instead and say why.

## 5. Pages that need data or a login locally

If the local page needs seed data or a local account to show the component, ask the user how they usually get there. Do not create accounts or data on your own.

## 6. Stop it

Stop every server you started (never one the user was already running) before the final report, and say in the report which pages were checked locally and which on the live site.
