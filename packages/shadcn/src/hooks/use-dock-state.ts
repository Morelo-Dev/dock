import { useReducer, useCallback } from 'react'

export type DockMode = 'docked' | 'dragging' | 'floating' | 'fixed'
export type Position = { x: number; y: number }
export type DockState = { mode: DockMode; position: Position | null }

type Action =
  | { type: 'START_DRAG'; position: Position }
  | { type: 'COMMIT'; position: Position; mode: DockMode }
  | { type: 'RETURN_TO_DOCK' }
  | { type: 'TOGGLE_MODE' }

function reducer(state: DockState, action: Action): DockState {
  switch (action.type) {
    case 'START_DRAG': return { mode: 'dragging', position: action.position }
    case 'COMMIT': return { mode: action.mode, position: action.position }
    case 'RETURN_TO_DOCK': return { mode: 'docked', position: null }
    case 'TOGGLE_MODE':
      if (state.mode === 'floating') return { ...state, mode: 'fixed' }
      if (state.mode === 'fixed') return { ...state, mode: 'floating' }
      return state
    default: return state
  }
}

export function useDockState() {
  const [state, dispatch] = useReducer(reducer, { mode: 'docked', position: null })
  const startDrag = useCallback((position: Position) => dispatch({ type: 'START_DRAG', position }), [])
  const commit = useCallback((position: Position, mode: DockMode) => dispatch({ type: 'COMMIT', position, mode }), [])
  const returnToDock = useCallback(() => dispatch({ type: 'RETURN_TO_DOCK' }), [])
  const toggleMode = useCallback(() => dispatch({ type: 'TOGGLE_MODE' }), [])
  return { state, startDrag, commit, returnToDock, toggleMode }
}
