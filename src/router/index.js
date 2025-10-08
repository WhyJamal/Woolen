import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/pages/LoginPage.vue'
import WarpingPage from '@/views/pages/WarpingPage.vue'
import WeavingPage from '@/views/pages/WeavingPage.vue'
import ManualFixPage from '@/views/pages/ManualFixPage.vue'
import PackagePage from '@/views/pages/PackagePage.vue'
import ExpenseHistory from '@/views/pages/ExpenseHistory.vue'
import HistoryAction from '@/views/pages/HistoryAction.vue'
import PrintLabel from '@/views/pages/PrintLabel.vue'
import Slitting from '@/views/pages/Slitting.vue'

const routes = [
  { path: '/:pathMatch(.*)*', component: () => import('@/views/pages/maintenance/error/Error404Page.vue')},
  { path: '/', name: 'login', component: LoginPage },
  { path: '/warping', name: 'Warping', component: WarpingPage },
  { path: '/weaving', name: 'Weaving', component: WeavingPage },
  { path: '/manualfix', name: 'ManualFix', component: ManualFixPage },
  { path: '/package', name: 'Package', component: PackagePage },
  { path: '/consumes', name: 'ExpenseHistory', component: ExpenseHistory },
  { path: '/history', name: 'HistoryAction', component: HistoryAction },
  { path: '/print-label', name: 'PrintLabel', component: PrintLabel },
  { path: '/slitting', name: 'Slitting', component: Slitting }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router