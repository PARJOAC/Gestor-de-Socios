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

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  try {
    let errores = [];

    const nombre = document.getElementById("alta-nombre").value.trim();
    if (!nombre)
      errores.push({ nombreCampo: "NOMBRE", razon: "Incluir Nombre" });
    const comprobarNombre = comprobarNombre(nombre);
    if(!comprobarNombre) errores.push({ nombreCampo: "NOMBRE", razon: "Nombre inválido" });

    const apellidos = document.getElementById("alta-apellidos").value.trim();
    if (!apellidos)
      errores.push({ nombreCampo: "APELLIDOS", razon: "Incluir Apellidos" });
    const comprobarApellidos = comprobarApellidos(apellidos);
    if(!comprobarApellidos) errores.push({ nombreCampo: "APELLIDOS", razon: "Apellidos inválidos" });

    const dni = document.getElementById("alta-dni").value.trim();
    if (!dni) errores.push({ nombreCampo: "DNI", razon: "Incluir DNI" });
    const comprobarDNI = comprobarDNI(dni);
    if(!comprobarDNI) errores.push({ nombreCampo: "DNI", razon: "DNI inválido" });

    const email = document.getElementById("alta-email").value.trim();
    if (!email) errores.push({ nombreCampo: "EMAIL", razon: "Incluir Email" });
    const comprobarEmail = comprobarEmail(email);
    if(!comprobarEmail) errores.push({ nombreCampo: "EMAIL", razon: "Email inválido" });

    const telefono = document.getElementById("alta-telefono").value.trim();
    if (!telefono)
      errores.push({ nombreCampo: "TELÉFONO", razon: "Incluir Teléfono" });
    const comprobarTelefono = comprobarTelefono(telefono);
    if(!comprobarTelefono) errores.push({ nombreCampo: "TELÉFONO", razon: "Teléfono inválido" });

    const nacimiento = document.getElementById("alta-nacimiento").value.trim();
    if (!nacimiento)
      errores.push({
        nombreCampo: "FECHA DE NACIMIENTO",
        razon: "Incluir Nacimiento",
      });
    const comprobarFechaNacimiento = comprobarFechaNacimiento(nacimiento);
    if(!comprobarFechaNacimiento) errores.push({ nombreCampo: "FECHA DE NACIMIENTO", razon: "Fecha de nacimiento inválida" });

    const cuota = document.getElementById("alta-cuota").value.trim();
    if (!cuota) errores.push({ nombreCampo: "CUOTA", razon: "Incluir Cuota" });
    const comprobarCuota = comprobarCuota(cuota);
    if(!comprobarCuota) errores.push({ nombreCampo: "CUOTA", razon: "Cuota inválida" });

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
    mostrarToastError("Falta por añadir esta información: " + e.message);
  }
});
