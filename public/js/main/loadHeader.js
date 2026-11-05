// Obtener los elementos de la fecha y el tiempo
let fecha = document.getElementById("current-date");
let tiempo = document.getElementById("current-time");

// Importar la función para formatear la fecha completa
import { fechaCompleta } from "../util/functions/fechaCompleta.js";

// Obtener la fecha actual y formatearla
let fechaActual = new Date();
fecha.innerText = fechaCompleta(fechaActual);

// Cargar la hora actual y actualizarla cada segundo
loadHora();
setInterval(() => loadHora(), 1000);

// Función para cargar la hora actual y actualizar el elemento correspondiente
function loadHora() {
  const fechaActual = new Date();
  let horas = fechaActual.getHours();
  let minutos = fechaActual.getMinutes();
  let segundos = fechaActual.getSeconds();
  if (horas <= 9) horas = `0${horas}`;
  if (minutos <= 9) minutos = `0${minutos}`;
  if (segundos <= 9) segundos = `0${segundos}`;

  tiempo.innerHTML = `${horas}:${minutos}:${segundos}`;
}
