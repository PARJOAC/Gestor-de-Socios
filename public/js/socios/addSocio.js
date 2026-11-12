// Importa los avisos que se muestran cuando hay errores.
import { mostrarToastError, mostrarToastCorrecto } from "../ui/toast/toast.js";
// Importa las comprobaciones necesarias para validar el formulario.
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
} from "./functions/comprobacionesNuevoSocio.js";
// Importa los datos actuales para comprobar duplicados y crear el nuevo socio.
import { Socios } from "../_data/socios.js";
// Importa la lista de actividades disponibles.
import { Actividades } from "../_constants/actividades.js";
// Importa la función que actualiza la tabla después del alta.
import { renderizarTabla } from "../_main/loadTabla.js";
// Importa la función que actualiza las estadísticas.
import { recargarEstadisticas } from "./estadisticas.js";
// Importa la función que formatea números de teléfono.
import { formatearTelefono } from "../utils/formatearTelefono.js";

// Busca el formulario y la ventana modal de alta.
const formulario = document.getElementById("form-alta");
const modal = document.getElementById("modal-alta");
// Relaciona cada campo con su mensaje de error.
const camposError = {
  NOMBRE: ["alta-nombre", "error-nombre"],
  APELLIDOS: ["alta-apellidos", "error-apellidos"],
  DNI: ["alta-dni", "error-dni"],
  EMAIL: ["alta-email", "error-email"],
  TELÉFONO: ["alta-telefono", "error-telefono"],
  "FECHA DE NACIMIENTO": ["alta-nacimiento", "error-nacimiento"],
  ACTIVIDADES: ["alta-actividades", "error-actividades"],
  CUOTA: ["alta-cuota", "error-cuota"],
};

/**
 * Quita los estilos y mensajes de error de todos los campos del formulario.
 * No recibe parámetros ni devuelve un valor; deja el formulario sin errores visibles.
 * @returns {void}
 */
function limpiarErrores() {
  // Recorre los pares de identificadores de campo y mensaje.
  Object.values(camposError).forEach(([idCampo, idError]) => {
    // Quita el estilo que marca un campo como incorrecto.
    document.getElementById(idCampo).classList.remove("input-error");
    // Vacía el mensaje de error asociado al campo.
    document.getElementById(idError).textContent = "";
  });
}

