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
      component: () => import('@/views/recipes/recipes.vue'),
    },
    {
      path: '/recipes/:id',
      name: 'recipe-detail',
      component: () => import('@/views/recipes/RecipeDetail.vue'),
    },
    {
      path: '/family',
      name: 'family',
      component: () => import('@/views/family.vue'),
    },
  ],
})

// // 路由守卫
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')

//   if (to.meta.requiresAuth && !token) {
//     // 如果需要登录但未登录，跳转到登录页
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router
