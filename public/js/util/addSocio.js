let formulario = document.getElementById("form-alta");
import { mostrarToastError } from "../toast/error.js";

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  try {
    let errores = [];

    const nombre = document.getElementById("alta-nombre").value.trim();
    if (!nombre) errores.push("NOMBRE");

    const apellidos = document.getElementById("alta-apellidos").value.trim();
    if (!apellidos) errores.push("APELLIDOS");

    const dni = document.getElementById("alta-dni").value.trim();
    if (!dni) errores.push("DNI");

    const email = document.getElementById("alta-email").value.trim();
    if (!email) errores.push("EMAIL");

    const telefono = document.getElementById("alta-telefono").value.trim();
    if (!telefono) errores.push("TELÉFONO");

    const nacimiento = document.getElementById("alta-nacimiento").value.trim();
    if (!nacimiento) errores.push("FECHA DE NACIMIENTO");

    const cuota = document.getElementById("alta-cuota").value.trim();
    if (!cuota) errores.push("CUOTA");

    if (errores.length > 0) {
      throw new Error(errores.join(", "));
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
