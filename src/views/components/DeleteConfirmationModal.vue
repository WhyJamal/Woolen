<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 flex justify-center items-center z-60"
    @click.self="close"
  >
    <div class="bg-white p-6 rounded-xl w-[400px] shadow-xl">
      <div class="flex items-center gap-2 mb-4">
        <TriangleAlert class="w-6 h-6 stroke-yellow-500 fill-yellow-200" />
        <h2 class="text-lg font-bold text-red-600">Подтверждение удаления</h2>
      </div>

      <p class="text-gray-600 mb-6">
        Вы уверены, что хотите удалить эту запись?
      </p>
      <div class="flex justify-end space-x-3">
        <button
          @click="close"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Отмена
        </button>
        <button
          @click="confirm"
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { TriangleAlert } from "lucide-vue-next";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "confirm"]);

const close = () => {
  emit("close");
};

const confirm = () => {
  emit("confirm");
};
</script>
