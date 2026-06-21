<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isLoggedIn } from '../services/auth'

const router = useRouter()

const name = ref('')
const category = ref('')
const description = ref('')
const location = ref('')
const image = ref('reef.jpg')
const lat = ref('')
const lon = ref('')
const error = ref('')

function addDestination() {
  error.value = ''

  if (!isLoggedIn()) {
    error.value = 'You must be logged in to add a destination.'
    return
  }

  if (!name.value || !category.value || !description.value || !location.value) {
    error.value = 'Please complete all required fields.'
    return
  }

  const destinations = JSON.parse(localStorage.getItem('destinations') || '[]')

  const newDestination = {
    id: Date.now(),
    name: name.value,
    category: category.value,
    description: description.value,
    location: location.value,
    image: image.value,
    lat: Number(lat.value) || -33.8688,
    lon: Number(lon.value) || 151.2093,
    likes: 0,
  }

  destinations.push(newDestination)
  localStorage.setItem('destinations', JSON.stringify(destinations))

  router.push('/destinations')
}
</script>

<template>
  <section class="page">
    <h2>Add Destination</h2>

    <form @submit.prevent="addDestination" class="form-box">
      <label for="name">Destination Name</label>
      <input id="name" v-model="name" type="text" />

      <label for="category">Category</label>
      <input id="category" v-model="category" type="text" placeholder="Ocean, Mountain, City..." />

      <label for="location">Location</label>
      <input id="location" v-model="location" type="text" />

      <label for="description">Description</label>
      <textarea id="description" v-model="description"></textarea>

      <label for="image">Image file name</label>
      <input id="image" v-model="image" type="text" placeholder="reef.jpg" />

      <label for="lat">Latitude</label>
      <input id="lat" v-model="lat" type="text" />

      <label for="lon">Longitude</label>
      <input id="lon" v-model="lon" type="text" />

      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit">Add Destination</button>
    </form>
  </section>
</template>