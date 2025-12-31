import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Class: secuencia-operacion-incorrecta.ts
 * Description:
 *
 * Bloquea el intento de ejecución de una operación fuera de lugar
 *
 */
export class SecuenciaOperacionIncorrecta extends HttpException {
  /**
   * Error designado en caso de
   * secuencia de operación incorrecta y bloqueada
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string) {
    super(mensaje, HttpStatus.FORBIDDEN);
    this.name =
      'Se bloqueó el intento de ejecución de secuencia de operación no permitida.';
    Object.setPrototypeOf(this, SecuenciaOperacionIncorrecta.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SecuenciaOperacionIncorrecta);
    } else {
      this.stack = undefined;
    }
  }
}
