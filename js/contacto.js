import { crear, guardarUltimoContacto, obtenerUltimoContacto } from './almacen.js';
import {
  validarNombre,
  validarEmail,
  validarTelefono,
  validarMotivo,
  validarMensaje
} from './validacion.js';

const MOTIVOS_CONTACTO = [
  'Reportar un error en una partida',
  'Duda sobre reglas o personajes',
  'Sugerencia de mejora'
];

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

function obtenerFechaHoyISO() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

function crearCampoInput({ id, nombre, etiqueta, tipo, atributos = {}, valor = '' }) {
  const grupo = crearElemento('div', 'campo-formulario');

  const label = crearElemento('label', '', etiqueta);
  label.htmlFor = id;

  const input = document.createElement('input');
  input.id = id;
  input.name = nombre;
  input.type = tipo;
  input.value = valor;
  input.setAttribute('aria-describedby', `error-${id}`);

  Object.entries(atributos).forEach(([clave, val]) => {
    if (val !== undefined && val !== false && val !== null) {
      input.setAttribute(clave, val === true ? '' : String(val));
    }
  });

  const error = crearElemento('p', 'mensaje-error');
  error.id = `error-${id}`;
  error.setAttribute('aria-live', 'polite');

  grupo.append(label, input, error);
  return { grupo, label, input, error };
}

function crearCampoSelect({ id, nombre, etiqueta, opciones }) {
  const grupo = crearElemento('div', 'campo-formulario');

  const label = crearElemento('label', '', etiqueta);
  label.htmlFor = id;

  const select = document.createElement('select');
  select.id = id;
  select.name = nombre;
  select.required = true;
  select.setAttribute('aria-describedby', `error-${id}`);

  const opcionVacia = document.createElement('option');
  opcionVacia.value = '';
  opcionVacia.textContent = 'Selecciona un motivo...';
  select.append(opcionVacia);

  opciones.forEach((textoOpcion) => {
    const opcion = document.createElement('option');
    opcion.value = textoOpcion;
    opcion.textContent = textoOpcion;
    select.append(opcion);
  });

  const error = crearElemento('p', 'mensaje-error');
  error.id = `error-${id}`;
  error.setAttribute('aria-live', 'polite');

  grupo.append(label, select, error);
  return { grupo, input: select, error };
}

function crearCampoTextarea({ id, nombre, etiqueta, atributos = {} }) {
  const grupo = crearElemento('div', 'campo-formulario');

  const label = crearElemento('label', '', etiqueta);
  label.htmlFor = id;

  const textarea = document.createElement('textarea');
  textarea.id = id;
  textarea.name = nombre;
  textarea.rows = 5;
  textarea.setAttribute('aria-describedby', `error-${id}`);

  Object.entries(atributos).forEach(([clave, val]) => {
    if (val !== undefined && val !== false && val !== null) {
      textarea.setAttribute(clave, val === true ? '' : String(val));
    }
  });

  const error = crearElemento('p', 'mensaje-error');
  error.id = `error-${id}`;
  error.setAttribute('aria-live', 'polite');

  grupo.append(label, textarea, error);
  return { grupo, input: textarea, error };
}

function crearCampoCheckbox({ id, nombre, etiqueta }) {
  const grupo = crearElemento('div', 'campo-formulario campo-checkbox');

  const fila = crearElemento('div', 'checkbox-fila');
  const input = document.createElement('input');
  input.id = id;
  input.name = nombre;
  input.type = 'checkbox';

  const label = crearElemento('label', '', etiqueta);
  label.htmlFor = id;

  fila.append(input, label);
  grupo.append(fila);
  return { grupo, input };
}

