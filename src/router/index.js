import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import LoginPage from '@/views/pages/LoginPage.vue'
import WarpingPage from '@/views/pages/WarpingPage.vue'
import WeavingPage from '@/views/pages/WeavingPage.vue'
import ManualFixPage from '@/views/pages/ManualFixPage.vue'
import PackagePage from '@/views/pages/PackagePage.vue'
import ExpenseHistory from '@/views/pages/ExpenseHistory.vue'
import HistoryAction from '@/views/pages/HistoryAction.vue'
import PrintLabel from '@/views/pages/PrintLabel.vue'

const routes = [
  { path: '/:pathMatch(.*)*', component: () => import('@/views/pages/maintenance/error/Error404Page.vue') },
  { path: '/', name: 'login', component: LoginPage },
  { path: '/warping', name: 'Warping', component: WarpingPage, meta: { requiresAuth: true } },
  { path: '/weaving', name: 'Weaving', component: WeavingPage, meta: { requiresAuth: true } },
  { path: '/manualfix', name: 'ManualFix', component: ManualFixPage, meta: { requiresAuth: true } },
  { path: '/package', name: 'Package', component: PackagePage, meta: { requiresAuth: true } },
  { path: '/consumes', name: 'ExpenseHistory', component: ExpenseHistory, meta: { requiresAuth: true } },
  { path: '/history', name: 'HistoryAction', component: HistoryAction, meta: { requiresAuth: true } },
  { path: '/print-label', name: 'PrintLabel', component: PrintLabel, meta: { requiresAuth: true } },
  { path: '/not-authorized', name: 'not-authorized', component: () => import('@/views/pages/maintenance/error/Error401Page.vue') }
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