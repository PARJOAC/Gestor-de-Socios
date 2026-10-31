const btnBuscar = document.getElementById("btn-search-dni");

btnBuscar.addEventListener("click", function (e) {
  try {
    const dni = document.getElementById("input-dni-search");
    let busqueda = socios.find(
      (socio) => socio.dni.toLowerCase() === dni.value.toLowerCase(),
    );
    if (!busqueda) throw new Error("El socio no se ha encontrado.");
    let datosConsulta = document.getElementById("datosConsulta");
    datosConsulta.innerHTML = `
        <p><strong>Nombre:</strong> ${busqueda.nombre}</p>
        <p><strong>Apellidos:</strong> ${busqueda.apellidos}</p>
        <p><strong>DNI:</strong> ${busqueda.dni}</p>
        <p><strong>Email:</strong> ${busqueda.email}</p>
        <p><strong>Teléfono:</strong> ${busqueda.telefono}</p>
        <p><strong>Fecha de nacimiento:</strong> ${busqueda.fechaNacimiento} (${calcularEdad(busqueda.fechaNacimiento)} años)</p>
        <p><strong>Fecha de alta:</strong> ${busqueda.fechaAlta}</p>
        <p><strong>Actividades:</strong> ${busqueda.actividades.join(", ")}</p>
        <p><strong>Cuota:</strong> ${busqueda.cuota}</p>
    `;
  } catch (e) {
    mostrarToastError(e);
  }
});
