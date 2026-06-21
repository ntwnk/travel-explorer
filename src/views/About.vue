<script setup lang="ts">
import { ref, computed } from 'vue'

const first = ref('')
const last = ref('')
const choice = ref('Mountain')

const message = computed(() =>
  first.value || last.value
    ? `Welcome ${first.value} ${last.value}!`
    : ''
)

const image = computed(() =>
  choice.value === 'Mountain'
    ? new URL('../assets/images/fallscreek.jpg', import.meta.url).href
    : new URL('../assets/images/reef.jpg', import.meta.url).href
)
</script>

<template>
  <section class="page">
    <h2>About Travel Explorer</h2>

    <p>
      Travel Explorer is a travel app focused on exploring destinations across
      Australia. Discover iconic places like Falls Creek and the Great Barrier Reef.
    </p>

    <!-- Input Section -->
    <div class="form-section">
      <input v-model="first" placeholder="First name" />
      <input v-model="last" placeholder="Last name" />

      <h3 class="welcome">{{ message }}</h3>
    </div>

    <!-- Radio Section -->
    <div class="radio-section">
      <label>
        <input type="radio" value="Mountain" v-model="choice" />
        Falls Creek (Mountain)
      </label>

      <label>
        <input type="radio" value="Ocean" v-model="choice" />
        Great Barrier Reef (Ocean)
      </label>
    </div>

    <!-- Image -->
    <div class="image-container">
      <img class="about-image" :src="image" :alt="choice" />
    </div>
  </section>
</template>

<style scoped>
.form-section {
  margin: 20px 0;
}

.welcome {
  color: #1f4e79;
  margin-top: 10px;
}

.radio-section {
  margin: 20px 0 12px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.image-container {
  margin-top: 12px;
  width: 100%;
  max-width: 780px;
}

.about-image {
  width: 100%;
  height: 380px;
  object-fit: cover;
object-position: 80% center;   /* more right */
  border-radius: 16px;
  display: block;
}
</style>