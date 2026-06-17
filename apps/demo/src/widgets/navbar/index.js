import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
export function Navbar() {
    return (_jsxs("header", { className: styles.header, children: [_jsxs("div", { className: styles.brand, children: [_jsx("span", { className: styles.logo, children: "\u2B21" }), _jsx("span", { className: styles.name, children: "@deandre-dock/buttons" })] }), _jsxs("nav", { className: styles.nav, children: [_jsx(NavLink, { to: "/", end: true, className: ({ isActive }) => isActive ? styles.active : '', children: "Inicio" }), _jsx(NavLink, { to: "/gradebook", className: ({ isActive }) => isActive ? styles.active : '', children: "Planilla" }), _jsx(NavLink, { to: "/shadcn", className: ({ isActive }) => isActive ? styles.active : '', children: "Shadcn" })] })] }));
}
//# sourceMappingURL=index.js.map