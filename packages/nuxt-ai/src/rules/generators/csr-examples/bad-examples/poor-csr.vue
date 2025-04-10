<script>
// ❌ Wrong: Not using script setup
export default {
  data() {
    return {
      count: 0
    }
  },
  
  // ❌ Wrong: Not cleaning up event listeners
  mounted() {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)
    
    // ❌ Wrong: Direct DOM manipulation
    document.body.style.overflow = 'hidden'
  },
  
  methods: {
    // ❌ Wrong: Not using proper error handling
    async fetchData() {
      const response = await fetch('/api/data')
      this.data = await response.json()
    },
    
    handleResize() {
      this.width = window.innerWidth
    },
    
    handleScroll() {
      // ❌ Wrong: Direct DOM access
      const scrollTop = document.documentElement.scrollTop
      if (scrollTop > 100) {
        this.showHeader = false
      }
    }
  },
  
  // ❌ Wrong: Not using proper watchers
  watch: {
    count(newVal) {
      // ❌ Wrong: Direct localStorage mutation
      localStorage.setItem('count', newVal)
    }
  }
}
</script>

<template>
  <!-- ❌ Wrong: Not handling loading states -->
  <div>
    <div v-if="data">
      {{ data.title }}
    </div>
    
    <!-- ❌ Wrong: Not using proper event handling -->
    <button onclick="this.count++">
      Increment
    </button>
  </div>
</template> 