// Fail fast if a server module gets imported into a browser bundle by mistake.
export function assertServerOnly(moduleName: string): void {
  if (typeof window !== 'undefined') {
    throw new Error(`${moduleName} must only be imported on the server`);
  }
}
