let btnFullScreen = document.getElementById("btn-fullscreen");
let errorGeneral = document.getElementById("error-general");

btnFullScreen.addEventListener("click", function () {
  try {
    const elem = document.getElementById("main");

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        throw new Error(
          "Ha ocurrido un error al establecer la pantalla completa.",
        );
      });
    } else {
      document.exitFullscreen();
    }
    elem.style.backgroundColor = "white";
  } catch (e) {
    mostrarToastError(e.message);
  }
});
