# Repository Guidelines

## Project Structure & Module Organization

This repository is a VitePress documentation site for `sekaiai.github.io`. Source pages live in `docs/`, with the home page at `docs/index.md` and guide pages under `docs/guide/` such as `docs/guide/hitokoto.md`. VitePress configuration is in `docs/.vitepress/config.mts`; theme extensions are in `docs/.vitepress/theme/`. Static assets that should be served by the site belong in `docs/public/`. Generated output in `docs/.vitepress/dist/`, Vite cache files, `node_modules/`, and `.DS_Store` are ignored and should not be edited manually.

## Build, Test, and Development Commands

Use pnpm, matching the lockfile and GitHub Actions workflow.

- `pnpm install` installs dependencies from `pnpm-lock.yaml`.
- `pnpm dev` starts the local VitePress server for editing docs.
- `pnpm build` builds the static site into `docs/.vitepress/dist/`; run this before pushing content or config changes.
- `pnpm docs:preview` previews the production build locally.

`pnpm test` is currently a placeholder and exits with an error, so do not use it as a validation step until a real test suite is added.

## Coding Style & Naming Conventions

Markdown content may include VitePress frontmatter and Vue snippets. Keep frontmatter keys clear and SEO metadata specific to the page. Follow the existing TypeScript style in `config.mts`: two-space indentation, single quotes, and trailing commas only where already used. Name guide files with lowercase kebab-case, for example `zip-manage.md`, and keep route links aligned with `themeConfig.sidebar`.

## Testing Guidelines

There is no dedicated test framework or coverage target yet. Validate changes by running `pnpm build` and, for visual/content edits, `pnpm dev` or `pnpm docs:preview` to inspect pages in a browser. For new pages, confirm navigation links, frontmatter, images, and external fetch examples render without console or build errors.

## Commit & Pull Request Guidelines

Recent history uses short messages such as `Update index.md`; keep commits concise, imperative, and scoped to one concern. When creating commits through agents, follow the workspace Lore Commit Protocol. Pull requests should describe the user-facing documentation change, list validation performed such as `pnpm build`, link related issues when available, and include screenshots for visible page or theme changes.

## Deployment Notes

GitHub Actions deploys pushes to `main` with Node 22 and pnpm 9. Avoid committing generated build output; the workflow builds and uploads `docs/.vitepress/dist/` automatically.
