import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Class: variable-entorno-no-asignada.ts
 * Description:
 *
 * Error relacionado a variables de entorno no asignadas.
 *
 */
export class VariableEntornoNoAsignada extends HttpException {
  /**
   * Error designado en caso de la
   *     inexistencia de una variable de entorno necesaria
   *     y no existente.
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string) {
    super(mensaje, HttpStatus.NO_CONTENT);
    this.name = 'Variable de entorno no encontrada';
    Object.setPrototypeOf(this, VariableEntornoNoAsignada.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, VariableEntornoNoAsignada);
    } else {
      this.stack = undefined;
    }
  }
}
