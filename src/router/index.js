import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import WarpingPage from '@/pages/WarpingPage.vue'
import WeavingPage from '@/pages/WeavingPage.vue'
import ManualFixPage from '@/pages/ManualFixPage.vue'
import PackagePage from "@/pages/PackagePage.vue"
import Slitting from '@/pages/Slitting.vue'

const routes = [
  { path: '/', name: 'login', component: LoginPage },
  { path: '/warping', name: 'Warping', component: WarpingPage },
  { path: '/weaving', name: 'Weaving', component: WeavingPage },
  { path: '/manualfix', name: 'ManualFix', component: ManualFixPage },
  { path: '/package', name: 'Package', component: PackagePage },
  { path: '/slitting', name: 'Slitting', component: Slitting }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router