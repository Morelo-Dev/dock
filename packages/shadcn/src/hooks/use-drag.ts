import { useCallback, useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import type { DockMode, Position } from './use-dock-state'

type SavedStyles = { position: string; left: string; top: string; margin: string; zIndex: string }

type UseDragOptions = {
  rootRef: RefObject<HTMLElement | null>
  placeholderRef?: RefObject<HTMLElement | null>
  onDragStart: (pos: Position) => void
  onDragEnd: (pos: Position, mode: DockMode) => void
  onReturnToDock: () => void
  onSnapChange?: (isNear: boolean) => void
}

const DRAG_THRESHOLD_PX = 6
const SNAP_PADDING_PX = 48

function restoreStyle(el: HTMLElement, s: SavedStyles) {
  const set = (prop: string, val: string) =>
    val ? el.style.setProperty(prop, val) : el.style.removeProperty(prop)
  set('position', s.position); set('left', s.left); set('top', s.top)
  set('margin', s.margin); set('z-index', s.zIndex)
}

export function useDrag({ rootRef, placeholderRef, onDragStart, onDragEnd, onReturnToDock, onSnapChange }: UseDragOptions) {
  const drag = useRef<{ offsetX: number; offsetY: number; startClientX: number; startClientY: number; savedStyles: SavedStyles } | null>(null)
  const isDragging = useRef(false)
  const isNearSnap = useRef(false)

  const onDragEndRef = useRef(onDragEnd)
  const onDragStartRef = useRef(onDragStart)
  const onReturnRef = useRef(onReturnToDock)
  const onSnapChangeRef = useRef(onSnapChange)
  useEffect(() => { onDragEndRef.current = onDragEnd }, [onDragEnd])
  useEffect(() => { onDragStartRef.current = onDragStart }, [onDragStart])
  useEffect(() => { onReturnRef.current = onReturnToDock }, [onReturnToDock])
  useEffect(() => { onSnapChangeRef.current = onSnapChange }, [onSnapChange])

  const handleMove = useRef((e: PointerEvent) => {
    if (!drag.current || !rootRef.current) return
    const moved = Math.hypot(e.clientX - drag.current.startClientX, e.clientY - drag.current.startClientY)
    if (!isDragging.current && moved > DRAG_THRESHOLD_PX) {
      isDragging.current = true
      onDragStartRef.current({ x: drag.current.startClientX, y: drag.current.startClientY })
    }
    if (!isDragging.current) return
    rootRef.current.style.left = `${e.clientX - drag.current.offsetX}px`
    rootRef.current.style.top = `${e.clientY - drag.current.offsetY}px`
    if (placeholderRef?.current) {
      const pr = placeholderRef.current.getBoundingClientRect()
      const near =
        e.clientX >= pr.left - SNAP_PADDING_PX && e.clientX <= pr.right + SNAP_PADDING_PX &&
        e.clientY >= pr.top - SNAP_PADDING_PX && e.clientY <= pr.bottom + SNAP_PADDING_PX
      if (near !== isNearSnap.current) { isNearSnap.current = near; onSnapChangeRef.current?.(near) }
    }
  })

  const handleUp = useRef((e: PointerEvent) => {
    if (!drag.current) return
    const { offsetX, offsetY, savedStyles } = drag.current
    const wasDragging = isDragging.current
    drag.current = null
    isDragging.current = false
    window.removeEventListener('pointermove', handleMove.current)
    window.removeEventListener('pointerup', handleUp.current)

    if (isNearSnap.current) { isNearSnap.current = false; onSnapChangeRef.current?.(false) }

    if (!wasDragging) {
      // Restore pre-pointerdown styles — removeProperty would wipe React-managed
      // position/left/top, leaving the portaled element without position (falls to bottom).
      if (rootRef.current) restoreStyle(rootRef.current, savedStyles)
      return
    }

    if (placeholderRef?.current) {
      const pr = placeholderRef.current.getBoundingClientRect()
      const vx = e.clientX - offsetX; const vy = e.clientY - offsetY
      const w = rootRef.current?.offsetWidth ?? 0; const h = rootRef.current?.offsetHeight ?? 0
      const overHome =
        vx + w / 2 >= pr.left - SNAP_PADDING_PX && vx + w / 2 <= pr.right + SNAP_PADDING_PX &&
        vy + h / 2 >= pr.top - SNAP_PADDING_PX && vy + h / 2 <= pr.bottom + SNAP_PADDING_PX
      if (overHome) { onReturnRef.current(); return }
    }

    const vx = e.clientX - offsetX; const vy = e.clientY - offsetY
    const nearEdge = vx < 48 || vy < 48 || vx > window.innerWidth - 220 || vy > window.innerHeight - 80
    onDragEndRef.current({ x: vx, y: vy }, nearEdge ? 'fixed' : 'floating')
  })

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0 || !rootRef.current) return
    e.preventDefault()
    const el = rootRef.current
    const rect = el.getBoundingClientRect()
    const savedStyles: SavedStyles = {
      position: el.style.position, left: el.style.left, top: el.style.top,
      margin: el.style.margin, zIndex: el.style.zIndex,
    }
    drag.current = { offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top, startClientX: e.clientX, startClientY: e.clientY, savedStyles }
    isDragging.current = false
    el.style.position = 'fixed'
    el.style.left = `${rect.left}px`
    el.style.top = `${rect.top}px`
    el.style.margin = '0'
    el.style.zIndex = '9999'
    window.addEventListener('pointermove', handleMove.current)
    window.addEventListener('pointerup', handleUp.current)
  }, [rootRef])

  useEffect(() => {
    const move = handleMove.current; const up = handleUp.current
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
  }, [])

  return { onPointerDown }
}
