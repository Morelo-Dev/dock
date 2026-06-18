# @deandre-dock/buttons

> Un ButtonGroup flotante e inteligente para React.

[![npm version](https://img.shields.io/npm/v/@deandre-dock/buttons)](https://www.npmjs.com/package/@deandre-dock/buttons)
[![license](https://img.shields.io/npm/l/@deandre-dock/buttons)](https://github.com/deandrenn2/dock/blob/main/LICENSE)

---

## ¿Qué es?

`@deandre-dock/buttons` resuelve un problema real: en interfaces densas (tablas, formularios largos, editores), las acciones contextuales quedan lejos de donde el usuario está trabajando.

**ButtonDock** es un contenedor de botones que el usuario puede mover libremente:

```
┌──────────────────────────────────────┐
│  [⠿]  [ Generar ]  [ 💾 Guardar ]  [🗑] │  ← arrástralo a donde lo necesites
└──────────────────────────────────────┘
```

| Modo | Comportamiento |
|---|---|
| **docked** | En su zona original, flujo normal del DOM |
| **floating** | Libre, se desplaza con el scroll de la página |
| **fixed** | Anclado al viewport — el scroll no lo mueve |

**Interacción con el handle `⠿`:**
- Arrastrar → lo ubica donde lo sueltes
- Soltar cerca de un borde → modo `fixed`
- Soltar en el centro → modo `floating`
- Doble toque → regresa a la zona original

---

## Instalación

```bash
pnpm add @deandre-dock/buttons
# o
npm install @deandre-dock/buttons
# o
yarn add @deandre-dock/buttons
```

> **¿Usas Shadcn/ui?** Instala la variante con `npx shadcn@latest add https://cdn.jsdelivr.net/npm/@deandre-dock/buttons-shadcn@latest/dist/registry.json` — usa tus CSS variables existentes sin ThemeProvider.

---

## Uso rápido

```tsx
import { ThemeProvider, ButtonDock, Button } from '@deandre-dock/buttons'

// Envuelve tu app con ThemeProvider (una sola vez)
export function App() {
  return (
    <ThemeProvider>
      <MyPage />
    </ThemeProvider>
  )
}

// Usa ButtonDock donde necesites acciones contextuales
export function MyPage() {
  return (
    <div>
      <ButtonDock>
        <Button variant="primary" leftIcon={<SaveIcon />}>
          Guardar
        </Button>
        <Button variant="secondary">
          Exportar
        </Button>
        <Button variant="danger" iconOnly aria-label="Eliminar">
          <TrashIcon />
        </Button>
      </ButtonDock>

      {/* Tu contenido largo aquí... */}
    </div>
  )
}
```

### Tema personalizado

```tsx
<ThemeProvider theme={{
  colors: { primary: '#7c3aed' },
  radius: 'lg',
  fontFamily: 'Inter, sans-serif',
}}>
  <App />
</ThemeProvider>
```

---

## API

### `<ButtonDock>`

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `children` | `ReactNode` | — | Botones a mostrar |
| `showMode` | `boolean` | `false` | Badge con el modo actual (útil en desarrollo) |

### `<Button>`

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Estilo visual |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño |
| `loading` | `boolean` | `false` | Estado de carga (spinner) |
| `leftIcon` | `ReactNode` | — | Ícono a la izquierda del label |
| `rightIcon` | `ReactNode` | — | Ícono a la derecha del label |
| `iconOnly` | `boolean` | `false` | Layout cuadrado sin label |

---

## Demo

[deandrenn2.github.io/dock](https://deandrenn2.github.io/dock/)

## Licencia

MIT © dock-buttons contributors
