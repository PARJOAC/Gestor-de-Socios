function obtenerIniciales(nombre, apellidos) {
  let primNombre = nombre ? nombre.trim().charAt(0) : "";
  let primApellido = apellidos ? apellidos.trim().charAt(0) : "";
  return (primNombre + primApellido).toUpperCase();
}

function abreviarApellido(apellidos) {
  const normalizado = apellidos.normalize("NFD");
  const eliminar = /\s([A-Za-z\u0300-\u036f])[A-Za-z\u0300-\u036f]*$/;

  return normalizado.replace(eliminar, " $1.");
}

function esconderCorreo(correo) {
  const arroba = correo.indexOf("@");
  return (
    correo.charAt(0) +
    correo.charAt(1) +
    correo.slice(3, arroba).replace(/./g, "*") +
    correo.slice(arroba)
  );
}

export { obtenerIniciales, abreviarApellido, esconderCorreo };
