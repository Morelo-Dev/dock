import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../shared/lib/cn';
import { useDockState } from '../../../features/position/model/useDockState';
import { useDrag } from '../../../features/drag/model/useDrag';
import { DockHandle } from './DockHandle';
import styles from './ButtonDock.module.css';
const EDGE_MARGIN = 8;
function clampViewport(vx, vy, w, h) {
    return {
        x: Math.max(EDGE_MARGIN, Math.min(vx, window.innerWidth - w - EDGE_MARGIN)),
        y: Math.max(EDGE_MARGIN, Math.min(vy, window.innerHeight - h - EDGE_MARGIN)),
    };
}
function HomeIcon() {
    return (_jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: [_jsx("path", { d: "M3 12L12 4l9 8" }), _jsx("path", { d: "M9 21V12h6v9" }), _jsx("path", { d: "M3 21h18" })] }));
}
function PinIcon() {
    return (_jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: [_jsx("line", { x1: "12", y1: "17", x2: "12", y2: "22" }), _jsx("path", { d: "M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" })] }));
}
function UnpinIcon() {
    return (_jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, children: [_jsx("line", { x1: "2", y1: "2", x2: "22", y2: "22" }), _jsx("line", { x1: "12", y1: "17", x2: "12", y2: "22" }), _jsx("path", { d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h12" }), _jsx("path", { d: "M15 9.34V6h1a2 2 0 0 0 0-4H7.89" })] }));
}
export function ButtonDock({ children, showMode = false, zIndex }) {
    const { state, startDrag, commit, returnToDock } = useDockState();
    const rootRef = useRef(null);
    const placeholderRef = useRef(null);
    const [placeholderSize, setPlaceholderSize] = useState(null);
    const [isNearSnap, setIsNearSnap] = useState(false);
    const measuredRef = useRef(false);
    const isDocked = state.mode === 'docked';
    const isDragging = state.mode === 'dragging';
    const isFloating = state.mode === 'floating';
    const isFixed = state.mode === 'fixed';
    const isDetached = !isDocked;
    // ── Measure placeholder once while docked ──────────────────────────────────
    useLayoutEffect(() => {
        if (!isDocked) {
            measuredRef.current = false;
            return;
        }
        if (measuredRef.current || !rootRef.current)
            return;
        measuredRef.current = true;
        setPlaceholderSize({ w: rootRef.current.offsetWidth, h: rootRef.current.offsetHeight });
    }, [isDocked]);
    // ── Post-commit boundary clamp (runs before browser paint) ────────────────
    // useDrag captures dockW at pointerdown (before extra buttons render), so it
    // may undercount. Here we re-check with the real rendered size and fix it.
    useLayoutEffect(() => {
        if (isDragging || isDocked || !state.position || !rootRef.current)
            return;
        const { width: w, height: h } = rootRef.current.getBoundingClientRect();
        if (w === 0)
            return;
        if (isFixed) {
            const { x: cx, y: cy } = clampViewport(state.position.x, state.position.y, w, h);
            if (Math.round(cx) !== Math.round(state.position.x) || Math.round(cy) !== Math.round(state.position.y)) {
                commit({ x: cx, y: cy }, 'fixed');
            }
        }
        else if (isFloating) {
            const vx = state.position.x - window.scrollX;
            const vy = state.position.y - window.scrollY;
            const { x: cx, y: cy } = clampViewport(vx, vy, w, h);
            if (Math.round(cx) !== Math.round(vx) || Math.round(cy) !== Math.round(vy)) {
                commit({ x: cx + window.scrollX, y: cy + window.scrollY }, 'floating');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.position, state.mode]);
    const handleDragStart = useCallback((pos) => { startDrag(pos); }, [startDrag]);
    const handleDragEnd = useCallback((viewportPos, mode) => {
        commit(mode === 'fixed'
            ? viewportPos
            : { x: viewportPos.x + window.scrollX, y: viewportPos.y + window.scrollY }, mode);
    }, [commit]);
    const { onPointerDown } = useDrag({
        rootRef,
        placeholderRef,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        onReturnToDock: returnToDock,
        onSnapChange: setIsNearSnap,
    });
    const handleToggleMode = useCallback(() => {
        if (!state.position || !rootRef.current)
            return;
        const { width: w, height: h } = rootRef.current.getBoundingClientRect();
        if (isFloating) {
            const { x, y } = clampViewport(state.position.x - window.scrollX, state.position.y - window.scrollY, w, h);
            commit({ x, y }, 'fixed');
        }
        else if (isFixed) {
            commit({ x: state.position.x + window.scrollX, y: state.position.y + window.scrollY }, 'floating');
        }
    }, [state, isFloating, isFixed, commit]);
    function getPositionStyle() {
        if (isDocked)
            return {};
        if (!state.position)
            return {};
        const z = zIndex ?? (isDragging ? 9999 : 1000);
        if (isDragging)
            return { position: 'fixed', left: state.position.x, top: state.position.y, margin: 0, zIndex: z };
        return { position: isFixed ? 'fixed' : 'absolute', left: state.position.x, top: state.position.y, margin: 0, zIndex: z };
    }
    const dockEl = (_jsxs("div", { ref: rootRef, "data-dock-root": true, "data-mode": state.mode, style: getPositionStyle(), className: cn(styles.root, isDetached && styles.detached, isDragging && styles.dragging, isNearSnap && styles.snapping), children: [_jsx(DockHandle, { onPointerDown: onPointerDown }), _jsx("div", { className: styles.divider, "aria-hidden": true }), children, isDetached && !isDragging && (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.divider, "aria-hidden": true }), _jsx("button", { className: cn(styles.iconBtn, isFixed && styles.pinBtn), onClick: handleToggleMode, "aria-label": isFixed ? 'Desfijar — desplazar con el scroll' : 'Fijar en pantalla', title: isFixed ? 'Desfijar — desplazar con el scroll' : 'Fijar en pantalla', children: isFixed ? _jsx(UnpinIcon, {}) : _jsx(PinIcon, {}) }), _jsx("button", { className: cn(styles.iconBtn, styles.homeBtn), onClick: returnToDock, "aria-label": "Volver al lugar de origen", title: "Volver al lugar de origen", children: _jsx(HomeIcon, {}) })] })), showMode && _jsx("span", { className: styles.modeBadge, children: state.mode })] }));
    return (_jsxs(_Fragment, { children: [_jsx("div", { ref: placeholderRef, className: cn(styles.placeholder, isDetached && styles.visible, isNearSnap && styles.snapActive), "aria-hidden": isDocked, style: placeholderSize ? { width: placeholderSize.w, height: placeholderSize.h } : undefined, children: isDetached && (_jsxs("button", { className: styles.placeholderBtn, onClick: returnToDock, "aria-label": "Restaurar panel aqu\u00ED", title: "Restaurar panel aqu\u00ED", children: [_jsx(HomeIcon, {}), _jsx("span", { children: "Restaurar aqu\u00ED" })] })) }), isDocked ? dockEl : createPortal(dockEl, document.body)] }));
}
//# sourceMappingURL=ButtonDock.js.map