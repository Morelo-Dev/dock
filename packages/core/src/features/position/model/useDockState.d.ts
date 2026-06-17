import type { DockState, DockMode, Position } from './types';
export declare function useDockState(): {
    state: DockState;
    startDrag: (position: Position) => void;
    commit: (position: Position, mode: DockMode) => void;
    returnToDock: () => void;
};
//# sourceMappingURL=useDockState.d.ts.map