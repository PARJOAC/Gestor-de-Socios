// Define durante cuánto tiempo se muestra cada aviso.
const toastTiempo = 5 * 1000;

/**
 * Crea y muestra un aviso de error durante el tiempo configurado.
 * @param {string} mensaje - Texto que se mostrará en el aviso.
 * @returns {void} No devuelve un valor; añade y programa la retirada del aviso.
 */
function mostrarToastError(mensaje) {
  // Busca el contenedor donde se añaden los avisos.
  const container = document.getElementById("toast-container");
  // No continúa si la página no tiene un contenedor de avisos.
  if (!container) return;

  // Crea el elemento que representará el aviso.
  const toast = document.createElement("div");
  // Asigna las clases de presentación del aviso de error.
  toast.className = "toast toast-error";
  // Añade el icono y el mensaje al aviso.
  toast.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12" y2="17"></line>
  </svg>
  <span class="toast-message">${mensaje}</span>`;

  // Inserta el aviso en el contenedor de la página.
  container.appendChild(toast);

  // Inicia la animación de salida cuando termina el tiempo de lectura.
  setTimeout(() => {
    // Activa la clase que anima la desaparición del aviso.
    toast.classList.add("hiding");
    // Elimina el elemento cuando termina la animación.
    toast.addEventListener("animationend", () => toast.remove());
  }, toastTiempo);
}

// Permite mostrar avisos de error desde otros módulos.
export { mostrarToastError };
