/**
 * Limpia y formatea un número de teléfono en grupos de 3 cifras (XXX XXX XXX).
 * Sirve tanto para formatear en tiempo real mientras el usuario escribe como para mostrar consultas.
 *
 * @param {string|number} valor - Teléfono con o sin formato previo.
 * @returns {string} Teléfono formateado con espacios.
 */
function formatearTelefono(valor) {
  if (!valor) return "";

  const digitos = String(valor).replace(/\D/g, "").slice(0, 9);
  const coincidencias = digitos.match(/\d{1,3}/g);
  return coincidencias ? coincidencias.join(" ") : "";
}

export { formatearTelefono };

