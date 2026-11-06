// Busca la ventana de alta y los botones que la controlan.
const modal = document.getElementById("modal-alta");
const btnOpen = document.getElementById("btn-open-alta");
const btnClose = document.getElementById("btn-close-alta");

// Muestra el formulario cuando se pulsa el botón de alta.
btnOpen.addEventListener("click", () => {
  // Quita la clase que mantiene oculto el modal.
  modal.classList.remove("hidden");
});

// Oculta el formulario cuando se pulsa el botón de cierre.
btnClose.addEventListener("click", () => {
  // Añade la clase que oculta el modal.
  modal.classList.add("hidden");
});

// Permite cerrar el formulario al pulsar el fondo exterior del modal.
modal.addEventListener("click", (event) => {
  // Cierra el modal solo si el clic fue sobre el fondo y no sobre su contenido.
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});
