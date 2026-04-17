import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/presidents'
  },
  {
    path: '/presidents',
    name: 'Presidents',
    component: () => import('@/views/PresidentList.vue')
  },
  {
    path: '/presidents/:id',
    name: 'PresidentDetail',
    component: () => import('@/views/PresidentDetail.vue')
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('@/views/TimelineView.vue')
  },
  {
    path: '/mindmap',
    name: 'MindMap',
    component: () => import('@/views/MindMapView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
