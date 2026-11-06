// Importa la lista de actividades que se muestra en los controles.
import { Actividades } from "../_constants/actividades.js";
import { mostrarToastError } from "../ui/toast/error.js";
try {
  // Busca el selector de filtro y el contenedor de actividades del formulario.
  let listaActividades = document.getElementById("select-activity-filter");
  let altaActividades = document.getElementById("alta-actividades");

  // Añade cada actividad a los controles de filtro y de alta.
  Object.values(Actividades).forEach((value, index) => {
    // Agrega la actividad al selector que filtra la tabla.
    listaActividades.innerHTML += `<option value="${index}">${value}</option>`;

    // Omite la opción general porque no es una actividad seleccionable.
    if (value === Actividades.TODAS) return;

    // Crea una casilla para que el socio pueda elegir esta actividad.
    altaActividades.innerHTML += `
  <label class="tag-chip">
                  <input
                    type="checkbox"
                    value="${index}"
                    class="hidden-checkbox"
                  />
                  <span>${value}</span>
                </label>
  `;
  });
} catch {
  mostrarToastError("Error al cargar las actividades.");
}
