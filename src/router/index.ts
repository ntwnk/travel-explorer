import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import News from '../views/News.vue'
import About from '../views/About.vue'
import Destinations from '../views/Destinations.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AddDestination from '../views/AddDestination.vue'
import EditDestination from '../views/EditDestination.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/news', name: 'news', component: News },
    { path: '/about', name: 'about', component: About },
    { path: '/destinations', name: 'destinations', component: Destinations },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/add-destination', name: 'addDestination', component: AddDestination },
    { path: '/edit-destination/:id', name: 'editDestination', component: EditDestination },
  ],
})

export default router