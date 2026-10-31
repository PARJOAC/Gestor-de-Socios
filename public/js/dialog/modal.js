// 1. Seleccionamos los elementos del DOM
const modal = document.getElementById("modal-alta");
const btnOpen = document.getElementById("btn-open-alta");
const btnClose = document.getElementById("btn-close-alta");

// 2. Abrir el modal al pulsar el botón "Nuevo Socio"
btnOpen.addEventListener("click", () => {
  modal.classList.remove("hidden"); // Muestra el modal eliminando la clase hidden
});

// 3. Cerrar el modal al pulsar el botón de la "X"
btnClose.addEventListener("click", () => {
  modal.classList.add("hidden"); // Oculta el modal añadiendo la clase hidden
});

// 4. Cerrar el modal si se hace clic en el fondo oscuro (backdrop)
modal.addEventListener("click", (event) => {
  // Comprobamos si el clic se hizo directamente en el fondo oscuro (fuera de la tarjeta)
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});
