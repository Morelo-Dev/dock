## 1. Fix base path en Vite

- [x] 1.1 Agregar `base: process.env.NODE_ENV === 'production' ? '/dock/' : '/'` en `apps/demo/vite.config.ts`
- [x] 1.2 Verificar que `pnpm dev:demo` sigue sirviendo en `localhost:5173/` sin sub-path
- [x] 1.3 Verificar que `pnpm build:demo` genera `index.html` con rutas que inician con `/dock/`

## 2. Escapar README

- [x] 2.1 Envolver el bloque de código tsx (líneas 93-101) con `{% raw %}` y `{% endraw %}` en `README.md`
- [x] 2.2 Confirmar que el bloque se ve correctamente en el preview de GitHub

## 3. Fix estilos CSS en producción

- [x] 3.1 Cambiar `sideEffects: false` a `sideEffects: ["**/*.css"]` en `packages/core/package.json`
- [x] 3.2 Agregar `publishConfig: { access: "public" }` en `packages/core/package.json`
- [x] 3.3 Agregar `publishConfig: { access: "public" }` en `packages/shadcn/package.json`
