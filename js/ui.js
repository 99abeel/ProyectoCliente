function crearElemento(etiqueta, clase = '', texto = '') {
  const elemento = document.createElement(etiqueta);
  if (clase) {
    elemento.className = clase;
  }
  if (texto) {
    elemento.textContent = texto;
  }
  return elemento;
}

function crearDatoDetalle(titulo, valor) {
  const bloque = document.createElement('div');
  bloque.append(
    crearElemento('strong', '', titulo),
    crearElemento('p', '', valor)
  );
  return bloque;
}

export function renderListado(contenedor, campanas, onVerDetalle) {
  contenedor.replaceChildren();

  const cabecera = crearElemento('div', 'cabecera-seccion');
  cabecera.append(
    crearElemento('h1', '', 'Campañas disponibles'),
    crearElemento('p', '', 'Selecciona una aventura para consultar su ficha completa y el héroe asignado.')
  );

  const grid = crearElemento('section', 'grid-campanas');

  campanas.forEach((campana) => {
    const tarjeta = crearElemento('article', 'card');

    const meta = crearElemento('div', 'card-meta');
    meta.append(
      crearElemento('span', 'badge', campana.dificultad),
      crearElemento('span', 'badge badge-secundario', campana.estado)
    );

    const titulo = crearElemento('h2', '', campana.titulo);

    const boton = crearElemento('button', 'btn btn-primario', 'Ver detalle');
    boton.addEventListener('click', () => {
      onVerDetalle(campana.id);
    });

    tarjeta.append(meta, titulo, boton);
    grid.append(tarjeta);
  });

  contenedor.append(cabecera, grid);
}

export function renderDetalle(contenedor, campana, personaje, onVolver) {
  contenedor.replaceChildren();

  const btnVolver = crearElemento('button', 'btn btn-secundario', '← Volver al listado');
  btnVolver.addEventListener('click', () => {
    onVolver();
  });

  const panel = crearElemento('article', 'detalle-panel');

  const meta = crearElemento('div', 'card-meta');
  meta.append(
    crearElemento('span', 'badge', campana.dificultad),
    crearElemento('span', 'badge badge-secundario', campana.estado),
    crearElemento('span', 'badge', campana.ambientacion)
  );

  const titulo = crearElemento('h1', '', campana.titulo);
  const sinopsis = crearElemento('p', '', campana.sinopsis);

  const textoPersonaje = personaje
    ? `${personaje.nombre} (${personaje.raza} ${personaje.clase} · Nivel ${personaje.nivel})`
    : 'Sin personaje asignado';

  const bloqueDatos = crearElemento('div', 'detalle-datos');
  bloqueDatos.append(
    crearDatoDetalle('Nivel recomendado', campana.nivelRecomendado),
    crearDatoDetalle('Duración estimada', campana.duracionEstimada),
    crearDatoDetalle('Personaje asignado', textoPersonaje)
  );

  const cajaAccion = crearElemento('div', 'caja-accion');
  cajaAccion.append(
    crearElemento('strong', '', 'Última acción registrada:'),
    crearElemento('p', '', campana.ultimaAccion)
  );

  panel.append(meta, titulo, sinopsis, bloqueDatos, cajaAccion);
  contenedor.append(btnVolver, panel);
}

export function renderEnConstruccion(contenedor, titulo, descripcion) {
  contenedor.replaceChildren();

  const cabecera = crearElemento('div', 'cabecera-seccion');
  cabecera.append(
    crearElemento('h1', '', titulo),
    crearElemento('p', '', descripcion)
  );

  contenedor.append(cabecera);
}