let formulario = document.getElementById("form-alta");

formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que la página se recargue

  const datos = new FormData(formulario);
  const objetoDatos = Object.fromEntries(datos.entries());

  console.log(objetoDatos);
  // Resultado: { nombre: "Ana", correo: "ana@example.com" }
});
