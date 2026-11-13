// Importa los nombres de días y meses usados al escribir una fecha.
import { DiasSemana, Meses } from "../_constants/fechas.js";

/**
 * Escribe una fecha con el día de la semana, el día, el mes y el año.
 * EJEMPLO SALIDA: Viernes, 13 de noviembre de 2026
 * @param {Date} fecha - Fecha que se va a presentar.
 * @returns {string} Fecha completa con los nombres del día y del mes.
 */
function fechaCompleta(fecha) {
  return `${DiasSemana[fecha.getDay()]}, ${fecha.getDate()} de ${Meses[fecha.getMonth()].toLowerCase()} de ${fecha.getFullYear()}`;
}
/**
 * Escribe una fecha con su descripción completa y en formato numérico entre paréntesis.
 * EJEMPLO SALIDA: Martes, 14 de marzo de 1972 (14/3/1972)
 * @param {Date} f - Fecha a formatear.
 * @returns {string} Fecha con formato legible y numérico.
 */
function fechaLegibleYNumero(f) {
  return `${fechaCompleta(f)} (${fechaCorta(f)})`;
}
/**
 * Escribe una fecha completa y en formato numérico.
 * EJEMPLO SALIDA: 14/3/1972
 * @param {Date} f - Fecha a formatear.
 * @returns {string} Fecha con formato legible y numérico.
 */
function fechaCorta(f) {
  return `${f.getDate()}/${f.getMonth() + 1}/${f.getFullYear()}`;
}

// Permite formatear fechas desde otros módulos.
export { fechaCompleta, fechaLegibleYNumero, fechaCorta };
