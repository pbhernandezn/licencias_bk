import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Class: instancia-no-permitida-error.ts
 * Description:
 *
 * Error relacionado a instancias no permitidas.
 *
 */
export class InstanciaNoPermitidaError extends HttpException {
  /**
   * Error designado para la violación
   * de politica de creación de instancia en clases estaticas.
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string) {
    super(mensaje, HttpStatus.NOT_ACCEPTABLE);
    this.name = 'Instancia no permitida';
    Object.setPrototypeOf(this, InstanciaNoPermitidaError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InstanciaNoPermitidaError);
    } else {
      this.stack = undefined;
    }
  }
}
