import type { RefObject } from 'react';
import type { DockMode, Position } from './use-dock-state';
type UseDragOptions = {
    rootRef: RefObject<HTMLElement | null>;
    placeholderRef?: RefObject<HTMLElement | null>;
    onDragStart: (pos: Position) => void;
    onDragEnd: (pos: Position, mode: DockMode) => void;
    onReturnToDock: () => void;
    onSnapChange?: (isNear: boolean) => void;
};
export declare function useDrag({ rootRef, placeholderRef, onDragStart, onDragEnd, onReturnToDock, onSnapChange }: UseDragOptions): {
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => void;
};
export {};
//# sourceMappingURL=use-drag.d.ts.map