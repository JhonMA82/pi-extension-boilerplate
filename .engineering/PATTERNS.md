# Patterns

## Project creation

Status: preferred
Confidence: high
Validated at: boilerplate v0.3.0

Reference:
- `README.md`
- `docs/WORKFLOW.md`
- Bun `bun create` documentation

Pattern:

```text
bun create <github-user>/<repo> <destination>
-> cd <destination>
-> bun run init
```

Do not create a second CLI for download/copy/install/git initialization.

## Thin extension entrypoint

Status: preferred
Confidence: high
Validated at: boilerplate v0.3.0

Reference:
- `src/index.ts`
- Pi extension documentation

Pattern:

```text
src/index.ts -> registration modules -> services/UI composition
```

Keep domain logic out of `src/index.ts`.

## Generated command pattern

Status: preferred
Confidence: high
Validated at: boilerplate v0.3.0

Reference:
- `scripts/scaffold.ts`
- `src/commands/index.ts`

Pattern:

```text
bun run generate -- command <name>
-> src/commands/<name>.ts
-> automatic registration in src/commands/index.ts
```

Do not manually recreate this structure when the generator covers the request.

## Generated tool pattern

Status: preferred
Confidence: high
Validated at: boilerplate v0.3.0

Reference:
- `scripts/scaffold.ts`
- `src/tools/index.ts`

Pattern:

```text
bun run generate -- tool <name>
-> src/tools/<name>.ts
-> automatic registration in src/tools/index.ts
```

## Service boundary

Status: preferred
Confidence: high
Validated at: boilerplate v0.3.0

Pattern:

```text
command/tool/UI orchestration -> service -> result
```

Keep services independent from Pi runtime APIs when that improves reuse/testability; do not introduce a service layer mechanically.

## UI selection

Status: preferred
Confidence: high
Validated at: boilerplate v0.3.0

Reference:
- `docs/UI.md`
- `.engineering/DEPENDENCIES.md`

Pattern:

```text
simple interaction -> Pi ctx.ui
complex reusable interaction -> @narumitw/pi-tui-kit
persistent settings -> avtc-pi-settings-ui only when needed
async dialog collision -> avtc-pi-ui-components only when needed
uncovered specialized UI -> local ctx.ui.custom()
```

Do not copy historical custom dialog shells or hardcode borders/padding/colors for interactions covered by Pi/Pi TUI Kit.

## Research before build

Status: preferred
Confidence: high
Validated at: maintainer decision, 2026-09-17

Pattern:

```text
need -> existing pattern -> official Pi/Pi Packages -> npm/GitHub -> reuse/fork -> smallest local code
```

A local implementation is not promoted into the boilerplate until a real extension validates the need and reuse.
