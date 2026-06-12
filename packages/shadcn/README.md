# @deandre-dock/buttons — Shadcn/ui Registry

Instala `ButtonDock` directamente en tu proyecto Shadcn con el CLI oficial.

## Instalación

```bash
npx shadcn add https://dock-buttons.dev/registry.json/button-dock
```

Esto copia en tu proyecto:
- `components/ui/button-dock.tsx` — el componente
- `hooks/use-dock-state.ts` — máquina de estados
- `hooks/use-drag.ts` — lógica de arrastre

## Uso básico

```tsx
import { Button } from "@/components/ui/button"
import { ButtonDock } from "@/components/ui/button-dock"

export function MyPage() {
  return (
    <div>
      <ButtonDock>
        <Button>Guardar</Button>
        <Button variant="outline">Exportar</Button>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </ButtonDock>

      {/* tu contenido... */}
    </div>
  )
}
```

## Props

### `ButtonDock`

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `children` | `ReactNode` | — | Botones a mostrar |
| `showMode` | `boolean` | `false` | Muestra badge del modo actual (dev helper) |
| `className` | `string` | — | Clases Tailwind adicionales |

## Comportamiento

| Acción | Resultado |
|---|---|
| Arrastrar handle `⠿` + soltar en centro | Modo **floating** — se mueve con el scroll |
| Arrastrar handle `⠿` + soltar en borde | Modo **fixed** — anclado al viewport |
| Doble toque en handle | Vuelve a la zona original (**docked**) |

## Diferencias con `@deandre-dock/buttons`

Esta versión usa los tokens CSS de Shadcn (`--background`, `--border`, `--muted`, etc.)
en lugar de los tokens propios de la librería. No requiere `ThemeProvider`.
