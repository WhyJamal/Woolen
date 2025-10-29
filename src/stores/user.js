import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useModelStore } from './model'
import { useDefectStore } from "@/stores/defects";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null, 
  }),
  actions: {
    setUser(userData) {
      this.user = userData
      localStorage.setItem('user', JSON.stringify(userData)) 
    },
    clearUser() {
      this.user = null
      localStorage.removeItem('user')

      const modelStore = useModelStore()
      modelStore.clearModel()

      const defectStore = useDefectStore();
      defectStore.clearRows()      
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
})
