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

// ── HomeButton ────────────────────────────────────────────────────────────────

function HomeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Volver al lugar de origen"
      title="Volver al lugar de origen"
      className={cn(
        "flex items-center justify-center w-7 h-7 rounded-sm shrink-0",
        "text-muted-foreground cursor-pointer touch-none border-none bg-transparent p-0",
        "hover:bg-primary/10 hover:text-primary",
        "active:bg-primary/20 transition-colors",
      )}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 12L12 4l9 8" />
        <path d="M9 21V12h6v9" />
        <path d="M3 21h18" />
      </svg>
    </button>
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
  const placeholderRef = React.useRef<HTMLDivElement>(null)
  const [placeholderSize, setPlaceholderSize] = React.useState<{ w: number; h: number } | null>(null)
  const [isNearSnap, setIsNearSnap] = React.useState(false)
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
        "shadow-md select-none font-sans transition-[box-shadow,border-color]",
        isDetached && "shadow-xl",
        isDragging && "shadow-2xl cursor-grabbing",
        isNearSnap && "ring-2 ring-primary border-primary",
        className,
      )}
    >
      <DockHandle onPointerDown={onPointerDown} />
      <div className="w-px h-5 bg-border shrink-0" aria-hidden />
      {children}
      {isDetached && (
        <>
          <div className="w-px h-5 bg-border shrink-0" aria-hidden />
          <HomeButton onClick={returnToDock} />
        </>
      )}
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
        ref={placeholderRef}
        aria-hidden
        className={cn(
          "inline-flex border-2 border-dashed rounded-lg",
          "pointer-events-none transition-all duration-150",
          isDetached ? "opacity-100" : "opacity-0",
          isNearSnap
            ? "border-primary bg-primary/8 shadow-[0_0_0_4px_hsl(var(--primary)/0.15)] animate-pulse"
            : "border-border bg-muted/30",
        )}
        style={placeholderSize ? { width: placeholderSize.w, height: placeholderSize.h } : undefined}
      />

      {isDocked ? dockEl : createPortal(dockEl, document.body)}
    </>
  )
}
