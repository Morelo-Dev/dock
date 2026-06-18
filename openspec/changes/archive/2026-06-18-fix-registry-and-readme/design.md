## Context

`@deandre-dock/buttons-shadcn@1.0.0` está en npm pero no se puede instalar via shadcn CLI. El diagnóstico inicial (paths incorrectos en `registry.json`) era erróneo — los paths son correctos para el build script. El verdadero problema: `build:registry` **nunca corrió** antes de publicar y no hay `prepublishOnly` que lo dispare.

El script `scripts/build-registry.mjs` lee `registry.json` + los `.tsx` en `src/` y genera `dist/registry.json` con el contenido de cada archivo embebido. Esto es lo que el shadcn CLI espera: un JSON con `content` por archivo, no paths que resolver. La documentación oficial de shadcn lo confirma — el CLI siempre consume JSON con content embebido (`public/r/*.json`), nunca fetcha `.tsx` sueltos.

Lo que se publicó en `1.0.0`:
- `registry.json` (fuente — sin `content` embebido) ← inútil para el CLI
- `src/` (fuentes `.tsx` + archivos compilados `.js`/`.d.ts` que no deberían estar)
- Sin `dist/` (nunca generado)

El README raíz mezcla contenido consumer (instalación, API, ThemeProvider) con detalles del monorepo. El core npm package no tiene README propio, así que npm muestra la página del paquete sin documentación.

## Goals / Non-Goals

**Goals:**
- `npx shadcn@latest add [jsDelivr-url]` funciona sin errores en un proyecto shadcn existente
- `packages/core/README.md` aparece en npm con contenido consumer limpio
- El README raíz queda como entrada para contribuidores del monorepo
- Bump patch de `@deandre-dock/buttons-shadcn` para publicar el fix

**Non-Goals:**
- Registrar el dominio `dock-buttons.dev` (queda como deuda futura)
- Modificar el comportamiento del componente `ButtonDock` en la variante shadcn
- Publicar `@deandre-dock/buttons@1.0.1` (el core no necesita cambios)

## Decisions

### D1: URL del registry — jsDelivr como solución definitiva por ahora

jsDelivr sirve cualquier archivo de npm automáticamente con CORS habilitado. Como el paquete ya está publicado, `https://cdn.jsdelivr.net/npm/@deandre-dock/buttons-shadcn@latest/registry.json` funciona hoy sin configuración adicional. El shadcn CLI puede fetchear el registry y cada archivo fuente desde la misma base URL.

**Alternativa descartada**: GitHub raw URL — funciona pero está acoplado a la rama/tag, no al semver del paquete.

### D2: Conectar el build al flujo de publicación

Los paths en `registry.json` son correctos — `build-registry.mjs` los resuelve internamente via `join(srcDir, file.path)`, por lo que `"components/button-dock.tsx"` → `src/components/button-dock.tsx`. No hay nada que cambiar en los paths.

Lo que falta:

1. **`prepublishOnly`** en `packages/shadcn/package.json` para que el build corra automáticamente antes de `npm publish`:
   ```json
   "prepublishOnly": "node scripts/build-registry.mjs"
   ```

2. **`dist` en `files`** para que el registry con content embebido se incluya en el paquete npm:
   ```json
   "files": ["dist", "src"]
   ```
   (se mantiene `src/` por si el consumidor quiere ver los fuentes, aunque el CLI solo necesita `dist/registry.json`)

3. **URL apunta a `dist/registry.json`**, no al raíz:
   ```
   https://cdn.jsdelivr.net/npm/@deandre-dock/buttons-shadcn@1.0.1/dist/registry.json
   ```

**Alternativa descartada**: Sobrescribir el `registry.json` raíz con la salida del build (output directo a `./` en vez de `./dist`). Mezcla fuentes y artifacts en el mismo archivo, dificulta el mantenimiento.

### D3: Limpiar compilados de `src/` — eliminar `.js`, `.d.ts`, `.map`

Los archivos `.js`/`.d.ts`/`.map` en `src/` son residuos de haber corrido `tsc` directamente sobre el paquete shadcn (probablemente por error). Para un registry shadcn solo los `.tsx` son fuente; el proyecto del usuario los compila con su propio toolchain. Eliminarlos evita confusión y reduce el tamaño del paquete.

### D4: README raíz → monorepo README; packages/core/README.md → consumer README

La separación permite que cada archivo sirva su audiencia:
- Root README: contribuidores, CI, estructura del monorepo
- `packages/core/README.md`: consumidores del paquete (mismo contenido que el root actual, sin `{% raw %}` tags)

El `{% raw %}`/`{% endraw %}` del root README se puede eliminar porque el contenido con `{{` (el ejemplo de ThemeProvider) se moverá a `packages/core/README.md`, que no pasa por Jekyll.

## Risks / Trade-offs

- **jsDelivr con `@latest`**: Apunta a la versión más reciente del paquete. Si en el futuro se publican breaking changes, usuarios que copiaron el comando con `@latest` podrían ver comportamiento inesperado. Mitigación: documentar ambos URLs (con `@latest` y con versión fija `@1.0.1`).
- **`dist/` en git**: `dist/registry.json` se genera en tiempo de publicación, no se commitea. Si alguien clona el repo e intenta usar el registry localmente sin correr `build:registry`, obtendrá el `registry.json` fuente (sin content). Mitigación: el README de desarrollo debe indicar correr `pnpm build:registry` para pruebas locales.

## Migration Plan

1. Eliminar archivos compilados de `packages/shadcn/src/`
2. Agregar `prepublishOnly` y actualizar `files` en `packages/shadcn/package.json`
3. Correr `node scripts/build-registry.mjs` para generar `dist/registry.json`
4. Crear `packages/core/README.md` (contenido consumer sin `{% raw %}`)
5. Refactorizar root `README.md` (monorepo-focused)
6. Actualizar `packages/shadcn/README.md` con URL jsDelivr apuntando a `dist/registry.json`
7. `pnpm changeset` — patch para `@deandre-dock/buttons-shadcn`
8. Publicar manualmente con `pnpm publish` desde `packages/shadcn/`

## Open Questions

- ¿Incluir el ejemplo de ThemeProvider con `{{` en `packages/core/README.md` directamente, o usar backtick escaping en lugar de `{% raw %}`? (La solución con backticks es más portátil porque no depende de Jekyll.)
