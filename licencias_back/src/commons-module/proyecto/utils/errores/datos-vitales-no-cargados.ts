import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Class: datos-vitales-no-cargados.ts
 * Description:
 *
 * Error relacionado a la carga de datos vitales.
 *
 */
export class DatosVitalesNoCargados extends HttpException {
  /**
   * Error designado en caso de la
   * del datos vitales no cargados.
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string) {
    super(mensaje, HttpStatus.NO_CONTENT);
    this.name = 'Datos vitales no cargados';
    Object.setPrototypeOf(this, DatosVitalesNoCargados.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatosVitalesNoCargados);
    } else {
      this.stack = undefined;
    }
  }
}
