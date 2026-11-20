import { campanas, personajes } from './datos.js';
import { renderListado, renderDetalle } from './ui.js';

const app = document.querySelector('#app');

function mostrarListado() {
  renderListado(app, campanas, mostrarDetalle);
}

function mostrarDetalle(idCampana) {
  const campana = campanas.find((item) => item.id === idCampana);
  if (!campana) {
    return;
  }

  const personaje = personajes.find((p) => p.id === campana.personajeId);
  renderDetalle(app, campana, personaje, mostrarListado);
}

mostrarListado();