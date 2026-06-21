<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isLoggedIn } from '../services/auth'

const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)

const name = ref('')
const category = ref('')
const description = ref('')
const location = ref('')
const image = ref('')
const lat = ref('')
const lon = ref('')
const error = ref('')

onMounted(() => {
  if (!isLoggedIn()) {
    error.value = 'You must be logged in to edit destinations.'
    return
  }

  const destinations = JSON.parse(localStorage.getItem('destinations') || '[]')
  const destination = destinations.find((item: any) => item.id === id)

  if (!destination) {
    error.value = 'Destination not found.'
    return
  }

  name.value = destination.name
  category.value = destination.category
  description.value = destination.description
  location.value = destination.location
  image.value = destination.image
  lat.value = destination.lat
  lon.value = destination.lon
})

function saveDestination() {
  if (!name.value || !category.value || !description.value || !location.value) {
    error.value = 'Please complete all required fields.'
    return
  }

  const destinations = JSON.parse(localStorage.getItem('destinations') || '[]')

  const updated = destinations.map((item: any) => {
    if (item.id === id) {
      return {
        ...item,
        name: name.value,
        category: category.value,
        description: description.value,
        location: location.value,
        image: image.value,
        lat: Number(lat.value),
        lon: Number(lon.value),
      }
    }

    return item
  })

  localStorage.setItem('destinations', JSON.stringify(updated))
  router.push('/destinations')
}
</script>

<template>
  <section class="page">
    <h2>Edit Destination</h2>

    <p v-if="error" class="error">{{ error }}</p>

    <form v-else @submit.prevent="saveDestination" class="form-box">
      <label for="name">Destination Name</label>
      <input id="name" v-model="name" type="text" />

      <label for="category">Category</label>
      <input id="category" v-model="category" type="text" />

      <label for="location">Location</label>
      <input id="location" v-model="location" type="text" />

      <label for="description">Description</label>
      <textarea id="description" v-model="description"></textarea>

      <label for="image">Image file name</label>
      <input id="image" v-model="image" type="text" />

      <label for="lat">Latitude</label>
      <input id="lat" v-model="lat" type="text" />

      <label for="lon">Longitude</label>
      <input id="lon" v-model="lon" type="text" />

      <button type="submit">Save Changes</button>
    </form>
  </section>
</template>