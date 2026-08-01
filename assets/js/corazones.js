/* ═══════════════════════════════════════════════════════════════════
   CORAZONES
   Efecto ambiental de fondo. Deliberadamente discreto.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Crea un corazón que sube y se desvanece.
 *
 * Detalle crítico: el corazón SE ELIMINA del DOM cuando termina su
 * animación. Sin ese setTimeout, después de diez minutos con la página
 * abierta habría miles de <span> acumulados y el teléfono se arrastra.
 * Es la fuga de memoria clásica de este tipo de efectos.
 */
function crearCorazon(){
  if (MENOS_MOVIMIENTO) return;

  const capa = $('#corazones');
  if (!capa) return;

  const c = crear('span', 'corazon', '♥');
  c.style.left     = Math.random() * 100 + 'vw';
  c.style.fontSize = (10 + Math.random() * 20) + 'px';

  // Duración aleatoria: si todos tardaran lo mismo, el efecto se vería
  // mecánico y los corazones subirían en formación
  const duracion = 8 + Math.random() * 7;
  c.style.animationDuration = duracion + 's';

  capa.appendChild(c);
  setTimeout(() => c.remove(), duracion * 1000);
}

/**
 * Suelta varios corazones escalonados en el tiempo.
 * @param {number} cantidad - Cuántos corazones lanzar
 */
function lluviaDeCorazones(cantidad){
  for (let i = 0; i < cantidad; i++){
    setTimeout(crearCorazon, i * 90);
  }
}
