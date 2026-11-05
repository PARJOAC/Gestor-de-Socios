// Importar los enumerados de días de la semana y meses
import { DiasSemana, Meses } from "../../enum/fechas.js";

// Función para formatear una fecha completa
function fechaCompleta(fecha) {
  return `${DiasSemana[fecha.getDay()]}, ${fecha.getDate()} de ${Meses[fecha.getMonth()].toLowerCase()} de ${fecha.getFullYear()}`;
}

// Exportar la función para poder usarla en otros archivos
export { fechaCompleta };
