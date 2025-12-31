import { HttpException } from '@nestjs/common';

/**
 * Class: sesion-umbral.ts
 * Description:
 *
 * Error relacionado con el umbral de la sesión.
 *
 */
export class SesionUmbral extends HttpException {
  /**
   * Error designado en caso de que
   *     el token llegue al umbral de renovación
   *
   * @param mensaje Mensaje que mostrará en el error.
   */
  constructor(mensaje: string) {
    super(mensaje, 601);
    this.name = 'Token en umbral de renovación';
    Object.setPrototypeOf(this, SesionUmbral.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SesionUmbral);
    } else {
      this.stack = undefined;
    }
  }
}
