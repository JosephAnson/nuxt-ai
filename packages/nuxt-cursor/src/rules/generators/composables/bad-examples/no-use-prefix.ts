// ❌ WRONG: Not using "use" prefix
export function counter() {
  const count = ref(0)
  return { count }
}
