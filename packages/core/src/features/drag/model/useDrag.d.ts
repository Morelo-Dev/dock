import type { RefObject } from 'react';
import type { DockMode, Position } from '../../position/model/types';
type UseDragOptions = {
    rootRef: RefObject<HTMLElement | null>;
    placeholderRef?: RefObject<HTMLElement | null>;
    onDragStart: (initialViewportPos: Position) => void;
    onDragEnd: (viewportPos: Position, mode: DockMode) => void;
    onReturnToDock: () => void;
    onSnapChange?: (isNear: boolean) => void;
};
export declare function useDrag({ rootRef, placeholderRef, onDragStart, onDragEnd, onReturnToDock, onSnapChange, }: UseDragOptions): {
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => void;
};
export {};
//# sourceMappingURL=useDrag.d.ts.map