import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('@/views/recipes.vue'),
    },
    {
      path: '/family',
      name: 'family',
      component: () => import('@/views/family.vue'),
    },
    {
      path: '/chuangjiancaipu',
      name: 'chuangjiancaipu',
      component: () => import('@/views/chuangjiancaipu.vue'),
    }
  ],
})

export default router
