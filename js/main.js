import { obtenerTodos, obtenerPorId } from './almacen.js';
import { renderListado, renderDetalle, renderEnConstruccion } from './ui.js';

const app = document.querySelector('#app');
const enlacesMenu = document.querySelectorAll('[data-vista]');

let vistaActual = 'campanas';

function actualizarMenuActivo(vista) {
  enlacesMenu.forEach((enlace) => {
    if (enlace.classList.contains('navbar-logo')) {
      return;
    }
    enlace.classList.toggle('activo', enlace.dataset.vista === vista);
  });
}

function mostrarListado() {
  const campanas = obtenerTodos('campanas');
  renderListado(app, campanas, mostrarDetalle);
}

function mostrarDetalle(idCampana) {
  const campana = obtenerPorId('campanas', idCampana);
  if (!campana) {
    return;
  }

  const personaje = obtenerPorId('personajes', campana.personajeId);
  renderDetalle(app, campana, personaje, mostrarListado);
}

function navegar(vista) {
  vistaActual = vista;
  actualizarMenuActivo(vistaActual);

  if (vista === 'campanas') {
    mostrarListado();
  } else if (vista === 'registro') {
    renderEnConstruccion(app, 'Registro de usuario', 'Aquí irá el formulario de alta y edición.');
  } else if (vista === 'usuarios') {
    renderEnConstruccion(app, 'Usuarios', 'Aquí aparecerán los usuarios registrados.');
  } else if (vista === 'contacto') {
    renderEnConstruccion(app, 'Contacto', 'Aquí irá el formulario de contacto.');
  } else if (vista === 'mensajes') {
    renderEnConstruccion(app, 'Mensajes enviados', 'Aquí aparecerán los mensajes guardados.');
  }
}

enlacesMenu.forEach((enlace) => {
  enlace.addEventListener('click', (e) => {
    e.preventDefault();
    navegar(enlace.dataset.vista);
  });
});

navegar(vistaActual);