<template>
  <div class="mt-[90px] mx-4 flex items-center justify-between bg-white rounded-full p-3 shadow">
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-full border-2 border-blue-500 bg-gray-200 overflow-hidden flex items-center justify-center">
        {{ firstLetter(userStore.user?.name) }}
      </div>
      <div>
        <div class="font-semibold">{{ userStore.user?.name }}</div>
        <div class="text-xs text-gray-500">{{ userStore.user?.stage }}</div>
      </div>
    </div>
    <div class="flex gap-3">
      <button class="px-4 py-2 rounded-full font-semibold border border-orange-400">История расходов</button>
      <button class="px-4 py-2 rounded-full font-semibold border border-blue-600">История действие</button>
    </div>
    <div class="flex items-center gap-3">
      <slot name="exit-button" />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

function firstLetter(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase()
}
</script>
