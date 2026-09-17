# Development workflow

This file describes work **after** the project has been created and initialized. The template creation command lives in the boilerplate README.

## 1. Ask whether scaffolding is actually useful

If the requested unit maps to an existing generator, use it:

```bash
bun run generate -- command refine
bun run generate -- tool search-project
bun run generate -- service prompt-refiner
bun run generate -- menu refine-review
```

Do not add a generator merely because a new file type exists once.

## 2. Implement project-specific logic

Prefer this boundary:

```text
command/tool/UI orchestration
        ↓
service/domain logic
```

Keep Pi-specific APIs at the edges when practical.

## 3. Before building missing reusable infrastructure

Follow this order:

```text
existing project pattern
→ Pi native API
→ Pi Packages
→ npm / GitHub
→ reuse or focused fork
→ smallest local implementation
```

Only promote the local implementation back to the boilerplate after real reuse is demonstrated.

## 4. Validate

```bash
bun run check
bun run pack:check
```

Try locally with Pi:

```bash
pi -e ./src/index.ts
```

## 5. Keep AIContext current

When AIContext is installed:

```bash
aicontext sync
aicontext check
```

`init` and the generator already attempt the routine sync where appropriate; agents should not repeatedly rediscover deterministic repository facts.
