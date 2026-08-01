/* ═══════════════════════════════════════════════════════════════════
   RAZONES
   Tarjetas que se voltean en 3D al tocarlas.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Construye las tarjetas a partir de CONFIG.razones.
 *
 * Cada tarjeta es un <button> con el atributo aria-pressed. Ese
 * atributo hace doble trabajo:
 *   1. Le dice al lector de pantalla si la tarjeta está volteada.
 *   2. Le sirve al CSS como selector para girarla.
 *
 * Un solo estado, una sola fuente de verdad. No hay una variable de
 * JavaScript por un lado y una clase CSS por otro que puedan
 * desincronizarse.
 */
function pintarRazones(){
  const caja = $('#razones');
  if (!caja) return;

  CONFIG.razones.forEach(r => {
    const btn = crear('button', 'razon');
    btn.setAttribute('aria-pressed', 'false');
    btn.type = 'button';   // evita que se comporte como submit si algún día hay un form

    const doble   = crear('div', 'cara-doble');
    const frente  = crear('div', 'cara cara-frente',  r.frente);
    const reverso = crear('div', 'cara cara-reverso', r.reverso);

    doble.append(frente, reverso);
    btn.appendChild(doble);

    btn.addEventListener('click', () => {
      const volteada = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!volteada));
    });

    caja.appendChild(btn);
  });
}
