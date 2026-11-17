import { fechaCorta } from "./fechaCompleta.js";

/**
 * Obtener la antiguedad de un socio en formato string.
 * @param {*} socio
 * @returns
 */
function obtenerAntiguedad(socio) {
  // Guardamos la fecha actual
  let fechaActual = new Date();
  // Separa la fecha actual para guardarla en un array.
  const [diaActual, mesActual, anioActual] = fechaCorta(fechaActual).split("/");
  let fechaAlta = new Date(socio.fechaAlta);
  // Separa la fecha actual para guardarla en un array.
  const [diaAlta, mesAlta, anioAlta] = fechaCorta(fechaAlta).split("/");

  // Devolvemos el string de la fecha.
  return stringAntiguedad({
    anio: anioActual - anioAlta,
    mes: mesActual - mesAlta,
    dia: diaActual - diaAlta,
  });
}

/**
 * Escribir el formato que tendrá la cadena de antiguedad.
 * @param {*} param0
 * @returns
 */
function stringAntiguedad({ anio, mes, dia } = {}) {
  // Formateamos el texto del día (por si hace falta escribirlo en singular)
  let textoDia = "";
  if (dia > 0) textoDia = `${dia} ` + (dia <= 1 ? "DIA" : "DÍAS");

  // Formateamos el texto del mes (por si hace falta escribirlo en singular)
  let textoMes = "";
  if (mes > 0) textoMes = `${mes} ` + (mes = 1 ? "MES" : "MESES");

  // Formateamos el texto del anio (por si hace falta escribirlo en singular)
  let textoAnio = "";
  if (anio > 0) textoAnio = `${anio} ` + (anio <= 1 ? "AÑO" : "AÑOS");

  return `${textoAnio} ${textoMes} ${textoDia}`;
}

export { obtenerAntiguedad };
