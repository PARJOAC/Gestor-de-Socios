function obtenerIniciales(nombre, apellidos) {
  let primNombre = nombre ? nombre.trim().charAt(0) : "";
  let primApellido = apellidos ? apellidos.trim().charAt(0) : "";
  return (primNombre + primApellido).toUpperCase();
}

function calcularEdad(fechaNacimiento) {
  const [anioNacimiento, mesNacimiento, diaNacimiento] = fechaNacimiento
    .split("-")
    .map(Number);
  const hoy = new Date();
  const aunNoCumpleAnios =
    hoy.getMonth() + 1 < mesNacimiento ||
    (hoy.getMonth() + 1 === mesNacimiento && hoy.getDate() < diaNacimiento);

  return hoy.getFullYear() - anioNacimiento - Number(aunNoCumpleAnios);
}

function abreviarApellido(apellidos) {
  // Aseguramos que el string esté normalizado para evitar problemas con tildes
  const normalizado = apellidos.normalize("NFD");
  // Expresión regular ajustada para capturar la primera letra del segundo apellido (incluso con tilde)
  let eliminar = /\s([A-Za-z\u0300-\u036f])[A-Za-z\u0300-\u036f]*$/;

  // Aplicamos el replace y volvemos a normalizar la forma compuesta (NFC)
  return normalizado.replace(eliminar, " $1.");
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
