/**
 * Enum con constantes relacionadas con orden
 * de la consulta
 * @enum(string)
 *
 * Categoría: UTILIDADES
 *
 */
export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * Enum con constantes relacionadas con operadores
 * relacionados a la consulta
 * @enum(string)
 *
 * Categoría: UTILIDADES
 *
 */
export enum Comparison {
  EQUAL = 'EQUAL',
  LESS_THAN = 'LESS_THAN',
  MORE_THAN = 'MORE_THAN',
  LESS_EQUAL_THAN = 'LESS_EQUAL_THAN',
  MORE_EQUAL_THAN = 'MORE_EQUAL_THAN',
  NOT = 'NOT',
  LIKE = 'LIKE',
  ILIKE = 'ILIKE',
  IN = 'IN',
}

/**
 * Enum con constantes relacionadas a los mensajes
 * correspondientes a la consulta realizada
 * @enum(string)
 *
 * Categoría: UTILIDADES
 *
 */
export enum CRUDMessages {
  GetSuccess = 'Datos obtenidos correctamente.',
  GetError = 'Ocurrio un error al intentar obtener los datos.',
  CreateSuccess = 'Registro guardado correctamente.',
  CreateError = 'Ocurrio un error al intentar guardar el registro.',
  DeleteSuccess = 'Registro eliminado correctamente.',
  DeleteError = 'Ocurrio un error al intentar eliminar el registro.',
  UpdateSuccess = 'Registro actualizado correctamente.',
  UpdateError = 'Ocurrio un error al intentar actualizar el registro.',
  GenericException = 'Ocurrio un error.',
}
