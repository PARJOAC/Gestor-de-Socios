/**
 * Genera un color aleatorio en formato RGB.
 * Utiliza un objeto para almacenar y guardar valores aleatorios
 * enteros entre 1 y 255 a cada color (R, G, B).
 *
 * @returns {{R: number, G: number, B: number}} Un objeto con los colores.
 */
function colorAleatorioRangoRGB() {
  // Objeto para poder guardar los colores.
  let numeros = {
    R: "",
    G: "",
    B: "",
  };

  // Asignar los números aleatorios de los colores dentro del objeto.
  Object.keys(numeros).forEach((value) => {
    numeros[value] = Math.floor(Math.random() * 256);
  });

  // Se devuelve el objeto con los colores.
  return { R: numeros.R, G: numeros.G, B: numeros.B };
}

// Permite generar un rango RGB desde otros módulos.
export { colorAleatorioRangoRGB };
