let fecha = document.getElementById("current-date");
let tiempo = document.getElementById("current-time");
import { DiasSemana, Meses } from "../enum/fechas.js";

let fechaActual = new Date();
fecha.innerText =
  `${DiasSemana[fechaActual.getDay()]}, ${fechaActual.getDate()} de ${Meses[fechaActual.getMonth()]} de ${fechaActual.getFullYear()}`.toUpperCase();

loadHora();
setInterval(() => loadHora(), 1000);

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
