# D&D

## Parte 1 · Planificación

### 1. Backlog del Proyecto

Tareas del proyecto divididas por prioridad y ordenadas según el hito en el que se van a desarrollar:

| Prioridad | ID | Funcionalidad | ¿Qué hay que hacer? | Hito |
| :--- | :--- | :--- | :--- | :--- |
| **1 (Alta)** | `US-01` | Estructura base y menú | Montar las carpetas (`css/`, `js/`), configurar ESLint y hacer la barra de navegación con enlaces a todas las vistas. | Hito 1 |
| **2 (Alta)** | `US-02` | Datos iniciales (`datos.js`) | Crear y exportar los arrays de objetos para **Campañas** y **Personajes** (mínimo 10 registros relacionados entre sí). | Hito 1 |
| **3 (Alta)** | `US-03` | Listado de campañas | Pintar dinámicamente en el DOM las tarjetas de las campañas usando los datos de `datos.js`. | Hito 1 |
| **4 (Alta)** | `US-04` | Detalle de campaña | Al hacer clic en una campaña, abrir su ficha con la sinopsis, nivel recomendado, dificultad, estado y personaje asignado. | Hito 1 |

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
