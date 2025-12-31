import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Class: microservicio-no-disponible.ts
 * Description:
 *
 * Error relacionado a la ausencia de microservicio requerido.
 *
 */
export class MicroservicioNoDiponible extends HttpException {
  /**
   * Error designado en caso de
   * Microservicio no disponible.
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string) {
    super(mensaje, HttpStatus.SERVICE_UNAVAILABLE);
    this.name = 'Microservicio no disponible';
    Object.setPrototypeOf(this, MicroservicioNoDiponible.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MicroservicioNoDiponible);
    } else {
      this.stack = undefined;
    }
  }
}
