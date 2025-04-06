// Example of proper CSS handling with Nuxt assets
export default `
// assets/css/main.css
@import './variables.css';
@import './typography.css';
@import './utilities.css';

:root {
  /* Use CSS variables for theming */
  --primary-color: theme('colors.primary');
  --text-color: theme('colors.gray.900');
  --background-color: theme('colors.white');
}

/* Use proper media queries */
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: theme('colors.gray.100');
    --background-color: theme('colors.gray.900');
  }
}

/* Use proper CSS nesting */
.container {
  max-width: theme('screens.xl');
  margin: 0 auto;
  padding: theme('spacing.4');

  @media (min-width: theme('screens.lg')) {
    padding: theme('spacing.6');
  }

  & > * + * {
    margin-top: theme('spacing.4');
  }
}

/* Use proper CSS custom properties */
.button {
  background-color: var(--primary-color);
  color: var(--background-color);
  padding: theme('spacing.2') theme('spacing.4');
  border-radius: theme('borderRadius.md');
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
}

/* Use proper utility classes */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`
