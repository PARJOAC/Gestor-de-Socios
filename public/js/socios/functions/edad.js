/**
 * Calcula la edad en años completos según la fecha actual.
 * Tiene en cuenta si el cumpleaños de este año ya ha ocurrido.
 * @param {string} fechaNacimiento - Fecha de nacimiento en formato año-mes-día.
 * @returns {number} Edad actual de la persona en años.
 */
function calcularEdad(fechaNacimiento) {
  // Convierte el año, el mes y el día de la fecha guardada en números.
  const [anioNacimiento, mesNacimiento, diaNacimiento] = fechaNacimiento
    .split("-")
    .map(Number);
  // Obtiene la fecha actual para compararla con el nacimiento.
  const hoy = new Date();
  // Detecta si todavía falta para el cumpleaños de este año.
  const aunNoCumpleAnios =
    hoy.getMonth() + 1 < mesNacimiento ||
    (hoy.getMonth() + 1 === mesNacimiento && hoy.getDate() < diaNacimiento);

  // Resta un año si el cumpleaños aún no ha ocurrido.
  return hoy.getFullYear() - anioNacimiento - Number(aunNoCumpleAnios);
}

// Permite calcular la edad desde los módulos que la necesitan.
export { calcularEdad };
