let fecha = document.getElementById("current-date");
let hora = document.getElementById("current-time");

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
