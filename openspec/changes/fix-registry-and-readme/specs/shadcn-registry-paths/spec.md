## ADDED Requirements

### Requirement: Registry resuelve rutas correctamente vía jsDelivr
El `registry.json` de `@deandre-dock/buttons-shadcn` SHALL referenciar rutas de archivos que existan en el paquete npm publicado, permitiendo que el shadcn CLI las descargue correctamente desde jsDelivr.

#### Scenario: shadcn CLI instala button-dock sin errores
- **WHEN** un desarrollador corre `npx shadcn@latest add https://cdn.jsdelivr.net/npm/@deandre-dock/buttons-shadcn@latest/registry.json`
- **THEN** el CLI descarga `button-dock.tsx`, `use-dock-state.ts` y `use-drag.ts` sin errores 404

#### Scenario: Rutas en registry.json coinciden con estructura del paquete
- **WHEN** se inspecciona `registry.json` publicado en npm
- **THEN** cada `path` en `files[]` corresponde a un archivo `.tsx` existente en el paquete

### Requirement: Registry distribuye solo fuentes TypeScript
El paquete `@deandre-dock/buttons-shadcn` SHALL contener únicamente archivos fuente `.tsx` en `src/` — no archivos compilados.

#### Scenario: No hay archivos compilados en el paquete publicado
- **WHEN** se inspecciona el contenido del paquete npm `@deandre-dock/buttons-shadcn`
- **THEN** `src/` contiene solo archivos `.tsx` — sin `.js`, `.d.ts` ni `.map`

### Requirement: URL del shadcn CLI documentado y funcional
El `README.md` de `@deandre-dock/buttons-shadcn` SHALL documentar un URL de instalación que funcione al momento de la publicación.

#### Scenario: URL de jsDelivr funciona en un proyecto shadcn
- **WHEN** un desarrollador con shadcn/ui configurado corre el comando documentado en el README
- **THEN** los archivos del componente se copian a su proyecto sin errores
