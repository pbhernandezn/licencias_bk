import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Class: validacion-no-satisfactoria.ts
 * Description:
 *
 * Error relacionado a la validación no satisfactoria.
 *
 */
export class ValidacionNoSatisfactoria extends HttpException {
  /**
   * Error designado en caso de la
   * Validación no satisfactoria.
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string) {
    super(mensaje, HttpStatus.EXPECTATION_FAILED);
    this.name = 'Validación no satisfactoria';
    Object.setPrototypeOf(this, ValidacionNoSatisfactoria.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidacionNoSatisfactoria);
    } else {
      this.stack = undefined;
    }
  }
}
