import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useRef } from 'react';
import { applyTheme } from '../lib/theme';
import '../../shared/tokens/index';
const ThemeContext = createContext({ theme: {} });
export function useTheme() {
    return useContext(ThemeContext);
}
export function ThemeProvider({ theme = {}, children }) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current)
            applyTheme(ref.current, theme);
    }, [theme]);
    return (_jsx(ThemeContext.Provider, { value: { theme }, children: _jsx("div", { ref: ref, className: "dock-theme-root", style: { display: 'contents' }, children: children }) }));
}
//# sourceMappingURL=ThemeProvider.js.map