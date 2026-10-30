// 1. Seleccionamos los elementos del DOM
const modal = document.getElementById("modal-alta");
const btnOpen = document.getElementById("btn-open-alta");
const btnClose = document.getElementById("btn-close-alta");

// 2. Abrir el modal al pulsar el botón "Nuevo Socio"
btnOpen.addEventListener("click", () => {
  modal.showModal(); // Método nativo de HTML5 para abrir modales con fondo oscuro
});

// 3. Cerrar el modal al pulsar el botón de la "X"
btnClose.addEventListener("click", () => {
  modal.close();
});

// 4. (Opcional pero recomendado) Cerrar el modal si se hace clic en el fondo oscuro (backdrop)
modal.addEventListener("click", (event) => {
  const rect = modal.getBoundingClientRect();
  const isInDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;
  if (!isInDialog) {
    modal.close();
  }
});
