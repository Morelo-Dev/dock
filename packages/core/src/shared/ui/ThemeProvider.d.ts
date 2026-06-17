import { type ReactNode } from 'react';
import { type Theme } from '../lib/theme';
import '../../shared/tokens/index';
type ThemeContextValue = {
    theme: Theme;
};
export declare function useTheme(): ThemeContextValue;
type ThemeProviderProps = {
    theme?: Theme;
    children: ReactNode;
};
export declare function ThemeProvider({ theme, children }: ThemeProviderProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ThemeProvider.d.ts.map