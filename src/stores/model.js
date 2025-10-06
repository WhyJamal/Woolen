import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModelStore = defineStore('model', () => {
  const model = ref([])

  function setModel(data) {
    model.value = []
    model.value = data
  }

  function clearModel() {
    model.value = []
  }

  return { model, setModel, clearModel }
}, {
  persist: true  
})
