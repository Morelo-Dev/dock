## Context

El CI tiene tres jobs que fallan: `deploy-demo`, `test` (core) y `build:core`. Los tres son independientes y cada uno tiene una causa distinta. No hay dependencias entre los fixes.

Estado actual:
- `vite-plugin-dts` con `rollupTypes: true` ya genera `dist/index.d.ts` durante `vite build`
- El script `build` corre además `tsc --emitDeclarationOnly`, que es redundante y falla porque `vite.config.ts` está fuera de `rootDir: ./src`
- No existe ningún archivo `.test.ts` en `packages/core`, pero el script `test` corre `vitest run` sin `--passWithNoTests`
- El workflow `deploy-demo.yml` usa `enablement: true` en `configure-pages`, que requiere permisos de admin que el `GITHUB_TOKEN` no tiene

## Goals / Non-Goals

**Goals:**
- CI pasa verde en los tres jobs sin cambios funcionales en la librería
- El build de declaraciones sigue produciendo `dist/index.d.ts` correctamente
- Tests corren con un caso real (función `cn`), no con un placeholder vacío

**Non-Goals:**
- Cobertura de tests completa para la librería
- Cambios en la lógica de componentes
- Actualización de dependencias

## Decisions

**1. Eliminar `tsc --emitDeclarationOnly` del build script**

`vite-plugin-dts` con `include: ['src']` y `rollupTypes: true` produce exactamente el mismo output que el `tsc` manual. Mantener los dos es redundante y el segundo está roto. El `tsconfig.json` se deja sin cambios — incluir `vite.config.ts` ahí tiene valor para el type-checking del editor.

Alternativa descartada: excluir `vite.config.ts` del `tsconfig.json`. Funciona pero pierde el type-checking del config en el IDE.

**2. Testear `cn` en lugar de un componente React**

`cn` es una función pura sin dependencias de DOM ni React. No requiere `@testing-library/react` ni jsdom. Es código de producción real que merece tests. Un test de componente requeriría agregar una dependencia que no existe en el proyecto.

Alternativa descartada: `--passWithNoTests`. Deja el job de CI sin ejecutar nada real; si se borra el único test file en el futuro, vuelve a silenciar el paso.

**3. Quitar `enablement: true` de `configure-pages`**

El flag intenta crear el sitio de Pages vía API. El `GITHUB_TOKEN` no tiene ese permiso. Una vez que Pages está habilitado manualmente en Settings → Pages → Source: GitHub Actions, el workflow funciona sin ese flag. La action `configure-pages` sin `enablement` solo configura la URL base, que sí está permitido.

## Risks / Trade-offs

- **[Risk]** Si alguien elimina el único test de `cn` sin agregar otros, CI vuelve a fallar con "No test files found" → Mitigation: documentar en CLAUDE.md que debe existir al menos un test, o agregar `--passWithNoTests` como respaldo en el futuro cuando haya más cobertura.

- **[Trade-off]** Quitar `tsc --emitDeclarationOnly` significa que solo `vite-plugin-dts` genera los tipos. Si el plugin tuviera un bug, no habría fallback → es un riesgo aceptable dado que el plugin está maduro y ya era el mecanismo principal.
