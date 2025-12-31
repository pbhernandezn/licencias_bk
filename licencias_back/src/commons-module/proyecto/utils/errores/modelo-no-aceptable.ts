import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Class: modelo-no-aceptable.ts
 * Description:
 *
 * Error relacionado a modelos no aceptados.
 *
 */
export class ModeloNoAceptable extends HttpException {
  /**
   * Error designado en caso de la
   * del uso de modelo no aceptable.
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string) {
    super(mensaje, HttpStatus.NOT_ACCEPTABLE);
    this.name = 'Modelo no aceptable';
    Object.setPrototypeOf(this, ModeloNoAceptable.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ModeloNoAceptable);
    } else {
      this.stack = undefined;
    }
  }
}
