import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/presidents',
    name: 'Presidents',
    component: () => import('../views/Presidents.vue')
  },
  {
    path: '/president/:id',
    name: 'PresidentDetail',
    component: () => import('../views/PresidentDetail.vue')
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('../views/Timeline.vue')
  },
  {
    path: '/mindmap',
    name: 'MindMap',
    component: () => import('../views/MindMap.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
