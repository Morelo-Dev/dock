import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { cn } from '../../../shared/lib/cn';
import styles from './Button.module.css';
export const Button = forwardRef(({ variant = 'primary', size = 'md', loading = false, disabled = false, leftIcon, rightIcon, iconOnly = false, className, children, ...rest }, ref) => {
    return (_jsxs("button", { ref: ref, disabled: disabled || loading, "aria-busy": loading, className: cn(styles.button, styles[variant], styles[size], iconOnly && styles.iconOnly, loading && styles.loading, className), ...rest, children: [loading ? (_jsx("span", { className: styles.spinner, "aria-hidden": true })) : (leftIcon && _jsx("span", { "aria-hidden": true, children: leftIcon })), !iconOnly && children, rightIcon && !loading && _jsx("span", { "aria-hidden": true, children: rightIcon })] }));
});
Button.displayName = 'Button';
//# sourceMappingURL=Button.js.map