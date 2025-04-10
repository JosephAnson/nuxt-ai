<template>
  <div>
    <h1>Chart Example</h1>
    <div id="chart-container"></div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'

// BAD: Direct DOM manipulation without waiting for hydration
onMounted(() => {
  // This will cause hydration mismatches
  const container = document.getElementById('chart-container')
  container.innerHTML = '<div class="chart">Chart Content</div>'
  
  // Adding event listeners directly to DOM
  container.addEventListener('click', () => {
    alert('Chart clicked!')
  })
  
  // Modifying DOM styles directly
  container.style.backgroundColor = '#f0f0f0'
  container.style.padding = '20px'
  container.style.borderRadius = '8px'
})
</script> 