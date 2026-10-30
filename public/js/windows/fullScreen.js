let btnFullScreen = document.getElementById("btn-fullscreen");
let errorGeneral = document.getElementById("error-general");

btnFullScreen.addEventListener("click", function () {
  const elem = document.getElementById("main");

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      alert("Ha ocurrido un error al poner la pantalla completa.");
    });
  } else {
    document.exitFullscreen();
  }
});
