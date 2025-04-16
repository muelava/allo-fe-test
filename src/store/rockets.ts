import { defineStore } from 'pinia'
import axios from 'axios'

interface Rocket {
  id: string
  name: string
  description: string
  flickr_images: string[]
  cost_per_launch: number
  country: string
  first_flight: string
}

interface State {
  rockets: Rocket[]
  selectedRocket: Rocket | null
  loading: boolean
  error: string | null
}

export const useRocketStore = defineStore('rockets', {
  state: (): State => ({
    rockets: [],
    selectedRocket: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchRockets() {
      this.loading = true
      this.error = null
      this.selectedRocket = null
      try {
        const response = await axios.get<Rocket[]>('https://api.spacexdata.com/v4/rockets')
        this.rockets = response.data
      } catch (error) {
        this.error = 'Failed to fetch rockets. Please try again.'
        console.error('Error fetching rockets:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchRocketById(id: string) {
      const existingRocket = this.rockets.find(rocket => rocket.id === id)
      if (existingRocket) {
        this.selectedRocket = existingRocket
        this.error = null
        return
      }

      this.loading = true
      this.error = null
      this.selectedRocket = null
      try {
        const response = await axios.get<Rocket>(`https://api.spacexdata.com/v4/rockets/${id}`)
        this.selectedRocket = response.data
      } catch (error) {
        this.error = 'Failed to fetch rocket details. Please try again.'
        console.error(`Error fetching rocket ${id}:`, error)
        this.selectedRocket = null
      } finally {
        this.loading = false
      }
    },

    async addRocket(newRocket: Omit<Rocket, 'id'>) {
      const fakeId = 'local-' + Math.random().toString(36).substr(2, 9)
      this.rockets.unshift({
        ...newRocket,
        id: fakeId
      })
    },    

    clearSelectedRocket() {
      this.selectedRocket = null
      this.error = null
    }
  }
}) 