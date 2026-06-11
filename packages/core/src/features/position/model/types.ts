export type DockMode = 'docked' | 'dragging' | 'floating' | 'fixed'

export type Position = {
  x: number
  y: number
}

export type DockState = {
  mode: DockMode
  position: Position | null
}
