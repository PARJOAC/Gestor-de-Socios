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
        document.getElementById("alta-telefono").value.trim() || "";
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

      const checkboxesSeleccionados = document.querySelectorAll(
        '#alta-actividades input[type="checkbox"]:checked',
      );
      const actividades = Array.from(checkboxesSeleccionados).map(
        (cb) => Actividades[cb.value],
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

      const nacimientoFecha = new Date(nacimiento, "dd/mm/yyyy");
      const fecha = new Date();

      const nuevoSocio = {
        id: "SOC-" + String(Socios.length + 1).padStart(4, "0"),
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

      renderizarTabla();
    } catch (e) {
      mostrarToastError("Falta por añadir esta información:<br>" + e.message);
    }
  });
}
