## 1. Fix deploy workflow

- [ ] 1.1 Quitar `enablement: true` del paso `configure-pages` en `.github/workflows/deploy-demo.yml`
- [ ] 1.2 Habilitar GitHub Pages manualmente en Settings → Pages → Source: GitHub Actions

## 2. Fix build script

- [ ] 2.1 Quitar `&& tsc --emitDeclarationOnly` del script `build` en `packages/core/package.json`
- [ ] 2.2 Verificar que `pnpm build:core` genera `dist/index.d.ts` correctamente

## 3. Agregar tests de cn

- [ ] 3.1 Leer `packages/core/src/shared/lib/cn.ts` para conocer la implementación exacta
- [ ] 3.2 Crear `packages/core/src/shared/lib/cn.test.ts` con los escenarios de la spec
- [ ] 3.3 Verificar que `pnpm test` pasa en verde localmente
