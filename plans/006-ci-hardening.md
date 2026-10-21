# Plan 006: CI uses pinned actions that Dependabot keeps current, and the project states its Node version

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 149b340..HEAD -- .github package.json`
> Plan 001 changes the `check` line in `package.json`; that is expected. Any change to `.github/workflows/deploy.yml` since `149b340` is a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | S | LOW | plans/001-verification-baseline.md (same `package.json`) | security / deps | commit `149b340`, 2026-10-21 |

## Why this matters

The deploy workflow uses movable major tags (`@v7`) for six actions, one of them third-party (`pnpm/action-setup`). If a tag is moved to malicious code, as happened in the 2025 tj-actions incident, that code runs in the build job. The build job's output is deployed to `oekazuma.github.io`, an origin shared by every project site of that account. Pinning to commit SHAs closes this, but pins never move on their own, so Dependabot must come with them. Nothing updates the npm devDependencies either. Separately, `.npmrc` sets `engine-strict=true`, but `package.json` has no `engines` field, so the project never says it needs Node 24. Node 24's built-in TypeScript stripping is required by `pnpm check` (it runs `node src/lib/*.check.ts`). Without the field, an older Node fails with a confusing syntax error instead of a clear version error.

## Current state

- `.github/workflows/deploy.yml`, the `uses:` lines today:
  ```yaml
        - uses: actions/checkout@v7
        - uses: pnpm/action-setup@v6
        - uses: actions/setup-node@v7
          with:
            node-version: 24
            cache: pnpm
        ...
        - if: github.event_name == 'push'
          uses: actions/configure-pages@v6
        - if: github.event_name == 'push'
          uses: actions/upload-pages-artifact@v5
        ...
        - id: deployment
          uses: actions/deploy-pages@v5
  ```
  Everything else in the workflow (triggers, `permissions`, `concurrency`, the `if:` gates, the Japanese comment at the top) stays as it is.
- Commit SHAs the major tags pointed to on 2026-10-21, resolved with `gh api repos/<owner>/<repo>/git/ref/tags/<tag>` (`pnpm/action-setup@v6` is an annotated tag; the SHA below is the dereferenced commit):
  | Action | Tag | Commit SHA |
  |---|---|---|
  | actions/checkout | v7 | `3d3c42e5aac5ba805825da76410c181273ba90b1` |
  | pnpm/action-setup | v6 | `0977fd99725f1db4007ccb2928dbb4e90d06cc86` |
  | actions/setup-node | v7 | `949feb2413d6458794dcd2491c4babbbce0c15c1` |
  | actions/configure-pages | v6 | `45bfe0192ca1faeb007ade9deae92b16b8254a0d` |
  | actions/upload-pages-artifact | v5 | `fc324d3547104276b827a68afc52ff2a11cc49c9` |
  | actions/deploy-pages | v5 | `368f82528645a54fb793d4d04e342629a3f51346` |
- `.github/` contains only `workflows/deploy.yml`. There is no `dependabot.yml`.
- `package.json` has `"packageManager": "pnpm@10.34.7"` and no `engines`. `.npmrc` is `engine-strict=true`.
- The repo's YAML style uses 2-space indentation and single quotes in expressions (`github.event_name == 'push'`).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Re-resolve a tag | `gh api repos/actions/checkout/git/ref/tags/v7 --jq '.object.type+" "+.object.sha'` | `commit <sha>` (if `tag`, dereference with `gh api repos/<o>/<r>/git/tags/<sha> --jq .object.sha`) |
| Checks | `pnpm check` | exit 0 |
| Install with engines | `pnpm install --frozen-lockfile` | exit 0 on Node 24 |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use `/Users/oe.kazuma/Library/pnpm/bin/pnpm`.

## Scope

**In scope**:
- `.github/workflows/deploy.yml` (the six `uses:` lines only)
- `.github/dependabot.yml` (create)
- `package.json` (add `engines`)

**Out of scope** (do NOT touch):
- Workflow permissions, triggers, Node version, steps order.
- The `prepare` script (`svelte-kit sync || echo ''`). That is the stock SvelteKit template, and `pnpm check` already surfaces sync failures.
- Upgrading any action or dependency version. This plan pins what is in use today.

## Git workflow

- Branch: `advisor/006-ci-hardening`
- One commit, imperative subject + bullet body (see `git log`), e.g. `Pin workflow actions and add Dependabot`.
- Do NOT push or open a PR.

## Steps

### Step 1: Confirm the SHAs are still current

For each row in the table, run the "Re-resolve a tag" command. If a SHA differs from the table, use the **live** value and mention it in your report (the tag moved since the plan was written, which is normal for major tags). If `gh` cannot reach the API, use the table values and say so.

**Verify**: you have six 40-hex SHAs.

### Step 2: Pin the actions

Replace each `uses:` with `<action>@<sha> # <tag>`, e.g.:

```yaml
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7
```

Dependabot reads the trailing `# v7` comment and keeps it in sync when it bumps the SHA.

**Verify**: `grep -cE 'uses: [^@]+@[0-9a-f]{40} # v[0-9]+' .github/workflows/deploy.yml` → `6`; `grep -cE 'uses: [^@]+@v[0-9]+$' .github/workflows/deploy.yml` → `0`.

### Step 3: Add Dependabot

Create `.github/dependabot.yml`:

```yaml
# 依存とワークフローの Action を週1回更新する。Action は SHA 固定なので、これがないと更新されない
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    groups:
      dev-dependencies:
        patterns: ['*']
        update-types: [minor, patch]
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
    groups:
      actions:
        patterns: ['*']
```

(`npm` is Dependabot's ecosystem name for pnpm projects too; it reads `pnpm-lock.yaml`.)

**Verify**: `ruby -ryaml -e 'p YAML.load_file(".github/dependabot.yml")["updates"].size'` → `2`. If `ruby` is unavailable, use `python3 -c "import yaml,sys;print(len(yaml.safe_load(open('.github/dependabot.yml'))['updates']))"`. If neither works, re-read the file and confirm by eye that the 2-space indentation matches the block above.

### Step 4: Declare Node 24

In `package.json`, add after `"packageManager"`:

```json
	"engines": {
		"node": ">=24"
	},
```

(Use tabs like the rest of the file. Keep valid JSON: watch the commas.)

**Verify**: `node -e "console.log(require('./package.json').engines.node)"` → `>=24`; `pnpm install --frozen-lockfile` → exit 0 (lockfile unchanged: `git diff --stat pnpm-lock.yaml` → empty); `pnpm check` → exit 0.

## Test plan

- No runtime code changes. CI on the PR is the real test: the workflow must still pass with pinned SHAs. The reviewer/maintainer confirms that on GitHub after pushing.

## Done criteria

- [ ] Step 2 greps → `6` and `0`
- [ ] `.github/dependabot.yml` exists with 2 `updates` entries
- [ ] `package.json` has `engines.node` = `>=24`; `pnpm-lock.yaml` unchanged
- [ ] `pnpm check` exits 0
- [ ] Modified files ⊆ in-scope list
- [ ] `plans/README.md` status row updated (unless your reviewer maintains it)

## STOP conditions

- `deploy.yml` has changed since `149b340` beyond what this plan expects.
- A tag resolves to a type other than `commit` or `tag`, or the dereferenced object is not a commit.
- `pnpm install --frozen-lockfile` wants to change `pnpm-lock.yaml` after adding `engines`.

## Maintenance notes

- When Dependabot opens an Actions PR, check the release notes of the new version before merging. Pinning only helps if updates get a look.
- If the workflow's Node version changes, update `engines.node` to match.
- Top-level `permissions: pages: read` is needed by `actions/configure-pages` in the build job. Leave it.
