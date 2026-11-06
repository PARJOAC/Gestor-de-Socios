import { Socios } from "../data/socios.js";
import { calcularEdad } from "../socios/functions/edad.js";
import {
  obtenerIniciales,
  abreviarApellido,
  esconderCorreo,
} from "./functions/formatoFilaSocio.js";
import { Moneda } from "../constants/moneda.js";

// Importar los elementos de la tabla para rellenarlas
let tabla = document.getElementById("tbody-socios");
let buscarSocio = document.getElementById("input-search");
let selectFiltro = document.getElementById("select-activity-filter");
let ordenarFiltro = document.getElementById("select-order");

// Variables para hacer un control del filtrado
let textoBusqueda = "";
let actividadFiltro = "";
let ordenFiltro = "";

// Función para normalizar el texto y eliminar acentos y mayúsculas
const normalizar = (texto) =>
  texto
    ? String(texto)
        .toLowerCase()
        // Normalizar el texto para eliminar acentos y caracteres especiales
        .normalize("NFD")
        // Borrar las tildes de las vocales
        .replace(/[\u0300-\u036f]/g, "")
    : "";

// Función para obtener los socios filtrados y ordenados según lo que se seleccione
function obtenerSocios() {
  let resultado = [...Socios];

  // Filtrar por texto de búsqueda si se ha introducido algo en el input
  if (textoBusqueda.length > 2) {
    const query = normalizar(textoBusqueda);
    resultado = resultado.filter((socio) => {
      return (
        normalizar(socio.nombre).includes(query) ||
        normalizar(socio.apellidos).includes(query) ||
        normalizar(socio.email).includes(query)
      );
    });
  } else {
    resultado = resultado.sort((a, b) => a.id.localeCompare(b.id));
  }

  // Filtrar por actividad si se ha seleccionado una opción distinta a vacía o "todas"
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
  const sociosFiltrados = obtenerSocios();

  tabla.innerHTML = "";

  if (sociosFiltrados.length === 0) {
    tabla.innerHTML = `<tr><td colspan="6" style="text-align: center;">No se encontraron socios</td></tr>`;
  } else {
    sociosFiltrados.forEach((value) => {
      const apellidosAbreviados = abreviarApellido(value.apellidos);
      const email = esconderCorreo(value.email);
      const iniciales = obtenerIniciales(value.nombre, value.apellidos);

      let actividadesHtml = value.actividades
        .map((actividad) => {
          const texto =
            typeof actividad === "string" ? actividad : actividad?.nombre || "";
          return `<span class="badge-actividad">${texto.toUpperCase()}</span>`;
        })
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
          <td>${parseFloat(value.cuota).toFixed(2)}${Moneda}</td>
        </tr>
      `;
    });
  }
}

buscarSocio.addEventListener("input", (e) => {
  textoBusqueda = e.target.value.trim();
  renderizarTabla();
});

selectFiltro.addEventListener("change", (e) => {
  actividadFiltro = e.target.value;
  renderizarTabla();
});

ordenarFiltro.addEventListener("change", (e) => {
  ordenFiltro = e.target.value;
  renderizarTabla();
});

renderizarTabla();

export { renderizarTabla };
