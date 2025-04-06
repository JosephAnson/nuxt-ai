// Example of poor CSS handling and organization
export default `
/* ❌ Wrong: Global styles without proper organization */
.button {
  /* Wrong: Hardcoded colors */
  background-color: #00dc82;
  color: white;
  /* Wrong: Magic numbers */
  padding: 12px 24px;
  border-radius: 4px;
}

/* Wrong: No media queries or responsive design */
.container {
  width: 1200px;
  margin: 0 auto;
}

/* Wrong: No CSS variables or theming */
.text-primary {
  color: #00dc82;
}

/* Wrong: No proper nesting or organization */
.card .card-title {
  font-size: 24px;
}
.card .card-body {
  padding: 16px;
}
.card .card-footer {
  border-top: 1px solid #eee;
}
`
