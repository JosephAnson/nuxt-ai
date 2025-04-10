<template>
  <div>
    <h1>Chart Example</h1>
    <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Using Vue's ref for DOM access
const chartContainer = ref(null)

// Proper DOM manipulation after hydration is complete
onMounted(() => {
  if (chartContainer.value) {
    renderChart(chartContainer.value)
  }
})

function renderChart(element) {
  // Using a declarative approach with Vue's reactivity
  const chart = document.createElement('div')
  chart.className = 'chart'
  chart.textContent = 'Chart Content'
  
  // Clean up any existing content
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
  
  element.appendChild(chart)
}
</script>

<style scoped>
.chart-container {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
}
</style> 