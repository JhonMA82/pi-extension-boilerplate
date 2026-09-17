import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

const root = process.cwd();
const requestedDescription = process.argv.slice(2).join(" ").trim();

function packageNameFromDirectory(directory: string): string {
  const normalized = directory
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^[._-]+|[._-]+$/g, "")
    .replace(/-+/g, "-");

  if (!normalized) {
    throw new Error("The current directory cannot be converted to a valid package name.");
  }

  return normalized;
}

async function run(command: string[], optional = false): Promise<boolean> {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command[0], command.slice(1), {
      cwd: root,
      stdio: "inherit",
    });

    child.once("error", (error) => {
      if (optional) resolvePromise(false);
      else reject(error);
    });
    child.once("exit", (code) => resolvePromise(code === 0));
  });
}


const packageName = packageNameFromDirectory(basename(root));
const packagePath = resolve(root, "package.json");
const aiContextPath = resolve(root, ".engineering/aicontext.toml");
const projectStatePath = resolve(root, ".engineering/PROJECT_STATE.md");

const pkg = JSON.parse(await readFile(packagePath, "utf8"));
const firstInitialization = pkg.name === "pi-extension-template";
pkg.name = packageName;
if (firstInitialization) pkg.version = "0.1.0";
if (requestedDescription) {
  pkg.description = requestedDescription;
} else if (
  !pkg.description ||
  pkg.description === "Bun-first template for practical, consistent Pi extensions."
) {
  pkg.description = `Pi extension: ${packageName}`;
}
await writeFile(packagePath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");

let aiContext = await readFile(aiContextPath, "utf8");
const tomlName = packageName.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
aiContext = aiContext.replace(/(^\[project\]\s*\nname\s*=\s*")[^"]*(")/m, `$1${tomlName}$2`);
await writeFile(aiContextPath, aiContext, "utf8");

let projectState = await readFile(projectStatePath, "utf8");
projectState = projectState.replace(/^Project: .*$/m, `Project: ${packageName}`);
await writeFile(projectStatePath, projectState, "utf8");

if (firstInitialization) {
  const projectDescription = pkg.description || `Pi extension: ${packageName}`;
  const projectReadme = `# ${packageName}

${projectDescription}

## Development

\`\`\`bash
bun install
bun run check
pi -e ./src/index.ts
\`\`\`

Generate common structures only when useful:

\`\`\`bash
bun run generate -- command <name>
bun run generate -- tool <name>
bun run generate -- service <name>
bun run generate -- menu <name>
\`\`\`

## Structure

- \`src/commands/\` — slash commands.
- \`src/tools/\` — LLM-callable tools.
- \`src/services/\` — domain logic when a service boundary is useful.
- \`src/ui/\` — extension-specific UI composition.
- \`.engineering/\` — AIContext repository knowledge and patterns.
- \`docs/\` — architecture, UI and workflow guidance inherited from the boilerplate.

## UI rule

Use Pi \`ctx.ui\` for simple interactions and \`@narumitw/pi-tui-kit\` for standard complex flows. Research existing Pi/npm/GitHub solutions before creating reusable UI infrastructure.

## Publishing

The project starts with \`private: true\`. Remove it only when you intentionally decide to publish the extension as a Pi Package.
`;
  await writeFile(resolve(root, "README.md"), projectReadme, "utf8");
  await writeFile(
    resolve(root, "CHANGELOG.md"),
    `# Changelog

## 0.1.0

- Initialized from pi-extension-boilerplate v0.3.0.
`,
    "utf8",
  );
}

console.log(`\nInitialized ${packageName}`);
console.log("Running base validation...\n");

const checksOk = await run(["bun", "run", "check"]);
if (!checksOk) process.exit(1);

const synced = await run(["aicontext", "sync"], true);
if (synced) {
  const contextOk = await run(["aicontext", "check"], true);
  if (!contextOk) {
    console.warn("AIContext is installed, but aicontext check reported an issue.");
  }
} else {
  console.log("AIContext sync unavailable or unsuccessful; skipped automatic check.");
}

console.log("\nReady. Use `bun run generate -- <command|tool|service|menu> <name>` when scaffolding is useful.");
