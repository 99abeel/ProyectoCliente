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

export function renderMensajes(contenedor, mensajes, { onBorrar }) {
  contenedor.replaceChildren();

  const cabecera = crearElemento('div', 'cabecera-seccion');
  cabecera.append(
    crearElemento('h1', '', 'Mensajes enviados'),
    crearElemento(
      'p',
      '',
      mensajes.length === 1
        ? 'Has enviado 1 mensaje de contacto.'
        : `Has enviado ${mensajes.length} mensajes de contacto.`
    )
  );

  if (mensajes.length === 0) {
    const vacio = crearElemento(
      'div',
      'estado-vacio',
      'Todavía no has enviado ningún mensaje. Puedes escribirnos desde la pestaña Contacto.'
    );
    contenedor.append(cabecera, vacio);
    return;
  }

  const grid = crearElemento('section', 'grid-mensajes');

  mensajes.forEach((item) => {
    const tarjeta = crearElemento('article', 'card card-mensaje');

    const meta = crearElemento('div', 'card-meta');
    meta.append(
      crearElemento('span', 'badge', item.motivo),
      crearElemento('span', 'badge badge-secundario', item.fechaEnvio)
    );
    if (item.prefieroLlamada) {
      meta.append(crearElemento('span', 'badge badge-llamada', 'Prefiere llamada'));
    }

    const info = crearElemento('div', 'usuario-info');
    info.append(
      crearElemento('h2', '', item.nombre),
      crearElemento('p', 'usuario-dato', `Correo: ${item.email}`)
    );

    if (item.telefono) {
      info.append(crearElemento('p', 'usuario-dato', `Teléfono: ${item.telefono}`));
    }

    const textoMensaje = crearElemento('p', 'mensaje-cuerpo', item.mensaje);

    const acciones = crearElemento('div', 'acciones-tarjeta');
    const btnBorrar = crearElemento('button', 'btn btn-peligro btn-pequeno', 'Borrar');
    btnBorrar.type = 'button';
    btnBorrar.dataset.accion = 'borrar';
    btnBorrar.dataset.id = String(item.id);
    acciones.append(btnBorrar);

    tarjeta.append(meta, info, textoMensaje, acciones);
    grid.append(tarjeta);
  });

  grid.addEventListener('click', (e) => {
    const boton = e.target.closest('button[data-accion]');
    if (!boton) {
      return;
    }

    if (boton.dataset.accion === 'borrar') {
      onBorrar(Number(boton.dataset.id));
    }
  });

  contenedor.append(cabecera, grid);
}
