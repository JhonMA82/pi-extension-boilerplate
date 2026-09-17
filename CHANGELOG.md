# Changelog

## 0.3.0 - 2026-09-17

- Converted the repository into a true remote `bun create` template.
- Removed the old setup flow that required copying/renaming the boilerplate manually.
- Replaced the previous initializer with an idempotent `init.ts` that derives the package name from the destination folder.
- `init` validates the generated project and syncs AIContext when available.
- The scaffolder now attempts an AIContext sync after deterministic structural changes.
- Documented Bun as the project creator instead of introducing a custom create CLI.
- Kept Pi native UI and `@narumitw/pi-tui-kit` as the default UI strategy.

## 0.2.1 - 2026-09-17

- Made Bun the canonical package manager/tooling runtime.

## 0.2.0 - 2026-09-17

- Removed the custom UI framework and capability manager from the initial prototype.
- Adopted existing Pi ecosystem solutions first.
