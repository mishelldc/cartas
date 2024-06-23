import { lista_cartas_nivel } from "./data_cartas.js";
import { Cargar_puntos } from "./puntos.js";
import { vidas, Actualizar_vidas } from "./Actualizar_vidas.js";
import { Cargar_acierto,Reiniciar_aciertos } from "./cargar_acierto.js";

// Variables globales
let nivelActual = 0;
let todas_las_cartas = [];
let contador_de_cartas = 0;
let estado_del_cronometro = 0;

// Construcción del nivel
function construir_nivel(nivel) {
    function ordenarAleatorio(a, b) {
        return Math.random() - 0.5;
    }

    let todas_las_tarjetas = lista_cartas_nivel[nivel].concat(lista_cartas_nivel[nivel]);

    // Organizar de forma aleatoria la lista todas_las_cartas
    todas_las_tarjetas.sort(ordenarAleatorio);

    return todas_las_tarjetas;
}

// Función para repartir cartas según el nivel
function repartir_cartas(nivel) {
    let tablero = document.querySelector(".tablero");
    tablero.innerHTML = ""; // Limpiar el tablero antes de repartir nuevas cartas

    todas_las_cartas = construir_nivel(nivel);
    todas_las_cartas.forEach((cada_carta) => {
        let carta = document.createElement("div");
        carta.classList.add("carta_trasera");
        carta.innerHTML = `<div class="carta_frontal">${cada_carta}</div>`;
        tablero.appendChild(carta);
    });

    // Evento para manejar el click en cada carta
    let todas_las_cartas_div = document.querySelectorAll(".carta_trasera");
    todas_las_cartas_div.forEach((cada_div) => {
        cada_div.addEventListener("click", () => {
            estado_del_cronometro++;
            if (estado_del_cronometro === 1) {
                iniciar_cronometro(0, 60); // Iniciar cronómetro al primer clic
            }

            // Lógica para manejar el volteo de las cartas
            let cartas_descubiertas = document.querySelectorAll(".activar");

            if (cartas_descubiertas.length < 2) {
                cada_div.classList.add("activar");
                cartas_descubiertas = document.querySelectorAll(".activar");

                if (cartas_descubiertas.length === 2) {
                    let carta_1 = cartas_descubiertas[0].querySelector(".carta_frontal").textContent;
                    let carta_2 = cartas_descubiertas[1].querySelector(".carta_frontal").textContent;

                    if (carta_1 === carta_2) {
                        contador_de_cartas++;
                        if (contador_de_cartas === todas_las_cartas.length / 2) {
                            Cargar_puntos(vidas.length, nivelActual);
                            // Aquí puedes mostrar una ventana emergente de "Siguiente nivel" si lo deseas
                        }
                        setTimeout(() => {
                            cartas_descubiertas.forEach((carta) => {
                                carta.classList.remove("activar");
                                carta.classList.add("ocultar");
                                carta.innerHTML = ""; // Limpiar el contenido de la carta
                            });
                            Cargar_acierto(carta_1); // Llamar función para cargar aciertos
                        }, 1000);
                    } else {
                        Actualizar_vidas(false);
                        setTimeout(() => {
                            cartas_descubiertas.forEach((carta) => {
                                carta.classList.remove("activar");
                            });
                        }, 1000);
                    }
                }
            }
        });
    });
}

// Función para iniciar el juego
function iniciarJuego() {
    repartir_cartas(nivelActual);
}

// Evento cuando se carga la página
window.onload = () => {
    iniciarJuego(); // Iniciar el juego al cargar la página
};

// Función para avanzar al siguiente nivel
function irAlSiguienteNivel() {
        // Reiniciar aciertos
        Reiniciar_aciertos();
    nivelActual++;
    if (nivelActual < lista_cartas_nivel.length) {
        repartir_cartas(nivelActual);
        iniciar_cronometro(0, 60); // Reiniciar el cronómetro para el nuevo nivel
        Cargar_puntos(vidas.length, nivelActual);
        contador_de_cartas = 0; // Reiniciar el contador de cartas acertadas
    } else {
        console.log("¡Has completado todos los niveles!");
        // Aquí puedes manejar la finalización del juego si se completan todos los niveles
    }
}

// Exportar función para el siguiente nivel (opcional)
window.irAlSiguienteNivel = irAlSiguienteNivel;