<template>
  <div class="error-message">
    <p class="error-text">{{ message || 'An unexpected error occurred.' }}</p>
    <button @click="$emit('retry')" class="retry-button">Retry</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  message: string | null
}>()

defineEmits(['retry'])
</script>

<style scoped>

.error-message {
  text-align: center;
  padding: 1rem;
}

.error-text {
  color: var(--color-error);
  margin-bottom: 1rem;
  font-weight: 500;
}

.retry-button {
  background-color: var(--color-text-muted);
  color: #fff;
}

.retry-button:hover {
  background-color: darken(var(--color-text-muted), 10%);
}

</style> 
