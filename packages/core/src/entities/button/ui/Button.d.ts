import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import type { ButtonVariant, ButtonSize } from '../model/types';
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    /** Renders icon-only layout (no label, square padding) */
    iconOnly?: boolean;
};
export declare const Button: import("react").ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    /** Renders icon-only layout (no label, square padding) */
    iconOnly?: boolean;
} & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Button.d.ts.map