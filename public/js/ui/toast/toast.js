import config from "../../../../config.json" with { type: "json" };

/**
 * Crea y muestra un aviso durante el tiempo configurado.
 * @param {string} mensaje - Texto que se mostrará en el aviso.
 * @param {"correcto"|"error"} tipo - Tipo de aviso que determina el estilo e icono.
 * @returns {void} No devuelve un valor; añade y programa la retirada del aviso.
 */
function mostrarToast(mensaje, tipo) {
  // Busca el contenedor donde se añaden los avisos.
  const container = document.getElementById("toast-container");
  // No continúa si la página no tiene un contenedor de avisos.
  if (!container) return;

  // Crea el elemento que representará el aviso.
  const toast = document.createElement("div");
  // Asigna las clases de presentación según el tipo de aviso.
  toast.className = `toast toast-${tipo}`;
  // Añade el icono y el mensaje al aviso.
  toast.innerHTML = `${config.toast.tipos[tipo].replace("{MENSAJE}", mensaje)}`;

  // Inserta el aviso en el contenedor de la página.
  container.appendChild(toast);

  // Inicia la animación de salida cuando termina el tiempo de lectura.
  setTimeout(() => {
    // Activa la clase que anima la desaparición del aviso.
    toast.classList.add("hiding");
    // Elimina el elemento cuando termina la animación.
    toast.addEventListener("animationend", () => toast.remove());
  }, config.toast.tiempo * 1000);
}

/**
 * Crea y muestra un aviso de éxito durante el tiempo configurado.
 * @param {string} mensaje - Texto que se mostrará en el aviso.
 * @returns {void}
 */
function mostrarToastCorrecto(mensaje) {
  mostrarToast(mensaje, "correcto");
}

/**
 * Crea y muestra un aviso de error durante el tiempo configurado.
 * @param {string} mensaje - Texto que se mostrará en el aviso.
 * @returns {void}
 */
function mostrarToastError(mensaje) {
  mostrarToast(mensaje, "error");
}

// Permite mostrar avisos desde otros módulos.
export { mostrarToastCorrecto, mostrarToastError };
