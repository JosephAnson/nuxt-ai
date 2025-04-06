import { defineStore } from 'pinia'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  loading: boolean
  error: Error | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    loading: false,
    error: null,
  }),

  getters: {
    totalItems: state => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: state => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    isEmpty: state => state.items.length === 0,
  },

  actions: {
    async addItem(item: Omit<CartItem, 'quantity'>) {
      this.loading = true

      try {
        // Check if item already exists
        const existingItem = this.items.find(i => i.id === item.id)

        if (existingItem) {
          await this.updateQuantity(item.id, existingItem.quantity + 1)
        }
        else {
          // Add new item
          const { data } = await useFetch('/api/cart/add', {
            method: 'POST',
            body: { ...item, quantity: 1 },
          })

          this.items.push({ ...item, quantity: 1 })
        }
      }
      catch (err) {
        this.error = err as Error
        throw createError({
          statusCode: 400,
          message: 'Failed to add item to cart',
        })
      }
      finally {
        this.loading = false
      }
    },

    async updateQuantity(itemId: string, quantity: number) {
      if (quantity < 0)
        return

      try {
        await useFetch(`/api/cart/${itemId}`, {
          method: 'PATCH',
          body: { quantity },
        })

        const item = this.items.find(i => i.id === itemId)
        if (item) {
          item.quantity = quantity
        }
      }
      catch (err) {
        throw createError({
          statusCode: 400,
          message: 'Failed to update quantity',
        })
      }
    },

    async removeItem(itemId: string) {
      try {
        await useFetch(`/api/cart/${itemId}`, {
          method: 'DELETE',
        })

        this.items = this.items.filter(item => item.id !== itemId)
      }
      catch (err) {
        throw createError({
          statusCode: 400,
          message: 'Failed to remove item',
        })
      }
    },

    clearCart() {
      this.items = []
      this.error = null
    },
  },
})
