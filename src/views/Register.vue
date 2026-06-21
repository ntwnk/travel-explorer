<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')

function register() {
  error.value = ''
  success.value = ''

  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'All fields are required.'
    return
  }

  if (!email.value.includes('@')) {
    error.value = 'Please enter a valid email address.'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]')

  const existingUser = users.find((user: any) => user.username === username.value)

  if (existingUser) {
    error.value = 'Username already exists.'
    return
  }

  users.push({
    username: username.value,
    email: email.value,
    password: password.value,
  })

  localStorage.setItem('users', JSON.stringify(users))
  success.value = 'Registration successful. You can now log in.'

  setTimeout(() => {
    router.push('/login')
  }, 800)
}
</script>

<template>
  <section class="page">
    <h2>Register</h2>

    <form @submit.prevent="register" class="form-box">
      <label for="username">Username</label>
      <input id="username" v-model="username" type="text" />

      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" />

      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" />

      <label for="confirmPassword">Confirm Password</label>
      <input id="confirmPassword" v-model="confirmPassword" type="password" />

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>

      <button type="submit">Register</button>
    </form>
  </section>
</template>