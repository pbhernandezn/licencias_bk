/**
 * Enum con constantes relacionadas con codigos internos
 * @enum(string)
 *
 * Categoría: UTILIDADES
 *
 */
export enum INTERNAL_CODES {
  // eslint-disable-line
  SUCCESFULL = '0000',
  ERROR_CODE = '0002',
  ERROR_DB_CODE = '0003',
  EMMPTY_RESULT_CODE = '0004',
  ROUTE_FILE_NOT_VALID = '0005',
  FILE_UNDEFINED = '0006',
  VALIDATION_FIELD_ERROR_CODE = 'FL001',
  TOKEN_VALIDATION_ERROR_CODE = 'JWT01',
  NOT_VALID_ERROR_CODE = '0007',
}

/**
 * Enum con constantes relacionadas con mensajes internos
 * @enum(string)
 *
 * Categoría: UTILIDADES
 *
 */
export enum INTERNAL_MESSAGES {
  // eslint-disable-line
  SUCCESFULL = 'Consulta Exitosa',
  SUCCESFULLVALIDATION = 'Validación Exitosa',
  ERROR_MESSAGE = 'Por el momento los servicios no están disponibles.',
  ERROR_DB_MESSAGE = 'Error al consultar datos',
  ROUTE_FILE_NOT_VALID_MESSAGE = 'Ruta de archivo no válido',
  FILE_UNDEFINED_MESSAGE = 'El archivo no fue especificado',
  EMMPTY_RESULT_MESSAGE = 'No se encontraron resultados',
  NOT_VALID_ERROR_CODE = 'Falló la validación',

  // 🔐 Autenticación
  LOGIN_SUCCESS = 'Autenticación exitosa',
  LOGIN_INVALID_CREDENTIALS = 'Usuario o contraseña incorrectos',
  LOGIN_USER_INACTIVE = 'El usuario se encuentra inactivo',
  LOGIN_USER_LOCKED = 'El usuario se encuentra bloqueado',
  LOGIN_TOO_MANY_ATTEMPTS = 'Se excedió el número de intentos permitidos',
  LOGIN_TOKEN_GENERATION_ERROR = 'No fue posible generar el token de autenticación',
}

/**
 * Enum con constantes relacionadas con codigos de respuesta
 * @enum(string)
 *
 * Categoría: UTILIDADES
 *
 */
export enum RESPONSE_CODES {
  // eslint-disable-line
  SUCCESFULL = '200',
  ERROR_CODE = '500',
  ERROR_DB_CODE = '400',
  ERROR_CUSTOM = '550',
  EMMPTY_RESULT_CODE = '204',
}
