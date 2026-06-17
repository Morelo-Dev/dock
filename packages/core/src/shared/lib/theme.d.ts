export type Theme = {
    colors?: {
        primary?: string;
        danger?: string;
        neutral?: string;
    };
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    fontFamily?: string;
};
export declare function applyTheme(element: HTMLElement, theme: Theme): void;
//# sourceMappingURL=theme.d.ts.map