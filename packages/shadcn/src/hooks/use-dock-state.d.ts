export type DockMode = 'docked' | 'dragging' | 'floating' | 'fixed';
export type Position = {
    x: number;
    y: number;
};
export type DockState = {
    mode: DockMode;
    position: Position | null;
};
export declare function useDockState(): {
    state: DockState;
    startDrag: (position: Position) => void;
    commit: (position: Position, mode: DockMode) => void;
    returnToDock: () => void;
};
//# sourceMappingURL=use-dock-state.d.ts.map