// ❌ WRONG: Direct DOM manipulation
export function useWindowSize() {
  const width = ref(0)
  const height = ref(0)

  // Direct window access will fail in SSR
  width.value = window.innerWidth
  height.value = window.innerHeight

  // No cleanup
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  })

  return { width, height }
}
