let fecha = document.getElementById("current-date");
let tiempo = document.getElementById("current-time");

const diasSemana = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

const meses = {
  0: "Enero",
  1: "Febrero",
  2: "Marzo",
  3: "Abril",
  4: "Mayo",
  5: "Junio",
  6: "Julio",
  7: "Agosto",
  8: "Septiembre",
  9: "Octubre",
  10: "Noviembre",
  11: "Diciembre",
  12: "Diciembre",
};

let fechaActual = new Date();
fecha.innerText =
  `${diasSemana[fechaActual.getDay()]}, ${fechaActual.getDate()} de ${meses[fechaActual.getMonth()]} de ${fechaActual.getFullYear()}`.toUpperCase();

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
