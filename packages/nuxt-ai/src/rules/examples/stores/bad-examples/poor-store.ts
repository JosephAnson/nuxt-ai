// ❌ Wrong: Not using Pinia or proper store structure
const globalStore = {
  // ❌ Wrong: Using mutable global state
  state: {
    user: null,
    cart: [],
    settings: {},
  },

  // ❌ Wrong: Not using proper mutations/actions
  setUser(user) {
    this.state.user = user
  },

  // ❌ Wrong: Direct state mutation
  addToCart(item) {
    this.state.cart.push(item)
  },

  // ❌ Wrong: No error handling
  async fetchData() {
    const response = await fetch('/api/data')
    const data = await response.json()
    this.state = { ...this.state, ...data }
  },
}

// ❌ Wrong: Exposing store globally
if (process.client) {
  window.__STORE__ = globalStore
}

// ❌ Wrong: Not using proper store access
export function useStore() {
  // ❌ Wrong: Accessing window directly
  return process.client ? window.__STORE__ : globalStore
}

// ❌ Wrong: No TypeScript types
export function updateStore(key, value) {
  const store = useStore()
  store.state[key] = value
}
