import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

import { registerCommands } from "./commands/index.js";
import { registerTools } from "./tools/index.js";

export default function extension(pi: ExtensionAPI) {
  registerCommands(pi);
  registerTools(pi);
}
