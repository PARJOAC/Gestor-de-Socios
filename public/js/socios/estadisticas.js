// Importa la función para calcular la edad de cada socio.
import { calcularEdad } from "./functions/edad.js";
// Importa los valores configurables de la aplicación.
import config from "../../../config.json" with { type: "json" };
import { Actividades } from "../constants/actividades.js";
// Importa la lista de socios que se resume en las estadísticas.
import { Socios } from "../data/socios.js";

// Busca los elementos donde se mostrarán las estadísticas.
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

/**
 * Calcula y actualiza las estadísticas mostradas en la página.
 * No recibe parámetros ni devuelve un valor; actualiza los elementos de estadísticas.
 * @returns {void}
 */
function recargarEstadisticas() {
  // Muestra cuántos socios hay registrados.
  totalSociosHTML.textContent = Socios.length;

  // Suma las cuotas y muestra el ingreso mensual total.
  let totalIngresos = Socios.reduce(
    (total, socio) => total + Number(socio.cuota),
    0,
  ).toFixed(2);
  ingresosMensualesHTML.textContent = totalIngresos + config.moneda;

  // Divide los ingresos por el número de socios para obtener la cuota media.
  cuotaMediaHTML.textContent =
    (totalIngresos / Socios.length).toFixed(2) + config.moneda;

  // Suma las edades para calcular la edad media.
  let sumaEdades = Socios.reduce(
    (total, socio) => total + calcularEdad(socio.fechaNacimiento),
    0,
  );

  // Muestra la edad media redondeada a un año entero.
  edadMediaHTML.innerHTML = (sumaEdades / Socios.length).toFixed(1);

  // Encuentra y muestra la edad más baja.
  edadMinHTML.textContent = calcularEdad(
    [...Socios].sort(
      (a, b) => new Date(b.fechaNacimiento) - new Date(a.fechaNacimiento),
    )[0].fechaNacimiento,
  );

  // Encuentra y muestra la edad más alta.
  edadMaxHTML.textContent = calcularEdad(
    [...Socios].sort(
      (a, b) => new Date(a.fechaNacimiento) - new Date(b.fechaNacimiento),
    )[0].fechaNacimiento,
  );

  // Prepara un contador para cada actividad disponible.
  let tipos = {
    [Actividades.MUSCULACION]: 0,
    [Actividades.NATACION]: 0,
    [Actividades.PADEL]: 0,
    [Actividades.PILATES]: 0,
    [Actividades.SPINNING]: 0,
    [Actividades.YOGA]: 0,
  };

  // Cuenta cuántos socios están inscritos en cada actividad.
  Socios.forEach((socio) => {
    socio.actividades.forEach((actividad) => {
      tipos[actividad]++;
    });
  });

  // Selecciona la actividad que tiene más socios.
  let actividadMasPopular = Object.entries(tipos).reduce((max, actual) => {
    return actual[1] > max[1] ? actual : max;
  });

  // Muestra el nombre de la actividad más popular y su cantidad de socios.
  actividadMasPopularHTML.innerHTML = `${actividadMasPopular[0]} (${actividadMasPopular[1]} clientes)`;
  // Indica si hay al menos un socio menor de edad.
  hayMenoresDeEdadHTML.textContent = Socios.some(
    (socio) => calcularEdad(socio.fechaNacimiento) < 18,
  )
    ? "Sí"
    : "No";

  // Indica si todos los socios tienen alguna actividad asignada.
  todosConActividadHTML.textContent = Socios.every(
    (socio) => socio.actividades.length > 0,
  )
    ? "Sí"
    : "No";

  // Muestra los tres socios con la fecha de alta más antigua.
  top3Socios.innerHTML = [...Socios]
    .sort((a, b) => new Date(a.fechaAlta) - new Date(b.fechaAlta))
    .slice(0, 3)
    .map((socio) => `<li><strong>${socio.nombre} ${socio.apellidos}</strong></li>`)
    .join("");

  // Obtiene y muestra una lista sin duplicados de dominios de correo.
  dominiosCorreo.innerHTML = Array.from(
    new Set(Socios.map((socio) => socio.email.split("@")[1])),
  )
    .map((dominio) => `<li><strong>${dominio}</strong></li>`)
    .join("");
}

// Carga las estadísticas iniciales al iniciar el módulo.
recargarEstadisticas();

// Permite volver a calcular las estadísticas desde otros módulos.
export { recargarEstadisticas };
