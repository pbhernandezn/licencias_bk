import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Class: valor-no-valido.ts
 * Description:
 *
 * Error relacionado a valores no aceptados.
 *
 *
 */
export class ValorNoAceptable extends HttpException {
  /**
   * Error designado en caso de la
   * Valor no válido.
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string) {
    super(mensaje, HttpStatus.NOT_ACCEPTABLE);
    this.name = 'Valor no aceptable';
    Object.setPrototypeOf(this, ValorNoAceptable.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValorNoAceptable);
    } else {
      this.stack = undefined;
    }
  }
}
