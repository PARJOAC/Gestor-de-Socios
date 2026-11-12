// Importa la función que presenta una fecha con el día y el mes escritos.
import { fechaCompleta } from "../utils/fechaCompleta.js";
// Importa los valores configurables de la aplicación.
import config from "../../../config.json" with { type: "json" };
// Importa el aviso que se muestra si falla la inicialización de la cabecera.
import { mostrarToastError } from "../ui/toast/toast.js";
import { colorAleatorioRangoRGB } from "../utils/colorRandomRGB.js";

// Conserva el identificador para detener la actualización periódica de la fecha.
let intervaloFecha;
// Conserva el identificador para detener la actualización periódica de la hora.
let intervaloHora;
// Busca el elemento donde se mostrará la fecha.
const fecha = document.getElementById("current-date");
// Busca el elemento donde se mostrará la hora.
const tiempo = document.getElementById("current-time");

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
  // Detiene la actualización si la página no contiene el elemento de hora.
  if (!tiempo) {
    // Detiene el temporizador si ya se había creado.
    clearInterval(intervaloHora);
    // Muestra el error y termina la actualización.
    return mostrarToastError("No se encontró el elemento de hora.");
  }

  // Lee la fecha y la hora actuales del sistema.
  const fechaActual = new Date();
  const horaCompleta = fechaActual.toLocaleTimeString({
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Asigna la hora al elemento sin interpretar el contenido como HTML.
  tiempo.textContent = horaCompleta;
}

const tema = document.getElementById("theme");
tema.addEventListener("click", function () {
  let colores = colorAleatorioRangoRGB();
  // Cambia las variables globales que afectan a toda la página
  // Color más pastel con el 0.65
  document.documentElement.style.setProperty(
    "--primary-hover",
    `rgb(${colores.R * 0.65}, ${colores.G * 0.65}, ${colores.B * 0.65})`,
  );

  // Color original
  document.documentElement.style.setProperty(
    "--primary-color",
    `rgb(${colores.R}, ${colores.G}, ${colores.B})`,
  );
});
