# Guía interactiva: correlación y regresión lineal

Infografía educativa para explorar correlación y regresión lineal, con una guía de uso de distintos modelos de calculadoras Casio y ejercicios del TP 6.

## Uso

Abrí `index.html` en un navegador moderno. La página y sus estilos se incluyen en el proyecto; no requiere conexión a internet ni instalación para usarse. No cambies la ubicación relativa de las carpetas `css` y `js`.

## Estructura

- `index.html`: contenido y estructura de la página.
- `css/styles.css`: estilos listos para usar, incluido el CSS compilado de Tailwind.
- `js/datos.js`: conjuntos de datos usados por la guía.
- `js/app.js`: lógica de interacción y ejercicios.
- `src/input.css`: archivo fuente de estilos para quienes quieran modificarlos.

## Modificar los estilos

Para usar la página no hace falta instalar nada. Si modificás los estilos fuente o agregás clases de Tailwind al HTML o JavaScript, necesitás Node.js y una conexión a internet para instalar las dependencias la primera vez:

```bash
npm install
npm run build:css
```

El comando actualiza `css/styles.css`, que debe incluirse en el repositorio para que GitHub Pages pueda mostrar la página sin compilarla. Abrí o recargá `index.html` para revisar los cambios.

## Publicación en GitHub Pages

1. Creá un repositorio y subí el contenido de esta carpeta a su raíz, incluyendo `index.html`, `css/` y `js/`.
2. En GitHub, abrí **Settings → Pages**.
3. En **Build and deployment**, seleccioná **Deploy from a branch**, la rama `main` y la carpeta `/(root)`; guardá.
4. Cuando termine el despliegue, GitHub mostrará la dirección del sitio en esa misma sección.

Antes de publicar, revisá el contenido académico, los créditos y los datos personales que quieras compartir. Un sitio de Pages publicado puede ser accesible para otras personas.
