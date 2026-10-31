let formulario = document.getElementById("form-alta");

formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que la página se recargue

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

    // Si hay errores, unimos los strings del array y lanzamos el Error con ese mensaje de texto
    if (errores.length > 0) {
      throw new Error(errores.join(", "));
    }

    // Si todo va bien:
    const datos = new FormData(formulario);
    const objetoDatos = Object.fromEntries(datos.entries());
    socios.push(objetoDatos);

    // Cierra el modal basado en clases que creamos antes
    modal.classList.add("hidden");
    formulario.reset();
  } catch (e) {
    // e.message contendrá la cadena unida ("NOMBRE, APELLIDOS, ...")
    mostrarToastError("Falta por añadir esta información: " + e.message);
  }
});
