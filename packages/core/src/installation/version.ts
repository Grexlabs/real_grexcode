declare global {
  const GREXCODE_VERSION: string
  const GREXCODE_CHANNEL: string
}

export const InstallationVersion = typeof GREXCODE_VERSION === "string" ? GREXCODE_VERSION : "local"
export const InstallationChannel = typeof GREXCODE_CHANNEL === "string" ? GREXCODE_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"
