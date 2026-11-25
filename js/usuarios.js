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

export function renderUsuarios(contenedor, usuarios, { onEditar, onBorrar }) {
  contenedor.replaceChildren();

  const cabecera = crearElemento('div', 'cabecera-seccion');
  cabecera.append(
    crearElemento('h1', '', 'Usuarios registrados'),
    crearElemento(
      'p',
      '',
      usuarios.length === 1
        ? 'Hay 1 aventurero registrado en el sistema.'
        : `Hay ${usuarios.length} aventureros registrados en el sistema.`
    )
  );

  if (usuarios.length === 0) {
    const vacio = crearElemento(
      'div',
      'estado-vacio',
      'Todavía no hay usuarios registrados. Crea el primero desde la pestaña Registro.'
    );
    contenedor.append(cabecera, vacio);
    return;
  }

  const grid = crearElemento('section', 'grid-usuarios');

  usuarios.forEach((usuario) => {
    const tarjeta = crearElemento('article', 'card card-usuario');

    const info = crearElemento('div', 'usuario-info');
    info.append(
      crearElemento('h2', '', usuario.usuario),
      crearElemento('p', 'usuario-dato', `Correo: ${usuario.email}`),
      crearElemento('p', 'usuario-dato', `Fecha de nacimiento: ${usuario.fechaNacimiento}`)
    );

    const acciones = crearElemento('div', 'acciones-tarjeta');

    const btnEditar = crearElemento('button', 'btn btn-secundario btn-pequeno', 'Editar');
    btnEditar.type = 'button';
    btnEditar.dataset.accion = 'editar';
    btnEditar.dataset.id = String(usuario.id);

    const btnBorrar = crearElemento('button', 'btn btn-peligro btn-pequeno', 'Borrar');
    btnBorrar.type = 'button';
    btnBorrar.dataset.accion = 'borrar';
    btnBorrar.dataset.id = String(usuario.id);

    acciones.append(btnEditar, btnBorrar);
    tarjeta.append(info, acciones);
    grid.append(tarjeta);
  });

  grid.addEventListener('click', (e) => {
    const boton = e.target.closest('button[data-accion]');
    if (!boton) {
      return;
    }

    const id = Number(boton.dataset.id);
    const { accion } = boton.dataset;

    if (accion === 'editar') {
      onEditar(id);
    } else if (accion === 'borrar') {
      onBorrar(id);
    }
  });

  contenedor.append(cabecera, grid);
}
