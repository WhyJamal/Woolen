<script setup>
const emit = defineEmits(['close'])

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000]"
  >
    <div
      class="bg-white p-8 rounded-2xl shadow-2xl w-[420px] text-center animate-fadeIn"
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

      <h3 class="text-lg font-semibold text-gray-800 mb-5">{{ message }}</h3>

      <button
        @click="emit('close')"
        class="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition-all"
      >
        Понятно
      </button>
    </div>
  </div>
</template>