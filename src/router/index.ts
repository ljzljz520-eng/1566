import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/presidents'
  },
  {
    path: '/presidents',
    name: 'Presidents',
    component: () => import('@/views/PresidentList.vue')
  },
  {
    path: '/president/:id',
    name: 'PresidentDetail',
    component: () => import('@/views/PresidentDetail.vue'),
    props: true
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('@/views/Timeline.vue')
  },
  {
    path: '/mindmap',
    name: 'MindMap',
    component: () => import('@/views/MindMap.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/Statistics.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/presidents'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
