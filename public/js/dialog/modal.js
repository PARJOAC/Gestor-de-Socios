// Obtener los elementos del modal
const modal = document.getElementById("modal-alta");
const btnOpen = document.getElementById("btn-open-alta");
const btnClose = document.getElementById("btn-close-alta");

// Evento para abrir el modal al hacer clic en el botón
btnOpen.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Evento para cerrar el modal al hacer clic en el botón de cerrar
btnClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Evento para cerrar el modal al hacer clic fuera del contenido del modal
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});
