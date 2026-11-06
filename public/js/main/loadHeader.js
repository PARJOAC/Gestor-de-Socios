// Importa la función que presenta una fecha con el día y el mes escritos.
import { fechaCompleta } from "../utils/fechaCompleta.js";
// Importa los valores configurables de la aplicación.
import config from "../../../config.json" with { type: "json" };
import { mostrarToastError } from "../ui/toast/error.js";
try {
  // Muestra la hora de inmediato y la actualiza con el intervalo configurado por si se abre la página en un cambio de día.
  loadFecha();
  setInterval(() => loadHora(), config.actualizacionFechaMilisegundos);
  // Muestra la hora de inmediato y la actualiza con el intervalo configurado.
  loadHora();
  setInterval(() => loadHora(), config.actualizacionHoraMilisegundos);
} catch (e) {
  mostrarToastError(e.message);
}

/**
 * Obtiene la fecha actual, con una sintaxis de "{DÍA SEMANA}, {DÍA MES} de {MES} de {AÑO}.
 * No recibe parámetros ni devuelve un valor; actualiza el elemento de hora de la página.
 * @returns {void}
 */
function loadFecha() {
  // Busca el elemento donde se mostrará la fecha.
  let fecha = document.getElementById("current-date");

  // Obtiene la fecha actual y la muestra en la cabecera.
  let fechaActual = new Date();
  fecha.innerText = fechaCompleta(fechaActual);
}

/**
 * Obtiene la hora actual, completa sus ceros iniciales y actualiza la cabecera.
 * No recibe parámetros ni devuelve un valor; actualiza el elemento de hora de la página.
 * @returns {void}
 */
function loadHora() {
  // Busca el elemento donde se mostrará la hora.
  let tiempo = document.getElementById("current-time");
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
  tiempo.innerHTML = `${horas}:${minutos}:${segundos}`;
}
