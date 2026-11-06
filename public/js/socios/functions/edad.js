function calcularEdad(fechaNacimiento) {
  const [anioNacimiento, mesNacimiento, diaNacimiento] = fechaNacimiento
    .split("-")
    .map(Number);
  const hoy = new Date();
  const aunNoCumpleAnios =
    hoy.getMonth() + 1 < mesNacimiento ||
    (hoy.getMonth() + 1 === mesNacimiento && hoy.getDate() < diaNacimiento);

  return hoy.getFullYear() - anioNacimiento - Number(aunNoCumpleAnios);
}

export { calcularEdad };
