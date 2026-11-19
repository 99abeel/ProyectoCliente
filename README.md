# D&D 

## Parte 1 · Planificación

### 1. Backlog del Proyecto

Listado de funcionalidades dividido en tareas atómicas y ordenadas por prioridad de desarrollo e integración por hitos:

| Prioridad | ID | Funcionalidad / Historia | Descripción técnica | Hito estimado |
| :--- | :--- | :--- | :--- | :--- |
| **1 (Alta)** | `US-01` | Estructura base y menú de navegación | Configuración de carpetas (`css/`, `js/`), ESLint y barra de navegación con enlaces a todas las vistas. | Hito 1 |
| **2 (Alta)** | `US-02` | Modelo de datos iniciales (`datos.js`) | Definición y exportación de arrays de objetos para **Campañas** y **Personajes** (mínimo 10 registros relacionados). | Hito 1 |
| **3 (Alta)** | `US-03` | Listado principal de campañas | Renderizado dinámico en el DOM de las tarjetas de campañas disponibles a partir de `datos.js`. | Hito 1 |
| **4 (Alta)** | `US-04` | Vista de detalle de campaña | Al pulsar una campaña del listado, mostrar su ficha completa (sinopsis, nivel recomendado, dificultad, estado y personaje asignado). | Hito 1 |
| **5 (Alta)** | `US-05` | Conversión a navegación SPA | Interceptar enlaces del menú para cambiar de vista dinámicamente mediante manipulación del DOM / Hash Routing sin recargar la página. | Hito 2 |
| **6 (Alta)** | `US-06` | Listado y detalle de personajes | Vista para explorar la galería de héroes creados y consultar sus estadísticas (Fuerza, Destreza, Constitución, Inteligencia, Sabiduría, Carisma). | Hito 2 |
| **7 (Media)** | `US-07` | Buscador y filtro de campañas | Filtrado en tiempo real por texto (título) y selector por dificultad (`Fácil`, `Media`, `Difícil`) o estado (`Activa`, `Completada`). | Hito 3 |
| **8 (Media)** | `US-08` | Alta de nuevo personaje con validación | Formulario para crear un personaje (nombre, raza, clase, nivel y atributos) con validación de campos en JS y guardado en memoria/`localStorage`. | Hito 3 |
| **9 (Media)** | `US-09` | Alta de nueva campaña / partida | Formulario para iniciar una nueva aventura vinculando uno de los personajes existentes y persistiendo los datos en `localStorage`. | Hito 4 |
| **10 (Media)** | `US-10` | Sala de juego y simulador de tiradas (D20) | Interfaz de sesión activa con historial narrativo por turnos y lanzador de dados interactivo (`d20`, `d12`, `d8`, `d6`) con cálculo de modificadores. | Hito 4 |
| **11 (Baja)** | `US-11` | Edición y borrado de registros | Opciones para eliminar partidas finalizadas o subir de nivel a un personaje existente desde su ficha de detalle. | Hito 5 |
| **12 (Baja)** | `US-12` | Selector de tema (Modo Claro / Oscuro) | Implementación del cambio dinámico de variables CSS (`light` / `dark`) persistente en `localStorage`. | Hito 5 |

---

### 2. Mapa de Pantallas

La aplicación se estructura en **5 vistas principales** accesibles desde el menú de navegación superior:

1. **Inicio / Dashboard (`index.html` — Vista principal)**
   * **Propósito:** Punto de entrada y vista general de aventuras.
   * **Datos que muestra:** Resumen rápido del estado del jugador y el **listado principal de campañas** (tarjetas con título, ambientación, nivel recomendado, estado de la partida y botón de acceso).

2. **Detalle de Campaña (Vista dinámica / subvista de Inicio)**
   * **Propósito:** Consultar toda la información de una aventura concreta antes o durante su desarrollo.
   * **Datos que muestra:** Título completo, descripción/sinopsis extensa, nivel de dificultad, duración estimada, nombre y clase del personaje vinculado, y registro de últimas acciones.

3. **Mis Personajes (`personajes.html` / Vista Personajes)**
   * **Propósito:** Gestión de la biblioteca de personajes jugables.
   * **Datos que muestra:** Listado de personajes con su avatar/icono de clase, nombre, raza (Elfo, Enano, Humano, Tiefling...), clase (Guerrero, Mago, Pícaro, Clérigo...), nivel actual y puntos de golpe (HP), además de su vista de detalle con los 6 atributos base.

4. **Nueva Aventura / Crear Personaje (`crear.html` / Vista Creación)**
   * **Propósito:** Creación de nuevos registros en el sistema.
   * **Datos que muestra:** Formularios interactivos con validación en tiempo real para dar de alta un nuevo personaje o configurar una nueva campaña asignándole un héroe.

5. **Sala de Juego (`sala.html` / Vista Partida Activa)**
   * **Propósito:** Núcleo interactivo donde transcurre la aventura en solitario.
   * **Datos que muestra:** Panel lateral con el resumen del personaje activo (vida, clase, modificadores), panel central con el registro narrativo de la sesión y barra inferior de acciones con botones de decisión y lanzador de dados virtuales.
