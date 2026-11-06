import { mostrarToastError } from "../toast/error.js";

let btnFullScreen = document.getElementById("btn-fullscreen");

btnFullScreen.addEventListener("click", function () {
  try {
    const elem = document.body;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        throw new Error(
          "Ha ocurrido un error al establecer la pantalla completa.",
        );
      });
    } else {
      document.exitFullscreen();
    }
  } catch (e) {
    mostrarToastError(e.message);
  }
});

document.addEventListener("fullscreenchange", function () {
  const header = document.getElementById("main-header");

  if (document.fullscreenElement) {
    header.style.display = "none";
  } else {
    header.style.display = "";
  }
});
