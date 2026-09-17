# Architecture

## Objective

Create Pi extensions quickly with a predictable project shape and consistent UI while owning the minimum infrastructure necessary.

## Creation boundary

```text
GitHub template
     ↓
bun create
     ↓
generated project
     ↓
bun run init
```

Bun owns downloading, copying, dependency installation and fresh Git initialization. This repository does not implement another project creator.

## Runtime structure

```text
src/index.ts
   |
   +-- commands/  human-invoked slash commands
   +-- tools/     LLM-callable tools
            |
            +--> services/  extension-owned logic
            |
            +--> ui/        extension-specific UI composition
```

There is intentionally no internal framework layer.

## UI ownership

- Pi owns extension lifecycle and simple UI primitives.
- Pi TUI Kit owns reusable complex interaction mechanics.
- The extension owns domain state, product-specific copy, persistence decisions and specialized behavior.
- Optional packages are added only when a real requirement appears.

## Scaffolding boundary

`scripts/scaffold.ts` exists because it removes repeated deterministic wiring for the small set of structures already proven useful. It is local, versioned with the project and requires no global installation.

## AIContext boundary

AIContext provides repository intelligence, not application behavior. Deterministic facts belong in the generated portion of `PROJECT_STATE.md`; curated architecture belongs in its curated section and `PATTERNS.md`.
