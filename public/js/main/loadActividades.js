let listaActividades = document.getElementById("select-activity-filter");
let altaActividades = document.getElementById("alta-actividades");

Actividades.forEach((value, index) => {
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
