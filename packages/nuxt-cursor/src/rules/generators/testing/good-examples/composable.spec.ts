import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCart } from '~/composables/useCart'

describe('useCart', () => {
  beforeEach(() => {
    // Create a fresh pinia instance
    setActivePinia(createPinia())

    // Mock fetch
    vi.mock('#app', () => ({
      useFetch: vi.fn(() => ({
        data: ref(null),
        error: ref(null),
        pending: ref(false),
      })),
    }))
  })

  it('initializes with empty cart', () => {
    const { items, totalItems, totalPrice } = useCart()

    expect(items.value).toHaveLength(0)
    expect(totalItems.value).toBe(0)
    expect(totalPrice.value).toBe(0)
  })

  it('adds item to cart', async () => {
    const { addItem, items, totalItems } = useCart()
    const mockItem = {
      id: '1',
      name: 'Test Product',
      price: 9.99,
    }

    await addItem(mockItem)

    expect(items.value).toHaveLength(1)
    expect(items.value[0]).toMatchObject({
      ...mockItem,
      quantity: 1,
    })
    expect(totalItems.value).toBe(1)
  })

  it('updates item quantity', async () => {
    const { addItem, updateQuantity, items } = useCart()
    const mockItem = {
      id: '1',
      name: 'Test Product',
      price: 9.99,
    }

    await addItem(mockItem)
    await updateQuantity('1', 3)

    expect(items.value[0].quantity).toBe(3)
  })

  it('removes item from cart', async () => {
    const { addItem, removeItem, items } = useCart()
    const mockItem = {
      id: '1',
      name: 'Test Product',
      price: 9.99,
    }

    await addItem(mockItem)
    await removeItem('1')

    expect(items.value).toHaveLength(0)
  })

  it('calculates total price correctly', async () => {
    const { addItem, totalPrice } = useCart()
    const mockItems = [
      { id: '1', name: 'Product 1', price: 10.00 },
      { id: '2', name: 'Product 2', price: 20.00 },
    ]

    await Promise.all(mockItems.map(item => addItem(item)))

    expect(totalPrice.value).toBe(30.00)
  })

  it('handles errors when adding items', async () => {
    vi.mock('#app', () => ({
      useFetch: vi.fn(() => {
        throw new Error('Network error')
      }),
    }))

    const { addItem } = useCart()
    const mockItem = {
      id: '1',
      name: 'Test Product',
      price: 9.99,
    }

    await expect(addItem(mockItem)).rejects.toThrow('Network error')
  })
})
