window.addEventListener('load', function () {
  /****************** Cronometro **********************/

// Seleccionar los botones.
const botonInicioPausa = document.querySelector('#boton-inicio-pausa');
const botonReiniciar = document.querySelector('#boton-reiniciar');

// Variables para almacenar los segundos, minutos y horas.
let segundos = 0;
let minutos = 0;
let horas = 0;

// Variables para almacenar el intervalo de tiempo que debe transcurrir para actualizar el cronometro y el estado 
let intervaloDeTiempo;
let estadoCronometro = 'pausado'; // Dos estados posibles: 'pausado' o 'andando'.

// Actualizar el cronometro.
function actualizarCronometro() {
  segundos++;

  if (segundos / 60 === 1) {
    segundos = 0;
    minutos++;

    if (minutos / 60 === 1) {
      minutos = 0;
      horas++;
    }
  }

  // Agregar un cero a la izquierda si es necesario.
  const segundosConFormato = asignarFormato(segundos);
  const minutosConFormato = asignarFormato(minutos);
  const horasConFormato = asignarFormato(horas);

  // Actualizar el contenido del cronometro.
  const cronometro = document.getElementById('cronometro');
  cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;
}

// Agregar un cero a la izquierda si se necesita.
function asignarFormato(unidadDeTiempo) {
  return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}

botonInicioPausa.addEventListener('click', function () {
  if (estadoCronometro === 'pausado') {
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
    estadoCronometro = 'andando';
    botonInicioPausa.innerHTML = 'Pausar';
  } else {
    window.clearInterval(intervaloDeTiempo);
    estadoCronometro = 'pausado';
    botonInicioPausa.innerHTML = 'Iniciar';
  }

  if (estadoCronometro === 'andando') {
    intervaloProgressBar = setInterval(() => {
      const progressBar = getProgressBar();
      if (progressValue < progressBar.max) {
        progressValue++;
        progressBar.value = progressValue;

        if ((elementProgressBar === 1 || elementProgressBar === 3 || elementProgressBar === 5 || elementProgressBar === 7) && progressValue === 1500) {
          elementProgressBar += 1;
          progressValue = 0;
        } else if ((elementProgressBar === 2 || elementProgressBar === 4 || elementProgressBar === 6) && progressValue === 300) {
          elementProgressBar += 1;
          progressValue = 0;
        } else if (elementProgressBar === 8 && progressValue === 900) {
          progressValue = 0;
        }
        reproducirAudio(audioElement);
      }
    }, 1000);
  } else {
    window.clearInterval(intervaloProgressBar);
    progressValue = 0;
  }
});

botonReiniciar.addEventListener('click', function () {
  window.clearInterval(intervaloDeTiempo);
  segundos = 0;
  minutos = 0;
  horas = 0;
  document.getElementById('cronometro').innerHTML = '00:00:00';

  // Botones.
  botonInicioPausa.innerHTML = 'iniciar';
  // Estado.
  estadoCronometro = 'pausado';

  // Barra de progreso.
  let elementosProgressBar = document.getElementsByTagName('progress');
  for (let i = 0; i < elementosProgressBar.length; i++) {
    elementosProgressBar[i].value = 0;
  }
  elementProgressBar = 1;
  window.clearInterval(intervaloProgressBar);
});




/****************** Barra de progreso del cronometro **********************/

//Variables para aumentar la barra de progreso
let progressValue = 0; // Valor actual de la barra de progreso
let intervaloProgressBar; // Variable para almacenar el intervalo del cronómetro

let elementProgressBar = 1;

const getProgressBar = function () {
  let elementProgress;
  let tagProgreso = document.getElementById('tagProgress');

  if (elementProgressBar === 1) {
    elementProgress = 'pomodoro1';
    tagProgreso.textContent = 'Pomodoro #1';
  } else if (elementProgressBar === 2) {
    elementProgress = 'break1';
    tagProgreso.textContent = 'Break #1';
  } else if (elementProgressBar === 3) {
    elementProgress = 'pomodoro2';
    tagProgreso.textContent = 'Pomodoro #2';
  } else if (elementProgressBar === 4) {
    elementProgress = 'break2';
    tagProgreso.textContent = 'Break #2';
  } else if (elementProgressBar === 5) {
    elementProgress = 'pomodoro3';
    tagProgreso.textContent = 'pomodoro #3';
  } else if (elementProgressBar === 6) {
    elementProgress = 'break3';
    tagProgreso.textContent = 'Break #3';
  } else if (elementProgressBar === 7) {
    elementProgress = 'pomodoro4';
    tagProgreso.textContent = 'Pomodoro #4';
  } else if (elementProgressBar === 8) {
    elementProgress = 'break4';
    tagProgreso.textContent = 'Long Break';
  }
  const elementosBarProgreso = document.getElementById(elementProgress);
  return elementosBarProgreso;
};

const audioElement = new Audio('../assets/sound/tono.mp3');

function reproducirAudio(audioElement) {
  console.log(elementProgressBar, progressValue);
  if (elementProgressBar === 2 && progressValue === 0) {
    audioElement.play();
  } else if (elementProgressBar === 3 && progressValue === 0) {
    audioElement.play();
  } else if (elementProgressBar === 4 && progressValue === 0) {
    audioElement.play();
  } else if (elementProgressBar === 5 && progressValue === 0) {
    audioElement.play();
  } else if (elementProgressBar === 6 && progressValue === 0) {
    audioElement.play();
  } else if (elementProgressBar === 7 && progressValue === 0) {
    audioElement.play();
  } else if (elementProgressBar === 8 && progressValue === 0) {
    audioElement.play();
  }
}
});


