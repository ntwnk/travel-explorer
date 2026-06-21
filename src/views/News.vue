<script setup lang="ts">
import { ref, computed } from 'vue'
import newsData from '../data/news.json'

const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 4

const filteredNews = computed(() => {
  const keyword = search.value.toLowerCase()

  return newsData.filter((item) => {
    return (
      item.date.toLowerCase().includes(keyword) ||
      item.title.toLowerCase().includes(keyword) ||
      item.content.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword)
    )
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredNews.value.length / itemsPerPage)
})

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredNews.value.slice(start, start + itemsPerPage)
})

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

function resetPage() {
  currentPage.value = 1
}
</script>

<template>
  <section class="page">
    <h2>News</h2>

    <input
      v-model="search"
      @input="resetPage"
      class="search-box"
      type="text"
      placeholder="Search by date, title, content, or category"
    />

    <div v-if="paginatedNews.length > 0">
      <article v-for="item in paginatedNews" :key="item.title" class="card">
        <p class="date">{{ item.date }} | {{ item.category }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
      </article>
    </div>

    <p v-else>No news found.</p>

    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">
        Previous
      </button>

      <span>Page {{ currentPage }} of {{ totalPages || 1 }}</span>

      <button @click="nextPage" :disabled="currentPage === totalPages || totalPages === 0">
        Next
      </button>
    </div>
  </section>
</template>