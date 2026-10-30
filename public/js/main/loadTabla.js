let tabla = document.getElementById("tbody-socios");
let botonAnterior = document.getElementById("pagina-anterior");
let botonSiguiente = document.getElementById("pagina-siguiente");
let contadorPaginas = document.getElementById("pagina-actual");

let paginaActual = 0;
let sociosPagina = 5;

let paginasTotales = Math.ceil(socios.length / sociosPagina);

// 1. FUNCIÓN PARA PINTAR LA TABLA Y ACTUALIZAR BOTONES
function renderizarTabla() {
  // Limpiar la tabla antes de pintar la nueva página
  tabla.innerHTML = "";

  // Calcular los índices del corte para la página actual
  let inicio = paginaActual * sociosPagina;
  let fin = inicio + sociosPagina;

  // slice() extrae solo los socios correspondientes a esta página
  let sociosFiltrados = socios.slice(inicio, fin);

  sociosFiltrados.forEach((value) => {
    tabla.innerHTML += `
      <tr>
        <td>${value.id}</td>
        <td>${value.nombre}</td>
        <td>${value.email}</td>
        <td>${value.actividades.join(", ")}</td>
        <td>${calcularEdad(value.fechaNacimiento)}</td>
        <td>${value.cuota} €</td>
      </tr>
    `;
  });

  // Actualizar el texto del contador (+1 porque el usuario ve páginas desde la 1, no desde la 0)
  contadorPaginas.innerHTML = `${paginaActual + 1} / ${paginasTotales}`;

  // Control de estados de los botones
  botonAnterior.disabled = paginaActual === 0;
  botonSiguiente.disabled = paginaActual >= paginasTotales - 1;
}

// 2. EVENTOS PARA LOS BOTONES
botonAnterior.addEventListener("click", () => {
  if (paginaActual > 0) {
    paginaActual--;
    renderizarTabla();
  }
});

botonSiguiente.addEventListener("click", () => {
  if (paginaActual < paginasTotales - 1) {
    paginaActual++;
    renderizarTabla();
  }
});

// Helper para la edad
function calcularEdad(fechaNacimiento) {
  return new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();
}

// 3. EJECUCIÓN INICIAL
renderizarTabla();
