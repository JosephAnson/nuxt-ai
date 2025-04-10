<script setup lang="ts">
interface CardProps {
  title: string;
  description: string;
  image?: string;
}

const props = defineProps<CardProps>()
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <div @click="handleClick">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <img v-if="image" :src="image" alt="Card image">
  </div>
</template>

<style scoped>
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}

img {
  width: 100%;
  height: auto;
  border-radius: 0.25rem;
}
</style> 