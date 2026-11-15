/**
 * Genera una etiqueta HTML con formato de insignia para una actividad dada.
 * Convierte el nombre de la actividad a mayúsculas para mantener un estilo visual homogéneo.
 *
 * @param {string} actividad - Nombre de la actividad.
 * @returns {string} Fragmento HTML correspondiente a la etiqueta con la clase 'badge-actividad'.
 */
function spanActividades(actividad) {
  // Devuelve la etiqueta span con el texto de la actividad en mayúsculas.
  return `<span class="badge-actividad">${actividad.toUpperCase()}</span>`;
}


// Permite usar la función de creación de insignias de actividad en otros módulos.
export { spanActividades };