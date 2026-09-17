import { spawn } from "node:child_process";
import { constants } from "node:fs";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const [, , kind, rawName] = process.argv;
const supported = new Set(["command", "tool", "service", "menu"]);

if (!kind || !rawName || !supported.has(kind)) {
  console.error("Usage: bun run generate -- <command|tool|service|menu> <name>");
  process.exit(1);
}

const kebab = rawName
  .trim()
  .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
  .replace(/[^a-zA-Z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .toLowerCase();

if (!kebab) {
  console.error("Name must contain letters or numbers.");
  process.exit(1);
}

const pascal = kebab
  .split("-")
  .filter(Boolean)
  .map((part) => part[0].toUpperCase() + part.slice(1))
  .join("");
const camel = pascal[0].toLowerCase() + pascal.slice(1);
const root = process.cwd();

async function exists(path: string) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function createFile(relativePath: string, content: string) {
  const path = resolve(root, relativePath);
  if (await exists(path)) {
    throw new Error(`Refusing to overwrite existing file: ${relativePath}`);
  }
  await mkdir(resolve(path, ".."), { recursive: true });
  await writeFile(path, content, "utf8");
  console.log(`created ${relativePath}`);
}

async function insertBeforeMarker(relativePath: string, marker: string, line: string) {
  const path = resolve(root, relativePath);
  const source = await readFile(path, "utf8");
  if (source.includes(line)) return;
  if (!source.includes(marker)) {
    throw new Error(`Missing scaffold marker ${marker} in ${relativePath}`);
  }
  await writeFile(path, source.replace(marker, `${line}\n${marker}`), "utf8");
}

async function syncAIContext() {
  await new Promise<void>((resolvePromise) => {
    const child = spawn("aicontext", ["sync"], {
      cwd: root,
      stdio: "ignore",
    });
    child.once("error", () => resolvePromise());
    child.once("exit", (code) => {
      if (code === 0) console.log("synced AIContext");
      resolvePromise();
    });
  });
}


if (kind === "command") {
  await createFile(
    `src/commands/${kebab}.ts`,
    `import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";\n\nexport function register${pascal}Command(pi: ExtensionAPI) {\n  pi.registerCommand("${kebab}", {\n    description: "TODO: describe ${kebab}",\n    handler: async (_args, ctx) => {\n      ctx.ui.notify("TODO: implement ${kebab}", "info");\n    },\n  });\n}\n`,
  );
  await insertBeforeMarker(
    "src/commands/index.ts",
    "// <scaffold:imports>",
    `import { register${pascal}Command } from "./${kebab}.js";`,
  );
  await insertBeforeMarker(
    "src/commands/index.ts",
    "  // <scaffold:register>",
    `  register${pascal}Command(pi);`,
  );
}

if (kind === "tool") {
  const toolName = kebab.replaceAll("-", "_");
  await createFile(
    `src/tools/${kebab}.ts`,
    `import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";\nimport { Type } from "typebox";\n\nexport function register${pascal}Tool(pi: ExtensionAPI) {\n  pi.registerTool({\n    name: "${toolName}",\n    label: "${pascal}",\n    description: "TODO: describe ${toolName}",\n    parameters: Type.Object({\n      input: Type.String({ description: "Input" }),\n    }),\n    async execute(_toolCallId, params) {\n      return {\n        content: [{ type: "text", text: "TODO: ${toolName} received: " + params.input }],\n        details: {},\n      };\n    },\n  });\n}\n`,
  );
  await insertBeforeMarker(
    "src/tools/index.ts",
    "// <scaffold:imports>",
    `import { register${pascal}Tool } from "./${kebab}.js";`,
  );
  await insertBeforeMarker(
    "src/tools/index.ts",
    "  // <scaffold:register>",
    `  register${pascal}Tool(pi);`,
  );
}

if (kind === "service") {
  await createFile(
    `src/services/${kebab}.ts`,
    `export async function ${camel}(input: string): Promise<string> {\n  // Keep domain logic here when it does not need Pi runtime APIs.\n  return input;\n}\n`,
  );
}

if (kind === "menu") {
  await createFile(
    `src/ui/${kebab}-menu.ts`,
    `import type { ExtensionCommandContext } from "@earendil-works/pi-coding-agent";\nimport { defineMenu, runMenu } from "@narumitw/pi-tui-kit";\n\nconst ${camel}Menu = defineMenu<undefined, "main", "unused">({\n  start: "main",\n  screens: {\n    main: () => ({\n      kind: "detail",\n      title: "${pascal}",\n      lines: ["TODO: replace with extension-specific content"],\n      hint: "close",\n    }),\n  },\n  actions: {\n    unused: async () => ({ kind: "stay" }),\n  },\n});\n\nexport function show${pascal}Menu(ctx: ExtensionCommandContext) {\n  return runMenu(ctx, ${camel}Menu, { getState: () => undefined });\n}\n`,
  );
}

await syncAIContext();
console.log("done");
