<template>
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] transition-all duration-300"
  >
    <div
      class="bg-white p-8 rounded-2xl shadow-2xl w-[420px] text-center transform transition-all scale-100 animate-fadeIn"
    >
      <div
        class="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-red-100"
      >
        <svg
          class="w-10 h-10 text-red-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v4m0 4h.01M4.93 4.93a10 10 0 1 1 14.14 14.14A10 10 0 0 1 4.93 4.93z"
          />
        </svg>
      </div>

      <h3 class="text-lg font-semibold text-gray-800 mb-3">
        Вы не записали историю изменений
      </h3>

      <p class="text-gray-500 mb-6 text-sm">
        Проверьте, не перезаписали ли вы её или добавьте недостающие данные.
      </p>

      <div class="flex justify-center space-x-3">
        <Button
          @click="$emit('close')"
        >
          Понятно
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";

</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.25s ease-out;
}
</style>
