import { Socios } from "../data/socios.js";
import { calcularEdad } from "../util/functions/socio.js";

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

totalSociosHTML.textContent = Socios.length;
import { Moneda } from "../data/moneda.js";

let totalIngresos = Socios.reduce(
  (total, socio) => total + socio.cuota,
  0,
).toFixed(2);
ingresosMensualesHTML.textContent = totalIngresos + Moneda;

cuotaMediaHTML.textContent = (totalIngresos / Socios.length).toFixed(2) + Moneda;

edadMinHTML.textContent = calcularEdad(
  Socios.sort(
    (a, b) => new Date(b.fechaNacimiento) - new Date(a.fechaNacimiento),
  )[0].fechaNacimiento,
);

edadMaxHTML.textContent = calcularEdad(
  Socios.sort(
    (a, b) => new Date(a.fechaNacimiento) - new Date(b.fechaNacimiento),
  )[0].fechaNacimiento,
);

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

top3Socios.innerHTML = Socios.sort(
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
