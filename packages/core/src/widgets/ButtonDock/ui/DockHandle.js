import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './ButtonDock.module.css';
export function DockHandle({ onPointerDown }) {
    return (_jsx("div", { className: styles.handle, onPointerDown: onPointerDown, "aria-label": "Arrastrar barra \u00B7 Doble toque para volver al inicio", role: "button", tabIndex: 0, children: _jsx(HandleIcon, {}) }));
}
function HandleIcon() {
    return (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, children: [_jsx("circle", { cx: "5.5", cy: "4", r: "1.2", fill: "currentColor" }), _jsx("circle", { cx: "5.5", cy: "8", r: "1.2", fill: "currentColor" }), _jsx("circle", { cx: "5.5", cy: "12", r: "1.2", fill: "currentColor" }), _jsx("circle", { cx: "10.5", cy: "4", r: "1.2", fill: "currentColor" }), _jsx("circle", { cx: "10.5", cy: "8", r: "1.2", fill: "currentColor" }), _jsx("circle", { cx: "10.5", cy: "12", r: "1.2", fill: "currentColor" })] }));
}
//# sourceMappingURL=DockHandle.js.map