let tabla = document.getElementById("tbody-socios");
let botonAnterior = document.getElementById("pagina-anterior");
let botonSiguiente = document.getElementById("pagina-siguiente");
let contadorPaginas = document.getElementById("pagina-actual");
let buscarSocio = document.getElementById("input-search");
let selectFiltro = document.getElementById("select-activity-filter");
let ordenarFiltro = document.getElementById("select-order");

let paginaActual = 0;
let sociosPagina = 5;
let textoBusqueda = "";
let actividadFiltro = "";
let ordenFiltro = "";

// 1. FUNCIÓN PARA PINTAR LA TABLA Y ACTUALIZAR BOTONES
function renderizarTabla({
  busqueda: paramBusqueda = textoBusqueda,
  filtro: paramFiltro = actividadFiltro,
  orden: orden = ordenFiltro,
} = {}) {
  // Sincronizar estados globales
  textoBusqueda = paramBusqueda;
  actividadFiltro = paramFiltro;
  ordenFiltro = orden;

  // Limpiar la tabla antes de pintar
  tabla.innerHTML = "";

  let sociosFiltrados = socios;

  // Filtrar por texto de búsqueda (nombre, apellidos o email)
  if (textoBusqueda) {
    let query = textoBusqueda
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    sociosFiltrados = sociosFiltrados.filter((socio) => {
      const matchNombre = socio.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(query);
      const matchApellidos = socio.apellidos
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(query);
      const matchEmail = socio.email
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(query);
      return matchNombre || matchApellidos || matchEmail;
    });
  }

  // Filtrar por actividad seleccionada
  if (
    actividadFiltro &&
    actividadFiltro.toLowerCase() != "todas las actividades"
  ) {
    let queryFiltro = actividadFiltro
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    sociosFiltrados = sociosFiltrados.filter((socio) =>
      socio.actividades.some((v) =>
        v
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(queryFiltro),
      ),
    );
  }

  if (ordenFiltro) {
    switch (ordenFiltro.toLowerCase()) {
      case "default":
        sociosFiltrados.sort((a, b) => a.cuota - b.cuota);
        break;
      case "nombre":
        sociosFiltrados.sort((a, b) => a.nombre - b.nombre);
        break;
      case "apellidos":
        sociosFiltrados.sort((a, b) => a.apellidos - b.apellidos);
        break;
      case "jovenes":
        sociosFiltrados.sort(
          (a, b) => new Date(a.fechaNacimiento) - new Date(b.fechaNacimiento),
        );
        break;
      case "antiguos":
        sociosFiltrados.sort(
          (a, b) => new Date(a.fechaNacimiento) + new Date(b.fechaNacimiento),
        );
        break;
      case "cuota":
        sociosFiltrados.sort((a, b) => a.cuota - b.cuota);
        break;
    }
  }

  // Calcular páginas totales en base a los resultados filtrados
  let paginasTotales = Math.ceil(sociosFiltrados.length / sociosPagina);

  // Control de seguridad por si la página actual excede el total tras filtrar
  if (paginaActual >= paginasTotales && paginasTotales > 0) {
    paginaActual = paginasTotales - 1;
  } else if (paginasTotales === 0) {
    paginaActual = 0;
  }

  // Calcular los índices del corte para la página actual
  let inicio = paginaActual * sociosPagina;
  let fin = inicio + sociosPagina;
  let sociosPaginaActual = sociosFiltrados.slice(inicio, fin);

  // Renderizar filas o mensaje de "sin resultados"
  if (sociosPaginaActual.length === 0) {
    tabla.innerHTML = `<tr><td colspan="6" style="text-align: center;">No se encontraron socios</td></tr>`;
  } else {
    sociosPaginaActual.forEach((value) => {
      let eliminar = /\s([A-Za-zÁ-ÿ])[A-Za-zÁ-ÿ]*/g;

      const apellidos = value.apellidos;
      // En el reemplazo, '$1' mantiene la primera letra capturada y le añade el punto.
      let apellidosAbreviados = apellidos.replace(eliminar, " $1.");

      let arroba = value.email.indexOf("@");
      console.log(arroba);
      let email =
        value.email.charAt(0) +
        value.email.charAt(1) +
        value.email.slice(3, arroba).replace(/./g, "*") +
        value.email.slice(arroba);
      let actividadesHtml = value.actividades
        .map(
          (actividad) =>
            `<span class="badge-actividad">${actividad.toUpperCase()}</span>`,
        )
        .join(" ");

      // Dentro del bucle sociosPaginaActual.forEach de renderizarTabla:

      let iniciales = obtenerIniciales(value.nombre, value.apellidos);

      tabla.innerHTML += `
        <tr>
          <td>
            <div class="socio-id-container">
              <div class="avatar-iniciales">
                ${iniciales}
              </div>
              <span class="id-numero">#${value.id}</span>
            </div>
          </td>
          <td>${value.nombre} ${apellidosAbreviados}</td>
          <td>${email}</td>
          <td><div class="contenedor-actividades">${actividadesHtml}</div></td>
          <td>${calcularEdad(value.fechaNacimiento)} años</td>
          <td>${value.cuota} €</td>
        </tr>
      `;
    });
  }

  // Actualizar el texto del contador
  contadorPaginas.innerHTML =
    paginasTotales === 0 ? "0 / 0" : `${paginaActual + 1} / ${paginasTotales}`;

  // Control de estados de los botones
  botonAnterior.disabled = paginaActual === 0;
  botonSiguiente.disabled =
    paginaActual >= paginasTotales - 1 || paginasTotales === 0;
}

