let formulario = document.getElementById("form-alta");
import { mostrarToastError } from "../toast/error.js";

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  try {
    let errores = [];

    const nombre = document.getElementById("alta-nombre").value.trim();
    if (!nombre)
      errores.push({ nombreCampo: "NOMBRE", razon: "Incluir Nombre" });

    const apellidos = document.getElementById("alta-apellidos").value.trim();
    if (!apellidos)
      errores.push({ nombreCampo: "APELLIDOS", razon: "Incluir Apellidos" });

    const dni = document.getElementById("alta-dni").value.trim();
    if (!dni) errores.push({ nombreCampo: "DNI", razon: "Incluir DNI" });

    const email = document.getElementById("alta-email").value.trim();
    if (!email) errores.push({ nombreCampo: "EMAIL", razon: "Incluir Email" });

    const telefono = document.getElementById("alta-telefono").value.trim();
    if (!telefono)
      errores.push({ nombreCampo: "TELÉFONO", razon: "Incluir Teléfono" });

    const nacimiento = document.getElementById("alta-nacimiento").value.trim();
    if (!nacimiento)
      errores.push({
        nombreCampo: "FECHA DE NACIMIENTO",
        razon: "Incluir Nacimiento",
      });

    const cuota = document.getElementById("alta-cuota").value.trim();
    if (!cuota) errores.push({ nombreCampo: "CUOTA", razon: "Incluir Cuota" });

    if (errores.length > 0) {
      let mensaje = "";
      errores.forEach((a) => mensaje += (`${a.nombreCampo}: ${a.razon}<br>`));
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
