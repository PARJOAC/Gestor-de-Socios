// Importa la edad mínima que debe cumplir un socio.
import config from "../../../../config.json" with { type: "json" };
// Importa la función de cálculo de edad para reutilizarla.
import { calcularEdad } from "./edad.js";

// Permite palabras separadas por un solo espacio, tildes y la ñ y ü.
const sintaxisNombreApellidos =
  /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

/**
 * Comprueba que un texto use letras españolas y un solo espacio entre palabras.
 * @param {string} texto - Texto que se va a validar.
 * @returns {boolean} Indica si el texto tiene contenido y caracteres permitidos.
 */
function comprobarTextoNombreApellidos(texto) {
  const limpio = texto ? texto.trim() : "";
  return limpio.length > 0 && sintaxisNombreApellidos.test(limpio);
}

/**
 * Comprueba que el identificador tenga el formato SOC- seguido de cuatro cifras.
 * @param {string} id - Identificador que se va a validar.
 * @returns {boolean} Indica si el identificador tiene el formato esperado.
 */
function comprobarID(id) {
  // Define el patrón permitido para el identificador.
  const sintaxis = /^SOC-\d{4}$/;
  // Devuelve si el identificador coincide con el patrón.
  return sintaxis.test(id);
}

/**
 * Comprueba que el nombre use letras españolas y un solo espacio entre palabras.
 * @param {string} nombre - Nombre que se va a validar.
 * @returns {boolean} Indica si el nombre tiene contenido y caracteres permitidos.
 */
function comprobarNombre(nombre) {
  return comprobarTextoNombreApellidos(nombre);
}

/**
 * Comprueba que los apellidos usen letras españolas y un solo espacio entre palabras.
 * @param {string} apellidos - Apellidos que se van a validar.
 * @returns {boolean} Indica si los apellidos tienen contenido y caracteres permitidos.
 */
function comprobarApellidos(apellidos) {
  return comprobarTextoNombreApellidos(apellidos);
}

/**
 * Comprueba que el DNI tenga ocho cifras seguidas de una letra mayúscula.
 * @param {string} dni - DNI que se va a validar.
 * @returns {boolean} Indica si el DNI tiene el formato esperado.
 */
function comprobarDNI(dni) {
  // Define el formato permitido del DNI.
  const sintaxis = /^\d{8}[A-Z]{1}$/;
  // Devuelve si el DNI coincide con el formato.
  return sintaxis.test(dni);
}

/**
 * Calcula la letra que corresponde al número de DNI recibido.
 * @param {string} dni - Número de DNI del que se obtiene la letra.
 * @returns {string} Letra que corresponde al número recibido.
 */
function calculoLetraDNI(dni) {
  // Conserva solo las cifras para calcular el resto.
  const dniSinLetra = dni.replace(/\D/g, "");

  // Guarda las letras de DNI en el orden usado por el cálculo oficial.
  const cadenaLetraCorrecta = "TRWAGMYFPDXBNJZSQVHLCKE";
  // Usa el resto de dividir el número entre 23 como posición de la letra.
  const indiceResto = Number(dniSinLetra) % 23;

  // Obtiene la letra correspondiente a la posición calculada.
  const letraCorrecta = cadenaLetraCorrecta.charAt(indiceResto);

  // Devuelve la letra calculada.
  return letraCorrecta;
}

/**
 * Comprueba que el correo tenga un usuario, un dominio y una extensión válidos.
 * @param {string} email - Dirección de correo que se va a validar.
 * @returns {boolean} Indica si el correo cumple el formato admitido.
 */
function comprobarEmail(email) {
  // Define el formato de correo admitido por el formulario.
  const sintaxis = /^[a-z0-9._]+@[a-z0-9._]+\.[a-z]{2,}$/;
  // Devuelve si el correo coincide con el formato.
  return sintaxis.test(email);
}

/**
 * Comprueba que el teléfono tenga nueve cifras y empiece por 6, 7, 8 o 9.
 * @param {string} telefono - Teléfono que se va a validar.
 * @returns {boolean} Indica si el teléfono cumple el formato admitido.
 */
function comprobarTelefono(telefono) {
  // Elimina los espacios exteriores antes de comprobar el número.
  const telefonoSinEspacios = telefono.trim();
  // Define el formato permitido para el teléfono.
  const sintaxis = /^[6789]{1}\d{8}$/;
  // Devuelve si el teléfono coincide con el formato.
  return sintaxis.test(telefonoSinEspacios);
}

