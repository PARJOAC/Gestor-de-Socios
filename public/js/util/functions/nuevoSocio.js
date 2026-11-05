// Funciones de validación para los campos del formulario de nuevo socio
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

function calculoLetraDNI(dni) {
  const dniSinLetra = dni.replace(/\D/g, "");

  const cadenaLetraCorrecta = "TRWAGMYFPDXBNJZSQVHLCKE";
  const indiceResto = Number(dniSinLetra) % 23;

  const letraCorrecta = cadenaLetraCorrecta.charAt(indiceResto);

  return letraCorrecta;
}

function comprobarEmail(email) {
  const sintaxis = /^[a-z0-9._]+@[a-z0-9._]+\.[a-z]{2,}$/;
  return sintaxis.test(email);
}

function comprobarTelefono(telefono) {
  const telefonoSinEspacios = telefono.trim();
  const sintaxis = /^[6789]{1}\d{8}$/;
  return sintaxis.test(telefonoSinEspacios);
}

function comprobarFechaNacimiento(fechaNacimiento) {
  const formatoRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!formatoRegex.test(fechaNacimiento)) return false;

  const [diaStr, mesStr, anioStr] = fechaNacimiento.split("/");
  const dia = parseInt(diaStr, 10);
  const mes = parseInt(mesStr, 10) - 1;
  const anio = parseInt(anioStr, 10);

  const fecha = new Date(anio, mes, dia);
  if (
    fecha.getFullYear() !== anio ||
    fecha.getMonth() !== mes ||
    fecha.getDate() !== dia
  ) {
    return false;
  }

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
  calculoLetraDNI,
  comprobarEmail,
  comprobarTelefono,
  comprobarFechaNacimiento,
  comprobarFechaAlta,
  comprobarActividades,
  comprobarCuota,
};
