import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Class: acceso-no-autorizado.ts
 * Description:
 *
 * Intento de acceso bloqueado
 *
 *
 */
export class AccesoNoAutorizado extends HttpException {
  /**
   * Error designado en caso de
   * Accesos no autorizados y bloqueados
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string) {
    super(mensaje, HttpStatus.UNAUTHORIZED);
    this.name = 'Se bloqueó el intento de acceso no autorizado.';
    Object.setPrototypeOf(this, AccesoNoAutorizado.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AccesoNoAutorizado);
    } else {
      this.stack = undefined;
    }
  }
}
