<!-- ❌ WRONG: Not using TypeScript or script setup -->
<!-- This example shows incorrect usage of Vue components -->

<script>
export default {
  props: ['title', 'description'], // Wrong: No types
  methods: {
    handleClick() {
      this.$emit('click') // Wrong: No event type
    }
  }
}
</script>

<template>
  <div @click="$emit('click', $event)">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<style>
/* Wrong: Not using scoped styles */
h2 {
  margin-bottom: 10px;
}
</style> 