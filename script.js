/* Cronometro */
let cronometroElement = document.getElementById('cronometro');
let tiempoInicial = 0;
let intervalo;

function iniciarCronometro() {
  tiempoInicial = Date.now() - (tiempoInicial > 0 ? tiempoInicial : 0);
  intervalo = setInterval(actualizarCronometro, 1000);
}

function detenerCronometro() {
  clearInterval(intervalo);
}

function reiniciarCronometro() {
  clearInterval(intervalo);
  tiempoInicial = 0;
  cronometroElement.innerHTML = '00:00:00';
}

function actualizarCronometro() {
  let tiempoTranscurrido = Date.now() - tiempoInicial;
  let segundos = Math.floor(tiempoTranscurrido / 1000);
  let minutos = Math.floor(segundos / 60);
  let horas = Math.floor(minutos / 60);

  segundos %= 60;
  minutos %= 60;
  horas %= 24;

  segundos = segundos < 10 ? '0' + segundos : segundos;
  minutos = minutos < 10 ? '0' + minutos : minutos;
  horas = horas < 10 ? '0' + horas : horas;

  cronometroElement.innerHTML = horas + ':' + minutos + ':' + segundos;
}