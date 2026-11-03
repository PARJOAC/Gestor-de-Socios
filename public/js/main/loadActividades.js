let listaActividades = document.getElementById("select-activity-filter");
let altaActividades = document.getElementById("alta-actividades");
import { Actividades } from "../data/actividades.js";

Object.values(Actividades).forEach((value, index) => {
  listaActividades.innerHTML += `<option value="${index}">${value}</option>`;
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
