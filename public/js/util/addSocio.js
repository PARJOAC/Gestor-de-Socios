let formulario = document.getElementById("form-alta");
import { mostrarToastError } from "../toast/error.js";
import {
  comprobarID,
  comprobarNombre,
  comprobarApellidos,
  comprobarDNI,
  comprobarEmail,
  comprobarTelefono,
  comprobarFechaNacimiento,
  comprobarFechaAlta,
  comprobarActividades,
  comprobarCuota,
} from "./functions/nuevoSocio.js";
import { Socios } from "../data/socios.js";
import { Actividades } from "../data/actividades.js";

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  try {
    let errores = [];

    const nombre = document.getElementById("alta-nombre").value.trim();
    if (!nombre) {
      errores.push({ nombreCampo: "NOMBRE", razon: "Incluir Nombre" });
    } else {
      const testNombre = comprobarNombre(nombre);
      if (!testNombre)
        errores.push({ nombreCampo: "NOMBRE", razon: "Nombre inválido" });
    }

    const apellidos = document.getElementById("alta-apellidos").value.trim();
    if (!apellidos) {
      errores.push({ nombreCampo: "APELLIDOS", razon: "Incluir Apellidos" });
    } else {
      const testApellidos = comprobarApellidos(apellidos);
      if (!testApellidos)
        errores.push({
          nombreCampo: "APELLIDOS",
          razon: "Apellidos inválidos",
        });
    }

    const dni = document.getElementById("alta-dni").value.trim();
    if (!dni) {
      errores.push({ nombreCampo: "DNI", razon: "Incluir DNI" });
    } else if (
      Socios.some((socio) => socio.dni.toLowerCase() === dni.toLowerCase())
    ) {
      errores.push({ nombreCampo: "DNI", razon: "DNI ya registrado" });
    } else {
      const testDNI = comprobarDNI(dni);
      if (!testDNI) errores.push({ nombreCampo: "DNI", razon: "DNI inválido" });
    }

    const email = document.getElementById("alta-email").value.trim();
    if (!email) {
      errores.push({ nombreCampo: "EMAIL", razon: "Incluir Email" });
    } else if (
      Socios.some((socio) => socio.email.toLowerCase() === email.toLowerCase())
    ) {
      errores.push({ nombreCampo: "EMAIL", razon: "Email ya registrado" });
    } else {
      const testEmail = comprobarEmail(email);
      if (!testEmail)
        errores.push({ nombreCampo: "EMAIL", razon: "Email inválido" });
    }

    const telefono = document.getElementById("alta-telefono").value.trim();
    if (!telefono) {
      errores.push({ nombreCampo: "TELÉFONO", razon: "Incluir Teléfono" });
    } else {
      const testTelefono = comprobarTelefono(telefono);
      if (!testTelefono)
        errores.push({ nombreCampo: "TELÉFONO", razon: "Teléfono inválido" });
    }

    const nacimiento = document.getElementById("alta-nacimiento").value.trim();
    if (!nacimiento) {
      errores.push({
        nombreCampo: "FECHA DE NACIMIENTO",
        razon: "Incluir Nacimiento",
      });
    } else {
      const testFechaNacimiento = comprobarFechaNacimiento(nacimiento);
      if (!testFechaNacimiento)
        errores.push({
          nombreCampo: "FECHA DE NACIMIENTO",
          razon: "Fecha de nacimiento inválida",
        });
    }

    const actividades = document
      .getElementById("alta-actividades")
      .value.trim();
    if (!actividades) {
      errores.push({
        nombreCampo: "ACTIVIDADES",
        razon: "Incluir Actividades",
      });
    } else if (!comprobarActividades(actividades)) {
      errores.push({
        nombreCampo: "ACTIVIDADES",
        razon: "Actividades inválidas",
      });
    }

    const cuota = document.getElementById("alta-cuota").value.trim();
    if (!cuota) {
      errores.push({ nombreCampo: "CUOTA", razon: "Incluir Cuota" });
    } else {
      const testCuota = comprobarCuota(cuota);
      if (!testCuota)
        errores.push({ nombreCampo: "CUOTA", razon: "Cuota inválida" });
    }

    if (errores.length > 0) {
      let mensaje = "";
      errores.forEach((a) => (mensaje += `${a.nombreCampo}: ${a.razon}<br>`));
      throw new Error(mensaje);
    }

    const datos = new FormData(formulario);
    const objetoDatos = Object.fromEntries(datos.entries());
    Socios.push(objetoDatos);

    modal.classList.add("hidden");
    formulario.reset();
  } catch (e) {
    mostrarToastError("Falta por añadir esta información:<br>" + e.message);
  }
});
