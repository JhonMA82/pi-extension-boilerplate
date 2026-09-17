# Project State

<!-- aicontext:generated:start -->
Last synchronized commit: 3ee5136
Version: 0.3.0 (package.json)
Package manager: bun (bun.lock)
Complexity: small
Source files: 18 | LOC: ~850
Test functions: 0 (src: 0, tests: 0)

Important paths:

- README.md
- docs
- CHANGELOG.md
- AGENTS.md

Commands:

- check
- format
- generate
- init
- lint
- pack:check
- typecheck
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
