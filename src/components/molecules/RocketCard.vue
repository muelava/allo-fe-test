<template>
  <router-link :to="`/rocket/${rocket.id}`" class="rocket-card-link">
    <div class="rocket-card">
      <div class="image-container">
        <img :src="rocket.flickr_images[0]" :alt="rocket.name" class="rocket-image">
      </div>
      <div class="card-content">
        <h3 class="rocket-name">{{ rocket.name }}</h3>
        <p class="rocket-description">{{ rocket.description }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Rocket {
  id: string
  name: string
  description: string
  flickr_images: string[]
  cost_per_launch?: number
  country?: string
  first_flight?: string
}

defineProps<{
  rocket: Rocket
}>()
</script>

<style src="./RocketCard.scss" scoped></style> 