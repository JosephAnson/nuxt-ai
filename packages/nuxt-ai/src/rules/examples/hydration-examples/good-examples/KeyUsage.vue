<template>
  <div>
    <h2>Todo List</h2>
    <ul>
      <!-- Using a unique and stable key for list rendering -->
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <button @click="toggleComplete(todo.id)">
          {{ todo.completed ? '✓' : '○' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([
  { id: 1, text: 'Learn Nuxt', completed: true },
  { id: 2, text: 'Build an app', completed: false },
  { id: 3, text: 'Deploy to production', completed: false }
])

function toggleComplete(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
}
</script> 