<template>
  <div
    class="mt-[90px] mx-4 flex items-center justify-between bg-white rounded-full p-3 shadow"
  >
    <div class="flex items-center gap-3">
      <div
        class="w-12 h-12 rounded-full border-2 border-blue-500 bg-gray-200 overflow-hidden flex items-center justify-center"
      >
        {{ firstLetter(userStore.user?.name) }}
      </div>
      <div>
        <div class="font-semibold">{{ userStore.user?.name }}</div>
        <div class="text-xs text-gray-500">{{ userStore.user?.stage }}</div>
      </div>
    </div>
    <div class="flex gap-3">
      <button
        :disabled="userStore.user?.stage === 'Упаковка' || modelStore.model.length === 0"
        @click="openConsumesPage"
        class="px-4 py-2 rounded-full font-semibold border border-orange-400"
        :class="{
          'opacity-50 cursor-not-allowed': userStore.user?.stage === 'Упаковка' || modelStore.model.length === 0,
        }"
      >
        {{ $t('history_expenses') }}
      </button>
      <button
        @click="openHistoryPage"
        class="px-4 py-2 rounded-full font-semibold border border-blue-600"
      >
        {{ $t('history_action') }}
      </button>
    </div>
    <div class="flex items-center gap-3">
      <slot name="exit-button" />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { useModelStore } from '@/stores/model'

const modelStore = useModelStore()
const userStore = useUserStore();
const router = useRouter();

function openHistoryPage() {
  router.push("/history");
}

function openConsumesPage() {
  router.push("/consumes");
}

function firstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase();
}
</script>
