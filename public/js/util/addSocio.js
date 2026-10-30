let formulario = document.getElementById("form-alta");

formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que la página se recargue
  try {
    const datos = new FormData(formulario);
    const objetoDatos = Object.fromEntries(datos.entries());

    const nombre = document.getElementById("alta-nombre").value;
    if (!nombre) throw new Error("Falta el NOMBRE por añadir.");
    const apellidos = document.getElementById("alta-apellidos").value;
    if (!apellidos) throw new Error("Faltan los APELLIDOS por añadir.");
    const dni = document.getElementById("alta-dni").value;
    if (!dni) throw new Error("Falta el DNI por añadir.");
    const email = document.getElementById("alta-email").value;
    if (!email) throw new Error("Falta el EMAIL por añadir.");
    const telefono = document.getElementById("alta-telefono").value;
    if (!telefono) throw new Error("Falta el TELÉFONO por añadir.");
    const nacimiento = document.getElementById("alta-nacimiento").value;
    if (!nacimiento)
      throw new Error("Falta la FECHA DE NACIMIENTO por añadir.");
    const actividades = document.getElementById("alta-actividades");
    if (!actividades) throw new Error("Faltan las ACTIVIDADES por añadir.");
    const cuota = document.getElementById("alta-cuota").value;
    if (!cuota) throw new Error("Falta la CUOTA por añadir.");
    socios.push(objetoDatos);
    modal.close();
  } catch (e) {
    let errorDiv = document.getElementById("error-msg");
    errorDiv.innerHTML = e.message;
  }
});
