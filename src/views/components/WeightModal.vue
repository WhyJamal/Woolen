<template>
  <transition name="fade">
    <div class="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <transition name="slide">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-96 p-6 relative">
          <h2 class="text-xl font-semibold text-gray-800 mb-5 text-center">
            Введите веса
          </h2>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Вес нетто</label>
            <input 
              type="number" 
              inputmode="decimal"
              step="any"
              v-model="netWeight"
              placeholder="Введите вес нетто"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Вес брутто</label>
            <input 
              type="number" 
              inputmode="decimal"
              step="any"
              v-model="grossWeight"
              placeholder="Введите вес брутто"
              class="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div class="flex justify-end gap-3">
            <button @click="cancel" class="px-4 py-2 rounded-md text-black bg-gray-200 transition">
              Отмена
            </button>
            <button @click="submit" class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
              Подтверждение
            </button>
          </div>

          <button @click="cancel" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold transition">
            ×
          </button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'

const netWeight = ref('')
const grossWeight = ref('')

const { appContext } = getCurrentInstance()

function submit() {
  appContext.config.globalProperties.$resolve({ netWeight: netWeight.value, grossWeight: grossWeight.value })
  unmountModal()
}

function cancel() {
  appContext.config.globalProperties.$resolve(null)
  unmountModal()
}

function unmountModal() {
  const container = document.getElementById('weight-modal-container')
  if (container) {
    const vueApp = container.__vue_app__
    if (vueApp) vueApp.unmount()
    container.remove()
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active { transition: transform 0.25s ease-out; }
.slide-enter-from { transform: translateY(-20px); }
.slide-leave-to { transform: translateY(-20px); }
</style>
