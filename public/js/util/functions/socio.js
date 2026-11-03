// Helper para obtener las iniciales (ej. "Ana María Gómez Pérez" -> "AM")
function obtenerIniciales(nombre, apellidos) {
  let primNombre = nombre ? nombre.trim().charAt(0) : "";
  let primApellido = apellidos ? apellidos.trim().charAt(0) : "";
  return (primNombre + primApellido).toUpperCase();
}

// Helper para la edad
function calcularEdad(fechaNacimiento) {
  return new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();
}

function abreviarApellido(apellidos) {
  let eliminar = /\s([A-Za-zÁ-ÿ])[A-Za-zÁ-ÿ]*/g;
  // En el reemplazo, '$1' mantiene la primera letra capturada y le añade el punto.
  return apellidos.replace(eliminar, " $1.");
}

function esconderCorreo(correo) {
  let arroba = correo.indexOf("@");
  let email =
    correo.charAt(0) +
    correo.charAt(1) +
    correo.slice(3, arroba).replace(/./g, "*") +
    correo.slice(arroba);
  return email;
}

export { calcularEdad, obtenerIniciales, abreviarApellido, esconderCorreo };
