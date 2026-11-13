// Importa la lista de socios que se mostrará en la tabla.
import { Socios } from "../_data/socios.js";
// Importa la función que calcula la edad de cada socio.
import { calcularEdad } from "../socios/functions/edad.js";
// Importa las funciones que preparan los datos para las filas.
import {
  obtenerIniciales,
  abreviarApellido,
  esconderCorreo,
} from "./functions/formatoFilaSocio.js";
// Importa los valores configurables de la aplicación.
import config from "../../../config.json" with { type: "json" };
import { spanActividades } from "../utils/generarListaActividades.js";
import { colorAleatorioRangoRGB } from "../utils/colorRandomRGB.js";
import { Actividades } from "../_constants/actividades.js";

// Busca los controles que muestran y filtran la tabla.
const tabla = document.getElementById("tbody-socios");
const buscarSocio = document.getElementById("input-search");
const selectFiltro = document.getElementById("select-activity-filter");
const ordenarFiltro = document.getElementById("select-order");
const actividadesDisponibles = Object.values(Actividades);

// Guarda los valores actuales de búsqueda, actividad y orden.
let textoBusqueda = "";
let actividadFiltro = "";
let ordenFiltro = "";
const cacheBusquedaSocios = new Map();

/**
 * Convierte un texto a minúsculas y quita las tildes para facilitar la búsqueda.
 * @param {string} texto - Texto que se va a normalizar.
 * @returns {string} Texto en minúsculas y sin marcas de acento.
 */
const normalizar = (texto) =>
  texto
    ? String(texto)
        .toLowerCase()
        // Separa las letras de sus marcas de acento.
        .normalize("NFD")
        // Elimina las marcas de acento.
        .replace(/[\u0300-\u036f]/g, "")
    : "";

function datosBusquedaNormalizados(socio) {
  const datos = `${socio.nombre} ${socio.apellidos} ${socio.email}`;
  const cache = cacheBusquedaSocios.get(socio);

  if (cache && cache.datos === datos) return cache.normalizados;

  const normalizados = normalizar(datos);
  cacheBusquedaSocios.set(socio, { datos, normalizados });
  return normalizados;
}

function nombreActividad(actividad) {
  return typeof actividad === "string" ? actividad : actividad?.nombre || "";
}

/**
 * Filtra y ordena una copia de la lista de socios según los controles de la tabla.
 * @returns {Object[]} Socios que coinciden con la búsqueda y el orden seleccionados.
 * @throws {Error} Si un control solicita un criterio desconocido.
 */
function obtenerSocios() {
  // Copia la lista para ordenar sin cambiar el orden de los datos originales.
  let resultado = [...Socios];

  // Aplica la búsqueda si alcanza la longitud mínima configurada.
  if (textoBusqueda.length >= config.cadenaMinimaBusqueda) {
    // Normaliza el texto para que la búsqueda ignore mayúsculas y tildes.
    const query = normalizar(textoBusqueda);
    // Conserva los socios cuyo nombre, apellido o correo contiene el texto.
    resultado = resultado.filter((socio) =>
      datosBusquedaNormalizados(socio).includes(query),
    );
  }

  // Filtra por actividad cuando se ha elegido una opción concreta.
  if (actividadFiltro !== "") {
    const indiceActividad = Number(actividadFiltro);
    const actividadSeleccionada = Number.isInteger(indiceActividad)
      ? actividadesDisponibles[indiceActividad]
      : undefined;

    if (actividadSeleccionada === undefined)
      throw new Error("Ese filtro de actividad no existe.");

    if (actividadSeleccionada !== Actividades.TODAS) {
      const queryFiltro = normalizar(actividadSeleccionada);
      // Conserva los socios que tienen la actividad seleccionada.
      resultado = resultado.filter((socio) =>
        socio.actividades.some(
          (actividad) =>
            normalizar(nombreActividad(actividad)) === queryFiltro,
        ),
      );
    }
  }

  // Ordena los resultados según la opción elegida.
  switch (ordenFiltro.toLowerCase() || "default") {
    case "default":
      resultado.sort((a, b) => a.id.localeCompare(b.id));
      break;
    case "nombre":
      resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case "apellidos":
      resultado.sort((a, b) => a.apellidos.localeCompare(b.apellidos));
      break;
    case "jovenes":
      resultado.sort((a, b) =>
        b.fechaNacimiento.localeCompare(a.fechaNacimiento),
      );
      break;
    case "antiguos":
      resultado.sort((a, b) =>
        a.fechaNacimiento.localeCompare(b.fechaNacimiento),
      );
      break;
    case "cuota":
      resultado.sort((a, b) => a.cuota - b.cuota);
      break;
    default:
      throw new Error("Ese orden no existe.");
  }

  // Devuelve el resultado después de aplicar los filtros y el orden.
  return resultado;
}

/**
 * Dibuja las filas de la tabla con los socios filtrados y ordenados.
 * No recibe parámetros ni devuelve un valor; actualiza el contenido de la tabla.
 * @returns {void}
 */
function renderizarTabla() {
  // Obtiene los datos que deben aparecer en la tabla.
  const sociosFiltrados = obtenerSocios();

  // Muestra un aviso dentro de la tabla si ningún socio coincide.
  if (sociosFiltrados.length === 0) {
    tabla.innerHTML = `<tr><td colspan="6" style="text-align: center;">No se encontraron socios</td></tr>`;
  } else {
    // Genera todas las filas y actualiza el DOM de una sola vez
    const filasHtml = sociosFiltrados
      .map((value) => {
        const apellidosAbreviados = abreviarApellido(value.apellidos);
        const email = esconderCorreo(value.email);
        const iniciales = obtenerIniciales(value.nombre, value.apellidos);

        const actividadesHtml = value.actividades
          .map((actividad) => spanActividades(nombreActividad(actividad)))
          .join(" ");

        return `
          <tr>
            <td>
              <div class="socio-id-container">
                <div class="avatar-iniciales">${iniciales}</div>
                <span class="id-numero">${value.id}</span>
              </div>
            </td>
            <td>${value.nombre} ${apellidosAbreviados}</td>
            <td>${email}</td>
            <td><div class="contenedor-actividades">${actividadesHtml}</div></td>
            <td>${calcularEdad(value.fechaNacimiento)} años</td>
            <td>${parseFloat(value.cuota).toFixed(2)}${config.moneda}</td>
          </tr>
        `;
      })
      .join("");

    tabla.innerHTML = filasHtml;
  }
}

// Actualiza la búsqueda y vuelve a dibujar la tabla al escribir.
buscarSocio.addEventListener("input", (e) => {
  textoBusqueda = e.target.value.trim();
  renderizarTabla();
});

// Actualiza el filtro por actividad y vuelve a dibujar la tabla.
selectFiltro.addEventListener("change", (e) => {
  actividadFiltro = e.target.value;
  renderizarTabla();
});

// Actualiza el orden y vuelve a dibujar la tabla.
ordenarFiltro.addEventListener("change", (e) => {
  ordenFiltro = e.target.value;
  renderizarTabla();
});

// Buscar el elemento para cambiar el tema.
const tema = document.getElementById("theme");
// Evento para el boton del tema
tema.addEventListener("click", function () {
  // Si no existe el boton, no hace nada
  if (!tema) return;

  // Se generan el color aleatorio
  let colores = colorAleatorioRangoRGB();

  // Cambia las variables globales
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

// Dibuja la tabla por primera vez al cargar el módulo.
renderizarTabla();

// Permite volver a dibujar la tabla desde otros módulos.
export { renderizarTabla };
