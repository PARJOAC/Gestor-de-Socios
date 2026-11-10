// Importa la función que presenta una fecha con el día y el mes escritos.
import { fechaCompleta } from "../utils/fechaCompleta.js";
// Importa los valores configurables de la aplicación.
import config from "../../../config.json" with { type: "json" };
// Importa el aviso que se muestra si falla la inicialización de la cabecera.
import { mostrarToastError } from "../ui/toast/toast.js";

// Conserva el identificador para detener la actualización periódica de la fecha.
let intervaloFecha;
// Conserva el identificador para detener la actualización periódica de la hora.
let intervaloHora;
// Actualiza la fecha y la hora al iniciar y luego según sus intervalos configurados.
try {
  // Muestra la fecha actual inmediatamente.
  loadFecha();
  // Muestra la hora actual inmediatamente.
  loadHora();
  // Programa las siguientes actualizaciones de la fecha.
  intervaloFecha = setInterval(
    loadFecha,
    config.actualizacionFechaMilisegundos,
  );
  // Programa las siguientes actualizaciones de la hora.
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
  // Detiene la actualización si la página no contiene el elemento de fecha.
  if (!fecha) {
    // Detiene el temporizador si ya se había creado.
    clearInterval(intervaloFecha);
    // Muestra el error y termina la actualización.
    return mostrarToastError("No se encontró el elemento de fecha.");
  }
  // Obtiene la fecha actual y la muestra en la cabecera.
  const fechaActual = new Date();
  // Convierte la fecha al formato completo y la asigna como texto.
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
  // Detiene la actualización si la página no contiene el elemento de hora.
  if (!tiempo) {
    // Detiene el temporizador si ya se había creado.
    clearInterval(intervaloHora);
    // Muestra el error y termina la actualización.
    return mostrarToastError("No se encontró el elemento de hora.");
  }

  // Lee la fecha y la hora actuales del sistema.
  const fechaActual = new Date();
  // Obtiene la hora actual.
  let horas = fechaActual.getHours();
  // Obtiene el minuto actual.
  let minutos = fechaActual.getMinutes();
  // Obtiene el segundo actual.
  let segundos = fechaActual.getSeconds();

  // Añade un cero a los valores de una sola cifra.
  // Convierte la hora en texto para anteponerle un cero cuando sea necesario.
  if (horas <= 9) horas = `0${horas}`;
  // Convierte el minuto en texto para anteponerle un cero cuando sea necesario.
  if (minutos <= 9) minutos = `0${minutos}`;
  // Convierte el segundo en texto para anteponerle un cero cuando sea necesario.
  if (segundos <= 9) segundos = `0${segundos}`;

  // Muestra la hora en formato de 24 horas.
  // Asigna la hora al elemento sin interpretar el contenido como HTML.
  tiempo.textContent = `${horas}:${minutos}:${segundos}`;
}
