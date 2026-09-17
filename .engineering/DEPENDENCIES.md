# Dependency decision catalog

Consult this file before adding infrastructure. Revalidate versions before changing dependency floors.

## Bun - creator and tooling baseline

Use Bun for project creation, installation and project scripts.

```bash
bun create JhonMA82/pi-extension-boilerplate my-extension
```

The boilerplate deliberately does not wrap this with another create CLI.

## Built into Pi - use first

Use Pi `ctx.ui` for simple `select`, `confirm`, `input`, `editor` and `notify` interactions. Do not wrap them unless repeated real-world friction demonstrates a missing contract.

## `@narumitw/pi-tui-kit` - installed baseline

Current selected floor at template v0.3.0: `^0.63.1`.

Use for typed, consistent complex interaction flows such as menus, actions, details, choices, review, multi-select and task/progress interactions.

Why selected:

- purpose-built for independently installable Pi extensions;
- owns navigation, cancellation, lifecycle and width-safe rendering;
- adapts common flows across TUI/RPC modes;
- uses Pi's theme/keybindings instead of a parallel visual system;
- provides a public testing harness for UI behavior.

Do not recreate its standard screens locally.

## `avtc-pi-settings-ui` - optional

Install only when a real extension needs schema-driven persistent settings with a dedicated settings UI. Revalidate current package/version first.

## `avtc-pi-ui-components` - optional

Install only when asynchronous flows can open dialogs concurrently and need coordination/queuing. Revalidate current package/version first.

Do not install it merely for ordinary command-opened dialogs.

## `pi-extension-toolkit` - optional external development tool

Use as a verifier/retrofit reference when useful, not as a runtime dependency by default. Revalidate its current conventions before adopting them because its preferred toolchain may differ from this Bun-first template.
