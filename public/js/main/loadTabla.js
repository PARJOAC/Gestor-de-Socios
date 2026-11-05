// Importar los elementos de la tabla para rellenarlas
let tabla = document.getElementById("tbody-socios");
let botonAnterior = document.getElementById("pagina-anterior");
let botonSiguiente = document.getElementById("pagina-siguiente");
let contadorPaginas = document.getElementById("pagina-actual");
let buscarSocio = document.getElementById("input-search");
let selectFiltro = document.getElementById("select-activity-filter");
let ordenarFiltro = document.getElementById("select-order");

// Variables para hacer un control de la paginación y filtrado
let paginaActual = 0;
let sociosPagina = 5;
let textoBusqueda = "";
let actividadFiltro = "";
let ordenFiltro = "";

// Importar los datos de los socios y las funciones para procesarlos
import { Socios } from "../data/socios.js";
import {
  calcularEdad,
  obtenerIniciales,
  abreviarApellido,
  esconderCorreo,
} from "../util/functions/socio.js";

// Importar las actividades desde el archivo de datos
import { Actividades } from "../data/actividades.js";
import { Moneda } from "../data/moneda.js";

// Función para normalizar el texto y eliminar acentos y mayúsculas
const normalizar = (texto) =>
  texto
    ? texto
        .toLowerCase()
        // Normalizar el texto para eliminar acentos y caracteres especiales
        .normalize("NFD")
        //Borrar las tildes de las vocales
        .replace(/[\u0300-\u036f]/g, "")
    : "";

// Función para obtener los socios filtrados y ordenados según lo que se seleccione
function obtenerSocios() {
  let resultado = [...Socios];

  // Filtrar por texto de búsqueda si se ha introducido algo en el input
  if (textoBusqueda) {
    const query = normalizar(textoBusqueda);
    resultado = resultado.filter((socio) => {
      return (
        normalizar(socio.nombre).includes(query) ||
        normalizar(socio.apellidos).includes(query) ||
        normalizar(socio.email).includes(query)
      );
    });
  }

  // Filtrar por actividad si se ha seleccionado una opción distinta a "Todas las actividades"
  if (
    actividadFiltro &&
    actividadFiltro.toLowerCase() !== "todas las actividades"
  ) {
    const queryFiltro = normalizar(actividadFiltro);
    resultado = resultado.filter((socio) =>
      socio.actividades.some((v) => normalizar(v).includes(queryFiltro)),
    );
  }

  // Ordenar los resultados según el filtro seleccionado
  if (ordenFiltro) {
    switch (ordenFiltro.toLowerCase()) {
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
        resultado.sort(
          (a, b) => new Date(b.fechaNacimiento) - new Date(a.fechaNacimiento),
        );
        break;
      case "antiguos":
        resultado.sort(
          (a, b) => new Date(a.fechaNacimiento) - new Date(b.fechaNacimiento),
        );
        break;
      case "cuota":
        resultado.sort((a, b) => a.cuota - b.cuota);
        break;
      default:
        throw new Error("Ese orden no existe.");
    }
  }
  return resultado;
}

// Función para renderizar la tabla con los socios filtrados y ordenados
function renderizarTabla() {
  // Obtener los socios filtrados y calcular el número de páginas totales
  const sociosFiltrados = obtenerSocios();
  let paginasTotales = Math.ceil(sociosFiltrados.length / sociosPagina);

  if (paginaActual >= paginasTotales && paginasTotales > 0) {
    paginaActual = paginasTotales - 1;
  } else if (paginasTotales === 0) {
    paginaActual = 0;
  }

  let inicio = paginaActual * sociosPagina;
  let fin = inicio + sociosPagina;
  let sociosPaginaActual = sociosFiltrados.slice(inicio, fin);

  tabla.innerHTML = "";

  if (sociosPaginaActual.length === 0) {
    tabla.innerHTML = `<tr><td colspan="6" style="text-align: center;">No se encontraron socios</td></tr>`;
  } else {
    sociosPaginaActual.forEach((value) => {
      const apellidosAbreviados = abreviarApellido(value.apellidos);
      const email = esconderCorreo(value.email);
      const iniciales = obtenerIniciales(value.nombre, value.apellidos);

      let actividadesHtml = value.actividades
        .map(
          (actividad) =>
            `<span class="badge-actividad">${actividad.toUpperCase()}</span>`,
        )
        .join(" ");

      tabla.innerHTML += `
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
          <td>${value.cuota.toFixed(2)}${Moneda}</td>
        </tr>
      `;
    });
  }

  contadorPaginas.innerHTML =
    paginasTotales === 0 ? "0 / 0" : `${paginaActual + 1} / ${paginasTotales}`;

  botonAnterior.disabled = paginaActual === 0;
  botonSiguiente.disabled =
    paginaActual >= paginasTotales - 1 || paginasTotales === 0;
}

botonAnterior.addEventListener("click", () => {
  if (paginaActual > 0) {
    paginaActual--;
    renderizarTabla();
  }
});

botonSiguiente.addEventListener("click", () => {
  let sociosFiltrados = obtenerSocios();
  let paginasTotales = Math.ceil(sociosFiltrados.length / sociosPagina);

  if (paginaActual < paginasTotales - 1) {
    paginaActual++;
    renderizarTabla();
  }
});

buscarSocio.addEventListener("input", (e) => {
  textoBusqueda = e.target.value.trim();
  paginaActual = 0;
  renderizarTabla();
});

selectFiltro.addEventListener("change", (e) => {
  const indiceSeleccionado = e.target.value;
  actividadFiltro =
    indiceSeleccionado === ""
      ? ""
      : Object.values(Actividades)[indiceSeleccionado];
  paginaActual = 0;
  renderizarTabla();
});

ordenarFiltro.addEventListener("change", (e) => {
  ordenFiltro = e.target.value;
  paginaActual = 0;
  renderizarTabla();
});

renderizarTabla();
