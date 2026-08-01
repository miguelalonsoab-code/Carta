/* ═══════════════════════════════════════════════════════════════════
   AUDIO
   Música de fondo opcional. Si CONFIG.musica está vacío, este módulo
   no hace absolutamente nada y el botón nunca aparece.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Instancia de audio compartida. La lee main.js para arrancarla dentro
 * del click del sello.
 * @type {HTMLAudioElement|null}
 */
let audio = null;

/**
 * Prepara el reproductor y su botón flotante.
 *
 * Los navegadores bloquean la reproducción automática. La canción solo
 * puede arrancar dentro de un gesto del usuario, y ese gesto es el
 * click en el sello. Por eso aquí solo se PREPARA: quien la arranca es
 * main.js, dentro del manejador del click.
 */
function prepararAudio(){
  if (!CONFIG.musica) return;

  audio = new Audio(CONFIG.musica);
  audio.loop    = true;
  audio.volume  = .45;
  audio.preload = 'auto';

  // iOS: sin esto puede abrir el reproductor a pantalla completa y
  // tapar la carta justo cuando ella la está leyendo
  audio.setAttribute('playsinline', '');

  const btn = $('#audio-btn');
  btn.classList.add('activo');

  btn.addEventListener('click', () => {
    if (audio.paused){
      audio.play();
      btn.textContent = '♪';
    } else {
      audio.pause();
      btn.textContent = '⏸';
    }
  });
}

/**
 * Intenta reproducir la música. Se llama desde el click del sello.
 *
 * Si el navegador se niega igual, el .catch evita un error sin capturar
 * en consola y deja el botón flotante en pausa, para que ella pueda
 * activarla a mano.
 */
function intentarReproducir(){
  if (!audio) return;

  const intento = audio.play();

  // Los navegadores antiguos no devuelven promesa desde play()
  if (intento && typeof intento.catch === 'function'){
    intento.catch(() => {
      const btn = $('#audio-btn');
      if (btn) btn.textContent = '⏸';
    });
  }
}
