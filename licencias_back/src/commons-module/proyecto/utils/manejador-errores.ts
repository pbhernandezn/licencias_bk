import { AccesoNoAutorizado } from './errores/acceso-no-autorizado';
import { BusquedaVacia } from './errores/busqueda-vacia';
import { DatosVitalesNoCargados } from './errores/datos-vitales-no-cargados';
import { FallaBaseDatos } from './errores/falla-base-datos';
import { FallaMicroservicio } from './errores/falla-microservicio';
import { InstanciaNoPermitidaError } from './errores/instancia-no-permitida-error';
import { MicroservicioNoDiponible } from './errores/microservicio-no-disponible';
import { ModeloNoAceptable } from './errores/modelo-no-aceptable';
import { SecuenciaOperacionIncorrecta } from './errores/secuencia-operacion-incorrecta';
import { SesionUmbral } from './errores/sesion-umbral';
import { ValidacionNoSatisfactoria } from './errores/validacion-no-satisfactoria';
import { ValorNoAceptable } from './errores/valor-no-valido';
import { VariableEntornoNoAsignada } from './errores/variable-entorno-no-asignada';

/**
 * Class: manejador-errores.ts
 * Description:
 *
 * Indice de errores.
 *
 */
export class ManejadorErrores {
  /**
   * Constructor bloqueado.
   */
  private constructor() {
    throw ManejadorErrores.getInstanciaNoPermitidaError(
      'Clase estática',
      'd5dc0878-eeb3-4498-afd4-417b72d7d3da',
    );
  }

  /**
   * Violación de politica de
   *     creación de instancia en clase estática.
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getInstanciaNoPermitidaError(mensaje: string, track?: string) {
    let newMensaje = mensaje;
    if (track) {
      newMensaje += ` TrackInfo: ${track}`;
    }
    return new InstanciaNoPermitidaError(newMensaje);
  }

  /**
   * Variable de entorno no encontrada
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getVariableEntornoNoAsignada(mensaje: string, track?: string) {
    let newMensaje = mensaje;
    if (track) {
      newMensaje += ` TrackInfo: ${track}`;
    }
    return new VariableEntornoNoAsignada(newMensaje);
  }

  /**
   * Modelo no aceptable
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getModeloNoAceptable(mensaje: string, track?: string) {
    let newMensaje = mensaje;
    if (track) {
      newMensaje += ` TrackInfo: ${track}`;
    }
    return new ModeloNoAceptable(newMensaje);
  }

  /**
   * Valor no aceptable
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getValorNoAceptable(mensaje: string, track?: string) {
    let newMensaje = mensaje;
    if (track) {
      newMensaje += ` TrackInfo: ${track}`;
    }
    return new ValorNoAceptable(newMensaje);
  }

  /**
   * Datos vitales no cargados
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getDatosVitalesNoCargados(mensaje: string, track?: string) {
    let newMensaje = mensaje;
    if (track) {
      newMensaje += ` TrackInfo: ${track}`;
    }
    return new DatosVitalesNoCargados(newMensaje);
  }

  /**
   * Validación no satisfactoria
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getValidacionNoSatisfactoria(mensaje: string, track?: string) {
    let newMensaje = mensaje;
    if (track) {
      newMensaje += ` TrackInfo: ${track}`;
    }
    return new ValidacionNoSatisfactoria(newMensaje);
  }

  /**
   * Microservicio no disponible
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getMicroservicioNoDisponible(mensaje: string, track?: string) {
    let newMensaje = mensaje;
    if (track) {
      newMensaje += ` TrackInfo: ${track}`;
    }
    return new MicroservicioNoDiponible(newMensaje);
  }

  /**
   * Busqueda vacía
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getBusquedaVacia(mensaje: string, track?: string) {
    let newMensaje = mensaje;
    if (track) {
      newMensaje += ` TrackInfo: ${track}`;
    }
    return new BusquedaVacia(newMensaje);
  }

  /**
   * Falla en la base de datos
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getFallaBaseDatos(mensaje: string, track?: string) {
    return new FallaBaseDatos(mensaje, track);
  }

  /**
   * Falla en el microservicio
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getFallaMicroservicio(mensaje: string, track?: string) {
    return new FallaMicroservicio(mensaje, track);
  }

  /**
   * Acceso no autorizado
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getAccesoNoAutorizado(mensaje: string, track?: string) {
    let newMensaje = mensaje;
    if (track) {
      newMensaje += ` TrackInfo: ${track}`;
    }
    return new AccesoNoAutorizado(newMensaje);
  }

  /**
   * Conflicto en secuencia de proceso
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getSecuenciaOperacionIncorrecta(
    mensaje: string,
    track?: string,
  ) {
    let newMensaje = mensaje;
    if (track) {
      newMensaje += ` TrackInfo: ${track}`;
    }
    return new SecuenciaOperacionIncorrecta(newMensaje);
  }

  /**
   * Umbral de sesión alcanzado
   *
   * @param mensaje Mensaje personalizado al desencadenarse el error.
   * @returns Entrega el error.
   */
  public static getUmbralSesion(mensaje: string, track?: string) {
    let newMensaje = mensaje;
    if (track) {
      newMensaje += ` TrackInfo: ${track}`;
    }
    return new SesionUmbral(newMensaje);
  }
}
