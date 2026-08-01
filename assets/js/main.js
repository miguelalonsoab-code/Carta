/* ═══════════════════════════════════════════════════════════════════
   MAIN
   El orquestador. No contiene lógica propia: solo decide QUÉ se
   inicializa y CUÁNDO. Toda la lógica vive en los módulos.

   Si algo falla, este es el primer archivo que hay que mirar.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Vuelca los textos de CONFIG en el HTML.
 *
 * Usa textContent y no innerHTML: el contenido entra como texto plano,
 * así que un "<" o un "&" dentro de una razón no rompe la página ni
 * abre la puerta a inyección de marcado.
 */
function pintarTextos(){
  $('#txt-remitente').textContent   = CONFIG.sobre.remitente;
  $('#txt-instruccion').textContent = CONFIG.sobre.instruccion;
  $('#txt-saludo').textContent      = CONFIG.saludo;
  $('#txt-pregunta').textContent    = CONFIG.pregunta.texto;
  $('#btn-si').textContent          = CONFIG.pregunta.si;
  $('#btn-no').textContent          = CONFIG.pregunta.no;
  $('#txt-cierre').textContent      = CONFIG.pregunta.cierre;
  $('#txt-firma').textContent       = '— ' + CONFIG.firma;

  const carta = $('#txt-carta');
  CONFIG.carta.forEach(parrafo => {
    carta.appendChild(crear('p', null, parrafo));
  });
}

/**
 * Lo que ocurre al romper el sello.
 * Es el punto de transición entre la pantalla del sobre y la carta.
 */
function abrirCarta(){
  $('#sello').classList.add('roto');
  $('#sobre').classList.add('abierto');
  $('#contenido').classList.add('visible');

  // La música solo puede arrancar dentro de este gesto del usuario
  intentarReproducir();

  // El revelado se activa AQUÍ y no antes: si se activara al cargar,
  // el observador marcaría como vistas las secciones ocultas tras el
  // sobre y el efecto de aparición se perdería por completo.
  iniciarRevelado();

  lluviaDeCorazones(14);

  // Corazones de fondo, constantes pero discretos
  if (!MENOS_MOVIMIENTO){
    setInterval(crearCorazon, 1400);
  }
}

/**
 * Punto de entrada. Prepara todo lo que puede prepararse antes de que
 * ella toque nada, y deja armado el manejador del sello.
 */
function arranque(){
  pintarTextos();
  pintarMomentos();
  pintarRazones();
  iniciarContador();
  iniciarPregunta();
  prepararAudio();

  // `once: true` desregistra el manejador tras la primera ejecución.
  // El sello solo se rompe una vez.
  $('#sello').addEventListener('click', abrirCarta, { once: true });
}

/* Los scripts llevan `defer`, así que se ejecutan cuando el HTML ya
   está parseado. Aun así escuchamos DOMContentLoaded por seguridad:
   si algún día alguien quita el defer, esto sigue funcionando. */
if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', arranque);
} else {
  arranque();
}
