// ❌ Wrong: No proper test organization
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

// ❌ Wrong: No describe blocks
it('it works', () => {
  // ❌ Wrong: No proper component mounting
  const wrapper = mount(MyComponent)
  expect(wrapper.text()).toBe('something')
})

// ❌ Wrong: Testing implementation details
it('internal method works', () => {
  const wrapper = mount(MyComponent)
  // ❌ Wrong: Accessing private methods
  expect(wrapper.vm._calculateTotal()).toBe(100)
})

// ❌ Wrong: No error handling
it('api call works', async () => {
  const wrapper = mount(MyComponent)
  // ❌ Wrong: No proper async handling
  await wrapper.vm.fetchData()
  expect(wrapper.text()).toBe('data')
})

// ❌ Wrong: Testing multiple things
it('component functionality', () => {
  const wrapper = mount(MyComponent)

  // ❌ Wrong: Multiple assertions without context
  expect(wrapper.find('button').exists()).toBe(true)
  expect(wrapper.text()).toContain('hello')
  expect(wrapper.vm.data).toBeDefined()
  expect(wrapper.emitted().click).toBeTruthy()
})

// ❌ Wrong: No cleanup
it('state changes', () => {
  // ❌ Wrong: Modifying global state without cleanup
  window.localStorage.setItem('test', 'value')
  const wrapper = mount(MyComponent)
  expect(wrapper.vm.value).toBe('value')
})

// ❌ Wrong: Hardcoded timeouts
it('async operation', async () => {
  const wrapper = mount(MyComponent)
  wrapper.vm.doSomething()
  // ❌ Wrong: Using setTimeout in tests
  await new Promise(resolve => setTimeout(resolve, 1000))
  expect(wrapper.text()).toBe('done')
})
