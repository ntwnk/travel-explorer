<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import defaultDestinations from '../data/destinations.json'
import { isLoggedIn } from '../services/auth'

const search = ref('')
const selectedCategory = ref('All')
const currentPage = ref(1)
const perPage = 2
const destinations = ref<any[]>([])
const weather = ref<Record<number, string>>({})

const loggedIn = isLoggedIn()

onMounted(() => {
  const saved = localStorage.getItem('destinations')

  if (saved) {
    destinations.value = JSON.parse(saved)
  } else {
    destinations.value = defaultDestinations
    localStorage.setItem('destinations', JSON.stringify(defaultDestinations))
  }

  loadWeather()
})

const categories = computed(() => {
  return ['All', ...new Set(destinations.value.map((item) => item.category))]
})

const filteredDestinations = computed(() => {
  const keyword = search.value.toLowerCase()

  return destinations.value.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) ||
      item.location.toLowerCase().includes(keyword)

    const matchesCategory =
      selectedCategory.value === 'All' || item.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

const totalPages = computed(() =>
  Math.ceil(filteredDestinations.value.length / perPage),
)

const paginatedDestinations = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredDestinations.value.slice(start, start + perPage)
})

function resetPage() {
  currentPage.value = 1
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function getImage(imageName: string) {
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}

function resetDestinations() {
  localStorage.removeItem('destinations')
  destinations.value = defaultDestinations
  localStorage.setItem('destinations', JSON.stringify(defaultDestinations))
}

function likeDestination(id: number) {
  const destination = destinations.value.find((item) => item.id === id)

  if (destination) {
    destination.likes++
    localStorage.setItem('destinations', JSON.stringify(destinations.value))
  }
}

function deleteDestination(id: number) {
  destinations.value = destinations.value.filter((item) => item.id !== id)
  localStorage.setItem('destinations', JSON.stringify(destinations.value))
}

async function loadWeather() {
  for (const item of destinations.value) {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${item.lat}&longitude=${item.lon}&current_weather=true`,
      )

      const data = await response.json()
      weather.value[item.id] = `${data.current_weather.temperature}°C`
    } catch {
      weather.value[item.id] = 'Weather unavailable'
    }
  }
}
</script>

<template>
  <section class="page">
    <h2>Australian Destinations</h2>

    <button @click="resetDestinations">
  Reset Destinations
</button>

    <div class="filter-box">
      <label for="search">Search destinations</label>
      <input
        id="search"
        v-model="search"
        @input="resetPage"
        type="text"
        placeholder="Search by name, category, location..."
      />

      <label for="category">Filter by category</label>
      <select id="category" v-model="selectedCategory" @change="resetPage">
        <option v-for="category in categories" :key="category">
          {{ category }}
        </option>
      </select>
    </div>

    <article
      v-for="item in paginatedDestinations"
      :key="item.id"
      class="destination-card"
    >
      <img :src="getImage(item.image)" :alt="item.name" />

      <div>
        <h3>{{ item.name }}</h3>
        <p><strong>Category:</strong> {{ item.category }}</p>
        <p><strong>Location:</strong> {{ item.location }}</p>
        <p>{{ item.description }}</p>
        <p><strong>Current weather:</strong> {{ weather[item.id] || 'Loading...' }}</p>
        <p>❤️ {{ item.likes }} likes</p>

        <button v-if="loggedIn" @click="likeDestination(item.id)">
          Like
        </button>

        <RouterLink
          v-if="loggedIn"
          :to="`/edit-destination/${item.id}`"
          class="edit-link"
        >
          Edit
        </RouterLink>

        <button v-if="loggedIn" @click="deleteDestination(item.id)">
          Delete
        </button>
      </div>
    </article>

    <p v-if="filteredDestinations.length === 0">No destinations found.</p>

    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">
        Previous
      </button>

      <span>Page {{ currentPage }} of {{ totalPages || 1 }}</span>

      <button @click="nextPage" :disabled="currentPage === totalPages || totalPages === 0">
        Next
      </button>
    </div>

    <p v-if="!loggedIn" class="login-note">
      Log in to like, edit, delete, or add destinations.
    </p>
  </section>
</template>