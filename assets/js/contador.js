/* ═══════════════════════════════════════════════════════════════════
   CONTADOR
   Cuánto tiempo llevan juntos, actualizado cada segundo.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Calcula la diferencia entre dos fechas en años, meses, días, horas,
 * minutos y segundos.
 *
 * Esto NO es dividir milisegundos entre 365. Un contador ingenuo hace
 * `ms / 86400000 / 365` y se equivoca, porque los meses tienen
 * distinta duración y existen los años bisiestos.
 *
 * El método correcto es restar campo por campo y "pedir prestado" al
 * campo superior cuando el resultado queda negativo. Exactamente igual
 * que una resta escrita a mano.
 *
 * @param {Date} desde
 * @param {Date} hasta
 * @returns {{años:number, meses:number, dias:number, hrs:number, min:number, seg:number}}
 */
function calcularDiferencia(desde, hasta){
  let años  = hasta.getFullYear() - desde.getFullYear();
  let meses = hasta.getMonth()    - desde.getMonth();
  let dias  = hasta.getDate()     - desde.getDate();
  let hrs   = hasta.getHours()    - desde.getHours();
  let min   = hasta.getMinutes()  - desde.getMinutes();
  let seg   = hasta.getSeconds()  - desde.getSeconds();

  if (seg < 0)  { seg += 60; min--;  }
  if (min < 0)  { min += 60; hrs--;  }
  if (hrs < 0)  { hrs += 24; dias--; }

  if (dias < 0){
    // El día 0 de un mes equivale al último día del mes anterior.
    // Es el truco estándar para saber cuántos días tenía ese mes,
    // sin tablas ni condicionales para febrero.
    const diasMesAnterior = new Date(hasta.getFullYear(), hasta.getMonth(), 0).getDate();
    dias += diasMesAnterior;
    meses--;
  }

  if (meses < 0){ meses += 12; años--; }

  return { años, meses, dias, hrs, min, seg };
}

/**
 * Escribe la fecha de inicio en letra, encima del contador.
 *
 * El texto se deriva de CONFIG.inicio con toLocaleString: no hay ni un
 * nombre de mes escrito a mano. Si mañana cambias la fecha en config,
 * esta línea cambia sola.
 */
function pintarFechaInicio(){
  const nodo = $('#txt-desde');
  if (!nodo) return;

  const inicio = CONFIG.inicio;

  // Una fecha mal escrita en config (un mes 13, por ejemplo) produce un
  // Date inválido. Mejor no pintar nada que pintar "Invalid Date".
  if (!(inicio instanceof Date) || isNaN(inicio.getTime())) return;

  nodo.textContent = inicio.toLocaleString('es-ES', {
    day:    'numeric',
    month:  'long',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit'
  });
}

/**
 * Construye el contador y lo pone en marcha.
 * Lo llama main.js durante el arranque.
 */
function iniciarContador(){
  pintarFechaInicio();

  const caja = $('#contador');
  if (!caja) return;

  const unidades = [
    ['años',  'Años'],
    ['meses', 'Meses'],
    ['dias',  'Días'],
    ['hrs',   'Horas'],
    ['min',   'Minutos'],
    ['seg',   'Segundos']
  ];

  // El DOM se construye UNA sola vez y guardamos la referencia a cada
  // nodo de cifra. Después solo reescribimos el texto.
  //
  // Repintar con innerHTML cada segundo obligaría al navegador a
  // reparsear y recalcular todo el layout 60 veces por minuto. Es la
  // diferencia entre una página fluida y una que calienta el teléfono.
  const refs = {};

  unidades.forEach(([clave, etiqueta]) => {
    const div    = crear('div', 'unidad');
    const cifra  = crear('span', 'cifra', '0');
    const rotulo = crear('span', 'etiqueta', etiqueta);

    div.append(cifra, rotulo);
    caja.appendChild(div);
    refs[clave] = cifra;
  });

  function tic(){
    const d = calcularDiferencia(CONFIG.inicio, new Date());
    for (const clave in refs){
      // padStart deja "07" en vez de "7": las cifras no bailan de ancho
      refs[clave].textContent = String(d[clave]).padStart(2, '0');
    }
  }

  tic();                    // pinta de inmediato, sin esperar un segundo
  setInterval(tic, 1000);
}
