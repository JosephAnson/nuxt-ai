import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import UserProfile from '~/components/UserProfile.vue'
import { useUserStore } from '~/stores/user'

describe('userProfile', () => {
  // Setup mock data
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
      theme: 'light',
      notifications: true,
    },
  }

  // Helper to create wrapper with options
  function createWrapper(options = {}) {
    return mount(UserProfile, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              user: { user: mockUser },
            },
          }),
        ],
        stubs: {
          NuxtLink: true,
        },
      },
      ...options,
    })
  }

  it('renders user information correctly', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('[data-test="user-name"]').text()).toBe(mockUser.name)
    expect(wrapper.find('[data-test="user-email"]').text()).toBe(mockUser.email)
  })

  it('updates user preferences', async () => {
    const wrapper = createWrapper()
    const store = useUserStore()

    // Trigger preference change
    await wrapper.find('[data-test="theme-toggle"]').trigger('click')

    expect(store.updatePreferences).toHaveBeenCalledWith({
      theme: 'dark',
    })
  })

  it('handles loading state', () => {
    const wrapper = createWrapper({
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              user: { loading: true },
            },
          }),
        ],
      },
    })

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="user-info"]').exists()).toBe(false)
  })

  it('handles error state', () => {
    const error = new Error('Failed to load user')
    const wrapper = createWrapper({
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              user: { error },
            },
          }),
        ],
      },
    })

    expect(wrapper.find('[data-test="error"]').text()).toContain(error.message)
  })
})
