<template>
  <div class="rocket-list-container">
    <h1 class="page-title">SpaceX Rockets</h1>

    <!-- Filter Input -->
    <div class="filter-container">
      <input
        type="text"
        placeholder="Filter rockets by name"
        v-model="filterText"
        class="filter-input"
      />
      <button class="add-button" @click="isModalOpen = true">+</button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="state-container loading-container">
      <LoadingSpinner />
      <p>Loading rockets...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="state-container error-container">
      <ErrorMessage :message="error" @retry="fetchRockets" />
    </div>

    <!-- Success State -->
    <div v-else-if="filteredRockets.length > 0" class="rockets-grid">
      <RocketCard v-for="rocket in filteredRockets" :key="rocket.id" :rocket="rocket" />
    </div>

    <!-- No Results State -->
    <div v-else class="state-container no-results">
      <img src="@/assets/empty.svg" alt="empty" width="250">
        <p>No rockets match your filter criteria.</p>
    </div>

  </div>


  <!-- Modal -->
  <div v-if="isModalOpen" class="modal-overlay" @click.self="isModalOpen = false">
  <div class="modal-content">
    <h2>Add New Rocket</h2>
    <form @submit.prevent="handleAddRocket">
      <input v-model="newRocket.name" placeholder="Rocket Name" required />
      <textarea v-model="newRocket.description" placeholder="Rocket Description" required></textarea>
      <input v-model="newRocket.flickr_images[0]" placeholder="Image URL" required />
      <div class="modal-actions">
        <button type="submit">Add Rocket</button>
        <button type="button" @click="isModalOpen = false">Cancel</button>
      </div>
    </form>
  </div>
</div>

</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRocketStore } from '@/store/rockets'
import RocketCard from '@/components/molecules/RocketCard.vue'
import LoadingSpinner from '@/components/atoms/LoadingSpinner.vue'
import ErrorMessage from '@/components/atoms/ErrorMessage.vue'

const rocketStore = useRocketStore()
const { rockets, loading, error } = storeToRefs(rocketStore)
const { fetchRockets } = rocketStore

// Modal
const isModalOpen = ref(false)

// Filter state
const filterText = ref('')


// Computed property for filtered rockets
const filteredRockets = computed(() => {
  if (!filterText.value) {
    return rockets.value
  }
  const lowerCaseFilter = filterText.value.toLowerCase()
  return rockets.value.filter(rocket =>
    rocket.name.toLowerCase().includes(lowerCaseFilter)
  )
})

onMounted(() => {
  // Fetch rockets only if the list is empty
  if (rockets.value.length === 0) {
     fetchRockets()
  }
})

const newRocket = ref({
  name: '',
  description: '',
  flickr_images: ['']
})

const handleAddRocket = () => {
  if (!newRocket.value.name || !newRocket.value.description || !newRocket.value.flickr_images[0]) {
    return // simple validation
  }
  rocketStore.addRocket({ ...newRocket.value })
  newRocket.value = { name: '', description: '', flickr_images: [''] } // reset form
  isModalOpen.value = false
}

</script>

<style src="./RocketList.scss" scoped></style>