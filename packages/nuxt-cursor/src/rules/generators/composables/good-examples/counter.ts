import { useState } from '#app'

export interface UseCounterOptions {
  initial?: number
  min?: number
  max?: number
}

export function useCounter(options: UseCounterOptions = {}) {
  const {
    initial = 0,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
  } = options

  // Use useState for SSR-friendly state
  const count = useState('counter', () => initial)

  function increment() {
    if (count.value < max) {
      count.value++
    }
  }

  function decrement() {
    if (count.value > min) {
      count.value--
    }
  }

  // Cleanup if needed
  onUnmounted(() => {
    // Clear state when component unmounts
    count.value = initial
  })

  return {
    count: readonly(count),
    increment,
    decrement,
  }
}
