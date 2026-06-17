import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { GradebookPage } from '../pages/gradebook';
import { ShadcnPage } from '../pages/shadcn';
import { Navbar } from '../widgets/navbar';
export function AppRoutes() {
    return (_jsxs("div", { style: { minHeight: '100vh', display: 'flex', flexDirection: 'column' }, children: [_jsx(Navbar, {}), _jsx("main", { style: { flex: 1 }, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/gradebook", element: _jsx(GradebookPage, {}) }), _jsx(Route, { path: "/shadcn", element: _jsx(ShadcnPage, {}) })] }) })] }));
}
//# sourceMappingURL=routes.js.map