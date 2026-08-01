/* ═══════════════════════════════════════════════════════════════════
   GALERÍA
   Pinta las fotos de CONFIG.momentos como polaroids.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Construye la galería a partir de CONFIG.momentos.
 * Cada momento se convierte en un <figure> con imagen y pie de foto.
 */
function pintarMomentos(){
  const caja = $('#momentos');
  if (!caja) return;

  CONFIG.momentos.forEach(m => {
    // La clase `ancho` la define el CSS: dos columnas y proporción 4:3
    const fig = crear('figure', m.ancho ? 'momento ancho' : 'momento');

    const img = document.createElement('img');
    img.src = m.src;
    img.alt = m.pie;

    // No descarga las fotos que todavía no están a la vista.
    // Con tres fotos apenas se nota; con veinte, mucho.
    img.loading = 'lazy';

    // Si el archivo no existe o falla la descarga, ocultamos la imagen
    // rota y dejamos el marco con su pie de foto. Nunca mostramos el
    // icono de imagen partida.
    img.addEventListener('error', () => img.classList.add('falla'));

    const pie = crear('figcaption', null, m.pie);

    fig.append(img, pie);
    caja.appendChild(fig);
  });
}
