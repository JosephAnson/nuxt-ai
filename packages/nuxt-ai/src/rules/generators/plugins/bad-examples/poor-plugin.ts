// ❌ Wrong: Not using defineNuxtPlugin
export default (context: any) => {
  // ❌ Wrong: Using global window object
  if (process.client) {
    window.myGlobalHelper = {
      // ❌ Wrong: Exposing sensitive data globally
      apiKey: 'secret_key_123',
      // ❌ Wrong: Not using typed functions
      async fetchData(url) {
        const response = await fetch(url)
        return response.json()
      },
    }
  }

  // ❌ Wrong: Not using proper injection
  context.app.config.globalProperties.$helper = {
    // ❌ Wrong: Not handling errors
    async makeRequest(url: string) {
      const response = await fetch(url)
      return response.json()
    },
    // ❌ Wrong: Direct DOM manipulation
    showNotification(message: string) {
      const div = document.createElement('div')
      div.textContent = message
      document.body.appendChild(div)
    },
  }

  // ❌ Wrong: Not returning proper plugin structure
  return {
    // ❌ Wrong: Not using provide/inject pattern
    helper: context.app.config.globalProperties.$helper,
  }
}
