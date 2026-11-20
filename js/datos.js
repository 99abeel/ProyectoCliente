export const personajes = [
  {
    id: 1,
    nombre: 'Thrain Escudo de Roble',
    raza: 'Enano',
    clase: 'Guerrero',
    nivel: 3,
    hp: 32,
    atributos: { fuerza: 16, destreza: 12, constitucion: 16, inteligencia: 10, sabiduria: 13, carisma: 8 }
  },
  {
    id: 2,
    nombre: 'Lyra Susurro Estelar',
    raza: 'Elfo',
    clase: 'Mago',
    nivel: 4,
    hp: 22,
    atributos: { fuerza: 8, destreza: 14, constitucion: 12, inteligencia: 18, sabiduria: 14, carisma: 11 }
  },
  {
    id: 3,
    nombre: 'Kaelen Paso Sombrío',
    raza: 'Mediano',
    clase: 'Pícaro',
    nivel: 3,
    hp: 24,
    atributos: { fuerza: 10, destreza: 17, constitucion: 13, inteligencia: 13, sabiduria: 12, carisma: 14 }
  },
  {
    id: 4,
    nombre: 'Seraphina Luz del Alba',
    raza: 'Humano',
    clase: 'Clérigo',
    nivel: 5,
    hp: 38,
    atributos: { fuerza: 14, destreza: 10, constitucion: 14, inteligencia: 11, sabiduria: 18, carisma: 15 }
  },
  {
    id: 5,
    nombre: 'Malakor Ceniza Roja',
    raza: 'Tiefling',
    clase: 'Brujo',
    nivel: 2,
    hp: 17,
    atributos: { fuerza: 9, destreza: 13, constitucion: 13, inteligencia: 14, sabiduria: 11, carisma: 17 }
  },
  {
    id: 6,
    nombre: 'Bramwell Bosquehondo',
    raza: 'Gnomo',
    clase: 'Druida',
    nivel: 4,
    hp: 29,
    atributos: { fuerza: 10, destreza: 13, constitucion: 14, inteligencia: 15, sabiduria: 17, carisma: 10 }
  },
  {
    id: 7,
    nombre: 'Valeria Hoja de Plata',
    raza: 'Semielfo',
    clase: 'Paladín',
    nivel: 5,
    hp: 44,
    atributos: { fuerza: 17, destreza: 11, constitucion: 15, inteligencia: 10, sabiduria: 12, carisma: 16 }
  },
  {
    id: 8,
    nombre: 'Gorgash Puño de Hierro',
    raza: 'Semiorco',
    clase: 'Bárbaro',
    nivel: 3,
    hp: 39,
    atributos: { fuerza: 18, destreza: 13, constitucion: 16, inteligencia: 8, sabiduria: 11, carisma: 9 }
  },
  {
    id: 9,
    nombre: 'Elowen Canto de Viento',
    raza: 'Elfo',
    clase: 'Explorador',
    nivel: 2,
    hp: 20,
    atributos: { fuerza: 12, destreza: 16, constitucion: 13, inteligencia: 11, sabiduria: 15, carisma: 10 }
  },
  {
    id: 10,
    nombre: 'Dorian Laúd Dorado',
    raza: 'Humano',
    clase: 'Bardo',
    nivel: 4,
    hp: 27,
    atributos: { fuerza: 9, destreza: 15, constitucion: 12, inteligencia: 13, sabiduria: 11, carisma: 18 }
  }
];

