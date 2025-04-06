// Example of proper font handling with Nuxt assets
export default `
// assets/css/fonts.css
/* Define font faces with proper formats and descriptors */
@font-face {
  font-family: 'CustomFont';
  src: url('../fonts/CustomFont.woff2') format('woff2'),
       url('../fonts/CustomFont.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: 'CustomFont';
  src: url('../fonts/CustomFont-Bold.woff2') format('woff2'),
       url('../fonts/CustomFont-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+000-5FF;
}

/* Define font variables */
:root {
  --font-primary: 'CustomFont', system-ui, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', monospace;
  --font-size-base: 1rem;
  --line-height-base: 1.5;
}

/* Apply fonts with proper fallbacks */
body {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: var(--font-mono);
  font-size: 0.9em;
}

/* Use proper font loading */
<script>
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/CustomFont.woff2',
          crossorigin: 'anonymous'
        }
      ]
    }
  }
})
</script>
`
