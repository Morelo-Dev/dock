"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { useDockState } from "../hooks/use-dock-state"
import { useDrag } from "../hooks/use-drag"
import type { DockMode, Position } from "../hooks/use-dock-state"

// ── DockHandle ────────────────────────────────────────────────────────────────

function DockHandle({ onPointerDown }: { onPointerDown: React.PointerEventHandler<HTMLDivElement> }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-7 h-7 rounded-sm shrink-0",
        "text-muted-foreground cursor-grab touch-none",
        "hover:bg-accent hover:text-accent-foreground",
        "active:cursor-grabbing transition-colors",
      )}
      onPointerDown={onPointerDown}
      role="button"
      tabIndex={0}
      aria-label="Arrastrar barra · Doble toque para volver al inicio"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="5.5" cy="4"  r="1.2" fill="currentColor" />
        <circle cx="5.5" cy="8"  r="1.2" fill="currentColor" />
        <circle cx="5.5" cy="12" r="1.2" fill="currentColor" />
        <circle cx="10.5" cy="4"  r="1.2" fill="currentColor" />
        <circle cx="10.5" cy="8"  r="1.2" fill="currentColor" />
        <circle cx="10.5" cy="12" r="1.2" fill="currentColor" />
      </svg>
    </div>
  )
}

// ── ButtonDock ────────────────────────────────────────────────────────────────

export interface ButtonDockProps {
  children: React.ReactNode
  /** Show current mode label — useful during development */
  showMode?: boolean
  className?: string
}

export function ButtonDock({ children, showMode = false, className }: ButtonDockProps) {
  const { state, startDrag, commit, returnToDock } = useDockState()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [placeholderSize, setPlaceholderSize] = React.useState<{ w: number; h: number } | null>(null)
  const measuredRef = React.useRef(false)

  const isDocked = state.mode === "docked"
  const isDragging = state.mode === "dragging"
  const isDetached = !isDocked

  // Measure once while docked to size the placeholder
  React.useLayoutEffect(() => {
    if (!isDocked) { measuredRef.current = false; return }
    if (measuredRef.current || !rootRef.current) return
    measuredRef.current = true
    setPlaceholderSize({ w: rootRef.current.offsetWidth, h: rootRef.current.offsetHeight })
  })

  const handleDragStart = React.useCallback((pos: Position) => { startDrag(pos) }, [startDrag])

  const handleDragEnd = React.useCallback((viewportPos: Position, mode: DockMode) => {
    commit(
      mode === "fixed"
        ? viewportPos
        : { x: viewportPos.x + window.scrollX, y: viewportPos.y + window.scrollY },
      mode,
    )
  }, [commit])

  const { onPointerDown } = useDrag({
    rootRef,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onReturnToDock: returnToDock,
  })

  function getPositionStyle(): React.CSSProperties {
    if (isDocked) return {}
    if (!state.position) return {}
    if (isDragging) {
      return {
        position: "fixed",
        left: state.position.x,
        top: state.position.y,
        margin: 0,
        zIndex: 9999,
      }
    }
    return {
      position: state.mode === "fixed" ? "fixed" : "absolute",
      left: state.position.x,
      top: state.position.y,
      margin: 0,
      zIndex: 50,
    }
  }

  const dockEl = (
    <div
      ref={rootRef}
      data-dock-root
      data-mode={state.mode}
      style={getPositionStyle()}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 w-max",
        "bg-background border border-border rounded-lg",
        "shadow-md select-none font-sans",
        isDetached && "shadow-xl",
        isDragging && "shadow-2xl cursor-grabbing",
        className,
      )}
    >
      <DockHandle onPointerDown={onPointerDown} />
      <div className="w-px h-5 bg-border shrink-0" aria-hidden />
      {children}
      {showMode && (
        <span className="text-xs text-muted-foreground font-mono min-w-[4.5rem]">
          {state.mode}
        </span>
      )}
    </div>
  )

  return (
    <>
      {/* Placeholder reserves the home-zone space when detached */}
      <div
        aria-hidden
        className={cn(
          "inline-flex border-2 border-dashed border-border rounded-lg bg-muted/30",
          "pointer-events-none transition-opacity duration-200",
          isDetached ? "opacity-100" : "opacity-0",
        )}
        style={placeholderSize ? { width: placeholderSize.w, height: placeholderSize.h } : undefined}
      />

      {isDocked ? dockEl : createPortal(dockEl, document.body)}
    </>
  )
}
