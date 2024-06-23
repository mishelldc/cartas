// Inicializa el contenido del encabezado
let header = document.querySelector("#header");

header.innerHTML = `
    <div class="nivel">
        Nivel
        <div class="num-nivel">1</div>
    </div>
    <div class="puntos">☁️ 0</div>

    <div class="vidas"></div>

    <div class="tiempo">
        <span class="material-symbols-outlined ico_time">
            timer
        </span> 
        <span class="cronometro">00:00</span>
    </div>
`;
// Función para cambiar el nivel
function cambiarNivel(nuevoNivel) {
    let numNivel = document.querySelector(".num-nivel");
    numNivel.textContent = nuevoNivel;
}
// Función que simula completar un nivel
function completarNivel() {
    // Aquí va la lógica para verificar si el nivel está completo
    // Por ejemplo, podrías tener una variable que rastree el nivel actual
    let nivelActual = parseInt(document.querySelector(".num-nivel").textContent);
    
    // Llama a cambiarNivel con el siguiente nivel
    cambiarNivel(nivelActual + 1);
}
// Simula completar un nivel después de 3 segundos (solo para demostración)
setTimeout(() => {
    completarNivel();
}, 3000);