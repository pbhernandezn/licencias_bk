import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Class: busqueda-vacia.ts
 * Description:
 *
 * Error relacionado a busqueda vacía
 *
 */
export class BusquedaVacia extends HttpException {
  /**
   * Error designado en caso de
   * busqueda con retorno de información vacia
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string) {
    super(mensaje, HttpStatus.NO_CONTENT);
    this.name = 'Búsqueda sin resultados.';
    Object.setPrototypeOf(this, BusquedaVacia.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BusquedaVacia);
    } else {
      this.stack = undefined;
    }
  }
}
