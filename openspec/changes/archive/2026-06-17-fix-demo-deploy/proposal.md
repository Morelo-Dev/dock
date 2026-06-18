## Why

La demo desplegada en `deandrenn2.github.io/dock/` muestra una página en blanco porque Vite construye los assets asumiendo que el app vive en `/`, pero GitHub Pages lo sirve desde el sub-path `/dock/`. Adicionalmente, el README contiene bloques de código con `{{` que Jekyll interpreta como variables Liquid, lo que rompe el deploy si alguna vez se usa Pages en modo "Deploy from branch".

## What Changes

- Agregar `base: '/dock/'` al `vite.config.ts` de `apps/demo`
- Escapar los bloques de código en `README.md` que contienen `{{` con `{% raw %}...{% endraw %}`

## Capabilities

### New Capabilities

- `demo-base-path`: La demo se sirve correctamente desde el sub-path `/dock/` en GitHub Pages

### Modified Capabilities

<!-- sin cambios de requisitos a nivel de spec existente -->

## Impact

- `apps/demo/vite.config.ts`: agregar opción `base`
- `README.md`: envolver bloques de código con etiquetas Liquid `raw`
