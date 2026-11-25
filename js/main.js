import { obtenerTodos, obtenerPorId, borrar } from './almacen.js';
import { renderListado, renderDetalle, renderEnConstruccion } from './ui.js';
import { renderFormularioRegistro } from './registro.js';
import { renderUsuarios } from './usuarios.js';

const app = document.querySelector('#app');
const enlacesMenu = document.querySelectorAll('[data-vista]');

let vistaActual = 'campanas';
let usuarioEnEdicion = null;

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
    mostrarRegistro();
  } else if (vista === 'usuarios') {
    mostrarUsuarios();
  } else if (vista === 'contacto') {
    renderEnConstruccion(app, 'Contacto', 'Aquí irá el formulario de contacto.');
  } else if (vista === 'mensajes') {
    renderEnConstruccion(app, 'Mensajes enviados', 'Aquí aparecerán los mensajes guardados.');
  }
}

function mostrarRegistro(mensajeExito = '') {
  renderFormularioRegistro(app, {
    usuarioAEditar: usuarioEnEdicion,
    mensajeExito,
    onGuardado: (textoExito) => {
      usuarioEnEdicion = null;
      mostrarRegistro(textoExito);
    },
    onCancelarEdicion: () => {
      usuarioEnEdicion = null;
      mostrarRegistro();
    }
  });
}

function mostrarUsuarios() {
  const usuarios = obtenerTodos('usuarios');
  renderUsuarios(app, usuarios, {
    onEditar: (id) => {
      const usuario = obtenerPorId('usuarios', id);
      if (!usuario) {
        return;
      }
      usuarioEnEdicion = usuario;
      navegar('registro');
    },
    onBorrar: (id) => {
      const usuario = obtenerPorId('usuarios', id);
      if (!usuario) {
        return;
      }
      const confirmado = confirm(`¿Seguro que quieres borrar al usuario "${usuario.usuario}"?`);
      if (!confirmado) {
        return;
      }
      borrar('usuarios', id);
      if (usuarioEnEdicion && usuarioEnEdicion.id === id) {
        usuarioEnEdicion = null;
      }
      mostrarUsuarios();
    }
  });
}

enlacesMenu.forEach((enlace) => {
  enlace.addEventListener('click', (e) => {
    e.preventDefault();
    if (enlace.dataset.vista === 'registro') {
      usuarioEnEdicion = null;
    }
    navegar(enlace.dataset.vista);
  });
});

navegar(vistaActual);