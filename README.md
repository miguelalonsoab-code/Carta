# Carta para Dagiana

Página web de una sola pantalla, sin dependencias ni proceso de compilación.
HTML, CSS y JavaScript puros. Se abre con doble clic o se publica en
GitHub Pages sin configurar nada.

## Estructura

```
.
├── index.html                  Estructura. Sin estilos ni lógica dentro.
├── README.md
├── .gitignore
└── assets/
    ├── css/
    │   ├── base.css            Variables, reset, tipografía, arreglos de iOS
    │   ├── layout.css          El sobre, la columna, el revelado por scroll
    │   └── componentes.css     Contador, galería, tarjetas, pregunta, corazones
    ├── js/
    │   ├── config.js           ← LO ÚNICO QUE HAY QUE EDITAR
    │   ├── utils.js            Ayudantes compartidos
    │   ├── contador.js         Cálculo del tiempo juntos
    │   ├── galeria.js          Fotos tipo polaroid
    │   ├── razones.js          Tarjetas que se voltean
    │   ├── corazones.js        Efecto ambiental
    │   ├── pregunta.js         El botón "No" que huye
    │   ├── revelado.js         Aparición al hacer scroll
    │   ├── audio.js            Música opcional
    │   └── main.js             Orquestador del arranque
    └── fotos/
        ├── 1-inicio.jpg        1100 × 825  (apaisada)
        ├── 2-risa.jpg           800 × 1066
        └── 3-nosotros.jpg       800 × 1066
```

## Cómo personalizarlo

Todo el contenido vive en `assets/js/config.js`. Ningún otro archivo
tiene texto escrito a mano.

| Quiero cambiar… | Dónde |
|---|---|
| Nombres, fecha, textos de la carta | `config.js` |
| Fotos y sus pies | `config.js` → `momentos` |
| Razones de las tarjetas | `config.js` → `razones` |
| La pregunta final | `config.js` → `pregunta` |
| Colores y tipografías | `assets/css/base.css` → bloque `:root` |

### La fecha

```js
inicio: new Date(2025, 11, 15, 20, 30)
```

**El mes va de 0 a 11.** Enero es 0 y diciembre es 11. Ese `11` es
diciembre, no noviembre. Es el error más común con `Date` en JavaScript.

### Cambiar las fotos

1. Deja el archivo en `assets/fotos/`
2. Actualiza la ruta en `config.js`
3. Recórtala antes a **3:4** (vertical) o **4:3** (apaisada), y en ese
   segundo caso añade `ancho: true` para que ocupe las dos columnas

Comprime las fotos a unos 200 KB cada una. Con datos móviles, una foto
de 3 MB tarda una eternidad en aparecer.

### Añadir música

```js
musica: "assets/cancion.mp3"
```

Deja `""` para desactivarla. La canción solo puede empezar cuando se
toca el sello: los navegadores prohíben la reproducción automática y
exigen un gesto del usuario.

## Orden de carga

Los scripts son clásicos con `defer`, **no módulos ES**. Los módulos
exigen un servidor HTTP y fallan al abrir el archivo con doble clic
(`file://`). Así funciona tanto en local como en GitHub Pages.

`defer` garantiza que se ejecuten en el orden en que aparecen en el
`index.html`, y eso importa: `config.js` define los datos, `utils.js`
los ayudantes, los módulos la lógica, y `main.js` lo pone todo en
marcha. Si cambias el orden, se rompe.

El CSS sigue la misma lógica de cascada: `base` → `layout` →
`componentes`, de lo general a lo específico.

## Publicar en GitHub Pages

```bash
git init
git add .
git commit -m "Carta para Dagiana"
git branch -M main
git remote add origin https://github.com/usuario/repo.git
git push -u origin main
```

Después: **Settings → Pages → Source: main / (root)**.

`index.html` debe estar en la raíz del repositorio. Si queda dentro de
una carpeta, Pages devuelve un 404.

## Compatibilidad

Probado contra las particularidades de Safari en iOS:

- `background-attachment: fixed` sustituido por una capa fija propia
- Estilo nativo de los `<button>` desactivado
- Prefijos `-webkit-` en las transformaciones 3D de las tarjetas
- Click fantasma tras `touchstart` neutralizado con una bandera
- `env(safe-area-inset-*)` para la muesca del iPhone
- `inset` escrito en forma larga (`top/right/bottom/left`)

`aspect-ratio` requiere iOS 15+. En versiones anteriores las fotos se
muestran con su proporción natural, que es la misma, porque ya vienen
recortadas desde el origen.

Se respeta `prefers-reduced-motion`: si el sistema pide menos
animaciones, los corazones desaparecen y las transiciones se anulan.
