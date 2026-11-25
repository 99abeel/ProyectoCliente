# D&D

## Parte 1 · Planificación

### 1. Backlog del Proyecto

Tareas del proyecto divididas por prioridad y ordenadas según el hito en el que se van a desarrollar:

| Estado | Prioridad | ID | Funcionalidad | ¿Qué hay que hacer? | Hito |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [x] | **1 (Alta)** | `US-01` | Estructura base y menú | Montar las carpetas (`css/`, `js/`), configurar ESLint y hacer la barra de navegación con enlaces a todas las vistas. | Hito 1 |
| [x] | **2 (Alta)** | `US-02` | Datos iniciales (`datos.js`) | Crear y exportar los arrays de objetos para **Campañas** y **Personajes** (mínimo 10 registros relacionados entre sí). | Hito 1 |
| [x] | **3 (Alta)** | `US-03` | Listado de campañas | Pintar dinámicamente en el DOM las tarjetas de las campañas usando los datos de `datos.js`. | Hito 1 |
| [x] | **4 (Alta)** | `US-04` | Detalle de campaña | Al hacer clic en una campaña, abrir su ficha con la sinopsis, nivel recomendado, dificultad, estado y personaje asignado. | Hito 1 |
| [x] | **5 (Alta)** | `US-05` | Capa de datos y validaciones | Crear `almacen.js` (CRUD en `localStorage`) y `validacion.js` con las funciones de validación reutilizables. | Hito 2 |
| [x] | **6 (Alta)** | `US-06` | Registro y vista «Usuarios» | Formulario de registro con validación en tiempo real, guardado sin contraseña y vista «Usuarios» con edición y borrado. | Hito 2 |
| [x] | **7 (Alta)** | `US-07` | Contacto y vista «Mensajes enviados» | Formulario de contacto adaptado a la app, validación cruzada de teléfono/llamada, recordar último nombre y correo en `localStorage` y vista «Mensajes enviados» con borrado. | Hito 2 |

---

### 2. Mapa de Pantallas

La web tiene **5 vistas principales** a las que se entra desde el menú superior:

1. **Inicio / Dashboard (`index.html`)**
   - **Para qué sirve:** Es la pantalla principal y el resumen general de las aventuras.
   - **Qué se ve:** Un resumen rápido del estado del jugador y el **listado de campañas** (tarjetas con título, ambientación, nivel recomendado, estado y botón para entrar).

2. **Detalle de Campaña (Subvista dentro de Inicio)**
   - **Para qué sirve:** Ver toda la info de una aventura concreta antes o mientras la juegas.
   - **Qué se ve:** Título completo, sinopsis larga, dificultad, duración aproximada, nombre y clase del personaje asignado y el historial de las últimas acciones.

3. **Mis Personajes (`personajes.html`)**
   - **Para qué sirve:** Ver y gestionar tus personajes jugables.
   - **Qué se ve:** Galería con el icono de clase, nombre, raza (Elfo, Enano, Humano, Tiefling...), clase (Guerrero, Mago, Pícaro, Clérigo...), nivel y puntos de vida (HP), más su vista de detalle con los 6 atributos base.

4. **Nueva Aventura / Crear Personaje (`crear.html`)**
   - **Para qué sirve:** Añadir nuevos personajes o partidas al sistema.
   - **Qué se ve:** Formularios con validación en tiempo real para crear un personaje desde cero o montar una campaña nueva asignándole un héroe.

5. **Sala de Juego (`sala.html`)**
   - **Para qué sirve:** Es donde se juega realmente la partida en solitario.
   - **Qué se ve:** Un panel lateral con los datos del personaje activo (vida, clase, modificadores), un panel central con la narración de la partida y una barra abajo con botones de decisión y los dados virtuales.

---

## Hito 2 · Formularios, validación y persistencia en `localStorage`

### 1. Mapa de validación

#### Formulario de registro (`js/registro.js`)

