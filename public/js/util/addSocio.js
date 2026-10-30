let formulario = document.getElementById("form-alta");

formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que la página se recargue

  const datos = new FormData(formulario);
  const objetoDatos = Object.fromEntries(datos.entries());

  const nombre = document.getElementById("alta-nombre");
  if(!nombre) throw new Error("Falta el NOMBRE por añadir.");
  const apellidos = document.getElementById("alta-apellidos");
  if(!apellidos) throw new Error ("Faltan los APELLIDOS por añadir.");
  const dni = document.getElementById("alta-dni");
  if(!dni) throw new Error ("Falta el DNI por añadir.");
  const email = document.getElementById("alta-email");
  if(!email) throw new Error ("Falta el EMAIL por añadir.");
  const telefono = document.getElementById("alta-telefono");
  if(!telefono) throw new Error ("Falta el TELÉFONO por añadir.");
  const nacimiento = document.getElementById("alta-nacimiento");
  if(!nacimiento) throw new Error ("Falta la FECHA DE NACIMIENTO por añadir.");
  const actividades = document.getElementById("alta-actividades");
  if(!actividades) throw new Error ("Faltan las ACTIVIDADES por añadir.");
  const cuota = document.getElementById("alta-cuota");
  if(!cuota) throw new Error ("Falta la CUOTA por añadir.");
  socios.push(objetoDatos);
  modal.close();
});
