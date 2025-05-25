import "./style.css";
import _ from "underscore";
const juego = (() => {
  "use strict";

  let barajas = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];
  let puntosDeJugador = 0;
  let puntosComputadora = 0;

  // REFERENCIAS DEL HTML

  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    puntosHTML = document.querySelectorAll("small"),
    divCartasJugador = document.querySelector("#jugador-cartas"),
    btnNuevo = document.querySelector("#btnNuevo"),
    divCartasComputadora = document.querySelector("#computadora-cartas"),
    alertGanadorPc = document.querySelector(".ganador-pc"),
    alertGanadorJugador = document.querySelector(".ganador-jugador"),
    alertEmpate = document.querySelector(".empate");

  // DESABILTAMOS BOTON DE DETENER

  btnDetener.disabled = true;

  // ESTA FUNCION ME PERMITE CREAR LA BARAJA

  const crearBarajas = () => {
    for (let numeros = 2; numeros <= 10; numeros++) {
      for (let tipo of tipos) {
        barajas.push(`${numeros}${tipo}`);
      }
    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        barajas.push(`${esp}${tipo}`);
      }
    }

    // REVOLVER ARRAY
    barajas = _.shuffle(barajas);
  };

  crearBarajas();

  // ESTA FUNCION ME PERMITE TOMAR UNA CARTA
  const pedirCarta = () => {
    if (barajas.length === 0) {
      throw "No hay cartas en el mazo";
    } else {
      const carta = barajas.shift();
      return carta;
    }
  };

  const valorCarta = (carta) => {
    let valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  const pedirYCrearCartaJugador = async () => {
    const carta = pedirCarta();
    puntosDeJugador = puntosDeJugador + valorCarta(carta);
    puntosHTML[0].innerText = `${puntosDeJugador}`;
    let newCarta = document.createElement("img");
    divCartasJugador.append(newCarta);
    newCarta.src = `assets/cartas/${carta}.png`;
    newCarta.classList.add("carta");

    btnDetener.disabled = false;
  };

  const pedirYCrearCartaPc = async () => {
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = `${puntosComputadora}`;
    let newCartaPc = document.createElement("img");
    divCartasComputadora.append(newCartaPc);
    newCartaPc.src = `assets/cartas/${carta}.png`;
    newCartaPc.classList.add("carta");
    btnDetener.disabled = true;
    btnPedir.disabled = true;
  };

  // EVENTOS
  // VALIDAR SI EL JUGADOR SE PASA DE LAS 21 CARTAS
  btnPedir.addEventListener("click", async () => {
    await pedirYCrearCartaJugador();

    if (puntosDeJugador > 21) {
      btnPedir.disabled = true;
      await pedirYCrearCartaPc();
      alertGanadorPc.classList.remove("d-none");
    } else if (puntosDeJugador === 21) {
      btnPedir.disabled = true;
    }

    // LOGICA SI LA PERSONA TIENE EL NUMERO 21
    else if (puntosDeJugador == 21) {
      while (puntosComputadora < 21) {
        pedirYCrearCartaPc();
      }
      if (puntosComputadora == 21) {
        alertEmpate.classList.remove("d-none");
      } else {
        alertGanadorJugador.classList.remove("d-none");
      }
    }
  });

  // SI LE DA CLICK A DETENER, LOGICA DE COMPUTADORA

  btnDetener.addEventListener("click", () => {
    while (puntosComputadora <= puntosDeJugador) {
      pedirYCrearCartaPc();
    }

    if (puntosComputadora == puntosDeJugador) {
      alertGanadorJugador.classList.remove("d-none");
    } else if (puntosComputadora > puntosDeJugador && puntosComputadora <= 21) {
      alertGanadorPc.classList.remove("d-none");
    } else if (puntosComputadora > puntosDeJugador) {
      alertGanadorJugador.classList.remove("d-none");
    }
  });

  btnNuevo.addEventListener("click", () => {
    crearBarajas();
    puntosDeJugador = 0;
    puntosComputadora = 0;
    divCartasJugador.innerText = "";
    divCartasComputadora.innerText = "";
    puntosHTML[0].innerText = `${puntosDeJugador}`;
    puntosHTML[1].innerText = `${puntosComputadora}`;
    btnPedir.disabled = false;
    alertGanadorPc.classList.add("d-none");
    alertGanadorJugador.classList.add("d-none");
    alertEmpate.classList.add("d-none");
  });
})();
