function Cargar_puntos(corazones_restantes, nivelActual) {
    let div_puntos = document.querySelector(".puntos");
    div_puntos.innerHTML = `☁️ ${corazones_restantes}
        <button onclick="irAlSiguienteNivel(${nivelActual})">Siguiente Nivel</button>
    `;
}
export { Cargar_puntos };