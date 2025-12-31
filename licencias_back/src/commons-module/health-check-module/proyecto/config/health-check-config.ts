export class HealthCheckConfig {
  /**
   * Entrega las credenciales del cache
   *
   * @returns {string} Retorna valor de la variable de entorno HEALTH_CHECK_URL
   */
  public static getDirection(): string {
    if (process.env.HEALTH_CHECK_URL === undefined) {
      console.warn(
        'ADVERTENCIA: no se ha definido la variable de entorno HEALTH_CHECK_URL',
        'se usará por defecto el valor: http://localhost:3000',
      );
      return 'http://localhost:3000';
    }
    return process.env.HEALTH_CHECK_URL;
  }
}
