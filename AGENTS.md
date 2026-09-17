# Agent instructions

## Start with repository context

Before broad exploration:

1. Run `aicontext status` when available.
2. Read `.engineering/PROJECT_STATE.md`.
3. Read `.engineering/PATTERNS.md` only as needed.
4. Prefer `aicontext search` or targeted search before broad scans.

## Development rules

- Use `bun` as the canonical package manager and tooling runtime.
- Keep `src/index.ts` thin.
- Use `bun run generate -- ...` instead of manually recreating a covered command/tool/service/menu structure.
- Use Pi `ctx.ui` for simple interactions.
- Use `@narumitw/pi-tui-kit` for common complex interaction flows.
- Do not create a second dialog system, custom theme system, capability registry or global CLI.
- Before creating reusable infrastructure, check `.engineering/DEPENDENCIES.md`, official Pi docs, Pi Packages, npm and GitHub.
- Prefer reuse, composition or a focused fork over reimplementation.
- A new boilerplate abstraction requires evidence from a real extension.

## Completion gate

Run:

```bash
bun run check
aicontext check
```

If AIContext is unavailable, state that fact rather than inventing its result.
