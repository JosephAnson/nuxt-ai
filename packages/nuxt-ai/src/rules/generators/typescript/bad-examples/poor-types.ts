// ❌ Wrong: Using any type
function processData(data: any) {
  return data.value
}

// ❌ Wrong: Not using proper interfaces
interface UserData {
  n: string // ❌ Wrong: Poor naming
  e: string // ❌ Wrong: Poor naming
  a: boolean // ❌ Wrong: Poor naming
}

// ❌ Wrong: Not using proper type guards
function handleResponse(response: unknown) {
  // @ts-ignore ❌ Wrong: Ignoring TypeScript errors
  return response.data
}

// ❌ Wrong: Not using proper generics
class Store {
  // ❌ Wrong: Using any[]
  private items: any[] = []

  // ❌ Wrong: Not typing parameters
  add(item) {
    this.items.push(item)
  }

  // ❌ Wrong: Not typing return value
  get(index) {
    return this.items[index]
  }
}

// ❌ Wrong: Not using proper union types
const status = null // ❌ Wrong: Implicit any

// ❌ Wrong: Not using proper type assertions
const element = document.getElementById('app') as any

// ❌ Wrong: Not using proper function types
// @ts-expect-error ❌ Wrong: Suppressing TypeScript errors
function handler(evt) {
  console.log(evt.target.value)
}

// ❌ Wrong: Not using proper interfaces for Vue components
export default defineComponent({
  props: {
    // ❌ Wrong: Not using proper prop types
    value: null,
  },

  // ❌ Wrong: Not typing component data
  data() {
    return {
      items: [],
    }
  },
})
