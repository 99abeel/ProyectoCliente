export function validarUsuario(valor, min, max) {
  const texto = valor.trim();
  if (!texto) {
    return 'El nombre de usuario es obligatorio.';
  }
  if (texto.length < min || texto.length > max) {
    return `Debe tener entre ${min} y ${max} caracteres.`;
  }
  return null;
}

export function validarEmail(valor) {
  const texto = valor.trim();
  if (!texto) {
    return 'El correo electrónico es obligatorio.';
  }
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(texto)) {
    return 'Introduce un correo electrónico válido (ejemplo@correo.com).';
  }
  return null;
}

export function validarContrasena(valor, min = 8) {
  if (!valor) {
    return 'La contraseña es obligatoria.';
  }
  if (valor.length < min) {
    return `La contraseña debe tener al menos ${min} caracteres.`;
  }
  if (!/[A-Z]/.test(valor)) {
    return 'La contraseña debe incluir al menos una letra mayúscula.';
  }
  if (!/\d/.test(valor)) {
    return 'La contraseña debe incluir al menos un número.';
  }
  return null;
}

export function validarRepetirContrasena(valor, contrasenaOriginal) {
  if (!valor) {
    return 'Debes repetir la contraseña.';
  }
  if (valor !== contrasenaOriginal) {
    return 'Las contraseñas no coinciden.';
  }
  return null;
}

export function validarFechaNacimiento(valor, edadMinima = 14) {
  if (!valor) {
    return 'La fecha de nacimiento es obligatoria.';
  }

  const fechaNac = new Date(`${valor}T00:00:00`);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (Number.isNaN(fechaNac.getTime())) {
    return 'La fecha introducida no es válida.';
  }
  if (fechaNac > hoy) {
    return 'La fecha de nacimiento no puede ser futura.';
  }

  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mesDiferencia = hoy.getMonth() - fechaNac.getMonth();
  if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad -= 1;
  }

  if (edad < edadMinima) {
    return `Debes tener al menos ${edadMinima} años para registrarte.`;
  }
  return null;
}

export function validarCondiciones(aceptado) {
  if (!aceptado) {
    return 'Debes aceptar las condiciones de uso.';
  }
  return null;
}

export function validarNombre(valor, min = 2, max = 50) {
  const texto = valor.trim();
  if (!texto) {
    return 'El nombre es obligatorio.';
  }
  if (texto.length < min || texto.length > max) {
    return `Debe tener entre ${min} y ${max} caracteres.`;
  }
  return null;
}

export function validarTelefono(valor, esObligatorio = false) {
  const texto = valor.trim();
  if (!texto) {
    return esObligatorio ? 'El teléfono es obligatorio si prefieres que te llamemos.' : null;
  }

  const soloDigitos = texto.replace(/\s+/g, '');
  const regexTelefono = /^[6789]\d{8}$/;
  if (!regexTelefono.test(soloDigitos)) {
    return 'Introduce un teléfono español válido de 9 dígitos (empezando por 6, 7, 8 o 9).';
  }
  return null;
}

export function validarMotivo(valor) {
  if (!valor) {
    return 'Selecciona un motivo de contacto.';
  }
  return null;
}

export function validarMensaje(valor, min = 10, max = 300) {
  const texto = valor.trim();
  if (!texto) {
    return 'El mensaje es obligatorio.';
  }
  if (texto.length < min || texto.length > max) {
    return `El mensaje debe tener entre ${min} y ${max} caracteres.`;
  }
  return null;
}