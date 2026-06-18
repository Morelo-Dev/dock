# @deandre-dock/buttons

**A draggable floating action bar for React.** Keeps contextual buttons within reach no matter how far the user has scrolled.

[![npm version](https://img.shields.io/npm/v/@deandre-dock/buttons)](https://www.npmjs.com/package/@deandre-dock/buttons)
[![license](https://img.shields.io/npm/l/@deandre-dock/buttons)](https://github.com/deandrenn2/dock/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@deandre-dock/buttons)](https://www.npmjs.com/package/@deandre-dock/buttons)

---

## The Problem

In data-heavy interfaces — tables, long forms, dashboards — action buttons live at the top of the page. Users scroll down, lose context, and have to scroll back up just to save or act. **That's friction you can eliminate.**

## The Solution

`ButtonDock` is a floating container users drag to wherever they're working. It auto-snaps to viewport edges and returns home on double-tap.

```
┌─────────────────────────────────────────┐
│  ⠿  [ Save ]  [ Export ]  [ ⚡ Run ]   │  ← drag it anywhere
└─────────────────────────────────────────┘
```

---

## Features

- **4 dock states** — `docked` → `dragging` → `floating` → `fixed`
- **Auto-snap to edges** — releasing near the viewport border switches to `fixed` mode
- **Double-tap to return** — snaps back to the original DOM position
- **Fully themeable** — CSS custom properties via `ThemeProvider`
- **No stylesheet import** — CSS is auto-injected when the package is loaded
- **Shadcn/ui variant** — [`@deandre-dock/buttons-shadcn`](https://www.npmjs.com/package/@deandre-dock/buttons-shadcn) uses your existing CSS variables

---

## Install

```bash
npm install @deandre-dock/buttons
# pnpm add @deandre-dock/buttons
# yarn add @deandre-dock/buttons
```

---

## Quick Start

```tsx
import { ThemeProvider, ButtonDock, Button } from '@deandre-dock/buttons'

// Wrap your app once
export function App() {
  return (
    <ThemeProvider>
      <MyPage />
    </ThemeProvider>
  )
}

// Drop ButtonDock wherever you need contextual actions
export function MyPage() {
  return (
    <div>
      <ButtonDock>
        <Button variant="primary" leftIcon={<SaveIcon />} onClick={save}>
          Save
        </Button>
        <Button variant="secondary" leftIcon={<ExportIcon />}>
          Export
        </Button>
        <Button variant="danger" iconOnly aria-label="Delete">
          <TrashIcon />
        </Button>
      </ButtonDock>

      {/* Your long content */}
    </div>
  )
}
```

### Custom Theme

```tsx
<ThemeProvider theme={{
  colors: { primary: '#7c3aed', danger: '#dc2626' },
  radius: 'lg',
  fontFamily: 'Inter, sans-serif',
}}>
  <App />
</ThemeProvider>
```

---

## API

### `<ButtonDock>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Buttons to display |
| `showMode` | `boolean` | `false` | Dev badge showing the current dock mode |

### `<Button>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `loading` | `boolean` | `false` | Show loading spinner |
| `leftIcon` | `ReactNode` | — | Icon before label |
| `rightIcon` | `ReactNode` | — | Icon after label |
| `iconOnly` | `boolean` | `false` | Square icon-only layout |

### Dock States

| State | Behavior |
|-------|----------|
| `docked` | Original DOM position — participates in normal layout |
| `floating` | Absolutely positioned — follows page scroll |
| `fixed` | Pinned to viewport — scroll doesn't move it |

---

## Using Shadcn/ui?

Install the registry variant — it uses your existing `--background`, `--border`, and `--muted` CSS variables. No `ThemeProvider` needed.

```bash
npx shadcn@latest add https://cdn.jsdelivr.net/npm/@deandre-dock/buttons-shadcn@latest/dist/registry.json
```

See [`@deandre-dock/buttons-shadcn`](https://www.npmjs.com/package/@deandre-dock/buttons-shadcn).

---

## Live Demo

[deandrenn2.github.io/dock](https://deandrenn2.github.io/dock/)

## License

MIT © [dock-buttons contributors](https://github.com/deandrenn2/dock/graphs/contributors)