| Campo | Regla | Mensaje de error |
| :--- | :--- | :--- |
| **Nombre de usuario** | Obligatorio. Entre 3 y 20 caracteres (leídos de `minlength` y `maxlength`). | `El nombre de usuario es obligatorio.` / `Debe tener entre 3 y 20 caracteres.` |
| **Correo electrónico** | Obligatorio. Formato válido mediante expresión regular (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`). | `El correo electrónico es obligatorio.` / `Introduce un correo electrónico válido (ejemplo@correo.com).` |
| **Contraseña** | Obligatoria al crear (opcional al editar si se deja vacía). Mínimo 8 caracteres, al menos una mayúscula y un número. | `La contraseña es obligatoria.` / `La contraseña debe tener al menos 8 caracteres.` / `La contraseña debe incluir al menos una letra mayúscula.` / `La contraseña debe incluir al menos un número.` |
| **Repetir contraseña** | Obligatoria si se introduce contraseña. Debe coincidir exactamente con la contraseña. | `Debes repetir la contraseña.` / `Las contraseñas no coinciden.` |
| **Fecha de nacimiento** | Obligatoria. Fecha válida, no puede ser futura y edad mínima de 14 años. | `La fecha de nacimiento es obligatoria.` / `La fecha introducida no es válida.` / `La fecha de nacimiento no puede ser futura.` / `Debes tener al menos 14 años para registrarte.` |
| **Aceptar condiciones** | Casilla obligatoria marcada (`true`). | `Debes aceptar las condiciones de uso.` |

#### Formulario de contacto (`js/contacto.js`)

| Campo | Regla | Mensaje de error |
| :--- | :--- | :--- |
| **Nombre** | Obligatorio. Entre 2 y 50 caracteres (leídos de `minlength` y `maxlength`). | `El nombre es obligatorio.` / `Debe tener entre 2 y 50 caracteres.` |
| **Correo electrónico** | Obligatorio. Formato válido mediante expresión regular (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`). | `El correo electrónico es obligatorio.` / `Introduce un correo electrónico válido (ejemplo@correo.com).` |
| **Teléfono** | Opcional, pero pasa a ser obligatorio si se marca «Prefiero que me llaméis». Si se rellena, debe ser un teléfono español de 9 dígitos empezando por 6, 7, 8 o 9 (`/^[6789]\d{8}$/`). | `El teléfono es obligatorio si prefieres que te llamemos.` / `Introduce un teléfono español válido de 9 dígitos (empezando por 6, 7, 8 o 9).` |
| **Motivo de contacto** | Obligatorio elegir una de las opciones del desplegable. | `Selecciona un motivo de contacto.` |
| **Mensaje** | Obligatorio. Entre 10 y 500 caracteres (leídos de `minlength` y `maxlength`). | `El mensaje es obligatorio.` / `El mensaje debe tener entre 10 y 500 caracteres.` |

### 2. Qué he hecho
- He montado la capa de datos en `js/almacen.js` para centralizar todo el CRUD (`obtenerTodos`, `obtenerPorId`, `crear`, `actualizar`, `borrar`) con `localStorage`, además de guardar y recuperar el último nombre y correo del formulario de contacto.
- He creado `js/validacion.js` con todas las funciones de validación separadas para usarlas en los dos formularios.
- He implementado el **Formulario de registro** (`js/registro.js`) con validación en `blur`, `input` y `submit`, atributos `aria-invalid` y `aria-describedby`, foco automático al primer error y guardado sin la contraseña. El mismo formulario sirve tanto para registrar como para editar un usuario.
- He creado la vista **Usuarios** (`js/usuarios.js`) para listar los usuarios guardados, con botones de **Editar** y **Borrar** (con confirmación `confirm()`) gestionados con delegación de eventos.
- He creado el **Formulario de contacto** (`js/contacto.js`) adaptado a la temática de D&D, con validación cruzada entre la casilla «Prefiero que me llaméis» y el teléfono, y la vista **Mensajes enviados** (`js/mensajes.js`) para ver y borrar los mensajes guardados.
- He conectado todas las vistas en `js/main.js`, añadido los estilos en `css/styles.css` y comprobado que `npx eslint js/` no dé errores.

### 3. Qué falta
- Quedan para los próximos hitos las partes de gestión propia del juego: la galería y detalle de personajes, la creación de personajes/campañas y la sala de juego interactiva con tiradas de dados.

### 4. Qué me ha costado más
- Lo que más me ha costado de este hito ha sido trabajar con `localStorage`, porque nunca lo había usado antes. Al principio me liaba un poco con el tema de que solo guarda texto y hay que pasar los arrays y objetos con `JSON.stringify` al guardar y con `JSON.parse` al leerlos, y también con organizar todo dentro de `almacen.js` para que al crear, editar o borrar un usuario o un mensaje los cambios se quedaran guardados de verdad al recargar la página.
