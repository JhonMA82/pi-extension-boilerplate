# Capability catalog

This is a discovery index, not a list of packages that must be installed.

| Need | Status | Preferred solution |
|---|---|---|
| Project creation from template | baseline | Bun `bun create` |
| Project metadata initialization | baseline | local `bun run init` |
| Slash commands | baseline | Pi `registerCommand` + local generator |
| LLM tools | baseline | Pi `registerTool` + local generator |
| Simple dialogs | baseline | Pi `ctx.ui` |
| Complex menus/reviews/actions | baseline | `@narumitw/pi-tui-kit` |
| Business/domain logic | baseline | local code, usually `src/services/` when useful |
| Persistent settings UI | available, not installed | `avtc-pi-settings-ui` |
| Async dialog coordination | available, not installed | `avtc-pi-ui-components` |
| Standards retrofit/verification | external | `pi-extension-toolkit` |
| Broader release/pipeline scaffolding | external, usually unnecessary | evaluate existing tooling when needed |

## Rule

Do not install or build an available capability until a real extension requirement needs it.
