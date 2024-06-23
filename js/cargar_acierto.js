let lista_aciertos = [];
let contador_aciertos = 0; // Contador de aciertos

let section_aciertos = document.querySelector(".section_aciertos");

section_aciertos.innerHTML = `
    <h3 class="titulo">🏅 Aciertos: </h3>
    <p class="contador">0</p> <!-- Mostrar el contador de aciertos -->
    <ol class="lista"></ol>
`;

function Cargar_acierto(carta) {
    lista_aciertos.push(carta);
    contador_aciertos++; // Incrementar el contador de aciertos

    let lista = document.querySelector(".lista");
    lista.innerHTML = "";

    lista_aciertos.forEach((cada_acierto) => {
        let div = document.createElement("div");
        div.innerHTML = `<span>${cada_acierto}</span>`;
        lista.appendChild(div);
    });

    // Mostrar el contador actualizado
    let contador = document.querySelector(".contador");
    contador.textContent = contador_aciertos;
}

function Reiniciar_aciertos() {
    lista_aciertos = [];
    contador_aciertos = 0;
    let lista = document.querySelector(".lista");
    lista.innerHTML = "";

    // Reiniciar el contador en el HTML
    let contador = document.querySelector(".contador");
    contador.textContent = contador_aciertos;
}

export { Cargar_acierto, Reiniciar_aciertos };
