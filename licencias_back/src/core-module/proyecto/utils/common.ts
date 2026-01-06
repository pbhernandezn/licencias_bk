/**
 * Valida si una cadena contiene solo letras mayúsculas, minúsculas y vocales con acentos.
 * @param input - La cadena a validar.
 * @returns True si la cadena es válida, false en caso contrario.
 */
export function isValidName(input: string): boolean {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
  return regex.test(input);
}

/**
 * Valida si un CURP (Clave Única de Registro de Población) es válido.
 * @param curp - El CURP a validar.
 * @returns True si el CURP es válido, false en caso contrario.
 */
export function isValidCURP(curp: string): boolean {
  const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}\d$/;
  return regex.test(curp);
}

/**
 * Valida si un RFC (Registro Federal de Contribuyentes) es válido.
 * @param rfc - El RFC a validar.
 * @returns True si el RFC es válido, false en caso contrario.
 */
export function isValidRFC(rfc: string): boolean {
  const regex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
  return regex.test(rfc);
}

/**
 * Valida si una dirección de correo electrónico es válida.
 * @param email - El correo electrónico a validar.
 * @returns True si el correo electrónico es válido, false en caso contrario.
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

/**
 * Higieniza una cadena eliminando caracteres potencialmente peligrosos y permitiendo solo letras en español, números y símbolos comunes.
 * @param input - La cadena a higienizar.
 * @returns La cadena higienizada.
 */
export function sanitizeString(input: string): string {
  const regex = /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9.,;:!¡¿?"'\(\)\[\]\{\}\-\s]/g;
  return input.replace(regex, '');
}

/**
 * Valida si una fecha (aaaa-mm-dd) coincide con la fecha codificada en un CURP.
 * @param date - La fecha a validar en formato aaaa-mm-dd.
 * @param curp - El CURP del cual extraer la fecha.
 * @returns True si la fecha coincide, false en caso contrario.
 */
export function isDateMatchingCURP(date: string, curp: string): boolean {
  const curpRegex = /^[A-Z]{4}(\d{2})(\d{2})(\d{2})[HM]/;
  const match = curp.match(curpRegex);
  if (!match) return false;

  const yearPrefix = parseInt(match[1], 10) < 50 ? 2000 : 1900;
  const year = yearPrefix + parseInt(match[1], 10);
  const month = match[2].padStart(2, '0');
  const day = match[3].padStart(2, '0');
  const curpDate = `${year}-${month}-${day}`;

  return curpDate === date;
}

/**
 * Valida si una fecha (aaaa-mm-dd) coincide con la fecha codificada en un RFC.
 * @param date - La fecha a validar en formato aaaa-mm-dd.
 * @param rfc - El RFC del cual extraer la fecha.
 * @returns True si la fecha coincide, false en caso contrario.
 */
export function isDateMatchingRFC(date: string, rfc: string): boolean {
  const rfcRegex = /^[A-ZÑ&]{3,4}(\d{2})(\d{2})(\d{2})/;
  const match = rfc.match(rfcRegex);
  if (!match) return false;

  const year = parseInt(match[1], 10) + (parseInt(match[1], 10) < 50 ? 2000 : 1900);
  const month = match[2];
  const day = match[3];
  const rfcDate = `${year}-${month}-${day}`;

  return rfcDate === date;
}

/**
 * Valida si una cadena es una fecha válida en formato aaaa-mm-dd y si esta fecha es menor a 100 años.
 * @param date - La cadena a validar como fecha.
 * @returns True si la fecha es válida y menor a 100 años, false en caso contrario.
 */
export function isValidDate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return false;

  const today = new Date();
  const hundredYearsAgo = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

  return parsedDate >= hundredYearsAgo && parsedDate <= today;
}