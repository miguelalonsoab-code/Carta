/* ═══════════════════════════════════════════════════════════════════
   PREGUNTA
   La pregunta del final y el botón "No" que se escapa.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Prepara la pregunta final.
 * Depende de lluviaDeCorazones(), definida en corazones.js. Por eso
 * ese archivo se carga antes que este en el index.html.
 */
function iniciarPregunta(){
  const zona      = $('#botones');
  const btnNo     = $('#btn-no');
  const btnSi     = $('#btn-si');
  const respuesta = $('#respuesta');
  if (!zona || !btnNo || !btnSi) return;

  let escapes = 0;

  /** Mueve el botón "No" a un punto aleatorio dentro de su zona. */
  function huir(){
    escapes++;

    // Al primer escape lo sacamos del flujo normal, para poder moverlo
    // con coordenadas. Antes de eso lo posiciona flexbox.
    if (escapes === 1){
      const r = btnNo.getBoundingClientRect();
      const z = zona.getBoundingClientRect();
      btnNo.style.position = 'absolute';
      btnNo.style.left   = (r.left - z.left) + 'px';
      btnNo.style.top    = (r.top  - z.top)  + 'px';
      btnNo.style.margin = '0';
    }

    // Se mueve al azar, pero SIEMPRE dentro de la caja. Restar el
    // tamaño del botón es lo que evita que se salga por el borde.
    const z    = zona.getBoundingClientRect();
    const maxX = Math.max(0, z.width  - btnNo.offsetWidth);
    const maxY = Math.max(0, z.height - btnNo.offsetHeight);
    btnNo.style.left = (Math.random() * maxX) + 'px';
    btnNo.style.top  = (Math.random() * maxY) + 'px';

    // Se va encogiendo hasta un mínimo: es la broma visual
    const escala = Math.max(.55, 1 - escapes * .08);
    btnNo.style.transform = 'scale(' + escala + ')';

    // Tras seis intentos se rinde y desaparece
    if (escapes >= 6){
      btnNo.style.opacity = '0';
      btnNo.style.pointerEvents = 'none';
    }
  }

  // En escritorio huye antes de que llegue el cursor
  btnNo.addEventListener('mouseenter', huir);

  // En móvil no hay hover. Y en iOS, además, un `touchstart` dispara
  // después un `click` fantasma unos 300 ms más tarde. Sin esta
  // bandera el botón huiría DOS VECES por cada toque: se encogería al
  // doble de velocidad y desaparecería en tres toques en vez de seis.
  let toqueReciente = false;

  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toqueReciente = true;
    setTimeout(() => { toqueReciente = false; }, 400);
    huir();
  }, { passive: false });

  btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    if (!toqueReciente) huir();   // solo si vino de un ratón de verdad
  });

  btnSi.addEventListener('click', () => {
    respuesta.textContent = CONFIG.pregunta.respuesta;
    respuesta.classList.add('mostrar');
    zona.style.display = 'none';
    lluviaDeCorazones(30);
  });
}
