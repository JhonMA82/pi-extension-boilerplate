# Design decisions

These are deliberate constraints, not missing features.

## No custom project creator

Rejected because Bun already supports remote GitHub repositories through `bun create`, including destination creation, dependency installation and fresh Git initialization.

## One small `init` step remains

Remote GitHub templates do not provide the same package-name substitution behavior documented for Bun local templates. `bun run init` derives the name from the destination folder and handles only Pi/AIContext-specific metadata plus validation.

## No globally installed template

A `$HOME/.bun-create` template can remove the init step, but introduces template installation/update synchronization. That tradeoff is not justified yet.

## No custom UI kit

Rejected because `@narumitw/pi-tui-kit` already covers the common navigation, rendering, lifecycle and cross-mode interaction problem.

## No global scaffolder CLI

The local generator is enough. A global CLI would add installation/versioning work without a demonstrated benefit.

## No capability registry/resolver

npm/Bun already resolve dependencies. `.engineering/DEPENDENCIES.md` is enough to route humans and agents to known optional solutions.

## No custom settings framework

Use `avtc-pi-settings-ui` only when a real extension needs schema-driven persistent settings.

## No custom dialog coordinator

Use `avtc-pi-ui-components` only when asynchronous dialogs can actually collide.

## No full release pipeline by default

Publishing, CI and release automation should be introduced only when the extension is ready for distribution and the chosen workflow is known.
