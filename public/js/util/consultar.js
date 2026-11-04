const btnBuscar = document.getElementById("btn-search-dni");
import { mostrarToastError } from "../toast/error.js";
import { Socios } from "../data/socios.js";
import { calcularEdad } from "../util/functions/socio.js";
import { DiasSemana, Meses } from "../enum/fechas.js";

btnBuscar.addEventListener("click", function (e) {
  try {
    const dni = document.getElementById("input-dni-search");
    let busqueda = Socios.find(
      (socio) => socio.dni.toLowerCase() === dni.value.toLowerCase(),
    );
    if (!busqueda) throw new Error("El socio no se ha encontrado.");
    const arroba = busqueda.email.indexOf("@");
    const dominio = busqueda.email.slice(arroba);
    const fecha = new Date(busqueda.fechaNacimiento);
    let datosConsulta = document.getElementById("datosConsulta");
    const fechaActual = new Date();
    const fechaAlta = new Date(busqueda.fechaAlta);
    datosConsulta.innerHTML = `
        <p><strong>ID:</strong> ${busqueda.id}</p>
        <p><strong>Nombre Completo:</strong> ${busqueda.nombre} ${busqueda.apellidos}</p>
        <p><strong>DNI:</strong> ${busqueda.dni}</p>
        <p><strong>Email:</strong> ${busqueda.email} (dominio: ${dominio})</p>
        <p><strong>Teléfono:</strong> ${busqueda.telefono.split(" ", 3)}</p>
        <p><strong>Fecha de nacimiento:</strong> ${DiasSemana[fecha.getDay()]}, ${fecha.getDate()} de ${Meses[fecha.getMonth()]} de ${fecha.getFullYear()} · ${calcularEdad(busqueda.fechaNacimiento)} años</p>
        <p><strong>Fecha de alta:</strong> ${busqueda.fechaAlta} (${fechaActual - fechaAlta} días de alta)</p>
        <p><strong>Actividades:</strong> ${busqueda.actividades.join(", ")}</p>
        <p><strong>Cuota:</strong> ${busqueda.cuota}</p>
        <p><strong>Próximo cumpleaños:</strong></p>
    `;
  } catch (e) {
    mostrarToastError(e.message);
  }
});
