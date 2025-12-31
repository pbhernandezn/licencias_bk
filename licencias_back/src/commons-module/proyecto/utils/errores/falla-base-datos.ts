import { HttpException } from '@nestjs/common';
import { ErrorEspecialEnum } from '../enums/errores-especiales-enum';

/**
 * Class: falla-base-datos.ts
 * Description:
 *
 * Error relacionado a falla en la base de datos.
 *
 */

export class FallaBaseDatos extends HttpException {
  /**
   * Error designado en caso de la
   *     falla de la base de datos.
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string, track: string) {
    super(mensaje, ErrorEspecialEnum.ERROR_INTERNO);
    if (track) {
      this.name = `Restringido, TrackInfo: ${track}`;
    } else {
      this.name = `Restringido`;
    }
    Object.setPrototypeOf(this, FallaBaseDatos.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FallaBaseDatos);
    } else {
      this.stack = undefined;
    }
  }
}
