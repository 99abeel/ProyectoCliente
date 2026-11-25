import { crear, actualizar } from './almacen.js';
import {
  validarUsuario,
  validarEmail,
  validarContrasena,
  validarRepetirContrasena,
  validarFechaNacimiento,
  validarCondiciones
} from './validacion.js';

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

function crearCampo({ id, nombre, etiqueta, tipo, atributos = {}, valor = '' }) {
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
  return { grupo, input, error };
}

function crearCampoCheckbox({ id, nombre, etiqueta, marcado = false, obligatorio = true }) {
  const grupo = crearElemento('div', 'campo-formulario campo-checkbox');

  const fila = crearElemento('div', 'checkbox-fila');
  const input = document.createElement('input');
  input.id = id;
  input.name = nombre;
  input.type = 'checkbox';
  input.checked = Boolean(marcado);
  if (obligatorio) {
    input.required = true;
  }
  input.setAttribute('aria-describedby', `error-${id}`);

  const label = crearElemento('label', '', etiqueta);
  label.htmlFor = id;

  fila.append(input, label);

  const error = crearElemento('p', 'mensaje-error');
  error.id = `error-${id}`;
  error.setAttribute('aria-live', 'polite');

  grupo.append(fila, error);
  return { grupo, input, error };
}

export function renderFormularioRegistro(
  contenedor,
  { usuarioAEditar = null, onGuardado = null, onCancelarEdicion = null, mensajeExito = '' } = {}
) {
  contenedor.replaceChildren();

  const esEdicion = Boolean(usuarioAEditar);

  const cabecera = crearElemento('div', 'cabecera-seccion');
  cabecera.append(
    crearElemento('h1', '', esEdicion ? 'Editar usuario' : 'Registro de usuario'),
    crearElemento(
      'p',
      '',
      esEdicion
        ? 'Modifica los datos del usuario. La contraseña es opcional al editar.'
        : 'Crea una cuenta de aventurero para gestionar tus partidas.'
    )
  );

  const avisoExito = crearElemento('div', 'mensaje-exito', mensajeExito);
  avisoExito.setAttribute('role', 'status');
  if (!mensajeExito) {
    avisoExito.hidden = true;
  }

  const formulario = crearElemento('form', 'formulario-panel');
  formulario.noValidate = true;

  const campoUsuario = crearCampo({
    id: 'reg-usuario',
    nombre: 'usuario',
    etiqueta: 'Nombre de usuario',
    tipo: 'text',
    valor: esEdicion ? usuarioAEditar.usuario : '',
    atributos: {
      required: true,
      minlength: 3,
      maxlength: 20,
      autocomplete: 'username'
    }
  });

  const campoEmail = crearCampo({
    id: 'reg-email',
    nombre: 'email',
    etiqueta: 'Correo electrónico',
    tipo: 'email',
    valor: esEdicion ? usuarioAEditar.email : '',
    atributos: {
      required: true,
      autocomplete: 'email'
    }
  });

  const campoContrasena = crearCampo({
    id: 'reg-contrasena',
    nombre: 'contrasena',
    etiqueta: esEdicion ? 'Nueva contraseña (opcional)' : 'Contraseña',
    tipo: 'password',
    atributos: {
      required: !esEdicion,
      minlength: 8,
      autocomplete: 'new-password'
    }
  });

  const campoRepetir = crearCampo({
    id: 'reg-repetir',
    nombre: 'repetirContrasena',
    etiqueta: esEdicion ? 'Repetir nueva contraseña (opcional)' : 'Repetir contraseña',
    tipo: 'password',
    atributos: {
      required: !esEdicion,
      autocomplete: 'new-password'
    }
  });

  const campoFecha = crearCampo({
    id: 'reg-fecha',
    nombre: 'fechaNacimiento',
    etiqueta: 'Fecha de nacimiento',
    tipo: 'date',
    valor: esEdicion ? usuarioAEditar.fechaNacimiento : '',
    atributos: {
      required: true,
      max: obtenerFechaHoyISO()
    }
  });

  const campoCondiciones = crearCampoCheckbox({
    id: 'reg-condiciones',
    nombre: 'condiciones',
    etiqueta: 'Acepto las condiciones de uso de D&D Solo Adventure',
    marcado: esEdicion ? Boolean(usuarioAEditar.condicionesAceptadas) : false,
    obligatorio: true
  });

  const campos = {
    usuario: campoUsuario,
    email: campoEmail,
    contrasena: campoContrasena,
    repetirContrasena: campoRepetir,
    fechaNacimiento: campoFecha,
    condiciones: campoCondiciones
  };

  const ordenCampos = [
    'usuario',
    'email',
    'contrasena',
    'repetirContrasena',
    'fechaNacimiento',
    'condiciones'
  ];

  const tocados = new Set();

  function obtenerError(nombreCampo) {
    if (nombreCampo === 'usuario') {
      const { input } = campoUsuario;
      return validarUsuario(input.value, input.minLength, input.maxLength);
    }

    if (nombreCampo === 'email') {
      return validarEmail(campoEmail.input.value);
    }

    if (nombreCampo === 'contrasena') {
      const { input } = campoContrasena;
      if (esEdicion && !input.value && !campoRepetir.input.value) {
        return null;
      }
      return validarContrasena(input.value, input.minLength);
    }

    if (nombreCampo === 'repetirContrasena') {
      const valorPass = campoContrasena.input.value;
      const valorRepetir = campoRepetir.input.value;
      if (esEdicion && !valorPass && !valorRepetir) {
        return null;
      }
      return validarRepetirContrasena(valorRepetir, valorPass);
    }

    if (nombreCampo === 'fechaNacimiento') {
      return validarFechaNacimiento(campoFecha.input.value, 14);
    }

    if (nombreCampo === 'condiciones') {
      return validarCondiciones(campoCondiciones.input.checked);
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
    const esCheckbox = input.type === 'checkbox';

    input.addEventListener('blur', () => {
      tocados.add(nombreCampo);
      validarCampo(nombreCampo);
    });

    const eventoCambio = esCheckbox ? 'change' : 'input';
    input.addEventListener(eventoCambio, () => {
      if (tocados.has(nombreCampo)) {
        validarCampo(nombreCampo);
      }
      if (nombreCampo === 'contrasena' && tocados.has('repetirContrasena')) {
        validarCampo('repetirContrasena');
      }
      if (nombreCampo === 'repetirContrasena' && esEdicion && tocados.has('contrasena')) {
        validarCampo('contrasena');
      }
    });
  });

  const acciones = crearElemento('div', 'acciones-formulario');
  const btnEnviar = crearElemento(
    'button',
    'btn btn-primario',
    esEdicion ? 'Guardar cambios' : 'Registrar usuario'
  );
  btnEnviar.type = 'submit';
  acciones.append(btnEnviar);

  if (esEdicion) {
    const btnCancelar = crearElemento('button', 'btn btn-secundario', 'Cancelar edición');
    btnCancelar.type = 'button';
    btnCancelar.addEventListener('click', () => {
      if (onCancelarEdicion) {
        onCancelarEdicion();
      } else {
        renderFormularioRegistro(contenedor);
      }
    });
    acciones.append(btnCancelar);
  }

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

    const datosUsuario = {
      usuario: campoUsuario.input.value.trim(),
      email: campoEmail.input.value.trim(),
      fechaNacimiento: campoFecha.input.value,
      condicionesAceptadas: Boolean(campoCondiciones.input.checked)
    };

    let textoExito;
    if (esEdicion) {
      actualizar('usuarios', usuarioAEditar.id, datosUsuario);
      textoExito = `Usuario "${datosUsuario.usuario}" actualizado correctamente.`;
    } else {
      crear('usuarios', datosUsuario);
      textoExito = `Usuario "${datosUsuario.usuario}" registrado correctamente.`;
    }

    if (onGuardado) {
      onGuardado(textoExito);
    } else {
      renderFormularioRegistro(contenedor, { mensajeExito: textoExito });
    }
  });

  formulario.append(
    campoUsuario.grupo,
    campoEmail.grupo,
    campoContrasena.grupo,
    campoRepetir.grupo,
    campoFecha.grupo,
    campoCondiciones.grupo,
    acciones
  );

  contenedor.append(cabecera, avisoExito, formulario);
}
