// Define durante cuánto tiempo se muestra cada aviso.
const toastTiempo = 5 * 1000;

/**
 * Crea y muestra un aviso de éxito durante el tiempo configurado.
 * @param {string} mensaje - Texto que se mostrará en el aviso.
 * @returns {void} No devuelve un valor; añade y programa la retirada del aviso.
 */
function mostrarToastCorrecto(mensaje) {
  // Busca el contenedor donde se añaden los avisos.
  const container = document.getElementById("toast-container");
  // No continúa si la página no tiene un contenedor de avisos.
  if (!container) return;

  // Crea el elemento que representará el aviso.
  const toast = document.createElement("div");
  // Asigna las clases de presentación del aviso de éxito.
  toast.className = "toast toast-correcto";
  // Añade el icono y el mensaje al aviso.
  toast.innerHTML = `
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="currentColor">
      </path>
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

// Permite mostrar avisos de éxito desde otros módulos.
export { mostrarToastCorrecto };
