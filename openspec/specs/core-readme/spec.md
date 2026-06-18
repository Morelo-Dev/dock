# Spec: core-readme

## Requirement: README visible en npm para @deandre-dock/buttons
El paquete `@deandre-dock/buttons` SHALL incluir un `README.md` en `packages/core/` que sea visible en la página del paquete en npmjs.com.

#### Scenario: README aparece en npm
- **WHEN** un desarrollador visita `https://www.npmjs.com/package/@deandre-dock/buttons`
- **THEN** ve el contenido de instalación, uso rápido y API sin tags `{% raw %}` ni contenido de monorepo

#### Scenario: README no tiene artifacts Jekyll
- **WHEN** el archivo `packages/core/README.md` es procesado por npm o GitHub
- **THEN** no contiene tags `{% raw %}`, `{% endraw %}` ni ninguna directiva Liquid

## Requirement: README raíz describe el monorepo
El `README.md` raíz SHALL describir la estructura del monorepo y guía de desarrollo, no el API del paquete.

#### Scenario: Root README referencia los paquetes
- **WHEN** un contribuidor visita el repositorio en GitHub
- **THEN** el README muestra links a `@deandre-dock/buttons` y `@deandre-dock/buttons-shadcn`, comandos de desarrollo y estructura del monorepo
