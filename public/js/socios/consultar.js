import { mostrarToastError } from "../ui/toast/error.js";
import { Socios } from "../data/socios.js";
import { calcularEdad } from "./functions/edad.js";
import { fechaCompleta } from "../utils/fechaCompleta.js";
import { Moneda } from "../constants/moneda.js";

const btnBuscar = document.getElementById("btn-search-dni");

btnBuscar.addEventListener("click", function (e) {
  try {
    const dni = document.getElementById("input-dni-search");
    let busqueda = Socios.find(
      (socio) => socio.dni.toLowerCase() === dni.value.toLowerCase(),
    );

    let datosConsulta = document.getElementById("datosConsulta");
    if (dni.value.length === 0) {
      datosConsulta.innerHTML = "";
      throw new Error("Debes escribir un DNI.");
    }
    if (!busqueda) {
      datosConsulta.innerHTML = "";
      throw new Error("El socio no se ha encontrado.");
    }
    const arroba = busqueda.email.indexOf("@");
    const dominio = busqueda.email.slice(arroba);
    const fecha = new Date(busqueda.fechaNacimiento);

    const fechaActual = new Date();
    const fechaAlta = new Date(busqueda.fechaAlta);
    const diasAlta = Math.floor(
      (fechaActual - fechaAlta) / (1000 * 60 * 60 * 24),
    );
    const proximoCumple = new Date(
      fechaActual.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
    );

    const telefono = `${busqueda.telefono.substring(0, 3)} ${busqueda.telefono.substring(3, 6)} ${busqueda.telefono.substring(6, 9)}`;
    const edadNacimiento = `${fechaCompleta(fecha)} (${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()})`;
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
        ${socioFila("Cuota Mensual", `${busqueda.cuota}${Moneda}`, {})}
    </div>
    `;
  } catch (e) {
    console.log(e);
    mostrarToastError(e.message);
  }
});

function socioFila(titulo, contenido, { extra }) {
  return `
        <div class="socio-field socio-full">
            <span class="socio-label">${titulo}</span>
            <span class="socio-value">${contenido}</span>
            ${extra ? `<span class=\"text-muted\">${extra}</span>` : ""}
        </div>
`;
}