/**
 * Comprueba el formato, la existencia y la edad asociada a una fecha de nacimiento.
 * @param {string} fechaNacimiento - Fecha escrita en formato día/mes/año.
 * @returns {boolean} Indica si la fecha existe, no es futura y cumple la edad mínima.
 * @throws {Error} Si la persona no supera la edad mínima configurada.
 */
function comprobarFechaNacimiento(fechaNacimiento) {
  // Exige el formato día/mes/año con dos cifras para día y mes.
  const formatoRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  // Rechaza de inmediato las fechas que no tienen el formato esperado.
  if (!formatoRegex.test(fechaNacimiento)) return false;

  // Separa el día, el mes y el año escritos en el campo.
  const [diaStr, mesStr, anioStr] = fechaNacimiento.split("/");
  // Convierte las partes de la fecha en números.
  const dia = parseInt(diaStr, 10);
  const mes = parseInt(mesStr, 10) - 1;
  const anio = parseInt(anioStr, 10);

  // Crea una fecha para comprobar que el calendario la admite.
  const fecha = new Date(anio, mes, dia);
  // Rechaza fechas inexistentes que el calendario haya ajustado automáticamente.
  if (
    fecha.getFullYear() !== anio ||
    fecha.getMonth() !== mes ||
    fecha.getDate() !== dia
  ) {
    return false;
  }
  // Rechaza la fecha si la persona no supera la edad mínima configurada.
  if (minimaEdadSocio(fecha))
    throw new Error(
      `El socio debe tener más de ${config.edadMinimaSocio} años`,
    );

  // Obtiene la fecha actual para evitar aceptar fechas futuras.
  const fechaActual = new Date();
  // Acepta únicamente fechas anteriores al momento actual.
  return fecha < fechaActual;
}

/**
 * Comprueba si la persona aún no supera la edad mínima configurada.
 * @param {Date} fechaNacimiento - Fecha de nacimiento de la persona.
 * @returns {boolean} Indica si la edad es igual o inferior al mínimo permitido.
 */
function minimaEdadSocio(fechaNacimiento) {
  const anio = fechaNacimiento.getFullYear();
  const mes = String(fechaNacimiento.getMonth() + 1).padStart(2, "0");
  const dia = String(fechaNacimiento.getDate()).padStart(2, "0");
  return calcularEdad(`${anio}-${mes}-${dia}`) <= config.edadMinimaSocio;
}

/**
 * Comprueba que la fecha de alta no sea posterior al día actual.
 * @param {string|Date} fechaAlta - Fecha de alta que se va a validar.
 * @returns {boolean} Indica si la fecha es hoy o anterior.
 */
function comprobarFechaAlta(fechaAlta) {
  // Convierte la fecha recibida a un objeto Date.
  const fecha = new Date(fechaAlta);
  // Obtiene la fecha actual para compararla con el alta.
  const fechaActual = new Date();
  // Acepta la fecha si es hoy o si ocurrió antes.
  return fecha <= fechaActual;
}

/**
 * Comprueba que haya al menos una actividad seleccionada.
 * @param {string|string[]} actividades - Actividad o lista de actividades elegidas.
 * @returns {boolean} Indica si hay al menos una actividad con contenido.
 */
function comprobarActividades(actividades) {
  // Para texto, exige que haya contenido después de quitar espacios.
  if (typeof actividades === "string") {
    return actividades.trim().length > 0;
  }
  // Para una lista, exige que sea un arreglo con elementos.
  return Array.isArray(actividades) && actividades.length > 0;
}

/**
 * Comprueba que la cuota sea positiva y tenga como máximo dos decimales.
 * @param {string} cuota - Importe de la cuota escrito en el formulario.
 * @returns {boolean} Indica si la cuota cumple el formato y es mayor que cero.
 */
function comprobarCuota(cuota) {
  // Permite cifras enteras o decimales con punto y hasta dos posiciones.
  const sintaxis = /^\d+(\.\d{1,2})?$/;
  // Acepta el valor solo si cumple el formato y es mayor que cero.
  return sintaxis.test(cuota) && parseFloat(cuota) > 0;
}

// Exporta las comprobaciones para usarlas en el formulario de alta.
export {
  comprobarID,
  comprobarNombre,
  comprobarApellidos,
  comprobarDNI,
  calculoLetraDNI,
  comprobarEmail,
  comprobarTelefono,
  comprobarFechaNacimiento,
  comprobarFechaAlta,
  comprobarActividades,
  comprobarCuota,
};