export function renderFormularioContacto(
  contenedor,
  { mensajeExito = '', recargarRecordados = true } = {}
) {
  contenedor.replaceChildren();

  const ultimoContacto = recargarRecordados ? obtenerUltimoContacto() : null;

  const cabecera = crearElemento('div', 'cabecera-seccion');
  cabecera.append(
    crearElemento('h1', '', 'Contacto'),
    crearElemento(
      'p',
      '',
      '¿Tienes dudas sobre tus campañas o encontraste un fallo? Escríbenos y te responderemos.'
    )
  );

  const avisoExito = crearElemento('div', 'mensaje-exito', mensajeExito);
  avisoExito.setAttribute('role', 'status');
  if (!mensajeExito) {
    avisoExito.hidden = true;
  }

  const formulario = crearElemento('form', 'formulario-panel');
  formulario.noValidate = true;

  const campoNombre = crearCampoInput({
    id: 'con-nombre',
    nombre: 'nombre',
    etiqueta: 'Nombre',
    tipo: 'text',
    valor: ultimoContacto ? ultimoContacto.nombre : '',
    atributos: {
      required: true,
      minlength: 2,
      maxlength: 50,
      autocomplete: 'name'
    }
  });

  const campoEmail = crearCampoInput({
    id: 'con-email',
    nombre: 'email',
    etiqueta: 'Correo electrónico',
    tipo: 'email',
    valor: ultimoContacto ? ultimoContacto.email : '',
    atributos: {
      required: true,
      autocomplete: 'email'
    }
  });

  const campoTelefono = crearCampoInput({
    id: 'con-telefono',
    nombre: 'telefono',
    etiqueta: 'Teléfono (opcional)',
    tipo: 'tel',
    atributos: {
      placeholder: 'Ej: 612345678',
      autocomplete: 'tel'
    }
  });

  const campoLlamada = crearCampoCheckbox({
    id: 'con-llamada',
    nombre: 'prefieroLlamada',
    etiqueta: 'Prefiero que me llaméis'
  });

  const campoMotivo = crearCampoSelect({
    id: 'con-motivo',
    nombre: 'motivo',
    etiqueta: 'Motivo de contacto',
    opciones: MOTIVOS_CONTACTO
  });

  const campoMensaje = crearCampoTextarea({
    id: 'con-mensaje',
    nombre: 'mensaje',
    etiqueta: 'Mensaje',
    atributos: {
      required: true,
      minlength: 10,
      maxlength: 500,
      placeholder: 'Cuéntanos en qué podemos ayudarte (entre 10 y 500 caracteres)...'
    }
  });

  const campos = {
    nombre: campoNombre,
    email: campoEmail,
    telefono: campoTelefono,
    motivo: campoMotivo,
    mensaje: campoMensaje
  };

  const ordenCampos = ['nombre', 'email', 'telefono', 'motivo', 'mensaje'];
  const tocados = new Set();

  function obtenerError(nombreCampo) {
    if (nombreCampo === 'nombre') {
      const { input } = campoNombre;
      return validarNombre(input.value, input.minLength, input.maxLength);
    }

    if (nombreCampo === 'email') {
      return validarEmail(campoEmail.input.value);
    }

    if (nombreCampo === 'telefono') {
      return validarTelefono(campoTelefono.input.value, campoTelefono.input.required);
    }

    if (nombreCampo === 'motivo') {
      return validarMotivo(campoMotivo.input.value);
    }

    if (nombreCampo === 'mensaje') {
      const { input } = campoMensaje;
      return validarMensaje(input.value, input.minLength, input.maxLength);
    }

    return null;
  }

  function mostrarResultadoValidacion(nombreCampo, mensajeError) {
    const { input, error } = campos[nombreCampo];
    if (mensajeError) {
      error.textContent = mensajeError;
      input.setAttribute('aria-invalid', 'true');
      return false;
    }
    error.textContent = '';
    input.setAttribute('aria-invalid', 'false');
    return true;
  }

  function validarCampo(nombreCampo) {
    const mensajeError = obtenerError(nombreCampo);
    return mostrarResultadoValidacion(nombreCampo, mensajeError);
  }

  ordenCampos.forEach((nombreCampo) => {
    const { input } = campos[nombreCampo];
    const esSelect = input.tagName === 'SELECT';

    input.addEventListener('blur', () => {
      tocados.add(nombreCampo);
      validarCampo(nombreCampo);
    });

    const eventoCambio = esSelect ? 'change' : 'input';
    input.addEventListener(eventoCambio, () => {
      if (tocados.has(nombreCampo)) {
        validarCampo(nombreCampo);
      }
    });
  });

  campoLlamada.input.addEventListener('change', () => {
    const esObligatorio = campoLlamada.input.checked;
    campoTelefono.input.required = esObligatorio;
    campoTelefono.label.textContent = esObligatorio ? 'Teléfono (obligatorio)' : 'Teléfono (opcional)';
    if (tocados.has('telefono') || esObligatorio) {
      tocados.add('telefono');
      validarCampo('telefono');
    }
  });

  const acciones = crearElemento('div', 'acciones-formulario');
  const btnEnviar = crearElemento('button', 'btn btn-primario', 'Enviar mensaje');
  btnEnviar.type = 'submit';
  acciones.append(btnEnviar);

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    avisoExito.hidden = true;

    let primerCampoConError = null;

    ordenCampos.forEach((nombreCampo) => {
      tocados.add(nombreCampo);
      const esValido = validarCampo(nombreCampo);
      if (!esValido && !primerCampoConError) {
        primerCampoConError = campos[nombreCampo].input;
      }
    });

    if (primerCampoConError) {
      primerCampoConError.focus();
      return;
    }

    const datosMensaje = {
      nombre: campoNombre.input.value.trim(),
      email: campoEmail.input.value.trim(),
      telefono: campoTelefono.input.value.trim(),
      prefieroLlamada: Boolean(campoLlamada.input.checked),
      motivo: campoMotivo.input.value,
      mensaje: campoMensaje.input.value.trim(),
      fechaEnvio: obtenerFechaHoyISO()
    };

    crear('mensajes', datosMensaje);
    guardarUltimoContacto({
      nombre: datosMensaje.nombre,
      email: datosMensaje.email
    });

    renderFormularioContacto(contenedor, {
      mensajeExito: 'Mensaje enviado y guardado correctamente.',
      recargarRecordados: false
    });
  });

  formulario.append(
    campoNombre.grupo,
    campoEmail.grupo,
    campoTelefono.grupo,
    campoLlamada.grupo,
    campoMotivo.grupo,
    campoMensaje.grupo,
    acciones
  );

  contenedor.append(cabecera, avisoExito, formulario);
}
