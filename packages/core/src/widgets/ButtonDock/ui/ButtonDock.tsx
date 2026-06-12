import { useCallback, useRef, useState, useLayoutEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../../shared/lib/cn'
import { useDockState } from '../../../features/position/model/useDockState'
import { useDrag } from '../../../features/drag/model/useDrag'
import { DockHandle } from './DockHandle'
import styles from './ButtonDock.module.css'
import type { DockMode, Position } from '../../../features/position/model/types'

export type ButtonDockProps = {
  children: ReactNode
  /** Show current mode label — useful during development */
  showMode?: boolean
}

function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 12L12 4l9 8" />
      <path d="M9 21V12h6v9" />
      <path d="M3 21h18" />
    </svg>
  )
}

export function ButtonDock({ children, showMode = false }: ButtonDockProps) {
  const { state, startDrag, commit, returnToDock } = useDockState()
  const rootRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const [placeholderSize, setPlaceholderSize] = useState<{ w: number; h: number } | null>(null)
  const [isNearSnap, setIsNearSnap] = useState(false)
  const measuredRef = useRef(false)

  const isDocked = state.mode === 'docked'
  const isDragging = state.mode === 'dragging'
  const isDetached = !isDocked

  // Measure dock once while docked. Guard ref prevents set→re-render→measure loop.
  useLayoutEffect(() => {
    if (!isDocked) {
      measuredRef.current = false
      return
    }
    if (measuredRef.current || !rootRef.current) return
    measuredRef.current = true
    setPlaceholderSize({
      w: rootRef.current.offsetWidth,
      h: rootRef.current.offsetHeight,
    })
  })

  const handleDragStart = useCallback(
    (initialViewportPos: Position) => { startDrag(initialViewportPos) },
    [startDrag],
  )

  const handleDragEnd = useCallback(
    (viewportPos: Position, mode: DockMode) => {
      commit(
        mode === 'fixed'
          ? viewportPos
          : { x: viewportPos.x + window.scrollX, y: viewportPos.y + window.scrollY },
        mode,
      )
    },
    [commit],
  )

  const { onPointerDown } = useDrag({
    rootRef,
    placeholderRef,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onReturnToDock: returnToDock,
    onSnapChange: setIsNearSnap,
  })

  function getPositionStyle(): React.CSSProperties {
    if (isDocked) return {}
    if (!state.position) return {}
    if (isDragging) {
      return {
        position: 'fixed',
        left: state.position.x,
        top: state.position.y,
        margin: 0,
        zIndex: 9999,
      }
    }
    return {
      position: state.mode === 'fixed' ? 'fixed' : 'absolute',
      left: state.position.x,
      top: state.position.y,
      margin: 0,
      zIndex: 1000,
    }
  }

  const dockEl = (
    <div
      ref={rootRef}
      data-dock-root
      data-mode={state.mode}
      style={getPositionStyle()}
      className={cn(
        styles.root,
        isDetached && styles.detached,
        isDragging && styles.dragging,
        isNearSnap && styles.snapping,
      )}
    >
      <DockHandle onPointerDown={onPointerDown} />
      <div className={styles.divider} aria-hidden />
      {children}
      {isDetached && (
        <>
          <div className={styles.divider} aria-hidden />
          <button
            className={styles.homeBtn}
            onClick={returnToDock}
            aria-label="Volver al lugar de origen"
            title="Volver al lugar de origen"
          >
            <HomeIcon />
          </button>
        </>
      )}
      {showMode && <span className={styles.modeBadge}>{state.mode}</span>}
    </div>
  )

  return (
    <>
      {/* Placeholder: reserva el espacio original cuando el dock está despegado */}
      <div
        ref={placeholderRef}
        className={cn(styles.placeholder, isDetached && styles.visible, isNearSnap && styles.snapActive)}
        aria-hidden
        style={placeholderSize ? { width: placeholderSize.w, height: placeholderSize.h } : undefined}
      />

      {/* Inline cuando docked, portal a body cuando floating/fixed */}
      {isDocked ? dockEl : createPortal(dockEl, document.body)}
    </>
  )
}
