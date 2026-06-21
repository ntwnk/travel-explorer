<script setup lang="ts">
import { ref } from 'vue'
import { getCurrentUser, logout } from './services/auth'

const currentUser = ref(getCurrentUser())

function handleLogout() {
  logout()
  currentUser.value = null
  window.location.href = import.meta.env.BASE_URL
}
</script>

<template>
  <header>
    <h1>Travel Explorer</h1>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/news">News</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/destinations">Destinations</RouterLink>

      <RouterLink v-if="!currentUser" to="/login">Login</RouterLink>
      <RouterLink v-if="!currentUser" to="/register">Register</RouterLink>

      <RouterLink v-if="currentUser" to="/add-destination">Add Destination</RouterLink>
      <button v-if="currentUser" class="logout-btn" @click="handleLogout">
        Logout
      </button>
    </nav>

    <p v-if="currentUser" class="user-message">
      Welcome, {{ currentUser }}
    </p>
  </header>

  <main>
    <RouterView />
  </main>
</template>