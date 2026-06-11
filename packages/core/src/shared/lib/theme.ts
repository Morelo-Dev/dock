export type Theme = {
  colors?: {
    primary?: string
    danger?: string
    neutral?: string
  }
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  fontFamily?: string
}

export function applyTheme(element: HTMLElement, theme: Theme): void {
  if (theme.colors?.primary) {
    element.style.setProperty('--dock-color-primary-500', theme.colors.primary)
  }
  if (theme.colors?.danger) {
    element.style.setProperty('--dock-color-danger-500', theme.colors.danger)
  }
  if (theme.fontFamily) {
    element.style.setProperty('--dock-font-family', theme.fontFamily)
  }
  if (theme.radius) {
    const map = { none: '0', sm: '0.25rem', md: '0.5rem', lg: '0.75rem', full: '9999px' }
    element.style.setProperty('--dock-radius-md', map[theme.radius])
  }
}
