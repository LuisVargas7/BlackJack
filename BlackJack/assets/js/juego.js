const juego = (() => {
	'use strict'

	let barajas = [];
	const tipos = ['C','D','H','S'],
	especiales = ['A','J','Q','K'];
	let puntosDeJugador = 0;
	let puntosComputadora = 0;

// REFERENCIAS DEL HTML

const btnPedir = document.querySelector('#btnPedir'),
btnDetener = document.querySelector('#btnDetener'),
puntosHTML = document.querySelectorAll('small'),
divCartasJugador = document.querySelector('#jugador-cartas'),
btnNuevo = document.querySelector('#btnNuevo'),
divCartasComputadora = document.querySelector('#computadora-cartas');

// DESABILTAMOS BOTON DE DETENER

btnDetener.disabled = true;

// ESTA FUNCION ME PERMITE CREAR LA BARAJA

const crearBarajas = () => {

	for (let numeros = 2; numeros<=10; numeros++){
		for (let tipo of tipos){
			barajas.push(`${numeros}${tipo}`);
		}
	}

	for (let tipo of tipos){
		for (let esp of especiales){
			barajas.push(`${esp}${tipo}`)
		}
	}

	// REVOLVER ARRAY
	barajas = _.shuffle(barajas);
}

crearBarajas();

// ESTA FUNCION ME PERMITE TOMAR UNA CARTA
const pedirCarta = () =>{
	if (barajas.length === 0){
		throw 'No hay cartas en el mazo';
	} else {
		const carta = barajas.shift();
		return carta;
	}
}

const valorCarta = (carta) =>{
	let valor = carta.substring(0, carta.length - 1);
	return isNaN (valor) ? (valor === 'A') ? 11 : 10 : valor * 1; 
}

const pedirYCrearCartaJugador = () => {
	const carta = pedirCarta();
	puntosDeJugador = puntosDeJugador + valorCarta(carta);
	puntosHTML[0].innerText = `${puntosDeJugador}`;
	let newCarta = document.createElement('img');
	divCartasJugador.append(newCarta);
	newCarta.src = `assets/cartas/${carta}.png`;
	newCarta.classList.add('carta');
	btnDetener.disabled = false;
}

const pedirYCrearCartaPc = () => {
	const carta = pedirCarta();
	puntosComputadora = puntosComputadora + valorCarta(carta);
	puntosHTML[1].innerText = `${puntosComputadora}`;
	let newCartaPc = document.createElement('img');
	divCartasComputadora.append(newCartaPc);
	newCartaPc.src = `assets/cartas/${carta}.png`;
	newCartaPc.classList.add('carta');
	btnDetener.disabled = true;
	btnPedir.disabled = true;
}

// EVENTOS
// VALIDAR SI EL JUGADOR SE PASA DE LAS 21 CARTAS
btnPedir.addEventListener('click', () => {

	pedirYCrearCartaJugador();

	if (puntosDeJugador > 21){
		btnPedir.disabled = true;
		pedirYCrearCartaPc();
		setTimeout ( () => {   
			alert('Gano la computadora! :(');
		}, 100);
	} 

	else if (puntosDeJugador === 21){
		btnPedir.disabled = true;
	}

	// LOGICA SI LA PERSONA TIENE EL NUMERO 21
	
	else if ( puntosDeJugador == 21 ){

		while (puntosComputadora < 21){
			pedirYCrearCartaPc();
		}
		if (puntosComputadora == 21){
			alert('Quedo empatado el juego!');
		}else{
			alert('Ganaste! :)');
		}
	}

});

	// SI LE DA CLICK A DETENER, LOGICA DE COMPUTADORA 

	btnDetener.addEventListener('click', () => {

		while (puntosComputadora <= puntosDeJugador ){
			pedirYCrearCartaPc();
		}

		setTimeout( () => { 

			if (puntosComputadora == puntosDeJugador){
				alert('Quedo empatado el juego!');
			}
			else if (puntosComputadora > puntosDeJugador && 
				puntosComputadora <= 21){
				alert('Gano la computadora! :(');
		}
		else if (puntosComputadora > puntosDeJugador ) {
			alert('Ganaste! :) ');
		}

	}, 100);

	});

	btnNuevo.addEventListener('click', () => {
		crearBarajas();
		puntosDeJugador = 0;
		puntosComputadora = 0;
		divCartasJugador.innerText = '';
		divCartasComputadora.innerText = '';
		puntosHTML[0].innerText = `${puntosDeJugador}`;
		puntosHTML[1].innerText = `${puntosComputadora}`;
		btnPedir.disabled = false;

	});

})();













