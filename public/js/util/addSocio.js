import { mostrarToastError } from "../toast/error.js";
import {
  comprobarNombre,
  comprobarApellidos,
  comprobarDNI,
  comprobarEmail,
  comprobarTelefono,
  comprobarFechaNacimiento,
  comprobarActividades,
  comprobarCuota,
  calculoLetraDNI,
} from "./functions/nuevoSocio.js";
import { Socios } from "../data/socios.js";
import { Actividades } from "../data/actividades.js";
import { renderizarTabla } from "../main/loadTabla.js";
import { recargarEstadisticas } from "./estadisticas.js";

const formulario = document.getElementById("form-alta");
const modal = document.getElementById("modal");

if (formulario) {
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    try {
      let errores = [];

      const nombre = document.getElementById("alta-nombre").value.trim() || "";
      if (!nombre) {
        errores.push({ nombreCampo: "NOMBRE", razon: "Incluir Nombre" });
      } else {
        const testNombre = comprobarNombre(nombre);
        if (!testNombre)
          errores.push({ nombreCampo: "NOMBRE", razon: "Nombre inválido" });
      }

      const apellidos =
        document.getElementById("alta-apellidos").value.trim() || "";
      if (!apellidos) {
        errores.push({ nombreCampo: "APELLIDOS", razon: "Incluir Apellidos" });
      } else {
        const testApellidos = comprobarApellidos(apellidos);
        if (!testApellidos)
          errores.push({
            nombreCampo: "APELLIDOS",
            razon: "Apellidos inválidos",
          });
      }

      const dni = document.getElementById("alta-dni").value.trim() || "";
      const letraDniUsuario = dni.charAt(8).toUpperCase();
      const numeroDni = dni.slice(0, 8);

      if (!dni) {
        errores.push({ nombreCampo: "DNI", razon: "Incluir DNI" });
      } else if (
        Socios.some((socio) => socio.dni.toLowerCase() === dni.toLowerCase())
      ) {
        errores.push({ nombreCampo: "DNI", razon: "DNI ya registrado" });
      } else if (calculoLetraDNI(numeroDni) !== letraDniUsuario) {
        errores.push({ nombreCampo: "DNI", razon: "DNI es incorrecto" });
      } else {
        const testDNI = comprobarDNI(dni);
        if (!testDNI)
          errores.push({ nombreCampo: "DNI", razon: "DNI inválido" });
      }

      const email = document.getElementById("alta-email").value.trim() || "";
      if (!email) {
        errores.push({ nombreCampo: "EMAIL", razon: "Incluir Email" });
      } else if (
        Socios.some(
          (socio) => socio.email.toLowerCase() === email.toLowerCase(),
        )
      ) {
        errores.push({ nombreCampo: "EMAIL", razon: "Email ya registrado" });
      } else {
        const testEmail = comprobarEmail(email);
        if (!testEmail)
          errores.push({ nombreCampo: "EMAIL", razon: "Email inválido" });
      }

      const telefono =
        document
          .getElementById("alta-telefono")
          .value.trim()
          .replaceAll(" ", "") || "";
      console.log(telefono);
      if (!telefono) {
        errores.push({ nombreCampo: "TELÉFONO", razon: "Incluir Teléfono" });
      } else {
        const testTelefono = comprobarTelefono(telefono);
        if (!testTelefono)
          errores.push({ nombreCampo: "TELÉFONO", razon: "Teléfono inválido" });
      }

      const nacimiento =
        document.getElementById("alta-nacimiento").value.trim() || "";
      if (!nacimiento) {
        errores.push({
          nombreCampo: "FECHA DE NACIMIENTO",
          razon: "Incluir Nacimiento",
        });
      } else {
        const testFechaNacimiento = comprobarFechaNacimiento(nacimiento);
        if (!testFechaNacimiento)
          errores.push({
            nombreCampo: "FECHA DE NACIMIENTO",
            razon: "Fecha de nacimiento inválida",
          });
      }

      // 1. Obtenemos las actividades válidas (excluyendo "TODAS")
      const listaActividadesValidas = Object.values(Actividades).filter(
        (act) => act !== Actividades.TODAS,
      );

      // 2. Capturamos los checkboxes seleccionados y obtenemos su nombre real
      const checkboxesSeleccionados = document.querySelectorAll(
        '#alta-actividades input[type="checkbox"]:checked',
      );

      const actividades = Array.from(checkboxesSeleccionados).map(
        (checkbox) => {
          // Si el value del HTML es un índice numérico (0, 1, 2...), lo mapeamos al nombre:
          const indice = Number(checkbox.value);
          if (!isNaN(indice) && listaActividadesValidas[indice]) {
            return listaActividadesValidas[indice];
          }
          // Si el value ya es el texto directamente, lo devolvemos tal cual
          return checkbox.value;
        },
      );

      if (actividades.length === 0) {
        errores.push({
          nombreCampo: "ACTIVIDADES",
          razon: "Incluir Actividades",
        });
      } else if (!comprobarActividades(actividades)) {
        errores.push({
          nombreCampo: "ACTIVIDADES",
          razon: "Actividades inválidas",
        });
      }

      const cuota = document.getElementById("alta-cuota").value.trim() || "";
      if (!cuota) {
        errores.push({ nombreCampo: "CUOTA", razon: "Incluir Cuota" });
      } else {
        const testCuota = comprobarCuota(cuota);
        if (!testCuota)
          errores.push({ nombreCampo: "CUOTA", razon: "Cuota inválida" });
      }

      if (errores.length > 0) {
        let mensaje = "";
        errores.forEach((a) => (mensaje += `${a.nombreCampo}: ${a.razon}<br>`));
        throw new Error(mensaje);
      }

      const nacimientoFecha = new Date(nacimiento);
      const fecha = new Date();

      const nuevoSocio = {
        id:
          "SOC-" +
          String(
            Number(
              Socios.sort((a, b) => b.id.localeCompare(a.id))[0].id.replace(
                "SOC-",
                "",
              ),
            ) + 1,
          ).padStart(4, "0"),
        nombre: nombre,
        apellidos: apellidos,
        dni: dni,
        email: email,
        telefono: telefono,
        fechaNacimiento: `${nacimientoFecha.getFullYear()}-${String(nacimientoFecha.getMonth() + 1).padStart(2, "0")}-${String(nacimientoFecha.getDate()).padStart(2, "0")}`,
        fechaAlta: `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}`,
        actividades: actividades,
        cuota: cuota,
      };

      console.log(nuevoSocio);

      Socios.push(nuevoSocio);

      if (modal) modal.classList.add("hidden");
      formulario.reset();

      Promise.all[(renderizarTabla(), recargarEstadisticas())];
    } catch (e) {
      mostrarToastError("Falta por añadir esta información:<br>" + e.message);
    }
  });
}