export const campanas = [
  {
    id: 101,
    titulo: 'Las Criptas de Oakhaven',
    ambientacion: 'Mazmorra clásica',
    dificultad: 'Fácil',
    nivelRecomendado: '1 - 3',
    duracionEstimada: '45 min',
    estado: 'Activa',
    personajeId: 1,
    sinopsis: 'Los aldeanos de Oakhaven denuncian desapariciones cerca del antiguo cementerio. Desciende a las criptas olvidadas para descubrir qué ha despertado bajo la tierra.',
    ultimaAccion: 'Has forzado la cerradura de la cámara funeraria norte y escuchas pasos metálicos.'
  },
  {
    id: 102,
    titulo: 'El Archivo de la Torre Astral',
    ambientacion: 'Alta fantasía arcana',
    dificultad: 'Media',
    nivelRecomendado: '3 - 5',
    duracionEstimada: '60 min',
    estado: 'Activa',
    personajeId: 2,
    sinopsis: 'Un grimorio prohibido ha desaparecido de la biblioteca flotante de Valenwood. Deberás descifrar los acertijos arcanos antes de que el sello mágico colapse.',
    ultimaAccion: 'Lograste estabilizar el portal del tercer piso usando un pergamino de disipar magia.'
  },
  {
    id: 103,
    titulo: 'Sombras en el Puerto de Neverwinter',
    ambientacion: 'Intriga urbana',
    dificultad: 'Media',
    nivelRecomendado: '2 - 4',
    duracionEstimada: '50 min',
    estado: 'Activa',
    personajeId: 3,
    sinopsis: 'El gremio de ladrones planea un golpe durante la tormenta de medianoche. Infíltrate en los muelles y recupera el manifiesto del barco mercante.',
    ultimaAccion: 'Te ocultas tras unos barriles en el muelle 4 mientras dos guardias patrullan el perímetro.'
  },
  {
    id: 104,
    titulo: 'El Juramento del Templo Caído',
    ambientacion: 'Fantasía oscura',
    dificultad: 'Difícil',
    nivelRecomendado: '4 - 6',
    duracionEstimada: '75 min',
    estado: 'Activa',
    personajeId: 4,
    sinopsis: 'Una plaga maldita asola el valle de Eldoria. Solo purificando el altar central del templo profanado podrá detenerse la corrupción.',
    ultimaAccion: 'Has encendido el primer pebetero sagrado tras derrotar a dos espectros.'
  },
  {
    id: 105,
    titulo: 'Pacto en la Encrucijada',
    ambientacion: 'Misterio sobrenatural',
    dificultad: 'Fácil',
    nivelRecomendado: '1 - 3',
    duracionEstimada: '40 min',
    estado: 'Completada',
    personajeId: 5,
    sinopsis: 'Un misterioso mercader ofrece reliquias de gran poder a cambio de favores aparentemente inofensivos en una posada aislada.',
    ultimaAccion: 'Aventura completada: rompiste el contrato infernal sin perder tu alma.'
  },
  {
    id: 106,
    titulo: 'El Despertar del Bosque Susurrante',
    ambientacion: 'Naturaleza salvaje',
    dificultad: 'Media',
    nivelRecomendado: '3 - 5',
    duracionEstimada: '55 min',
    estado: 'Activa',
    personajeId: 6,
    sinopsis: 'Los espíritus del bosque han enloquecido tras la tala de un árbol milenario. Negocia con las dríadas o enfréntate a los guardianes de raíz.',
    ultimaAccion: 'Sigues el rastro de savia brillante hacia el claro sagrado.'
  },
  {
    id: 107,
    titulo: 'Asedio en la Fortaleza de Hierro',
    ambientacion: 'Guerra y estrategia',
    dificultad: 'Difícil',
    nivelRecomendado: '5 - 7',
    duracionEstimada: '90 min',
    estado: 'Activa',
    personajeId: 7,
    sinopsis: 'Una horda de no-muertos rodea el bastión fronterizo. Organiza la defensa de la muralla y lidera la salida para romper el cerco.',
    ultimaAccion: 'Has reforzado la puerta principal justo antes del impacto del ariete.'
  },
  {
    id: 108,
    titulo: 'La Arena de los Campeones',
    ambientacion: 'Combate táctico',
    dificultad: 'Media',
    nivelRecomendado: '2 - 4',
    duracionEstimada: '45 min',
    estado: 'Completada',
    personajeId: 8,
    sinopsis: 'Sobrevive a tres rondas contra bestias exóticas y gladiadores veteranos en el coliseo subterráneo de Khazad.',
    ultimaAccion: 'Aventura completada: obtuviste el cinturón del campeón y 500 piezas de oro.'
  },
  {
    id: 109,
    titulo: 'Cacería en los Picos Helados',
    ambientacion: 'Supervivencia',
    dificultad: 'Fácil',
    nivelRecomendado: '1 - 3',
    duracionEstimada: '40 min',
    estado: 'Activa',
    personajeId: 9,
    sinopsis: 'Una caravana de suministros ha desaparecido en medio de una ventisca. Rastrea las huellas antes de que caiga la noche.',
    ultimaAccion: 'Encontraste los restos de un trineo junto a huellas de lobo invernal.'
  },
  {
    id: 110,
    titulo: 'La Balada del Rey Silente',
    ambientacion: 'Diplomacia y corte',
    dificultad: 'Media',
    nivelRecomendado: '3 - 5',
    duracionEstimada: '60 min',
    estado: 'Activa',
    personajeId: 10,
    sinopsis: 'Durante el banquete real, el monarca ha perdido la voz por un veneno sutil. Descubre al conspirador entre los nobles invitados.',
    ultimaAccion: 'Acabas de interrogar al consejero real mientras tocas una melodía de distracción.'
  }
];