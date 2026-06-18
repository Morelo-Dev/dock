## MODIFIED Requirements

### Requirement: README no rompe Jekyll
El README.md SHALL renderizarse sin errores en un entorno Jekyll/Liquid.

#### Scenario: Bloques de código con llaves dobles
- **WHEN** Jekyll procesa README.md
- **THEN** los bloques de código que contienen `{{` no producen errores de sintaxis Liquid

#### Scenario: README raíz no contiene tags Liquid en la versión monorepo
- **WHEN** el nuevo README raíz (monorepo-focused) es procesado por Jekyll
- **THEN** no contiene bloques de código con `{{` que requieran escape Liquid, porque el contenido consumer (con ThemeProvider) se mueve a `packages/core/README.md`
