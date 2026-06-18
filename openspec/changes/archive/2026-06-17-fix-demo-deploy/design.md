## Context

La demo se despliega en `https://deandrenn2.github.io/dock/` — un sub-path, no la raíz del dominio. Vite por defecto construye todos los assets con rutas absolutas desde `/`, por lo que al servirse desde `/dock/` los scripts y estilos retornan 404.

El README tiene una ocurrencia de `{{` en la línea 94 dentro de un bloque de código tsx. GitHub Pages en modo "Deploy from branch" usa Jekyll + Liquid para renderizar archivos Markdown, y Liquid interpreta `{{` como apertura de variable de template. Aunque el proyecto ya migró a modo "GitHub Actions" (donde Jekyll no corre), el README quedaría roto si alguien lo sirve con Jekyll.

## Goals / Non-Goals

**Goals:**
- La demo carga correctamente en `deandrenn2.github.io/dock/`
- El README no rompe si Jekyll lo procesa
- El servidor de desarrollo local (`pnpm dev:demo`) sigue funcionando sin cambios

**Non-Goals:**
- Cambiar el nombre del repo o la URL del deploy
- Modificar el contenido de la demo
- Configurar un dominio personalizado

## Decisions

**1. `base: '/dock/'` solo en build, no en dev**

Vite aplica `base` tanto en dev como en build si se pone directamente. Para que `pnpm dev:demo` siga sirviendo desde `localhost:5173/` sin sub-path, se usa la variable de entorno `process.env.NODE_ENV`:

```ts
base: process.env.NODE_ENV === 'production' ? '/dock/' : '/',
```

Alternativa descartada: hardcodear `base: '/dock/'` — rompe el dev server porque las rutas del alias no funcionan con sub-path en modo watch.

**2. `{% raw %}...{% endraw %}` alrededor del bloque de código afectado**

Es la forma estándar de Liquid para escapar contenido que contiene `{{`. Envuelve solo el bloque de código tsx de la línea 91-101, no todo el archivo.

Alternativa descartada: reemplazar `{{` por `{ {` — cambia el código de ejemplo y confunde a los lectores.

## Risks / Trade-offs

- **[Risk]** Si el nombre del repo cambia en GitHub, el sub-path `/dock/` deja de ser correcto → Mitigation: el `base` está en un solo archivo; cambiar el repo name implica actualizar solo esa línea.
- **[Trade-off]** La condición `NODE_ENV === 'production'` añade una pequeña diferencia entre dev y build, pero es el patrón recomendado por Vite para este caso.
