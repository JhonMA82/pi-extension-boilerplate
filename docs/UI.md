# UI guide

## Decision tree

```text
Need user interaction
  |
  +-- simple select / confirm / input / editor / notify
  |      -> Pi ctx.ui
  |
  +-- menu / review / action / multi-select / task
  |      -> @narumitw/pi-tui-kit
  |
  +-- persistent schema-driven settings
  |      -> avtc-pi-settings-ui, install only when needed
  |
  +-- asynchronous dialogs can collide
  |      -> avtc-pi-ui-components, install only when needed
  |
  +-- still not covered
         -> specialized local ctx.ui.custom()
```

## Consistency rules

1. Use Pi's active theme; do not hardcode a parallel color system.
2. Do not manually recreate frame spacing, navigation or cancellation already handled by Pi TUI Kit.
3. Keep domain-specific labels/state/actions inside the extension.
4. For specialized custom UI, test narrow terminal widths and lifecycle disposal.
5. A specialized UI used once remains local unless another real extension demonstrates reuse.

## Generate a standard menu

```bash
bun run generate -- menu odd-status
```

The generated file uses the public `defineMenu` + `runMenu` API from Pi TUI Kit.

## Simple interactions

Use Pi directly. A confirm or single input is not a reason to introduce another abstraction.
