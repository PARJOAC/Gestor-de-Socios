// Importa la función para calcular la edad de cada socio.
import { calcularEdad } from "./functions/edad.js";
// Importa los valores configurables de la aplicación.
import config from "../../../config.json" with { type: "json" };
// Importa la lista de socios que se resume en las estadísticas.
import { Socios } from "../_data/socios.js";

// Importar la librería para poder generar un color aleatorio.
import { colorAleatorioRangoRGB } from "../utils/colorRandomRGB.js";

// Busca los elementos donde se mostrarán las estadísticas.
const totalSociosHTML = document.getElementById("stat-total-socios");
const ingresosMensualesHTML = document.getElementById("stat-ingresos");
const cuotaMediaHTML = document.getElementById("stat-cuota-media");
const edadMediaHTML = document.getElementById("stat-edad-media");
const edadMinHTML = document.getElementById("stat-edad-min");
const edadMaxHTML = document.getElementById("stat-edad-max");
const actividadMasPopularHTML = document.getElementById("stat-populares");
const hayMenoresDeEdadHTML = document.getElementById("stat-menores");
const todosConActividadHTML = document.getElementById("stat-todos-actividad");
const top3Socios = document.getElementById("stat-veteranos-list");
const dominiosCorreo = document.getElementById("stat-dominios-list");

/**
 * Calcula y actualiza las estadísticas mostradas en la página.
 * No recibe parámetros ni devuelve un valor; actualiza los elementos de estadísticas.
 * @returns {void}
 */
function recargarEstadisticas() {
  totalSociosHTML.textContent = Socios.length;

  let totalIngresos = 0;
  let sumaEdades = 0;
  let tipos = {};

  // Calcula totales y frecuencias en un único recorrido claro
  Socios.forEach((socio) => {
    totalIngresos += Number(socio.cuota);
    sumaEdades += calcularEdad(socio.fechaNacimiento);

    socio.actividades.forEach((actividad) => {
      tipos[actividad] = (tipos[actividad] || 0) + 1;
    });
  });

  ingresosMensualesHTML.textContent = totalIngresos.toFixed(2) + config.moneda;
  cuotaMediaHTML.textContent =
    (totalIngresos / Socios.length).toFixed(2) + config.moneda;
  edadMediaHTML.textContent = (sumaEdades / Socios.length).toFixed(1);

  // Compara las fechas directamente como texto ISO (YYYY-MM-DD) sin instanciar Date
  const sociosPorNacimiento = [...Socios].sort((a, b) =>
    a.fechaNacimiento.localeCompare(b.fechaNacimiento),
  );
  edadMaxHTML.textContent = calcularEdad(sociosPorNacimiento[0].fechaNacimiento);
  edadMinHTML.textContent = calcularEdad(
    sociosPorNacimiento[sociosPorNacimiento.length - 1].fechaNacimiento,
  );

  // Selecciona la actividad que tiene más socios.
  let actividadMasPopular = Object.entries(tipos).reduce((max, actual) => {
    return actual[1] > max[1] ? actual : max;
  });

  // Muestra el nombre de la actividad más popular y su cantidad de socios.
  actividadMasPopularHTML.textContent = `${actividadMasPopular[0]} (${actividadMasPopular[1]} clientes)`;
  // Como están ordenados por fecha de nacimiento, el último es el más joven.
  const edadMasJoven = calcularEdad(
    sociosPorNacimiento[sociosPorNacimiento.length - 1].fechaNacimiento,
  );
  hayMenoresDeEdadHTML.textContent = edadMasJoven < 18 ? "Sí" : "No";

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
    .map((socio) => liConRGB(`${socio.nombre} ${socio.apellidos}`))
    .join("");

  // Obtiene y muestra una lista sin duplicados de dominios de correo.
  dominiosCorreo.innerHTML = Array.from(
    new Set(Socios.map((socio) => socio.email.split("@")[1])),
  )
    .map((dominio) => liConRGB(dominio))
    .join("");
}

function liConRGB(texto) {
  const colores = colorAleatorioRangoRGB();
  return `<li style="color:rgb(${colores.R}, ${colores.G}, ${colores.B})"><strong>${texto}</strong></li>`;
}

// Carga las estadísticas iniciales al iniciar el módulo.
recargarEstadisticas();

// Permite volver a calcular las estadísticas desde otros módulos.
export { recargarEstadisticas };
