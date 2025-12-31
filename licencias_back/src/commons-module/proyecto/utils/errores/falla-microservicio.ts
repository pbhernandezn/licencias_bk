import { HttpException } from '@nestjs/common';
import { ErrorEspecialEnum } from '../enums/errores-especiales-enum';

/**
 * Class: falla-microservicio.ts
 * Description:
 *
 * Error relacionado a falla de un microservicio
 *
 *
 */
export class FallaMicroservicio extends HttpException {
  /**
   * Error designado en caso de la
   *     falla de microservicio.
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
    Object.setPrototypeOf(this, FallaMicroservicio.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FallaMicroservicio);
    } else {
      this.stack = undefined;
    }
  }
}
