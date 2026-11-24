import { campanas, personajes } from './datos.js';

const PREFIJO = 'dnd_';

function clave(coleccion) {
  return `${PREFIJO}${coleccion}`;
}

function guardarColeccion(coleccion, lista) {
  localStorage.setItem(clave(coleccion), JSON.stringify(lista));
}

function inicializarDatos() {
  if (!localStorage.getItem(clave('campanas'))) {
    guardarColeccion('campanas', campanas);
  }
  if (!localStorage.getItem(clave('personajes'))) {
    guardarColeccion('personajes', personajes);
  }
}

inicializarDatos();

export function obtenerTodos(coleccion) {
  const texto = localStorage.getItem(clave(coleccion));
  if (!texto) {
    return [];
  }
  return JSON.parse(texto);
}

export function obtenerPorId(coleccion, id) {
  const lista = obtenerTodos(coleccion);
  return lista.find((item) => item.id === id) || null;
}

export function crear(coleccion, dato) {
  const lista = obtenerTodos(coleccion);
  const nuevoElemento = {
    ...dato,
    id: Date.now()
  };
  lista.push(nuevoElemento);
  guardarColeccion(coleccion, lista);
  return nuevoElemento;
}

export function actualizar(coleccion, id, dato) {
  const lista = obtenerTodos(coleccion);
  const indice = lista.findIndex((item) => item.id === id);
  if (indice === -1) {
    return null;
  }
  lista[indice] = {
    ...lista[indice],
    ...dato,
    id
  };
  guardarColeccion(coleccion, lista);
  return lista[indice];
}

export function borrar(coleccion, id) {
  const lista = obtenerTodos(coleccion);
  const nuevaLista = lista.filter((item) => item.id !== id);
  if (nuevaLista.length === lista.length) {
    return false;
  }
  guardarColeccion(coleccion, nuevaLista);
  return true;
}