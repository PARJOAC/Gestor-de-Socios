import { calcularEdad } from "./functions/edad.js";
import { Moneda } from "../constants/moneda.js";
import { Actividades } from "../constants/actividades.js";
import { Socios } from "../data/socios.js";

let totalSociosHTML = document.getElementById("stat-total-socios");
let ingresosMensualesHTML = document.getElementById("stat-ingresos");
let cuotaMediaHTML = document.getElementById("stat-cuota-media");
let edadMediaHTML = document.getElementById("stat-edad-media");
let edadMinHTML = document.getElementById("stat-edad-min");
let edadMaxHTML = document.getElementById("stat-edad-max");
let actividadMasPopularHTML = document.getElementById("stat-populares");
let hayMenoresDeEdadHTML = document.getElementById("stat-menores");
let todosConActividadHTML = document.getElementById("stat-todos-actividad");
let top3Socios = document.getElementById("stat-veteranos-list");
let dominiosCorreo = document.getElementById("stat-dominios-list");

function recargarEstadisticas() {
  totalSociosHTML.textContent = Socios.length;

  let totalIngresos = Socios.reduce(
    (total, socio) => total + Number(socio.cuota),
    0,
  ).toFixed(2);
  ingresosMensualesHTML.textContent = totalIngresos + Moneda;

  cuotaMediaHTML.textContent =
    (totalIngresos / Socios.length).toFixed(2) + Moneda;

  let sumaEdades = Socios.reduce(
    (total, socio) => total + calcularEdad(socio.fechaNacimiento),
    0,
  );

  edadMediaHTML.innerHTML = Math.round(sumaEdades / Socios.length).toFixed(1);

  edadMinHTML.textContent = calcularEdad(
    [...Socios].sort(
      (a, b) => new Date(b.fechaNacimiento) - new Date(a.fechaNacimiento),
    )[0].fechaNacimiento,
  );

  edadMaxHTML.textContent = calcularEdad(
    [...Socios].sort(
      (a, b) => new Date(a.fechaNacimiento) - new Date(b.fechaNacimiento),
    )[0].fechaNacimiento,
  );

  let tipos = {
    [Actividades.MUSCULACION]: 0,
    [Actividades.NATACION]: 0,
    [Actividades.PADEL]: 0,
    [Actividades.PILATES]: 0,
    [Actividades.SPINNING]: 0,
    [Actividades.YOGA]: 0,
  };

  Socios.forEach((socio) => {
    socio.actividades.forEach((actividad) => {
      tipos[actividad]++;
    });
  });

  let actividadMasPopular = Object.entries(tipos).reduce((max, actual) => {
    return actual[1] > max[1] ? actual : max;
  });

  actividadMasPopularHTML.innerHTML = `${actividadMasPopular[0]} (${actividadMasPopular[1]} clientes)`;
  hayMenoresDeEdadHTML.textContent = Socios.some(
    (socio) => calcularEdad(socio.fechaNacimiento) < 18,
  )
    ? "Sí"
    : "No";

  todosConActividadHTML.textContent = Socios.every(
    (socio) => socio.actividades.length > 0,
  )
    ? "Sí"
    : "No";

  top3Socios.innerHTML = [...Socios].sort(
    (a, b) => new Date(a.fechaAlta) - new Date(b.fechaAlta),
  )
    .slice(0, 3)
    .map((socio) => `<li>${socio.nombre} ${socio.apellidos}</li>`)
    .join("");

  dominiosCorreo.innerHTML = Array.from(
    new Set(Socios.map((socio) => socio.email.split("@")[1])),
  )
    .map((dominio) => `<li>${dominio}</li>`)
    .join("");
}
recargarEstadisticas();
export { recargarEstadisticas };
