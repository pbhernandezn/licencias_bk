export class ShutdownConfig {
  public static getEnvironment() {
    if (!process.env.NODE_ENV) return null;
    return process.env.NODE_ENV;
  }
}
