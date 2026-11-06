// Importa los nombres de días y meses usados al escribir una fecha.
import { DiasSemana, Meses } from "../_constants/fechas.js";

/**
 * Escribe una fecha con el día de la semana, el día, el mes y el año.
 * @param {Date} fecha - Fecha que se va a presentar.
 * @returns {string} Fecha completa con los nombres del día y del mes.
 */
function fechaCompleta(fecha) {
  return `${DiasSemana[fecha.getDay()]}, ${fecha.getDate()} de ${Meses[fecha.getMonth()].toLowerCase()} de ${fecha.getFullYear()}`;
}

// Permite formatear fechas desde otros módulos.
export { fechaCompleta };
