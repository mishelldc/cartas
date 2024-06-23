export function iniciar_cronometro(minutos, segundos) {
    let divCronometro = document.querySelector(".cronometro");
    divCronometro.textContent = `${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;

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

function ocultarModal() {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";
}