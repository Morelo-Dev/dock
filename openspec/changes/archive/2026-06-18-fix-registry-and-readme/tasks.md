## 1. Fix shadcn registry

- [x] 1.1 Eliminar archivos compilados de `packages/shadcn/src/` — borrar todos los `.js`, `.d.ts`, `.js.map`, `.d.ts.map`
- [x] 1.2 Agregar `prepublishOnly: "node scripts/build-registry.mjs"` a los scripts de `packages/shadcn/package.json`
- [x] 1.3 Actualizar `files` en `packages/shadcn/package.json` — cambiar `["registry.json", "src"]` por `["dist", "src"]`
- [x] 1.4 Correr `node scripts/build-registry.mjs` desde `packages/shadcn/` y verificar que `dist/registry.json` se genera con `content` embebido en cada archivo
- [x] 1.5 Actualizar `packages/shadcn/README.md` — reemplazar URL `https://dock-buttons.dev/...` con `https://cdn.jsdelivr.net/npm/@deandre-dock/buttons-shadcn@latest/dist/registry.json`

## 2. READMEs

- [x] 2.1 Crear `packages/core/README.md` con contenido consumer: qué es ButtonDock, instalación, uso rápido (ThemeProvider + ButtonDock + Button), tabla de API, link a demo y shadcn variant — sin tags `{% raw %}`
- [x] 2.2 Refactorizar `README.md` raíz — convertir en monorepo README: lista de paquetes con links, dev setup (`pnpm dev:demo`, `pnpm test`, etc.), estructura del monorepo, link a CONTRIBUTING

## 3. Changeset y publicación

- [ ] 3.1 Correr `pnpm changeset` — patch para `@deandre-dock/buttons-shadcn` describiendo el fix del registry (build pipeline conectado, dist/registry.json con content embebido)
- [ ] 3.2 Publicar `@deandre-dock/buttons-shadcn@1.0.1` manualmente con `pnpm publish` desde `packages/shadcn/`
- [ ] 3.3 Verificar que `npx shadcn@latest add https://cdn.jsdelivr.net/npm/@deandre-dock/buttons-shadcn@1.0.1/dist/registry.json` funciona en un proyecto shadcn de prueba