const fechaNacimiento = document.getElementById("alta-nacimiento");

fechaNacimiento.addEventListener("input", function (e) {
  // Obtenemos el valor actual y eliminamos todo lo que no sea un número
  let valor = e.target.value.replace(/\D/g, "");
  let formatoFinal = "";

  // Construimos el formato paso a paso de forma limpia
  if (valor.length > 0) formatoFinal += valor.substring(0, 2); // Día (máx 2 dígitos)

  if (valor.length >= 3) formatoFinal += "/" + valor.substring(2, 4); // Mes (máx 2 dígitos)

  if (valor.length >= 5) formatoFinal += "/" + valor.substring(4, 8); // Año (máx 4 dígitos)

  // Actualizamos el valor del input reflejándolo en pantalla
  e.target.value = formatoFinal;
});

const telefono = document.getElementById("alta-telefono");
telefono.addEventListener("input", function (e) {
  // Obtenemos el valor actual y eliminamos todo lo que no sea un número
  let valor = e.target.value.replace(/\D/g, "");
  let formatoFinal = "";

  // Construimos el formato paso a paso de forma limpia
  if (valor.length > 0) formatoFinal += valor.substring(0, 3); // Primer trio Día (máx 3 dígitos)

  if (valor.length >= 4) formatoFinal += " " + valor.substring(3, 6); // Mes (máx 2 dígitos)

  if (valor.length >= 7) formatoFinal += " " + valor.substring(6, 9); // Año (máx 4 dígitos)

  // Actualizamos el valor del input reflejándolo en pantalla
  e.target.value = formatoFinal;
});
