import { createRouter, createWebHistory } from 'vue-router'
import BannerGenerator from '@/views/BannerGenerator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BannerGenerator
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/Gallery.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    }
  ]
})

export default router 