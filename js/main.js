let root = document.querySelector("#root");

let componentes = `
    <header id="header"></header>
    <section class="section_aciertos"></section>
    <div class="tablero"></div>
    <footer></footer>
`;

root.innerHTML =  componentes;

function mostrarModal() {
    let root = document.querySelector("#root");

    // Crear elementos para la ventana modal
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    let titulo = document.createElement("h2");
    titulo.textContent = "Bienvenido al Juego de Cartas";
    modalContent.appendChild(titulo);

    let btnIniciarJuego = document.createElement("button");
    btnIniciarJuego.id = "btnIniciarJuego";
    btnIniciarJuego.textContent = "Iniciar Juego";
    btnIniciarJuego.addEventListener("click", () => {
        ocultarModal();
        iniciarJuego(); 
    });
    modalContent.appendChild(btnIniciarJuego);

    modal.appendChild(modalContent);
    root.appendChild(modal);

    modal.style.display = "flex"; 
}


function ocultarModal() {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";
}

// Función para iniciar el juego principal
function iniciarJuego() {
    // Llamar funciones necesarias para iniciar el juego
    iniciarCronometro(); // Llamar función para iniciar el cronómetro
    repartirCartas(); // Llamar función para repartir las cartas (debes definirla en otro archivo)
}

// Función para iniciar el cronómetro
function iniciarCronometro() {
    let minutos = 3;
    let segundos = 0;

    let divCronometro = document.querySelector(".cronometro");
    divCronometro.textContent = `0${minutos}:00`;

    function actualizar() {
        segundos--;

        if (segundos < 0) {
            if (minutos > 0) {
                minutos--;
                segundos = 59;
            } else {
                clearInterval(tiempo);
                mostrarFinDeJuego();
                return;
            }
        }

        divCronometro.textContent = `${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
    }

    let tiempo = setInterval(actualizar, 1000);
}

// Función para mostrar la ventana modal al finalizar el tiempo
function mostrarFinDeJuego() {
    let root = document.querySelector("#root");

    // Crear elementos para la ventana modal
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    let titulo = document.createElement("h2");
    titulo.textContent = "Se agotó el tiempo";
    modalContent.appendChild(titulo);

    let btnCerrar = document.createElement("button");
    btnCerrar.textContent = "Cerrar";
    btnCerrar.addEventListener("click", () => {
        ocultarModal();
    });
    modalContent.appendChild(btnCerrar);

    modal.appendChild(modalContent);
    root.appendChild(modal);

    modal.style.display = "flex"; // Mostrar modal
}

// Evento al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarModal(); // Mostrar modal al cargar la página
});