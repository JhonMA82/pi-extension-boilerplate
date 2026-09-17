# Upstream references

Revalidated: 2026-09-17.

These are decision inputs, not copied implementation contracts. Re-check current docs before making compatibility-sensitive changes.

## Bun

- `bun create`: https://bun.com/docs/runtime/templating/create
- Current Bun release: https://bun.com/
- TypeScript package: https://www.npmjs.com/package/typescript
- Biome releases: https://github.com/biomejs/biome/releases

Important current behavior used by this template:

- `bun create <user>/<repo> <destination>` supports GitHub repositories;
- Bun downloads/copies the template, runs `bun install` and initializes a fresh Git repository;
- local `$HOME/.bun-create` templates have additional package-name/setup behavior that remote GitHub templates should not be assumed to share.

## Pi

- Extensions: https://pi.dev/docs/latest/extensions
- Pi Packages: https://pi.dev/docs/latest/packages
- Package catalog: https://pi.dev/packages

Important current package rule: third-party runtime dependencies belong in `dependencies`; Pi core packages used by an extension belong in `peerDependencies` with `*`.

## Pi TUI Kit

- npm: https://www.npmjs.com/package/@narumitw/pi-tui-kit
- repository: https://github.com/narumiruna/pi-extensions

Selected because it already provides reusable typed Pi interaction flows, width-safe rendering, navigation/lifecycle handling and TUI/RPC adaptation.
