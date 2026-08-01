/* ═══════════════════════════════════════════════════════════════════
   UTILIDADES
   Ayudantes que usan varios módulos. Se carga justo después de
   config.js, antes que cualquier otra cosa.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Atajo para document.querySelector.
 * @param {string} sel - Selector CSS, por ejemplo '#contador'
 * @returns {Element|null}
 */
function $(sel){
  return document.querySelector(sel);
}

/**
 * ¿La persona pidió menos animaciones en los ajustes de su sistema?
 * Varios módulos lo consultan para no molestar a quien tiene mareos
 * con el movimiento o simplemente lo prefiere apagado.
 * @type {boolean}
 */
const MENOS_MOVIMIENTO = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Crea un elemento con clase y texto en una sola línea.
 * Usa textContent, nunca innerHTML: el texto entra como texto y no
 * como marcado, así que un "<" en una razón no rompe nada.
 *
 * @param {string} etiqueta - Nombre de la etiqueta, ej. 'div'
 * @param {string} [clase]  - Clase o clases separadas por espacio
 * @param {string} [texto]  - Contenido de texto
 * @returns {HTMLElement}
 */
function crear(etiqueta, clase, texto){
  const el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}
