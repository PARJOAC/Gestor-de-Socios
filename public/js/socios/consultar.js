// Importa el aviso que se muestra cuando la búsqueda no puede completarse.
import { mostrarToastError } from "../ui/toast/error.js";
// Importa la lista donde se busca el socio.
import { Socios } from "../data/socios.js";
// Importa la función que calcula la edad del socio.
import { calcularEdad } from "./functions/edad.js";
// Importa la función que escribe las fechas de forma legible.
import { fechaCompleta } from "../utils/fechaCompleta.js";
// Importa los valores configurables de la aplicación.
import config from "../../../config.json" with { type: "json" };

// Busca el botón que inicia la consulta por DNI.
const btnBuscar = document.getElementById("btn-search-dni");

// Ejecuta la búsqueda cuando se pulsa el botón.
btnBuscar.addEventListener("click", function (e) {
  // Captura posibles errores de búsqueda para mostrarlos al usuario.
  try {
    // Lee el DNI escrito y busca una coincidencia sin distinguir mayúsculas.
    const dni = document.getElementById("input-dni-search");
    let busqueda = Socios.find(
      (socio) => socio.dni.toLowerCase() === dni.value.toLowerCase(),
    );

    // Busca el contenedor donde aparecerán los datos del socio.
    let datosConsulta = document.getElementById("datosConsulta");
    // Vacía el resultado y avisa si no se escribió un DNI.
    if (dni.value.length === 0) {
      datosConsulta.innerHTML = "";
      throw new Error("Debes escribir un DNI.");
    }
    // Vacía el resultado y avisa si no existe un socio con ese DNI.
    if (!busqueda) {
      datosConsulta.innerHTML = "";
      throw new Error("El socio no se ha encontrado.");
    }
    // Separa el dominio del correo para mostrarlo como dato adicional.
    const arroba = busqueda.email.indexOf("@");
    const dominio = busqueda.email.slice(arroba);
    // Convierte las fechas del socio a objetos Date para presentarlas.
    const fecha = new Date(busqueda.fechaNacimiento);

    // Calcula los días que han pasado desde el alta.
    const fechaActual = new Date();
    const fechaAlta = new Date(busqueda.fechaAlta);
    const diasAlta = Math.floor(
      (fechaActual - fechaAlta) / (1000 * 60 * 60 * 24),
    );
    // Prepara la fecha del próximo cumpleaños en el año actual.
    const proximoCumple = new Date(
      fechaActual.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
    );

    // Agrupa las cifras del teléfono para facilitar su lectura.
    const telefono = `${busqueda.telefono.substring(0, 3)} ${busqueda.telefono.substring(3, 6)} ${busqueda.telefono.substring(6, 9)}`;
    // Prepara la fecha de nacimiento con su nombre de día y mes.
    const edadNacimiento = `${fechaCompleta(fecha)} (${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()})`;
    // Dibuja la ficha con los datos del socio encontrado.
    datosConsulta.innerHTML = `
    <div class="socio-card">
        <div class="socio-header">
            <h3>${busqueda.nombre} ${busqueda.apellidos}</h3>
        </div>
        <div class="socio-grid">
            ${socioFila("ID SOCIO", busqueda.id, {})}
            ${socioFila("DNI", busqueda.dni, {})}
            ${socioFila("Email", busqueda.email, { extra: `(dominio: ${dominio})` })}
            ${socioFila("Teléfono", telefono, {})}
            ${socioFila("Edad y Nacimiento", edadNacimiento, { extra: `Edad: ${calcularEdad(busqueda.fechaNacimiento)}` })}
            ${socioFila("Fecha de Alta", `${fechaCompleta(fechaAlta)} (${fechaAlta.getDate()}/${fechaAlta.getMonth() + 1}/${fechaAlta.getFullYear()})`, { extra: `(${diasAlta} días)` })}
            ${socioFila("Fecha de Cumpleaños", fechaCompleta(proximoCumple), {})}
            ${socioFila("Actividades", busqueda.actividades.map((act) => act).join(", "), { extra: `(${busqueda.actividades.length} en total)` })}
        </div>
        ${socioFila("Cuota Mensual", `${busqueda.cuota}${config.moneda}`, {})}
    </div>
    `;
  } catch (e) {
    // Muestra el motivo por el que no se pudo completar la búsqueda.
    console.log(e);
    mostrarToastError(e.message);
  }
});

/**
 * Crea el fragmento HTML de un dato de la ficha del socio.
 * @param {string} titulo - Etiqueta que identifica el dato.
 * @param {string} contenido - Valor principal que se muestra en la fila.
 * @param {{extra?: string}} opciones - Dato adicional opcional que acompaña al valor.
 * @returns {string} HTML de la fila con su etiqueta y contenido.
 */
function socioFila(titulo, contenido, { extra }) {
  // Devuelve el fragmento HTML que presenta el dato del socio.
  return `
        <div class="socio-field socio-full">
            <span class="socio-label">${titulo}</span>
            <span class="socio-value">${contenido}</span>
            ${extra ? `<span class=\"text-muted\">${extra}</span>` : ""}
        </div>
`;
}
