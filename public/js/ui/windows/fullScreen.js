// Importa el aviso que se muestra si falla el cambio de pantalla.
import { mostrarToastError } from "../toast/toast.js";

// Busca el botón que activa o desactiva la pantalla completa.
let btnFullScreen = document.getElementById("btn-fullscreen");

// Cambia el modo de pantalla cuando se pulsa el botón.
btnFullScreen.addEventListener("click", function () {
  // Captura los errores síncronos del cambio de pantalla.
  try {
    // Usa todo el documento como elemento de pantalla completa.
    const elem = document.body;

    // Activa la pantalla completa si aún no está activa.
    if (!document.fullscreenElement) {
      // Solicita al navegador que amplíe el documento.
      elem.requestFullscreen().catch(() => {
        // Comunica que el navegador no pudo activar la pantalla completa.
        mostrarToastError("Ha ocurrido un error al establecer la pantalla completa.");
      });
    } else {
      // Sale del modo de pantalla completa si ya estaba activo.
      document.exitFullscreen();
    }
  } catch (e) {
    // Muestra el error al usuario.
    mostrarToastError(e.message);
  }
});

// Actualiza la cabecera cuando cambia el modo de pantalla.
document.addEventListener("fullscreenchange", function () {
  // Busca la cabecera que se oculta durante la pantalla completa.
  const header = document.getElementById("main-header");

  // Oculta la cabecera en pantalla completa y la restaura al salir.
  if (document.fullscreenElement) {
    header.style.display = "none";
  } else {
    header.style.display = "";
  }
});
