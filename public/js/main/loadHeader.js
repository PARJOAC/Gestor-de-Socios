// Importa la función que presenta una fecha con el día y el mes escritos.
import { fechaCompleta } from "../utils/fechaCompleta.js";
// Importa los valores configurables de la aplicación.
import config from "../../../config.json" with { type: "json" };
// Importa el aviso que se muestra si falla la inicialización de la cabecera.
import { mostrarToastError } from "../ui/toast/error.js";
let errorFecha = false;
let errorHora = false;

let intervaloFecha;
let intervaloHora;
// Actualiza la fecha y la hora al iniciar y luego según sus intervalos configurados.
try {
  loadFecha();
  loadHora();
  intervaloFecha = setInterval(
    loadFecha,
    config.actualizacionFechaMilisegundos,
  );
  intervaloHora = setInterval(loadHora, config.actualizacionHoraMilisegundos);
} catch (e) {
  // Informa si la fecha o la hora no se pudieron mostrar al iniciar.
  mostrarToastError(e.message);
}

/**
 * Actualiza la fecha que aparece en la cabecera con el día y el mes escritos.
 * No recibe parámetros ni devuelve un valor; actualiza el elemento de fecha de la página.
 * @returns {void}
 */
function loadFecha() {
  // Busca el elemento donde se mostrará la fecha.
  const fecha = document.getElementById("current-date");
  if (!fecha) {
    errorFecha = true;
    clearInterval(intervaloFecha);
    return mostrarToastError("No se encontró el elemento de fecha.");
  }
  // Obtiene la fecha actual y la muestra en la cabecera.
  const fechaActual = new Date();
  fecha.textContent = fechaCompleta(fechaActual);
}

/**
 * Obtiene la hora actual, completa sus ceros iniciales y actualiza la cabecera.
 * No recibe parámetros ni devuelve un valor; actualiza el elemento de hora de la página.
 * @returns {void}
 */
function loadHora() {
  // Busca el elemento donde se mostrará la hora.
  const tiempo = document.getElementById("current-time");
  if (!tiempo) {
    errorHora = true;
    clearInterval(intervaloHora);
    return mostrarToastError("No se encontró el elemento de hora.");
  }

  // Lee la fecha y la hora actuales del sistema.
  const fechaActual = new Date();
  let horas = fechaActual.getHours();
  let minutos = fechaActual.getMinutes();
  let segundos = fechaActual.getSeconds();

  // Añade un cero a los valores de una sola cifra.
  if (horas <= 9) horas = `0${horas}`;
  if (minutos <= 9) minutos = `0${minutos}`;
  if (segundos <= 9) segundos = `0${segundos}`;

  // Muestra la hora en formato de 24 horas.
  tiempo.textContent = `${horas}:${minutos}:${segundos}`;
}
