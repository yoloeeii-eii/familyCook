import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('../views/recipes.vue'),
    },
    {
      path: '/family',
      name: 'family',
      component: () => import('../views/family.vue'),
    },
  ],
})

export default router
