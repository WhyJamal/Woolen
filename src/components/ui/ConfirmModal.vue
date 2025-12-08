<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[1000] transition-opacity duration-300"
  >
    <div
      class="relative bg-white/90 border border-gray-100 shadow-2xl rounded-3xl w-[420px] text-center p-8 animate-fadeIn scale-100 transition-transform duration-300"
    >
      <!-- <button
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        @click="$emit('cancel')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button> -->

      <div
        class="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-200 shadow-inner"
      >
        <svg
          class="w-12 h-12 text-red-500"
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

      <h3 class="text-xl font-semibold text-gray-800 mb-2">
        {{ props.title }}
      </h3>

      <div class="text-gray-600 mb-6 leading-relaxed">
        <slot />
      </div>

      <div class="flex justify-center gap-5">
        <Button
          variant="secondary"
          @click="$emit('cancel')"
        >
          Отмена
        </Button>

        <Button
          @click="$emit('confirm')"
        >
          Подтвердить
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";

const props = defineProps({
  title: { type: String, default: "" },
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
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
