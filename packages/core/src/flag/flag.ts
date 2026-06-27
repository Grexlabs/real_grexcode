import { Config } from "effect"

export function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

const copy = process.env["GREXCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
const fff = process.env["GREXCODE_DISABLE_FFF"]

function enabledByExperimental(key: string) {
  return process.env[key] === undefined ? truthy("GREXCODE_EXPERIMENTAL") : truthy(key)
}

export const Flag = {
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
  OTEL_EXPORTER_OTLP_HEADERS: process.env["OTEL_EXPORTER_OTLP_HEADERS"],

  GREXCODE_AUTO_HEAP_SNAPSHOT: truthy("GREXCODE_AUTO_HEAP_SNAPSHOT"),
  GREXCODE_GIT_BASH_PATH: process.env["GREXCODE_GIT_BASH_PATH"],
  GREXCODE_CONFIG: process.env["GREXCODE_CONFIG"],
  GREXCODE_CONFIG_CONTENT: process.env["GREXCODE_CONFIG_CONTENT"],
  GREXCODE_DISABLE_AUTOUPDATE: truthy("GREXCODE_DISABLE_AUTOUPDATE"),
  GREXCODE_ALWAYS_NOTIFY_UPDATE: truthy("GREXCODE_ALWAYS_NOTIFY_UPDATE"),
  GREXCODE_DISABLE_PRUNE: truthy("GREXCODE_DISABLE_PRUNE"),
  GREXCODE_DISABLE_TERMINAL_TITLE: truthy("GREXCODE_DISABLE_TERMINAL_TITLE"),
  GREXCODE_SHOW_TTFD: truthy("GREXCODE_SHOW_TTFD"),
  GREXCODE_DISABLE_AUTOCOMPACT: truthy("GREXCODE_DISABLE_AUTOCOMPACT"),
  GREXCODE_DISABLE_MODELS_FETCH: truthy("GREXCODE_DISABLE_MODELS_FETCH"),
  GREXCODE_DISABLE_MOUSE: truthy("GREXCODE_DISABLE_MOUSE"),
  GREXCODE_FAKE_VCS: process.env["GREXCODE_FAKE_VCS"],
  GREXCODE_SERVER_PASSWORD: process.env["GREXCODE_SERVER_PASSWORD"],
  GREXCODE_SERVER_USERNAME: process.env["GREXCODE_SERVER_USERNAME"],
  GREXCODE_DISABLE_FFF: fff === undefined ? process.platform === "win32" : truthy("GREXCODE_DISABLE_FFF"),

  // Experimental
  GREXCODE_EXPERIMENTAL_FILEWATCHER: Config.boolean("GREXCODE_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  GREXCODE_EXPERIMENTAL_DISABLE_FILEWATCHER: Config.boolean("GREXCODE_EXPERIMENTAL_DISABLE_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  GREXCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT:
    copy === undefined ? process.platform === "win32" : truthy("GREXCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"),
  GREXCODE_MODELS_URL: process.env["GREXCODE_MODELS_URL"],
  GREXCODE_MODELS_PATH: process.env["GREXCODE_MODELS_PATH"],
  GREXCODE_DB: process.env["GREXCODE_DB"],

  GREXCODE_WORKSPACE_ID: process.env["GREXCODE_WORKSPACE_ID"],
  GREXCODE_EXPERIMENTAL_WORKSPACES: enabledByExperimental("GREXCODE_EXPERIMENTAL_WORKSPACES"),

  // Evaluated at access time (not module load) because tests, the CLI, and
  // external tooling set these env vars at runtime.
  get GREXCODE_DISABLE_PROJECT_CONFIG() {
    return truthy("GREXCODE_DISABLE_PROJECT_CONFIG")
  },
  get GREXCODE_EXPERIMENTAL_REFERENCES() {
    return enabledByExperimental("GREXCODE_EXPERIMENTAL_REFERENCES")
  },
  get GREXCODE_TUI_CONFIG() {
    return process.env["GREXCODE_TUI_CONFIG"]
  },
  get GREXCODE_CONFIG_DIR() {
    return process.env["GREXCODE_CONFIG_DIR"]
  },
  get GREXCODE_PURE() {
    return truthy("GREXCODE_PURE")
  },
  get GREXCODE_PERMISSION() {
    return process.env["GREXCODE_PERMISSION"]
  },
  get GREXCODE_PLUGIN_META_FILE() {
    return process.env["GREXCODE_PLUGIN_META_FILE"]
  },
  get GREXCODE_CLIENT() {
    return process.env["GREXCODE_CLIENT"] ?? "cli"
  },
}
