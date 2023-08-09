/* Cronometro */
// Seleccionar los botones.
const botonInicioPausa = document.querySelector('#boton-inicio-pausa');
const botonReiniciar = document.querySelector('#boton-reiniciar');

// Variables para almacenar los segundos, minutos y horas.
let [segundos, minutos, horas] = [0, 0, 0];

// Variables para almacenar el intervalo de tiempo que debe
// transcurrir para actualizar el cronometro y el estado 
// del cronometro.
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

botonInicioPausa.addEventListener('click', function() {
  if (estadoCronometro === 'pausado') {
    // LLamar a la funcion cronometro cada 1000 milisegundos.
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
    // Si el cronometro esta pausado, se muestra la flecha >
    // y se debe cambiar a || porque va a iniciar.
    botonInicioPausa.classList.remove('iniciar');
    botonInicioPausa.classList.add('pausar');
    botonInicioPausa.innerHTML = 'Pausar';
    // Actualizar el estado del cronometro.
    estadoCronometro = 'andando';
  } else {
    // Detener el cronometro al eliminar el intervalo de tiempo 
    // usado para llamar a la funcion actualizarCronometro().
    window.clearInterval(intervaloDeTiempo);
    // Actualizar los botones y el estado del cronometro.
    botonInicioPausa.classList.remove('pausar');
    botonInicioPausa.classList.add('iniciar');
    botonInicioPausa.innerHTML = 'Iniciar';
    estadoCronometro = 'pausado';
  }
});

// Reiniciar el cronometro eliminando el intervalo de tiempo,
// reiniciando los segundos, minutos y horas, y actualizando
// el estado del cronometro y de los botones.
botonReiniciar.addEventListener('click', function() {
  // Eliminar el intervalo.
  window.clearInterval(intervaloDeTiempo);

  // Segundos, minutos y horas.
  segundos = 0;
  minutos = 0;
  horas = 0;
  document.getElementById('cronometro').innerHTML = '00:00:00';

  // Botones.
  document.getElementById('boton-inicio-pausa').innerHTML = 'pausa';
  botonInicioPausa.classList.remove('pausar');
  botonInicioPausa.classList.add('iniciar');
  botonInicioPausa.innerHTML = 'Play';

  // Estado.
  estadoCronometro = 'pausado';
});

// Barra de progreso del cronometro
let timerInterval; // Variable para almacenar el intervalo del cronómetro
let progressValue = 0; // Valor actual de la barra de progreso
let step = 1;

botonInicioPausa.addEventListener("click", () => {
  // Inicia el cronómetro actualizando la barra de progreso cada 1000 ms (1 segundo)
  timerInterval = setInterval(() => {
    const progressBar = getProgressBar();
    if (progressValue < progressBar.max) {
      progressValue++;
      progressBar.value = progressValue;
      if (progressValue === 1500) {
        step += 1;
      }
    } else {
      clearInterval(timerInterval);
      progressValue = 0;
    }
  }, 1000);
});

const getProgressBar = function () {
  let elementProgress;

  if (step === 1) {
    elementProgress = 'pomodoro1';
  } else if (step === 2) {
    elementProgress = 'break1';
  }
  const elementosBarProgreso = document.getElementById(elementProgress);
  return elementosBarProgreso;
}