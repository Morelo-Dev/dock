import type { PointerEventHandler } from 'react'
import styles from './ButtonDock.module.css'

type DockHandleProps = {
  onPointerDown: PointerEventHandler<HTMLDivElement>
}

export function DockHandle({ onPointerDown }: DockHandleProps) {
  return (
    <div
      className={styles.handle}
      onPointerDown={onPointerDown}
      aria-label="Arrastrar barra · Doble toque para volver al inicio"
      role="button"
      tabIndex={0}
    >
      <HandleIcon />
    </div>
  )
}

function HandleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="5.5" cy="4" r="1.2" fill="currentColor" />
      <circle cx="5.5" cy="8" r="1.2" fill="currentColor" />
      <circle cx="5.5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="10.5" cy="4" r="1.2" fill="currentColor" />
      <circle cx="10.5" cy="8" r="1.2" fill="currentColor" />
      <circle cx="10.5" cy="12" r="1.2" fill="currentColor" />
    </svg>
  )
}
