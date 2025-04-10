<template>
  <div>
    <h2>Todo List</h2>
    <ul>
      <!-- BAD: Missing or non-unique keys -->
      <li v-for="(todo, index) in todos">
        {{ todo.text }}
        <button @click="removeTodo(index)">Delete</button>
      </li>
    </ul>
    
    <ul>
      <!-- BAD: Using index as key when items can be reordered -->
      <li v-for="(todo, index) in sortableTodos" :key="index">
        {{ todo.text }}
        <button @click="moveUp(index)" v-if="index > 0">Move Up</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([
  { text: 'Learn Nuxt', completed: true },
  { text: 'Build an app', completed: false },
  { text: 'Deploy to production', completed: false }
])

const sortableTodos = ref([
  { text: 'First task', priority: 1 },
  { text: 'Second task', priority: 2 },
  { text: 'Third task', priority: 3 }
])

function removeTodo(index) {
  todos.value.splice(index, 1)
}

function moveUp(index) {
  if (index > 0) {
    const temp = sortableTodos.value[index]
    sortableTodos.value[index] = sortableTodos.value[index - 1]
    sortableTodos.value[index - 1] = temp
  }
}
</script> 