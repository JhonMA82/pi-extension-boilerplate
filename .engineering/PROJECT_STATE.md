# Project State

<!-- aicontext:generated:start -->
Project: pi-extension-template
Template snapshot: pi-extension-boilerplate v0.3.0
Package manager/tooling runtime: Bun 1.4.2
Language: TypeScript
Pi entry point: src/index.ts

Important paths:
- Commands: src/commands
- Tools: src/tools
- Services: src/services
- Extension-specific UI composition: src/ui
- Deterministic scripts: scripts
- Agent context: .engineering
- Human documentation: docs

Commands:
- bun run init [-- "optional description"]
- bun run generate -- <command|tool|service|menu> <name>
- bun run check
- bun run pack:check
- pi -e ./src/index.ts
<!-- aicontext:generated:end -->

<!-- aicontext:curated:start -->
## Purpose

Create Pi extensions quickly with a predictable structure, consistent UI, minimal repeated agent exploration, and minimal custom infrastructure.

## Creation model

The repository is intended to be consumed as a remote GitHub template through `bun create`. Bun owns template download, destination creation, dependency installation and fresh Git initialization. This project owns only Pi-specific initialization and scaffolding.

## Current capabilities

- Thin Pi package entrypoint.
- Idempotent project initialization derived from the destination folder.
- Deterministic local generation for commands, tools, services and Pi TUI Kit menus.
- Pi native UI for simple interactions.
- `@narumitw/pi-tui-kit` for reusable complex interaction flows.
- Optional settings/dialog-coordination solutions documented but not installed until required.

## Constraints

- Research official Pi docs, Pi Packages, npm and GitHub before building reusable infrastructure.
- Prefer Pi native APIs, then focused maintained packages, then the smallest local implementation.
- Do not build a second project creator, dialog/UI framework or capability manager.
- Do not add capabilities for hypothetical future use.
- Keep extension-specific domain logic inside the extension.
- Keep `src/index.ts` thin.

## Context pointers

- Development patterns: `.engineering/PATTERNS.md`
- Known capabilities: `.engineering/CAPABILITIES.md`
- Dependency decisions: `.engineering/DEPENDENCIES.md`
- UI guidance: `docs/UI.md`
- Architecture: `docs/ARCHITECTURE.md`
- Admission rule for new boilerplate patterns: `docs/EXTENDING-THE-BOILERPLATE.md`
<!-- aicontext:curated:end -->
