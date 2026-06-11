import { useCallback, useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import type { DockMode, Position } from '../../position/model/types'

type DragState = {
  offsetX: number
  offsetY: number
  startClientX: number
  startClientY: number
}

type UseDragOptions = {
  rootRef: RefObject<HTMLElement | null>
  onDragStart: (initialViewportPos: Position) => void
  onDragEnd: (viewportPos: Position, mode: DockMode) => void
  onReturnToDock: () => void
}

const DRAG_THRESHOLD_PX = 6
const DOUBLE_TAP_MS = 320

export function useDrag({ rootRef, onDragStart, onDragEnd, onReturnToDock }: UseDragOptions) {
  const drag = useRef<DragState | null>(null)
  const lastTapTime = useRef(0)
  const isDragging = useRef(false)

  // Stable callback refs — event listeners always call the latest version
  const onDragEndRef = useRef(onDragEnd)
  const onDragStartRef = useRef(onDragStart)
  const onReturnRef = useRef(onReturnToDock)
  useEffect(() => { onDragEndRef.current = onDragEnd }, [onDragEnd])
  useEffect(() => { onDragStartRef.current = onDragStart }, [onDragStart])
  useEffect(() => { onReturnRef.current = onReturnToDock }, [onReturnToDock])

  const handleMove = useRef((e: PointerEvent) => {
    if (!drag.current || !rootRef.current) return
    const moved = Math.hypot(
      e.clientX - drag.current.startClientX,
      e.clientY - drag.current.startClientY,
    )
    if (!isDragging.current && moved > DRAG_THRESHOLD_PX) {
      isDragging.current = true
      onDragStartRef.current({ x: drag.current.startClientX, y: drag.current.startClientY })
    }
    if (isDragging.current) {
      rootRef.current.style.left = `${e.clientX - drag.current.offsetX}px`
      rootRef.current.style.top = `${e.clientY - drag.current.offsetY}px`
    }
  })

  const handleUp = useRef((e: PointerEvent) => {
    if (!drag.current) return
    const { offsetX, offsetY } = drag.current
    const wasDragging = isDragging.current
    drag.current = null
    isDragging.current = false

    window.removeEventListener('pointermove', handleMove.current)
    window.removeEventListener('pointerup', handleUp.current)

    if (!wasDragging) {
      // It was a tap — restore any style changes
      if (rootRef.current) {
        rootRef.current.style.removeProperty('position')
        rootRef.current.style.removeProperty('left')
        rootRef.current.style.removeProperty('top')
        rootRef.current.style.removeProperty('margin')
        rootRef.current.style.removeProperty('z-index')
      }
      // Double-tap → return to dock
      const now = Date.now()
      if (now - lastTapTime.current < DOUBLE_TAP_MS) {
        lastTapTime.current = 0
        onReturnRef.current()
      } else {
        lastTapTime.current = now
      }
      return
    }

    // Actual drag — commit final position
    const vx = e.clientX - offsetX
    const vy = e.clientY - offsetY
    const nearEdge =
      vx < 48 || vy < 48 || vx > window.innerWidth - 220 || vy > window.innerHeight - 80

    onDragEndRef.current({ x: vx, y: vy }, nearEdge ? 'fixed' : 'floating')
  })

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.button !== 0 || !rootRef.current) return
      e.preventDefault()

      const rect = rootRef.current.getBoundingClientRect()
      drag.current = {
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
        startClientX: e.clientX,
        startClientY: e.clientY,
      }
      isDragging.current = false

      // Prepare for potential drag (snap to fixed so it moves freely)
      rootRef.current.style.position = 'fixed'
      rootRef.current.style.left = `${rect.left}px`
      rootRef.current.style.top = `${rect.top}px`
      rootRef.current.style.margin = '0'
      rootRef.current.style.zIndex = '9999'

      window.addEventListener('pointermove', handleMove.current)
      window.addEventListener('pointerup', handleUp.current)
    },
    [rootRef],
  )

  useEffect(() => {
    const move = handleMove.current
    const up = handleUp.current
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return { onPointerDown }
}
