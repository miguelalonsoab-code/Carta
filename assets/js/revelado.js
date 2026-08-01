/* ═══════════════════════════════════════════════════════════════════
   REVELADO
   Las secciones aparecen conforme se hace scroll.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Activa el revelado progresivo de las secciones.
 *
 * Se llama al romper el sello, no al cargar la página: si se llamara
 * antes, el observador marcaría como visibles las secciones que están
 * detrás del sobre y el efecto se perdería.
 */
function iniciarRevelado(){
  const bloques = document.querySelectorAll('.revelar');

  // Si el navegador es viejo y no tiene IntersectionObserver, o si la
  // persona pidió menos movimiento, mostramos todo de golpe.
  //
  // Esta salida de emergencia es obligatoria: el estado inicial de
  // .revelar es opacity 0, así que sin ella el contenido quedaría
  // invisible para siempre. Nunca dejamos que un fallo de soporte
  // esconda la carta.
  if (!('IntersectionObserver' in window) || MENOS_MOVIMIENTO){
    bloques.forEach(b => b.classList.add('dentro'));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('dentro');
        // Ya cumplió su función: dejamos de vigilarlo para no gastar
        // trabajo en cada scroll de aquí en adelante
        observador.unobserve(e.target);
      }
    });
  }, { threshold: .15 });   // se activa cuando entra un 15% del bloque

  bloques.forEach(b => observador.observe(b));
}