// Añade los eventos del formulario solo si existe en la página.
if (formulario) {
  // Borra el error de un campo cuando el usuario vuelve a editarlo.
  formulario.addEventListener("input", (e) => {
    // Busca el campo asociado al elemento que ha cambiado.
    const campo = Object.values(camposError).find(
      ([idCampo]) =>
        idCampo === e.target.id ||
        (idCampo === "alta-actividades" &&
          e.target.closest("#alta-actividades")),
    );
    // Limpia el error si se encontró un campo relacionado.
    if (campo) {
      document.getElementById(campo[0]).classList.remove("input-error");
      document.getElementById(campo[1]).textContent = "";
    }
  });

  // Valida y procesa los datos cuando se envía el formulario.
  formulario.addEventListener("submit", function (e) {
    // Evita que el navegador envíe el formulario y recargue la página.
    e.preventDefault();

    // Captura los errores de validación para mostrarlos juntos.
    try {
      // Quita errores anteriores antes de validar los nuevos valores.
      limpiarErrores();
      let errores = [];

      // Función auxiliar sencilla para comprobar campos básicos sin repetir código
      const validarCampo = (campo, valor, fnCheck, msgInvalido) => {
        if (!valor) {
          errores.push({ nombreCampo: campo, razon: `Incluir ${campo}` });
        } else if (!fnCheck(valor)) {
          errores.push({ nombreCampo: campo, razon: msgInvalido });
        }
      };

      // Lee el nombre y exige que el campo tenga contenido válido.
      const nombre = document.getElementById("alta-nombre").value.trim() || "";
      validarCampo("NOMBRE", nombre, comprobarNombre, "Nombre inválido");

      // Lee los apellidos y exige que el campo tenga contenido válido.
      const apellidos =
        document.getElementById("alta-apellidos").value.trim() || "";
      validarCampo(
        "APELLIDOS",
        apellidos,
        comprobarApellidos,
        "Apellidos inválidos",
      );

      // Lee el DNI en mayúsculas y separa sus cifras y su letra.
      const dni =
        document.getElementById("alta-dni").value.trim().toUpperCase() || "";
      const letraDniUsuario = dni.charAt(8).toUpperCase();
      const numeroDni = dni.slice(0, 8);

      // Comprueba que el DNI exista, sea único y tenga formato y letra correctos.
      if (!dni) {
        errores.push({ nombreCampo: "DNI", razon: "Incluir DNI" });
      } else if (
        Socios.some((socio) => socio.dni.toLowerCase() === dni.toLowerCase())
      ) {
        errores.push({ nombreCampo: "DNI", razon: "DNI ya registrado" });
      } else if (calculoLetraDNI(numeroDni) !== letraDniUsuario) {
        errores.push({ nombreCampo: "DNI", razon: "DNI es incorrecto" });
      } else if (!comprobarDNI(dni)) {
        errores.push({ nombreCampo: "DNI", razon: "DNI inválido" });
      }

      // Lee el correo y comprueba que no esté vacío, repetido y tenga formato válido.
      const email = document.getElementById("alta-email").value.trim() || "";
      if (!email) {
        errores.push({ nombreCampo: "EMAIL", razon: "Incluir Email" });
      } else if (
        Socios.some(
          (socio) => socio.email.toLowerCase() === email.toLowerCase(),
        )
      ) {
        errores.push({ nombreCampo: "EMAIL", razon: "Email ya registrado" });
      } else if (!comprobarEmail(email)) {
        errores.push({ nombreCampo: "EMAIL", razon: "Email inválido" });
      }

      // Lee el teléfono y quita los espacios antes de validarlo.
      const telefono =
        document
          .getElementById("alta-telefono")
          .value.trim()
          .replaceAll(" ", "") || "";
      validarCampo(
        "TELÉFONO",
        telefono,
        comprobarTelefono,
        "Teléfono inválido",
      );

      // Lee la fecha de nacimiento para comprobar que sea válida y cumpla la edad mínima.
      const nacimiento =
        document.getElementById("alta-nacimiento").value.trim() || "";
      validarCampo(
        "FECHA DE NACIMIENTO",
        nacimiento,
        comprobarFechaNacimiento,
        "Fecha de nacimiento inválida",
      );

      // Obtiene las actividades seleccionables y excluye la opción general.
      const listaActividadesValidas = Object.values(Actividades).filter(
        (act) => act !== Actividades.TODAS,
      );

      // Busca las casillas de actividad que están marcadas.
      const checkboxesSeleccionados = document.querySelectorAll(
        '#alta-actividades input[type="checkbox"]:checked',
      );

      // Convierte los valores de las casillas a nombres de actividad.
      const actividades = Array.from(checkboxesSeleccionados).map(
        (checkbox) => {
          // Convierte el valor numérico de la casilla en el nombre correspondiente.
          const indice = Number(checkbox.value);
          if (!isNaN(indice) && listaActividadesValidas[indice]) {
            return listaActividadesValidas[indice];
          }
          // Conserva el valor si ya contiene el nombre de la actividad.
          return checkbox.value;
        },
      );

      // Exige que se seleccione al menos una actividad válida.
      validarCampo(
        "ACTIVIDADES",
        actividades,
        comprobarActividades,
        "Actividades inválidas",
      );

      // Lee y valida la cuota mensual.
      const cuota = document.getElementById("alta-cuota").value.trim() || "";
      validarCampo("CUOTA", cuota, comprobarCuota, "Cuota inválida");

      // Muestra los errores junto a sus campos y detiene el alta.
      if (errores.length > 0) {
        // Marca cada campo y muestra su mensaje correspondiente.
        errores.forEach(({ nombreCampo, razon }) => {
          const [idCampo, idError] = camposError[nombreCampo];
          document.getElementById(idCampo).classList.add("input-error");
          document.getElementById(idError).textContent = razon;
        });
        // Resume los errores en un aviso visible.
        mostrarToastError(
          errores
            .map(({ nombreCampo, razon }) => `${nombreCampo}: ${razon}`)
            .join("<br>"),
        );
        // No crea el socio mientras haya datos inválidos.
        return;
      }

      // Guarda la fecha actual para registrar el momento del alta.
      const fecha = new Date();
      // Separa la fecha de nacimiento para guardarla en formato año-mes-día.
      const [diaNacimiento, mesNacimiento, anioNacimiento] =
        nacimiento.split("/");

      // Crea el siguiente identificador sumando uno al mayor identificador actual.
      const mayorID = Socios.reduce((max, s) => {
        const num = Number(s.id.replace("SOC-", ""));
        return num > max ? num : max;
      }, 0);
      const nuevoID = `SOC-${String(mayorID + 1).padStart(4, "0")}`;

      // Prepara el nuevo socio con los datos validados y normalizados.
      const nuevoSocio = {
        id: nuevoID,
        nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1),
        apellidos: apellidos
          .split(" ")
          .map(
            (apellido) => apellido.charAt(0).toUpperCase() + apellido.slice(1),
          )
          .join(" "),
        dni: dni.toUpperCase(),
        email: email.toLowerCase(),
        telefono: telefono,
        fechaNacimiento: `${anioNacimiento}-${mesNacimiento}-${diaNacimiento}`,
        fechaAlta: `${fecha.toLocaleDateString()}`,
        actividades: actividades,
        cuota: Number(cuota),
      };

      Socios.push(nuevoSocio);

      // Cierra el formulario, reinicia sus campos y limpia sus errores.
      if (modal) modal.classList.add("hidden");
      formulario.reset();
      limpiarErrores();

      // Actualiza la tabla y las estadísticas con el nuevo socio.
      renderizarTabla();
      recargarEstadisticas();
      // Confirma el alta con un aviso de éxito.
      mostrarToastCorrecto(
        `Socio ${nombre.toUpperCase()} dado de alta con id ${nuevoID}`,
      );
    } catch (e) {
      // Muestra cualquier error producido al procesar el alta.
      mostrarToastError("Falta por añadir esta información:<br>" + e.message);
    }
  });
}

// Busca el campo de fecha para aplicar el formato automático.
const fechaNacimiento = document.getElementById("alta-nacimiento");

// Formatea la fecha mientras el usuario escribe en el campo.
fechaNacimiento.addEventListener("input", function (e) {
  // Conserva solo las cifras introducidas.
  let valor = e.target.value.replace(/\D/g, "");
  // Prepara el texto que se mostrará con separadores.
  let formatoFinal = "";

  // Añade el día cuando se ha escrito al menos una cifra.
  if (valor.length > 0) formatoFinal += valor.substring(0, 2);

  // Añade el separador y el mes cuando hay cifras suficientes.
  if (valor.length >= 3) formatoFinal += "/" + valor.substring(2, 4);

  // Añade el separador y el año cuando hay cifras suficientes.
  if (valor.length >= 5) formatoFinal += "/" + valor.substring(4, 8);

  // Muestra el valor con el formato día/mes/año.
  e.target.value = formatoFinal;
});

// Busca el campo de teléfono para aplicar el formato automático.
const telefono = document.getElementById("alta-telefono");
// Agrupa las cifras del teléfono mientras el usuario escribe.
telefono.addEventListener("input", function (e) {
  e.target.value = formatearTelefono(e.target.value);
});
