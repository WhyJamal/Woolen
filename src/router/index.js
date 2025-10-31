import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  { path: '/', name: 'login', component: () => import('@/views/pages/LoginPage.vue') },
  { path: '/warping', name: 'Warping', component: () => import('@/views/pages/WarpingPage.vue'), meta: { requiresAuth: true } },
  { path: '/weaving', name: 'Weaving', component: () => import('@/views/pages/WeavingPage.vue'), meta: { requiresAuth: true } },
  { path: '/manualfix', name: 'ManualFix', component: () => import('@/views/pages/ManualFixPage.vue'), meta: { requiresAuth: true } },
  { path: '/package', name: 'Package', component: () => import('@/views/pages/PackagePage.vue'), meta: { requiresAuth: true } },
  { path: '/consumes', name: 'ExpenseHistory', component: () => import('@/views/pages/ExpenseHistory.vue'), meta: { requiresAuth: true } },
  { path: '/history', name: 'HistoryAction', component: () => import('@/views/pages/HistoryAction.vue'), meta: { requiresAuth: true } },
  { path: '/print-label', name: 'PrintLabel', component: () => import('@/views/pages/PrintLabel.vue'), meta: { requiresAuth: true } },
  { path: '/not-authorized', name: 'not-authorized', component: () => import('@/views/pages/maintenance/error/Error401Page.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/pages/maintenance/error/Error404Page.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/not-authorized')
  } else {
    next()
  }
})

export default router
