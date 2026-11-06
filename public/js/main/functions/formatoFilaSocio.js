/**
 * Obtiene las iniciales del nombre y del primer apellido para el avatar de la fila.
 * @param {string} nombre - Nombre del socio.
 * @param {string} apellidos - Apellidos del socio.
 * @returns {string} Iniciales en mayúsculas.
 */
function obtenerIniciales(nombre, apellidos) {
  // Obtiene la primera letra de cada dato si está disponible.
  let primNombre = nombre ? nombre.trim().charAt(0) : "";
  let primApellido = apellidos ? apellidos.trim().charAt(0) : "";

  // Devuelve ambas iniciales en mayúsculas.
  return (primNombre + primApellido).toUpperCase();
}

/**
 * Abrevia el segundo apellido y conserva su primera letra para ahorrar espacio en la tabla.
 * @param {string} apellidos - Apellidos completos del socio.
 * @returns {string} Apellidos con el segundo apellido abreviado.
 */
function abreviarApellido(apellidos) {
  // Separa las letras acentuadas para que la expresión regular pueda reconocerlas.
  const normalizado = apellidos.normalize("NFD");
  // Busca el segundo apellido y conserva su primera letra.
  const eliminar = /\s([A-Za-z\u0300-\u036f])[A-Za-z\u0300-\u036f]*$/;

  // Sustituye el segundo apellido por su inicial seguida de un punto.
  return normalizado.replace(eliminar, " $1.");
}

/**
 * Oculta parte del usuario del correo y conserva visible el dominio.
 * @param {string} correo - Dirección de correo que se va a ocultar parcialmente.
 * @returns {string} Correo con parte del usuario reemplazada por asteriscos.
 */
function esconderCorreo(correo) {
  // Encuentra la posición donde empieza el dominio.
  const arroba = correo.indexOf("@");

  // Mantiene las primeras letras y reemplaza el resto del usuario por asteriscos.
  return (
    correo.charAt(0) +
    correo.charAt(1) +
    correo.slice(2, arroba).replace(/./g, "*") +
    correo.slice(arroba)
  );
}

// Permite usar los formateadores de la fila en el módulo de la tabla.
export { obtenerIniciales, abreviarApellido, esconderCorreo };
