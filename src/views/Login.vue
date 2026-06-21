<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const error = ref('')

function login() {
  error.value = ''

  const users = JSON.parse(localStorage.getItem('users') || '[]')

  const foundUser = users.find(
    (user: any) =>
      user.username === username.value && user.password === password.value,
  )

  if (!foundUser) {
    error.value = 'Invalid username or password.'
    return
  }

  localStorage.setItem('currentUser', foundUser.username)
  window.location.href = '/'
}
</script>

<template>
  <section class="page">
    <h2>Login</h2>

    <form @submit.prevent="login" class="form-box">
      <label for="loginUsername">Username</label>
      <input id="loginUsername" v-model="username" type="text" />

      <label for="loginPassword">Password</label>
      <input id="loginPassword" v-model="password" type="password" />

      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit">Login</button>
    </form>
  </section>
</template>