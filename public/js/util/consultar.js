const btnBuscar = document.getElementById("btn-search-dni");
import { mostrarToastError } from "../toast/error.js";
import { Socios } from "../data/socios.js";
import { calcularEdad } from "../util/functions/socio.js";
import { fechaCompleta } from "./functions/fechaCompleta.js";

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
    datosConsulta.innerHTML = `
    <div class="socio-card">
        <div class="socio-header">
            <h3>${busqueda.nombre} ${busqueda.apellidos}</h3>
        </div>
        <div class="socio-grid">
            <div class="socio-field">
                <span class="socio-label">ID Socio</span>
                <span class="id-numero">${busqueda.id}</span>
            </div>
            <div class="socio-field">
                <span class="socio-label">DNI</span>
                <span class="socio-value socio-dni">${busqueda.dni}</span>
            </div>
            <div class="socio-field socio-full">
                <span class="socio-label">Email</span>
                <span class="socio-value">${busqueda.email} <span class="text-muted">(dominio: ${dominio})</span></span>
            </div>
            <div class="socio-field">
                <span class="socio-label">Teléfono</span>
                <span class="socio-value">${busqueda.telefono}</span>
            </div>
            <div class="socio-field socio-full">
                <span class="socio-label">Edad y Nacimiento</span>
                <span class="socio-value">${fechaCompleta(fecha)} (${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}) - ${calcularEdad(busqueda.fechaNacimiento)} años</span>
            </div>
            <div class="socio-field socio-full">
                <span class="socio-label">Fecha de Alta</span>
                <span class="socio-value">${fechaCompleta(fechaAlta)} (${fechaAlta.getDate()}/${fechaAlta.getMonth() + 1}/${fechaAlta.getFullYear()}) - <strong class="text-muted">(${diasAlta} días)</strong></span>
            </div>
            <div class="socio-field socio-full">
                <span class="socio-label">Fecha de Cumpleaños</span>
                <span class="socio-value">${fechaCompleta(proximoCumple)}</span>
            </div>
            <div class="socio-field socio-full">
                <span class="socio-label">Actividades</span>
                <div class="tags-container" style="margin-top: 0.2rem;">
                    ${busqueda.actividades.map((act) => `<span class="badge-actividad">${act}</span>`).join("")}
                </div>
            </div>
        </div>
        <div class="socio-footer">
            <span class="socio-footer-label">Cuota Mensual</span>
            <span class="socio-cuota">${busqueda.cuota} €</span>
        </div>
    </div>
    `;
  } catch (e) {
    mostrarToastError(e.message);
  }
});
