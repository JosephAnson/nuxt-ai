// Example of middleware without proper type safety
export default `
// ❌ Wrong: Not using defineNuxtRouteMiddleware
export default (to, from) => {
  // Wrong: No type safety
  if (!to.meta.auth) return
  // ...
}
`
