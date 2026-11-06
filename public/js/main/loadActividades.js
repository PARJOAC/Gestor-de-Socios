import { Actividades } from "../constants/actividades.js";

// Obtener los elementos de la tabla para añadir las actividades al filtrado y al modal
let listaActividades = document.getElementById("select-activity-filter");
let altaActividades = document.getElementById("alta-actividades");

// Añadir las actividades al select y al modal
Object.values(Actividades).forEach((value, index) => {
  // Añadir todas las actividades al select del filtro
  listaActividades.innerHTML += `<option value="${index}">${value}</option>`;

  // Añadir todas las actividades al modal de alta, excepto la opción de todas
  if (value === Actividades.TODAS) return;
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
