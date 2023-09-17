cargarPagina();

/*****************************  Estado menu side bar ******************************/

// Obtén todos los elementos li
var elementosLi = document.querySelectorAll(".elementoLi");

// Agrega un controlador de eventos clic a cada elemento li
elementosLi.forEach(function (li) {
  li.addEventListener("click", function () {
    // Desactiva los estilos de todos los elementos li
    elementosLi.forEach(function (item) {
      item.classList.remove("active");
    });

    // Activa los estilos solo para el elemento clicado
    this.classList.add("active");
  });
});

/************** Estado de visibilidad de secciones ************/

// Funcion para mostrar una seccion y ocultar las demas.
function mostrarSeccion(parametro) {
  const secciones = document.getElementsByClassName('seccion');

  for (let i = 0; i < secciones.length; i++) {
    secciones[i].classList.remove('seccion-visible');
  }

  const seccionMostrar = document.getElementById(parametro);
  if (seccionMostrar) {
    seccionMostrar.classList.add('seccion-visible');
  }
}



/************** Funcion cargar modulos al index ******************/

function cargarPagina() {
  var xhrReportes = new XMLHttpRequest();
  var xhrTimeTracker = new XMLHttpRequest();

  var contenedorTimeTracker = document.getElementById('timeTracker');
  var contenedorReportes = document.getElementById('reportes');

  xhrReportes.onreadystatechange = function () {
    if (xhrReportes.readyState == 4 && xhrReportes.status == 200) {
      // Crear un elemento div temporal para contener el HTML recibido
      var divTemporal = document.createElement('div');
      divTemporal.innerHTML = xhrReportes.responseText;

      // Obtener el elemento específico que necesitas
      var elementosReportes = divTemporal.querySelector('#reportes-content');

      // Agregar elementosReportes como hijo del contenedor principal
      contenedorReportes.appendChild(elementosReportes);
    }
  }

  xhrTimeTracker.onreadystatechange = function () {
    if (xhrTimeTracker.readyState == 4 && xhrTimeTracker.status == 200) {
      // Crear un elemento div temporal para contener el HTML recibido
      var divTemporal = document.createElement('div');
      divTemporal.innerHTML = xhrTimeTracker.responseText;

      // Obtener el elemento específico que necesitas
      var elementosTimeTracker = divTemporal.querySelector('#content-timeTracker');

      // Agregar elementosTimeTracker como hijo del contenedor principal
      contenedorTimeTracker.appendChild(elementosTimeTracker);
    }
  }

  xhrTimeTracker.open("GET", "./timeTracker/timeTracker.html", true);
  xhrTimeTracker.send();

  xhrReportes.open("GET", "./reportes/reportes.html", true);
  xhrReportes.send();

}


