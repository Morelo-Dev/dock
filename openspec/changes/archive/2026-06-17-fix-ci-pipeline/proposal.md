## Why

El pipeline de CI falla en tres puntos: GitHub Pages no puede habilitarse automáticamente desde el workflow, el build script corre `tsc --emitDeclarationOnly` de forma redundante (ya lo hace `vite-plugin-dts`) y rompe con un error de `rootDir`, y vitest sale con código 1 porque no existe ningún archivo de test.

## What Changes

- Quitar `enablement: true` del paso `configure-pages` en el workflow de deploy
- Quitar `&& tsc --emitDeclarationOnly` del script `build` en `packages/core/package.json`
- Agregar `packages/core/src/shared/lib/cn.test.ts` con tests unitarios de la función `cn`

## Capabilities

### New Capabilities

- `cn-unit-tests`: Tests unitarios para la función utilitaria `cn` en shared/lib

### Modified Capabilities

<!-- sin cambios de requisitos a nivel de spec -->

## Impact

- `.github/workflows/deploy-demo.yml`: quitar `enablement: true`
- `packages/core/package.json`: simplificar script `build`
- `packages/core/src/shared/lib/`: nuevo archivo `cn.test.ts`
- CI pasa verde en los tres jobs: deploy, test y build
