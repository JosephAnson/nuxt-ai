// Example of poor font handling and loading
export default `
/* ❌ Wrong: Poor font loading and fallbacks */
@font-face {
  /* Wrong: Missing font formats and descriptors */
  font-family: 'CustomFont';
  src: url('/fonts/custom.ttf');
}

/* Wrong: No font variables or system fallbacks */
body {
  font-family: CustomFont;
}

/* Wrong: No font preloading */
h1, h2, h3 {
  /* Wrong: Hardcoded font stack */
  font-family: Arial, sans-serif;
}

/* Wrong: No font optimization */
@import url('https://fonts.googleapis.com/css2?family=OpenSans');
`
