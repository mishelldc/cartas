import { lista_cartas_nivel } from "./data_cartas.js";
import { Cargar_puntos } from "./puntos.js";
import { vidas, Actualizar_vidas } from "./Actualizar_vidas.js";
import { Cargar_acierto, Reiniciar_aciertos } from "./cargar_acierto.js";
import { iniciarCronometro, detenerCronometro } from './cargar_cronometro.js'; // Importar función para iniciar y detener cronómetro

// Variables globales
let nivelActual = 0;
let todas_las_cartas = [];
let contador_de_cartas = 0;
let cartas_volteadas = [];

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

// Función para manejar el clic en las cartas
function manejarClic(carta) {
    carta.classList.add("activar");

    // Lógica para manejar el volteo de las cartas
    let cartas_activas = document.querySelectorAll(".activar");

    if (cartas_activas.length === 2) {
        let carta_1 = cartas_activas[0].querySelector(".carta_frontal").textContent;
        let carta_2 = cartas_activas[1].querySelector(".carta_frontal").textContent;

        if (carta_1 === carta_2) {
            contador_de_cartas++;
            if (contador_de_cartas === todas_las_cartas.length / 2) {
                Cargar_puntos(vidas.length, nivelActual);
                setTimeout(() => {
                    // Mostrar ventana emergente de "Siguiente nivel" si lo deseas
                    irAlSiguienteNivel();
                }, 1000);
            }
            setTimeout(() => {
                cartas_activas.forEach((carta) => {
                    carta.classList.remove("activar");
                    carta.classList.add("ocultar");
                    carta.innerHTML = ""; // Limpiar el contenido de la carta
                });
                Cargar_acierto(carta_1); // Llamar función para cargar aciertos
            }, 1000);
        } else {
            Actualizar_vidas(false);
            setTimeout(() => {
                cartas_activas.forEach((carta) => {
                    carta.classList.remove("activar");
                });
            }, 1000);
        }
    }
}

// Función para repartir cartas según el nivel
export function repartirCartas(nivel) {
    let tablero = document.querySelector(".tablero");
    tablero.innerHTML = ""; // Limpiar el tablero antes de repartir nuevas cartas

    todas_las_cartas = construir_nivel(nivel);
    todas_las_cartas.forEach((cada_carta) => {
        let carta = document.createElement("div");
        carta.classList.add("carta_trasera");
        carta.innerHTML = `<div class="carta_frontal">${cada_carta}</div>`;
        tablero.appendChild(carta);

        // Evento para manejar el clic en cada carta
        carta.addEventListener("click", () => {
            if (!carta.classList.contains("activar") && cartas_volteadas.length < 2) {
                manejarClic(carta);
            }
        });
    });
}

export function irAlSiguienteNivel() {
    Reiniciar_aciertos();
    nivelActual++;
    if (nivelActual <= lista_cartas_nivel.length) {
        repartirCartas(nivelActual);
        detenerCronometro(); // Detener el cronómetro del nivel anterior
        iniciarCronometro(0, 60); // Iniciar el cronómetro para el nuevo nivel
        contador_de_cartas = 0;
    } else {
        console.log("¡Has completado todos los niveles!");
        // Aquí puedes manejar la finalización del juego si se completan todos los niveles
    }
}