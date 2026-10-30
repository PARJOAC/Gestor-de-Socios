let tabla = document.getElementById("tbody-socios");

socios.forEach((value, index) => {
  tabla.innerHTML += `
    <tr>
                <th>${value.id}</th>
                <th>${value.nombre}</th>
                <th>${value.email}</th>
                <th>${value.actividades.join(", ")}</th>
                <th>${calcularEdad(value.fechaNacimiento)}</th>
                <th>${value.cuota} €</th>
              </tr>
    `;
});

function calcularEdad(fechaNacimiento) {
  return new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();
}
