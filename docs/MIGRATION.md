# Migrating an existing extension

Do not rewrite working extension logic simply to match the boilerplate.

## Recommended approach

1. Create a clean target from the template:

```bash
bun create JhonMA82/pi-extension-boilerplate migrated-extension
cd migrated-extension
bun run init
```

2. Inventory the existing extension's actual behavior.
3. Move domain logic into `src/services/` only where that separation improves clarity/testability.
4. Recreate command/tool registration through the generator when it reduces wiring mistakes.
5. Replace hand-built common dialogs with Pi native UI or Pi TUI Kit only when behavior remains equivalent.
6. Keep specialized working UI local if no existing reusable solution is better.
7. Run `bun run check` and test the extension with Pi before deleting the old implementation.

For Refiner or ODD Status, visual consistency should come from the selected shared Pi UI primitives rather than duplicating historical dialog code.