// 2. EVENTOS PARA LOS BOTONES DE PAGINACIÓN
botonAnterior.addEventListener("click", () => {
  if (paginaActual > 0) {
    paginaActual--;
    renderizarTabla();
  }
});

botonSiguiente.addEventListener("click", () => {
  // Recalcular el total de páginas considerando los filtros actuales
  let sociosFiltrados = socios;
  if (textoBusqueda) {
    let q = textoBusqueda
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    sociosFiltrados = sociosFiltrados.filter(
      (s) =>
        s.nombre
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(q) ||
        s.apellidos
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(q) ||
        s.email
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(q),
    );
  }
  if (actividadFiltro) {
    let qF = actividadFiltro
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    sociosFiltrados = sociosFiltrados.filter((s) =>
      s.actividades.some((v) =>
        v
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(qF),
      ),
    );
  }

  let paginasTotales = Math.ceil(sociosFiltrados.length / sociosPagina);

  if (paginaActual < paginasTotales - 1) {
    paginaActual++;
    renderizarTabla();
  }
});

// Helper para la edad
function calcularEdad(fechaNacimiento) {
  return new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();
}

// 3. EVENTO DE BÚSQUEDA EN TIEMPO REAL
buscarSocio.addEventListener("input", function (input) {
  texto = input.target.value.trim().length;
  paginaActual = 0; // Volver a la primera página al buscar
  renderizarTabla();
  if (texto < 2) {
    textoBusqueda = "";
  } else {
    textoBusqueda = input.target.value.trim();
  }
  renderizarTabla();
});

// 4. EVENTO DE FILTRO POR ACTIVIDAD
selectFiltro.addEventListener("change", function (e) {
  const indiceSeleccionado = e.target.value;

  // Si selecciona la opción por defecto (vacía), limpiamos el filtro
  if (indiceSeleccionado === "") {
    actividadFiltro = "";
  } else {
    actividadFiltro = Actividades[indiceSeleccionado];
  }
  console.log(actividadFiltro);
  paginaActual = 0; // Volver a la primera página al filtrar
  renderizarTabla();
});

ordenarFiltro.addEventListener("change", function (e) {
  const indiceSeleccionado = e.target.value;

  // Si selecciona la opción por defecto (vacía), limpiamos el filtro
  if (indiceSeleccionado === "") {
    ordenFiltro = "";
  } else {
    ordenFiltro = indiceSeleccionado;
  }

  paginaActual = 0; // Volver a la primera página al filtrar
  renderizarTabla();
});

// 5. EJECUCIÓN INICIAL
renderizarTabla();

// Helper para obtener las iniciales (ej. "Ana María Gómez Pérez" -> "AM")
function obtenerIniciales(nombre, apellidos) {
  let primNombre = nombre ? nombre.trim().charAt(0) : "";
  let primApellido = apellidos ? apellidos.trim().charAt(0) : "";
  return (primNombre + primApellido).toUpperCase();
}
