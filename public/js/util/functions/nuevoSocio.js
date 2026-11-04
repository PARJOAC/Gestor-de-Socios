function comprobarID(id) {
  const sintaxis = /^SOC-\d{4}$/;
  return sintaxis.test(id);
}

function comprobarNombre(nombre) {
  const nombreLimpio = nombre.trim();
  const sintaxis = /^[A-ZÁÉÍÓÚÑa-záéíóúñ\s]+$/;
  return nombreLimpio.length > 0 && sintaxis.test(nombreLimpio);
}

function comprobarApellidos(apellidos) {
  const apellidosLimpios = apellidos.trim();
  const sintaxis = /^[A-ZÁÉÍÓÚÑa-záéíóúñ\s]+$/;
  return apellidosLimpios.length > 0 && sintaxis.test(apellidosLimpios);
}

function comprobarDNI(dni) {
  const sintaxis = /^\d{8}[A-Z]{1}$/;
  return sintaxis.test(dni);
}

function comprobarEmail(email) {
  const sintaxis = /^[a-z0-9._]+@[a-z0-9._]+\.[a-z]{2,}$/;
  return sintaxis.test(email);
}

function comprobarTelefono(telefono) {
  const telefonoSinEspacios = telefono.trim();
  const sintaxis = /^\d{9}$/;
  return sintaxis.test(telefonoSinEspacios);
}

function comprobarFechaNacimiento(fechaNacimiento) {
  const formatoRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!formatoRegex.test(fechaNacimiento)) return false;

  const fecha = new Date(fechaNacimiento);
  const fechaActual = new Date();
  return fecha < fechaActual;
}

function comprobarFechaAlta(fechaAlta) {
  const fecha = new Date(fechaAlta);
  const fechaActual = new Date();
  return fecha <= fechaActual;
}

function comprobarActividades(actividades) {
  if (typeof actividades === "string") {
    return actividades.trim().length > 0;
  }
  return Array.isArray(actividades) && actividades.length > 0;
}

function comprobarCuota(cuota) {
  const sintaxis = /^\d+(\.\d{1,2})?$/;
  return sintaxis.test(cuota) && parseFloat(cuota) > 0;
}

export {
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
};
