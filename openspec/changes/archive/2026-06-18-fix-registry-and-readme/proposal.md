## Why

`@deandre-dock/buttons-shadcn` está publicado en npm pero el `registry.json` referencia rutas incorrectas — los paths omiten el prefijo `src/` y el directorio incluye archivos compilados que no deben distribuirse — lo que hace que `npx shadcn add` falle con 404 al intentar descargar los componentes. Adicionalmente, ninguno de los dos paquetes (`@deandre-dock/buttons`, `@deandre-dock/buttons-shadcn`) tiene un README visible en npm, ya que el README raíz del monorepo no se incluye en los paquetes publicados.

## What Changes

- Corregir las rutas de archivos en `packages/shadcn/registry.json` para que coincidan con la estructura real (`src/components/`, `src/hooks/`)
- Limpiar archivos compilados (`.js`, `.d.ts`, `.js.map`, `.d.ts.map`) de `packages/shadcn/src/` — el registry solo debe distribuir fuentes `.tsx`
- Crear `packages/core/README.md` con contenido consumer-focused (instalación, API, uso rápido) sin tags Jekyll
- Convertir el `README.md` raíz en un README de monorepo (links a paquetes, dev setup, estructura)
- Actualizar `packages/shadcn/README.md` con el URL de jsDelivr funcional en lugar de `dock-buttons.dev`

## Capabilities

### New Capabilities

- `core-readme`: README npm-ready para `@deandre-dock/buttons` en `packages/core/`
- `shadcn-registry-paths`: Corrección de rutas y limpieza del registry de `@deandre-dock/buttons-shadcn`

### Modified Capabilities

- `demo-base-path`: El README raíz menciona `https://deandrenn2.github.io/dock/` como demo pública — actualizar el link

## Impact

- `packages/shadcn/registry.json` — paths corregidos
- `packages/shadcn/src/` — eliminación de archivos compilados (`.js`, `.d.ts`, `.map`)
- `packages/core/README.md` — archivo nuevo
- `README.md` (raíz) — refactorizado como monorepo README
- `packages/shadcn/README.md` — URL actualizado
- Requiere publicar `@deandre-dock/buttons-shadcn@1.0.1` (patch) para que el fix de registry sea efectivo en npm
