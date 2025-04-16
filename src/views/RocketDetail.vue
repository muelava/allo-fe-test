<template>
  <div class="rocket-detail-container">
    <router-link to="/" class="back-link">&larr; Back to Rockets</router-link>

    <!-- Loading State -->
    <div v-if="loading" class="state-container loading-container">
      <LoadingSpinner />
      <p>Loading rocket details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !selectedRocket" class="state-container error-container">
      <ErrorMessage :message="error || 'Rocket not found.'" @retry="fetchData" />
    </div>

    <!-- Success State -->
    <div v-else class="rocket-details">
      <div class="detail-header">
        <img :src="selectedRocket.flickr_images?.[0] || 'https://via.placeholder.com/700x400?text=No+Image'" 
     :alt="selectedRocket.name" 
     class="rocket-image-large">

        <h1 class="rocket-title">{{ selectedRocket.name }}</h1>
      </div>
      <p class="description">{{ selectedRocket.description }}</p>
      <div class="details-grid">
        <div class="detail-item" v-if="selectedRocket.country">
          <strong>Country:</strong>
          <span>{{ selectedRocket.country }}</span>
        </div>
        <div class="detail-item" v-if="selectedRocket.first_flight">
          <strong>First Flight:</strong>
          <span>{{ formatDate(selectedRocket.first_flight) }}</span>
        </div>
        <div class="detail-item" v-if="selectedRocket.cost_per_launch">
          <strong>Cost Per Launch:</strong>
          <span>${{ selectedRocket.cost_per_launch.toLocaleString() }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useRocketStore } from '@/store/rockets'
import LoadingSpinner from '@/components/atoms/LoadingSpinner.vue'
import ErrorMessage from '@/components/atoms/ErrorMessage.vue'

const route = useRoute()
const rocketStore = useRocketStore()
const { selectedRocket, loading, error } = storeToRefs(rocketStore)
const { fetchRocketById, clearSelectedRocket } = rocketStore

const rocketId = computed(() => route.params.id as string)

const fetchData = () => {
  if (rocketId.value) {
    fetchRocketById(rocketId.value)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

onMounted(() => {
  fetchData()
})

onUnmounted(() => {
  clearSelectedRocket()
})
</script>

<style src="./RocketDetail.scss" scoped></style>