## 1. Fix deploy workflow

- [x] 1.1 Quitar `enablement: true` del paso `configure-pages` en `.github/workflows/deploy-demo.yml`
- [x] 1.2 Habilitar GitHub Pages manualmente en Settings → Pages → Source: GitHub Actions

## 2. Fix build script

- [x] 2.1 Quitar `&& tsc --emitDeclarationOnly` del script `build` en `packages/core/package.json`
- [x] 2.2 Verificar que `pnpm build:core` genera `dist/index.d.ts` correctamente

## 3. Agregar tests de cn

- [x] 3.1 Leer `packages/core/src/shared/lib/cn.ts` para conocer la implementación exacta
- [x] 3.2 Crear `packages/core/src/shared/lib/cn.test.ts` con los escenarios de la spec
- [x] 3.3 Verificar que `pnpm test` pasa en verde localmente
