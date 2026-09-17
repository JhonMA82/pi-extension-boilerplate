# Pi Extension Boilerplate v0.3.0

A Bun-first GitHub template for creating Pi extensions with a predictable structure, consistent UI, minimal agent exploration, and as little custom infrastructure as possible.

## Philosophy

1. **Research before building.** Check Pi, Pi Packages, npm and GitHub before creating reusable infrastructure.
2. **Reuse before abstracting.** Prefer Pi APIs and focused maintained packages.
3. **Determinism first.** Folder creation, registration and repetitive wiring belong to scripts, not agent improvisation.
4. **Add only on evidence.** New reusable patterns enter the boilerplate only after a real extension needs them.
5. **Keep the extension simple.** The boilerplate is not a framework.

## Create a new extension

Publish this repository on GitHub, then use Bun itself as the creator:

```bash
bun create JhonMA82/pi-extension-boilerplate request-refiner
cd request-refiner
bun run init
```

`bun create` downloads the GitHub template, copies it into `request-refiner`, runs `bun install`, and initializes a fresh Git repository. `bun run init` then derives the package name from the current folder, starts the extension at `0.1.0`, replaces the template README/changelog with project-specific versions, updates AIContext metadata, validates the base project and syncs AIContext when the CLI is available.

An optional description can be supplied once:

```bash
bun run init -- "Prompt refinement extension for Pi"
```

No project name needs to be repeated.

## Generate common pieces

Use scaffolding only when it saves repetitive wiring:

```bash
bun run generate -- command refine
bun run generate -- tool inspect-project
bun run generate -- service prompt-refiner
bun run generate -- menu refine-review
```

Commands and tools are registered automatically. Menus use `@narumitw/pi-tui-kit` instead of a local dialog framework.

## Validate

```bash
bun run check
bun run pack:check
```

To try the extension directly with Pi:

```bash
pi -e ./src/index.ts
```

## Project structure

```text
.
├── src/
│   ├── index.ts             # thin Pi composition root
│   ├── commands/            # slash commands
│   ├── tools/               # LLM-callable tools
│   ├── services/            # extension-owned domain logic
│   └── ui/                  # extension-specific UI composition
├── scripts/
│   ├── init.ts              # one-time/idempotent project initialization
│   └── scaffold.ts          # deterministic local generator
├── .engineering/
│   ├── aicontext.toml
│   ├── consistency.yml
│   ├── PROJECT_STATE.md
│   ├── PATTERNS.md
│   ├── CAPABILITIES.md
│   └── DEPENDENCIES.md
├── docs/
├── AGENTS.md
└── package.json
```

## UI policy

Use the smallest existing solution that covers the requirement:

| Need | Preferred solution |
|---|---|
| confirm, input, editor, select, notify | Pi `ctx.ui` |
| menu, review, actions, multi-select, task/progress flows | `@narumitw/pi-tui-kit` |
| schema-driven persistent settings | `avtc-pi-settings-ui` only when needed |
| async dialog collision/coordination | `avtc-pi-ui-components` only when needed |
| specialized uncovered UI | local `ctx.ui.custom()` |

Do not build local frames, themes, padding systems or navigation when Pi or Pi TUI Kit already solve them.

## AIContext workflow

Agents must use progressive disclosure instead of broad repository exploration:

```text
aicontext status
      ↓
.engineering/PROJECT_STATE.md
      ↓
.engineering/PATTERNS.md
      ↓
targeted search
      ↓
relevant files only
```

Before implementing reusable infrastructure, consult `.engineering/DEPENDENCIES.md` and research current alternatives.

## What this template intentionally does not contain

- custom project-creation CLI — Bun already provides `bun create`;
- global scaffolder installation;
- capability registry or dependency resolver;
- custom dialog/UI framework;
- custom settings framework;
- release/CI pipeline that every extension must inherit;
- speculative components that no real extension has requested.

See `docs/DECISIONS.md` for the rationale.

## Documentation

- `docs/ARCHITECTURE.md` — boundaries and responsibilities.
- `docs/WORKFLOW.md` — day-to-day creation and development flow.
- `docs/UI.md` — UI decision rules.
- `docs/MIGRATION.md` — moving an existing extension into this structure.
- `docs/EXTENDING-THE-BOILERPLATE.md` — when a new pattern deserves promotion.
- `docs/DECISIONS.md` — explicit exclusions that prevent overengineering.
- `docs/SOURCES.md` — upstream references and revalidation notes.
