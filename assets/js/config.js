/* ═══════════════════════════════════════════════════════════════════
   CONFIGURACIÓN
   Este es el ÚNICO archivo que necesitas editar para cambiar el
   contenido. Ninguna otra parte del proyecto tiene texto escrito a
   mano: los módulos leen de aquí y pintan la página.

   Es el mismo principio que ya aplicas en Java al separar los datos
   del comportamiento. Si mañana quieres cambiar una razón, no tocas
   ni una línea de lógica.
   ═══════════════════════════════════════════════════════════════════ */

const CONFIG = {

  /* ── Ella y tú ─────────────────────────────────────────────────── */
  nombre: "Dagiana",
  firma:  "Miguel",

  /* ── Fecha en que empezaron ────────────────────────────────────────
     Formato: (año, mes, día, hora, minuto)

     ⚠️  EL MES VA DE 0 A 11.  Enero = 0 ... Diciembre = 11.
     Por eso el 11 de abajo es diciembre, no noviembre.
     Es el error más común con Date en JavaScript.                    */
  inicio: new Date(2025, 11, 15, 20, 30),

  /* ── El sobre cerrado (primera pantalla) ───────────────────────── */
  sobre: {
    remitente:   "De Miguel, para ti",
    instruccion: "Toca el sello"
  },

  /* ── La carta ──────────────────────────────────────────────────────
     Cada elemento del array es un párrafo.                           */
  saludo: "Hola, mi niña hermosa",
  carta: [
    "No sé escribir cosas bonitas en papel, así que hice lo único que sé hacer bien: te escribí una página entera.",
    "Cada línea de código de aquí la puse pensando en ti. Literalmente. Hay partes que reescribí tres veces porque no sonaban a nosotros.",
    "Feliz día, mi vida."
  ],

  /* ── Momentos ──────────────────────────────────────────────────────
     Orden cronológico: el origen primero, lo cotidiano al final.

     `ancho: true` hace que la foto ocupe las dos columnas con
     proporción horizontal. Úsalo en fotos apaisadas o grupales, que
     un recorte vertical destrozaría.                                 */
  momentos: [
    { src: "assets/fotos/1-inicio.jpg",   pie: "El día que todo empezó", ancho: true },
    { src: "assets/fotos/2-risa.jpg",     pie: "Tu risa, la de verdad" },
    { src: "assets/fotos/3-nosotros.jpg", pie: "Nosotros, sin motivo" }
  ],

  /* ── Razones ───────────────────────────────────────────────────────
     Cada tarjeta se voltea al tocarla: `frente` es lo que se ve,
     `reverso` lo que aparece al girarla.                             */
  razones: [
    { frente: "Por cómo hablas",    reverso: "Cuando algo te emociona hablas con una ilusión bastante grande. Podría escucharte así todo el día." },
    { frente: "Por cómo me calmas", reverso: "Llego hecho un desastre y unos minutos contigo el problema ya no era tan grande." },
    { frente: "Por tu terquedad",   reverso: "Cuando decides algo, no hay quien te mueva. Y casi siempre tienes razón" },
    { frente: "Por lo que viene",   reverso: "Porque todavía nos faltan un montón de primeras veces y quiero estar ahí para todas." }
  ],

  /* ── La pregunta del final ─────────────────────────────────────── */
  pregunta: {
    texto:     "¿Me aguantas un año más?",
    si:        "Obvio que sí",
    no:        "No",
    respuesta: "Ya sabía que ibas a decir que sí.",
    cierre:    "Te amo. Ayer, hoy y el resto de mi vida 💖"
  },

  /* ── Música (opcional) ─────────────────────────────────────────────
     Deja "" para desactivarla. Si pones una canción, guárdala en
     assets/ y escribe aquí la ruta, por ejemplo:
       musica: "assets/cancion.mp3"                                   */
  musica: ""
};
