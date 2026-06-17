import { useReducer, useCallback } from 'react';
function reducer(state, action) {
    switch (action.type) {
        case 'START_DRAG': return { mode: 'dragging', position: action.position };
        case 'COMMIT': return { mode: action.mode, position: action.position };
        case 'RETURN_TO_DOCK': return { mode: 'docked', position: null };
        default: return state;
    }
}
export function useDockState() {
    const [state, dispatch] = useReducer(reducer, { mode: 'docked', position: null });
    const startDrag = useCallback((position) => dispatch({ type: 'START_DRAG', position }), []);
    const commit = useCallback((position, mode) => dispatch({ type: 'COMMIT', position, mode }), []);
    const returnToDock = useCallback(() => dispatch({ type: 'RETURN_TO_DOCK' }), []);
    return { state, startDrag, commit, returnToDock };
}
//# sourceMappingURL=use-dock-state.js.map